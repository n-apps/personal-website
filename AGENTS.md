# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production client build + eight prerendered content routes
pnpm type-check   # TypeScript type checking (no emit)
pnpm check:routes # Check built route entries/statuses (run after build; Node 24+)
pnpm check:theme  # Check storage failure and theme fallback behavior
```

No lint or general test runner is configured. CI runs type-check, check:theme, build, and check:routes on pull requests and main. Only main pushes or manual runs deploy.

## Architecture

**Stack:** React 19 + React Router 7 + TypeScript 7 + Vite 8 + Tailwind CSS v4 + Motion (Framer Motion port). Icons via `@remixicon/react`.

**Entry point flow:** `index.html` → `src/main.tsx` (hydrates static entries, mounts tools) → `src/app/App.tsx` → `AppShell` (strict LazyMotion, reduced-motion configuration and transition overlay) → `RouterProvider` → `Layout` + nested routes.

**Routing:** The shared tree is in `src/app/route-config.ts`; `src/app/routes.ts` creates the browser router and registers transition navigation. All pages except `HomePage` and `NotFoundPage` are loaded with `React.lazy()`; `Layout` wraps `<Outlet>` in `<Suspense fallback={<RouteLoading />}>`, so new lazy routes work without extra wiring. Case studies live under `/work/`. Sub-routes (e.g. `/work/score-counter/reviews`, `/work/white-label-esim/demo`) use their own layout outside the main `Layout`. A standalone full-bleed experience like `/missing-tracks-project` renders entirely outside `Layout` via its own `MissingTracksLayout` (shared nav + self-scoped theme `src/styles/missing-tracks-theme.css`), hosting child routes for the watchlist app (index) and an About page (`/missing-tracks-project/about`) — the pattern for pages that break the 576px shell. `Layout` auto-scrolls to top on route change.

**Static entries and metadata:** `src/lib/route-metadata.ts` defines metadata for every route. When adding a route in `route-config.ts`, add matching metadata here. Vite emits physical route HTML files, a noindex `404.html`, `robots.txt`, and `sitemap.xml`; CI checks that the router and generated entries match. `src/lib/static-routes.ts` selects eight content pages for build-time rendering via `src/entry-server.tsx`; tools/reviews remain client-rendered. Static content has finished HTML before hydration. `SectionAnimate` uses CSS for prerendered slide/fade entrances; viewport reveals activate after hydration and reduced-motion visits stay static. `scripts/build.mjs` removes temporary server artifacts; route CSS is linked before hydration. The shared route metadata hook updates the head during client navigation. Canonicals use trailing slashes to match GitHub Pages directory URLs.

**Media scheduling:** `CaseFigure` requires intrinsic `width`/`height`; `CaseVideo` also requires a poster. Shared `useViewportVideo` assigns case-study sources near the viewport, starts playback only when visible, pauses offscreen/when hidden, preserves manual pauses, and requires explicit Play for reduced motion. Case studies use `.web.mp4` delivery encodes; original MP4s remain source masters. The homepage preloads only its first project cover; later covers are lazy and experience photos load on hover. Desktop-only Missing Tracks art is mounted only at its matching breakpoint.

**Page transitions:** `src/lib/page-transition.ts` exposes `navigateWithTransition(to, preload?)` — an imperative store that drives `PageTransitionOverlay`. Use it (not `router.navigate`/`<Link>`) when a navigation should fade through the overlay; otherwise plain React Router links are fine.

**Layout shell:** `Layout` renders a single 576px-max-width CSS grid (`nav` / `main` / `footer`) centered on the page.

**Folders:**
- `src/app/` — app shell (`App.tsx`, `app-shell.tsx`, `route-config.ts`, `routes.ts`)
- `src/pages/<name>/index.tsx` — route entries. Case studies live under `/work/` and map to their own page folders. Sub-routes get their own subfolder (e.g. `pages/score-counter/reviews/`, `pages/white-label-esim/demo/`).
- `src/components/layout/` — app-wide shell (nav, footer, theme toggle)
- `src/components/ui/` — reusable primitives (dividers, animators, image fallback, masonry, page-transition overlay)
- `src/components/case-study/` — components shared across case-study pages
- `src/lib/` — generic helpers (`nbsp.ts` glues short words to the next word with non-breaking spaces; `typography.ts` exports fluid type tokens; `page-transition.ts` handles overlay transitions)
- `src/data/` — static JSON consumed by pages (e.g. `reviews.json`)
- `case-studies/` (repo root) — markdown source for case-study copy, kept separate from `src/pages/`

Pages should compose sections/features; generic UI goes in `components/ui/`. Local helpers stay colocated with their page (see `pages/white-label-esim/demo/components/` and `pages/white-label-esim/demo/ui/`).

## Styling

- Tailwind v4 via `@tailwindcss/vite` plugin — PostCSS config is intentionally empty
- CSS entry: `src/styles/index.css` imports `fonts.css` → `tailwind.css` → `theme.css` → `demo-theme.css` → `missing-tracks-theme.css`
- `theme.css` defines 40+ CSS custom properties for colors, typography, spacing, and the `card-shadow` utility. All color/spacing tokens live here.
- `demo-theme.css` (white-label eSIM demo) and `missing-tracks-theme.css` (the missing-tracks page) are separate token sets, each scoped to one surface — keep them out of `theme.css`.
- Dark mode: `.dark` class on `<html>`. Theme toggled by `ThemeToggle` component and persisted in `localStorage` under key `"theme"`. `src/lib/theme.ts` guards unavailable storage; selected themes continue to work in memory.
- Fluid typography uses `clamp()` throughout; shared tokens live in `src/lib/typography.ts`. Content is constrained to 576px max-width.

## Analytics

GoatCounter tracking is injected by `src/lib/use-analytics.tsx`, which wraps routes in `AnalyticsTracker`. Interactive elements across pages use `data-goatcounter-click="<identifier>"` attributes to track clicks.

## Path Alias

`@/*` maps to `./src/*` (configured in both `vite.config.ts` and `tsconfig.json`).

## CLAUDE.md

`CLAUDE.md` at the repo root is a near-verbatim copy of this file for Claude Code. When you change one, mirror the change in the other so the two stay in sync.

## Asset delivery, motion and hosting

`pnpm encode:images` generates hashed responsive AVIF/WebP assets and their manifest; originals remain masters. `python3 scripts/subset-fonts.py` regenerates OpenRunde subsets after new copy; Newsreader is self-hosted with its original variable axes. `ResponsiveImage` serves original assets after the image-quality rollback; generated variants are not selected. Preserve intrinsic dimensions and loading priorities.

Use `m` from `motion/react`, inside `AppShell`'s strict deferred `LazyMotion` boundary. Missing Tracks uses a CSS backdrop on mobile/reduced-motion/data-saving visits and loads its desktop shader after 800ms; native dialogs and keyboard menus preserve focus. Fiber and Three are needed by the shader. Paper Shaders already pauses its own animation loop.

`src/lib/security-policy.server.ts` generates the meta CSP from actual inline script hashes. Shared metadata owns favicon and theme-color too. Weather and its existing client key are intentionally retained. Production deploys to GitHub Pages through `.github/workflows/main.yml`.
