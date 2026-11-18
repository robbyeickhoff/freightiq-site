const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const { renderToStaticMarkup } = require('react-dom/server');
const root = path.resolve(__dirname, '..');
const securityPath = 'app/founding-drivers/admin/moderation/security';
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

// Execute the actual server components/actions, replacing only external boundaries.
// No network, real accounts, email, or database writes are used by these tests.
function load(file, mocks = {}) {
  const filename = path.join(root, file);
  const mod = new Module(filename, module);
  mod.filename = filename;
  mod.paths = Module._nodeModulePaths(path.dirname(filename));
  const originalRequire = mod.require.bind(mod);
  mod.require = name => Object.hasOwn(mocks, name) ? mocks[name] : originalRequire(name);
  mod._compile(ts.transpileModule(read(file), {
    fileName: filename,
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText, filename);
  return mod.exports;
}
const redirect = location => { throw new Error(`redirect:${location}`); };
const link = { __esModule: true, default: ({ children }) => children };
function page(admin) {
  return load(`${securityPath}/page.tsx`, {
    '@/lib/moderation/auth': { getModerationAdminContext: async () => admin },
    'next/navigation': { redirect }, 'next/link': link,
    './actions': { actOnSecurityCase: async () => {} },
  });
}
function action(admin) {
  return load(`${securityPath}/actions.ts`, {
    '@/lib/moderation/auth': { requireModerationAdmin: async () => {
      if (!admin) throw new Error('Moderation access required.');
      return admin;
    } },
    'next/navigation': { redirect }, 'next/cache': { revalidatePath() {} },
  }).actOnSecurityCase;
}
function form(seconds = '900', reason = 'suspicious_collection') {
  const data = new FormData();
  Object.entries({ case_id: '11111111-1111-4111-8111-111111111111', version: '2', seconds, reason })
    .forEach(([key, value]) => data.set(key, value));
  return data;
}

test('authorization rejects signed-out, non-moderator, and failed role checks', async () => {
  for (const [sub, allowed, error] of [[null, true, null], ['user', false, null], ['user', true, {}]]) {
    const auth = load('lib/moderation/auth.ts', {
      react: { cache: fn => fn },
      '@/lib/supabase/server': { createClient: async () => ({
        auth: { getClaims: async () => ({ data: { claims: { sub } }, error: null }) },
        rpc: async name => { assert.equal(name, 'is_moderation_admin'); return { data: allowed, error }; },
      }) },
    });
    assert.equal(await auth.getModerationAdminContext(), null);
    await assert.rejects(auth.requireModerationAdmin(), /Moderation access required/);
  }
});

test('private page redirects unauthorized visitors before fetching cases', async () => {
  await assert.rejects(page(null).default({ searchParams: Promise.resolve({}) }), /redirect:.*sign-in/);
});

test('authorized moderator can read cases; page remains dynamic and excluded from indexing', async () => {
  let calls = 0;
  const component = page({ supabase: { rpc: async (name, args) => {
    calls++;
    assert.equal(name, 'get_security_read_cases_v1');
    assert.deepEqual(args, { p_case: null, p_before: null, p_before_id: null });
    return { data: { cases: [], detection_enabled: true, mail_enabled: true }, error: null };
  } } });
  const html = renderToStaticMarkup(await component.default({ searchParams: Promise.resolve({}) }));
  assert.match(html, /No available cases/);
  assert.equal(calls, 1);
  assert.equal(component.dynamic, 'force-dynamic');
  assert.equal(component.metadata.robots.index, false);
});

test('case read failure is shown as failure, never a successful empty queue', async () => {
  const component = page({ supabase: { rpc: async () => { throw new Error('offline'); } } });
  const html = renderToStaticMarkup(await component.default({ searchParams: Promise.resolve({}) }));
  assert.match(html, /Security cases could not be loaded/);
  assert.doesNotMatch(html, /No available cases/);
});

test('email case link redirects only after moderator authorization', async () => {
  for (const admin of [null, {}]) {
    const component = load('app/founding-drivers/admin/moderation/page.tsx', {
      '@/lib/moderation/auth': { getModerationAdminContext: async () => admin },
      '@/lib/moderation/data': { loadModerationQueue: async () => { throw new Error('Unexpected queue read'); } },
      './actions': {}, 'next/navigation': { redirect }, 'next/link': link,
    });
    await assert.rejects(component.default({ searchParams: Promise.resolve({
      security_case: '11111111-1111-4111-8111-111111111111',
    }) }), admin ? /redirect:.*security\?case=/ : /redirect:.*sign-in/);
  }
});

test('direct pause action rejects unauthorized callers and invalid duration', async () => {
  await assert.rejects(action(null)(form()), /Moderation access required/);
  const admin = { supabase: { rpc: async () => { throw new Error('Must not call database'); } } };
  await assert.rejects(action(admin)(form('999999')), /result=invalid/);
});

test('pause and restore preserve version checks and never claim stale/failed actions succeeded', async () => {
  for (const [seconds, reason, code, result] of [
    ['900', 'suspicious_collection', null, 'saved'],
    ['0', 'review_complete', null, 'saved'],
    ['900', 'suspicious_collection', 'PT409', 'stale'],
    ['900', 'suspicious_collection', '42501', 'failed'],
  ]) {
    const admin = { supabase: { rpc: async (name, args) => {
      assert.equal(name, 'act_security_read_case_v1');
      assert.equal(args.p_version, 2);
      assert.equal(args.p_seconds, Number(seconds));
      assert.equal(args.p_reason, reason);
      return { error: code ? { code } : null };
    } } };
    await assert.rejects(action(admin)(form(seconds, reason)), new RegExp(`result=${result}$`));
  }
});

test('approved privacy disclosures and training entry points are present', () => {
  const policy = read('app/privacy/page.tsx');
  for (const text of ['Protecting shared information', 'pseudonymous, not anonymous', 'UptimeRobot',
    'security notification emails', 'two hours', '30 days', 'Authorized moderators']) {
    assert.ok(policy.includes(text), `Missing approved disclosure: ${text}`);
  }
  for (const file of ['app/learn/route.ts', 'app/learn/practice.html', 'public/learn/app.js', 'public/learn/style.css']) {
    assert.ok(read(file).length > 100, `Missing training file: ${file}`);
  }
});
