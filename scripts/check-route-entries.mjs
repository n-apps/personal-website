import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { stripTypeScriptTypes } from 'node:module';
import { runInNewContext } from 'node:vm';
import { routeMetadata } from '../src/lib/route-metadata.ts';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.resolve(root, process.argv[2] ?? 'dist');
const routerSource = stripTypeScriptTypes(await readFile(path.join(root, 'src/app/routes.ts'), 'utf8'));
const actualRoutes = new Set();
const bindings = {};
// Capture the real route configuration without importing React components or starting a browser router.
// Browser-only imports are stubbed; lazy component factories never execute.
const executable = routerSource.replace(/^import\s+([\s\S]*?)\s+from\s+["'][^"']+["'];?\s*$/gm, (_, imports) => {
  for (const name of imports.replace(/[{}]/g, '').split(',')) {
    bindings[name.trim().split(/\s+as\s+/).at(-1)] = () => null;
  }
  return '';
}).replace(/^export\s+/gm, '');
bindings.lazy = () => null;
bindings.createBrowserRouter = (routes) => routes;
const routes = runInNewContext(`${executable}\nrouter;`, bindings, { timeout: 1000 });

function collectRoutes(array, parent = '') {
  assert(Array.isArray(array), 'Router children must be route arrays');
  for (const route of array) {
    const segment = route.path ?? '';
    if (segment === '*') continue;
    const full = segment.startsWith('/') ? segment : `${parent}/${segment}`;
    const normalized = full.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
    const children = route.children;
    if (children) collectRoutes(children, normalized);
    else actualRoutes.add(normalized);
  }
}

collectRoutes(routes);
assert(actualRoutes.size > 0, 'No router routes found');
assert.deepEqual([...actualRoutes].sort(), Object.keys(routeMetadata).sort(),
  'Router paths and static entry metadata differ; update route-metadata.ts with every route change');

const notFoundHtml = await readFile(path.join(dist, '404.html'), 'utf8');
assert.match(notFoundHtml, /<meta name="robots" content="noindex"/);
assert.doesNotMatch(notFoundHtml, /rel="canonical"/);

// A filesystem server models Pages' directory entries and genuine 404 fallback.
// Vite preview's SPA fallback would hide missing entry files, so do not use it here.
const server = createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    let filename = path.resolve(dist, `.${pathname}`);
    if (filename !== dist && !filename.startsWith(`${dist}${path.sep}`)) throw new Error('Invalid path');
    const info = await stat(filename);
    if (info.isDirectory()) {
      if (!pathname.endsWith('/')) {
        response.writeHead(301, { Location: `${pathname}/` });
        response.end();
        return;
      }
      filename = path.join(filename, 'index.html');
    }
    const body = await readFile(filename);
    response.writeHead(200, { 'Content-Type': filename.endsWith('.html') ? 'text/html; charset=utf-8' : 'application/octet-stream' });
    response.end(body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(notFoundHtml);
  }
});
await new Promise((resolve, reject) => {
  server.once('error', reject);
  server.listen(0, '127.0.0.1', resolve);
});
const base = `http://127.0.0.1:${server.address().port}`;

try {
  for (const [route, metadata] of Object.entries(routeMetadata)) {
    const canonicalPath = new URL(metadata.url).pathname;
    const response = await fetch(`${base}${canonicalPath}`);
    assert.equal(response.status, 200, `${route}: known entry must return 200`);
    const html = await response.text();
    assert(html.includes(`<title>${metadata.title}</title>`), `${route}: incorrect title`);
    assert(html.includes(`<link rel="canonical" href="${metadata.url}"`), `${route}: incorrect canonical`);
    assert.equal((html.match(/<title>/g) ?? []).length, 1, `${route}: duplicate title`);
    assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1, `${route}: duplicate canonical`);
    assert.doesNotMatch(html, /name="robots" content="noindex"/);
    assert.equal((html.match(/rel="preload" as="image"/g) ?? []).length, route === '/' ? 1 : 0,
      `${route}: homepage image hint must not leak to unrelated entries`);
    for (const key of ['description', 'og:title', 'og:description', 'og:url', 'og:image', 'twitter:title', 'twitter:description', 'twitter:url', 'twitter:image']) {
      assert.equal((html.match(new RegExp(`(?:name|property)="${key}"`, 'g')) ?? []).length, 1,
        `${route}: missing or duplicate ${key}`);
    }
    for (const match of html.matchAll(/(?:src|href)="(\/(?:assets|images)\/[^"?]+)"/g)) {
      assert.equal((await fetch(`${base}${match[1]}`)).status, 200, `${route}: missing entry asset ${match[1]}`);
    }
    assert.equal((await fetch(`${base}${new URL(metadata.image).pathname}`)).status, 200,
      `${route}: missing social image`);
    if (route !== '/') {
      const redirect = await fetch(`${base}${route}`, { redirect: 'manual' });
      assert.equal(redirect.status, 301, `${route}: directory redirect missing`);
      assert.equal(redirect.headers.get('location'), canonicalPath);
    }
  }
  const missing = await fetch(`${base}/__route-check-missing__/`);
  assert.equal(missing.status, 404, 'Unknown paths must retain 404 status');
  assert.match(await missing.text(), /name="robots" content="noindex"/);
  const sitemap = await fetch(`${base}/sitemap.xml`);
  assert.equal(sitemap.status, 200);
  const xml = await sitemap.text();
  assert.equal((xml.match(/<loc>/g) ?? []).length, actualRoutes.size);
  for (const { url } of Object.values(routeMetadata)) assert(xml.includes(`<loc>${url}</loc>`));
  const robots = await fetch(`${base}/robots.txt`);
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Sitemap: https:\/\/romamakes\.com\/sitemap\.xml/);
  console.log(`Verified ${actualRoutes.size} routes: 200 entries, metadata, assets, slash redirects, sitemap, robots and genuine 404 fallback.`);
} finally {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
}
