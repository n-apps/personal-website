import { build } from 'vite';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { staticRouteModules } from '../src/lib/static-routes.ts';

// One route tree, two builds: the server bundle runs at build time only.
// Keep it inside the project so Node resolves the project's React dependencies.
const serverDir = await mkdtemp(path.join(process.cwd(), '.prerender-'));
try {
  await build({ build: { ssrManifest: true } });
  await build({ build: { ssr: 'src/entry-server.tsx', outDir: serverDir, copyPublicDir: false } });
  const { render } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')));
  const manifest = JSON.parse(await readFile('dist/.vite/ssr-manifest.json', 'utf8'));
  for (const [route, module] of Object.entries(staticRouteModules)) {
    const entry = path.join('dist', route.slice(1), 'index.html');
    const pathname = route === '/' ? '/' : `${route}/`;
    let body = await render(pathname).catch(error => { throw new Error(`Prerender failed for ${pathname}`, { cause: error }); });
    if (!body.includes('<h1')) throw new Error(`${route}: no static heading rendered`);
    let html = await readFile(entry, 'utf8');
    // React can emit an image preload already supplied by the entry head.
    const existingPreloads = new Set([...html.matchAll(/<link[^>]*rel="preload"[^>]*>/g)]
      .map(([tag]) => tag.match(/href="([^"]+)"/)?.[1]));
    body = body.replace(/<link[^>]*rel="preload"[^>]*>/g, tag =>
      existingPreloads.has(tag.match(/href="([^"]+)"/)?.[1]) ? '' : tag);

    const styles = (manifest[module] ?? []).filter(asset => asset.endsWith('.css'));
    for (const href of styles) {
      if (!html.includes(`href="${href}"`)) html = html.replace('</head>', `<link rel="stylesheet" href="${href}" />\n</head>`);
    }
    await writeFile(entry, html.replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${body}</div>`));
  }
  await rm('dist/.vite/ssr-manifest.json');
  console.log(`Prerendered ${Object.keys(staticRouteModules).length} content pages. Interactive tools remain client-rendered.`);
} finally {
  await rm(serverDir, { recursive: true, force: true });
}
