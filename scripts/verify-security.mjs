import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { onRequest } from '../functions/downloads/[file].js';

const expected = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': "base-uri 'self'; object-src 'none'; frame-ancestors 'none'",
};
const headers = fs.readFileSync('dist/_headers', 'utf8');
assert.equal(headers, fs.readFileSync('public/_headers', 'utf8'));
assert.equal(headers.split('\n')[0].trim(), '/*');
for (const [name, value] of Object.entries(expected)) {
  assert.equal(headers.split('\n').filter(line => line.trim().startsWith(name + ':')).length, 1, name);
  assert.ok(headers.includes(`${name}: ${value}`), name);
}
const removed = ['ES', 'EN'].flatMap(lang => ['pdf', 'docx'].map(ext => `/downloads/Juan_Carlos_Flores_CV_${lang}.${ext}`));
const routing = JSON.parse(fs.readFileSync('public/_routes.json', 'utf8'));
assert.deepEqual([...routing.include].sort(), [...removed].sort());
assert.deepEqual(routing.exclude, []);
assert.deepEqual(JSON.parse(fs.readFileSync('dist/_routes.json', 'utf8')), routing);
let cases = 0;
for (const pathname of removed) for (const method of ['GET', 'HEAD']) for (const query of ['', '?download=1']) {
  const response = await onRequest({ request: new Request('https://example.test' + pathname + query, {method}), next: () => {throw Error('Removed download fell through');} });
  assert.equal(response.status, 404);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert.equal(response.headers.get('X-Robots-Tag'), 'noindex, nofollow');
  for (const [name, value] of Object.entries(expected)) assert.equal(response.headers.get(name), value);
  assert.equal(await response.text(), method === 'HEAD' ? '' : '404 — File not found');
  cases++;
}
const fallback = new Response('asset fallback', {status: 200});
assert.equal(await onRequest({request: new Request('https://example.test/downloads/other.txt'), next: () => fallback}), fallback);
function inspect(directory) {
  for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
    const file = path.join(directory, entry.name);
    assert.ok(!entry.isSymbolicLink(), 'Unexpected published link: ' + file);
    assert.ok(!/(^\.(git|env)(\.|$)|^node_modules$|^functions$|^docs$|^package(?:-lock)?\.json$|\.(?:pdf|docx?|zip|7z|pem|key|pfx|map)$)/i.test(entry.name), 'Unexpected published artifact: ' + file);
    if (entry.isDirectory()) inspect(file);
    else if (/\.(html|js|css|json|txt|xml)$/i.test(entry.name)) {
      const content = fs.readFileSync(file, 'utf8');
      assert.ok(!/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9]{30,}|AKIA[0-9A-Z]{16}/.test(content), 'Potential credential: ' + file);
      assert.ok(!/\+51[\s.-]*9(?:[\s.-]*\d){8}|href=["']tel:/i.test(content), 'Public phone: ' + file);
    }
  }
}
inspect('dist');
const error = fs.readFileSync('dist/404.html', 'utf8');
assert.ok(!/rel="canonical"|hreflang=|property="og:url"/.test(error), '404 must not advertise a localized canonical URL');
assert.ok(error.includes('name="robots" content="noindex, nofollow"'));
for (const file of ['dist/index.html', 'dist/es/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const description = html.match(/<meta name="description" content="([^"]+)"/)[1];
  assert.ok(description.length >= 80 && description.length <= 160, file + ' concise description');
  assert.ok(html.includes('class="privacy-note"'), file + ' analytics information');
}
console.log(`Security verification: ${cases} removed-download cases, fallback, headers, artifact privacy and 404 metadata passed.`);
