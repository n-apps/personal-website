import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { scoreCounterHead, scoreCounterPrivacyHead } from './src/lib/score-counter-metadata'

export default defineConfig({
  base: '/',
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    {
      name: 'score-counter-static-entry',
      enforce: 'post',
      generateBundle(_, bundle) {
        const entry = bundle['index.html'];
        if (entry?.type !== 'asset') throw new Error('Missing index.html');
        // GitHub Pages serves this file directly, including metadata for link bots.
        this.emitFile({ type: 'asset', fileName: 'score-counter/index.html', source: scoreCounterHead(String(entry.source)) });
        this.emitFile({ type: 'asset', fileName: 'score-counter/privacy/index.html', source: scoreCounterPrivacyHead(String(entry.source)) });
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
})
