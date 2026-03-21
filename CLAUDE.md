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

**Pages/Components:** All page components live flat in `src/app/components/`. No subdirectory per page — case study pages (`score-counter-page.tsx`, `design-system-page.tsx`) are large single-file components.

**UI primitives:** `src/app/components/ui/` contains ~50 Radix UI-based headless component wrappers. Use `cn()` from `src/app/components/ui/utils.ts` (clsx + tailwind-merge) for composing class names.

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
