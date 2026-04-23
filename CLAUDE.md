# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm type-check   # TypeScript type checking (no emit)
```

No lint or test scripts are configured.

## Architecture

**Stack:** React 18 + React Router 7 + TypeScript + Vite + Tailwind CSS v4 + Motion (Framer Motion port)

**Entry point flow:** `index.html` → `src/main.tsx` → `src/app/App.tsx` (GoatCounter analytics injected here) → `RouterProvider` → `Layout` + nested routes

**Routing:** Centralized in `src/app/routes.ts`. All routes share a single `Layout` wrapper (nav + footer + outlet). Case studies live under `/work/`. Layout auto-scrolls to top on route change.

**Layout:**
- `src/app/` — app shell (`App.tsx`, `routes.ts`)
- `src/pages/<name>/index.tsx` — route entries. Case studies live under `/work/` and map to their own page folders. Sub-routes get their own subfolder (e.g. `pages/score-counter/reviews/`, `pages/white-label-esim/demo/`).
- `src/components/layout/` — app-wide shell (nav, footer, theme toggle)
- `src/components/ui/` — reusable primitives (dividers, animators, image fallback, masonry)
- `src/components/case-study/` — components shared across case-study pages
- `src/lib/` — generic helpers (`nbsp.ts`, `typography.ts`)

Pages should compose sections/features; generic UI goes in `components/ui/`. Local helpers stay colocated with their page (see `pages/white-label-esim/demo/components/` and `pages/white-label-esim/demo/ui/`).

## Styling

- Tailwind v4 via `@tailwindcss/vite` plugin — PostCSS config is intentionally empty
- CSS entry: `src/styles/index.css` imports `fonts.css` → `tailwind.css` → `theme.css`
- `theme.css` defines 40+ CSS custom properties for colors, typography, spacing, and the `card-shadow` utility. All color/spacing tokens live here.
- Dark mode: `.dark` class on `<html>`. Theme toggled by `ThemeToggle` component and persisted in `localStorage` under key `"theme"`.
- Fluid typography uses `clamp()` throughout; content is constrained to ~700px max-width.

## Analytics

GoatCounter tracking is injected in `App.tsx`. Interactive elements across pages use `data-goatcounter-click="<identifier>"` attributes to track clicks.

## Path Alias

`@/*` maps to `./src/*` (configured in both `vite.config.ts` and `tsconfig.json`).
