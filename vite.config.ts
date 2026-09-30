import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { notFoundMetadata, routeHead, routeMetadata } from './src/lib/route-metadata'
import responsiveImages from './src/data/responsive-images.json'
import fontAssets from './src/data/font-assets.json'
import { withContentSecurityPolicy } from './src/lib/security-policy.server'

export default defineConfig(({ isSsrBuild }) => ({
  base: '/',
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    {
      name: 'static-route-entries',
      enforce: 'post',
      generateBundle(_, bundle) {
        if (isSsrBuild) return;
        const entry = bundle['index.html'];
        if (entry?.type !== 'asset') throw new Error('Missing index.html');
        const template = withContentSecurityPolicy(String(entry.source));
        // Actual files give known deep links a 200 response on GitHub Pages.
        for (const [route, metadata] of Object.entries(routeMetadata)) {
          let source = routeHead(template, metadata);
          if (route !== '/score-counter' && !route.startsWith('/missing-tracks-project') && !route.startsWith('/work/white-label-esim/demo')) {
            source = source.replace('</head>', `<link rel="preload" href="${fontAssets.Regular}" as="font" type="font/woff2" crossorigin />\n</head>`);
          }
          // The homepage's first visible cover must be discoverable before React executes.
          const cover = responsiveImages['/images/design-system-cover.png'].avif;
          const srcset = cover.map(({src, width}) => `${src} ${width}w`).join(', ');
          const entryHtml = route === '/' ? source.replace('</head>',
            `<link rel="preload" as="image" type="image/avif" href="${cover[0].src}" imagesrcset="${srcset}" imagesizes="(min-width: 608px) 576px, calc(100vw - 32px)" fetchpriority="high" />\n</head>`) : source;
          if (route === '/') entry.source = entryHtml;
          else this.emitFile({ type: 'asset', fileName: `${route.slice(1)}/index.html`, source: entryHtml });
        }
        this.emitFile({ type: 'asset', fileName: '404.html', source: routeHead(template, notFoundMetadata, true) });
        this.emitFile({ type: 'asset', fileName: 'robots.txt', source: 'User-agent: *\nAllow: /\nSitemap: https://romamakes.com/sitemap.xml\n' });
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source:
          '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
          + Object.values(routeMetadata).map(({ url }) => `  <url><loc>${url}</loc></url>`).join('\n')
          + '\n</urlset>\n' });
      },
    },
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
}))
