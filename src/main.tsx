import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import './styles/index.css';
import { prefersDarkTheme } from './lib/theme';

const preloadReloadKey = 'vite-preload-error-reload';
const preloadReloadCooldown = 60_000;

window.addEventListener('vite:preloadError', (event) => {
  try {
    const previousReload = Number(
      sessionStorage.getItem(preloadReloadKey) ?? 0,
    );
    if (Date.now() - previousReload < preloadReloadCooldown) return;

    sessionStorage.setItem(preloadReloadKey, String(Date.now()));
  } catch {
    // Avoid a reload loop when storage is unavailable. The route error
    // boundary will provide a manual recovery action instead.
    return;
  }

  event.preventDefault();
  window.location.reload();
});

const egg = String.raw`
╭────────────────────────────────────────╮
│  romamakes.com                         │
│                                        │
│  Привіт, curious inspector 👀          │
│                                        │
│  Thanks for checking under the hood.   │
╰────────────────────────────────────────╯
`;

const isDarkTheme = prefersDarkTheme();

console.log(
  `%c${egg}`,
  `font-family: ui-monospace, SFMono-Regular, Menlo, monospace; color: ${isDarkTheme ? '#F55817' : '#0a0a0a'}; font-size: 12px; line-height: 1.35; font-weight: 500;`,
);

createRoot(document.getElementById('root')!).render(<App />);
