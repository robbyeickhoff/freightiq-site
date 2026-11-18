import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const paths = JSON.parse(readFileSync('.next/server/app-paths-manifest.json', 'utf8'));
for (const route of ['/founding-drivers/admin/moderation/security/page', '/privacy/page', '/learn/route']) {
  assert.ok(paths[route], `Release blocked: required route missing from build: ${route}`);
}
const prerender = JSON.parse(readFileSync('.next/prerender-manifest.json', 'utf8'));
assert.ok(!prerender.routes['/founding-drivers/admin/moderation/security'],
  'Release blocked: private security page must not be prerendered');
console.log('Built security page, privacy policy, and training route verified.');
