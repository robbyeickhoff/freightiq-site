import assert from 'node:assert/strict';

const base = new URL(process.argv[2] || 'http://localhost:3000');
async function get(path) {
  return fetch(new URL(path, base), { redirect: 'manual', signal: AbortSignal.timeout(30000) });
}
for (const path of ['/founding-drivers/admin/moderation/security',
  '/founding-drivers/admin/moderation?security_case=11111111-1111-4111-8111-111111111111']) {
  const response = await get(path);
  assert.ok([302, 303, 307, 308].includes(response.status), `${path}: expected sign-in redirect, got ${response.status}`);
  assert.equal(new URL(response.headers.get('location'), base).pathname, '/founding-drivers/sign-in');
}
const policy = await get('/privacy');
assert.equal(policy.status, 200);
const html = await policy.text();
for (const text of ['Protecting shared information', 'UptimeRobot', 'pseudonymous, not anonymous', '30 days']) {
  assert.ok(html.includes(text), `Live policy missing ${text}`);
}
for (const path of ['/learn', '/learn/app.js', '/learn/style.css']) {
  const response = await get(path);
  assert.equal(response.status, 200, `${path}: expected 200`);
  assert.ok((await response.text()).length > 100);
}
console.log('Signed-out security access, disclosures, and training endpoints passed. Authenticated moderator acceptance is a separate check.');
