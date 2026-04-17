# White-label eSIM demo — integration design

**Date:** 2026-04-17
**Status:** Approved
**Goal:** Port the standalone Next.js demo at `docs/white-label-esim-page-demo/` into the Vite portfolio as a fullscreen, light-themed mini-app, reachable from a CTA button on the white-label eSIM case study page.

## Context

The case study `src/app/components/white-label-esim-page.tsx` currently has an `ImagePlaceholder` in Section 5 labeled "Live demo embed — interactive prototype (to be added)" (around line 381). The working prototype referenced in the case study lives in the `docs/` directory as a separate Next.js 14 project. The goal is to bring the prototype into the portfolio so visitors can interact with it directly.

The demo is a two-screen flow:

1. **Company settings** — empty brands list + "Add new brand" CTA
2. **Customize eSIM** — form on the left (brand details / brand styling tabs) + live iPhone preview on the right that re-renders as the operator edits

State is all client-side, in memory (no persistence). Contrast between operator-chosen brand color and preview text is computed via a WCAG relative-luminance helper.

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| How the demo opens | New route, fullscreen (no portfolio Layout) | Demo has its own chrome (navbar + max-width container); wrapping it in the portfolio Layout would double the navigation and clash visually. |
| Scope of the demo | Both screens (full flow) | Mirrors the real B2B experience; the empty state → "Add new brand" transition is part of the story. |
| Theming | Light-only, independent of site theme | Matches what real Yesim B2B users see; avoids translating every token to the site's dark mode. |
| File organization | Subdirectory `src/app/components/white-label-esim-demo/` (CLAUDE.md exception) | Demo is a self-contained mini-app, not a page. 7+ files with internal imports would pollute the flat components directory. |
| CTA placement | Replace the Section 5 placeholder only | Already earmarked for the demo; keeps page chrome minimal. |

## Architecture

### Routing

`src/app/routes.ts` gets a new top-level route sibling to `/` and `/work/score-counter/reviews`:

```ts
{
  path: "/work/white-label-esim/demo",
  Component: WhiteLabelDemoLayout,
  children: [
    { index: true, Component: CompanySettingsDemoPage },      // empty brands list
    { path: "customize", Component: CustomizeEsimDemoPage },  // form + live preview
  ],
}
```

Both demo pages are lazy-loaded, matching the pattern of the other `/work/*` routes.

Intra-demo links:
- "Add new brand" (on Company Settings screen) → `/work/white-label-esim/demo/customize`
- "Company settings" back link (on Customize screen) → `/work/white-label-esim/demo`
- "Back to case study" link on both screens → `/work/white-label-esim`

### File layout

```
src/app/components/white-label-esim-demo/
  demo-layout.tsx                      Outlet wrapper + scoped CSS import + "white-label-demo" container class
  demo-styles.css                      @theme block for demo tokens + font @import + .color-picker-bare
  company-settings-demo-page.tsx       Ported from company-settings-page.tsx
  empty-brands-illustration.tsx        Ported 1:1
  customize-esim-demo-page.tsx         Ported from customize-esim-page.tsx
  brand-settings-form.tsx              Ported (uses react-colorful HexColorPicker)
  phone-preview.tsx                    Ported 1:1 after import/link adaptations
  yesim-wordmark.tsx                   Ported 1:1
  demo-navbar.tsx                      Ported from navbar.tsx (renamed to avoid collision)
  ui/
    checkbox.tsx
    segmented-control.tsx
    toggle-switch.tsx
```

### Per-file adaptations

Applied to every ported file:

1. Remove `"use client"` directive — Vite is client-rendered; directive is a no-op and linter noise.
2. Replace `import Link from "next/link"` with `import { Link } from "react-router"`.
3. Rename the `href` prop on `Link` to `to`.
4. Rewrite `@/components/customize-esim/*` imports to point at the new location (`./` or `@/app/components/white-label-esim-demo/*`).
5. Update hard-coded Next.js route paths:
   - `/` (inside the demo) → `/work/white-label-esim/demo` (Company Settings)
   - `/customize-esim` → `/work/white-label-esim/demo/customize`
6. Add `data-goatcounter-click` attributes on demo-external links only (entry button, "Back to case study") — keep internal demo clicks untracked to avoid noise.
7. In `demo-navbar.tsx`, the ported `href="#"` dummy nav links and "Go to dashboard" button stay as `to="#"` — these are decorative, matching the original prototype (the real product's nav is out of scope).

### Styling strategy

The demo depends on Tailwind 3 tokens (`ink-900/800/600/500`, `surface-page/muted/field`, `line`, `shadow-phone`, `shadow-card`, `font-display`, `font-sans`) that don't exist in the portfolio's Tailwind 4 setup.

**Approach:** Create `demo-styles.css` containing:

1. A Tailwind 4 `@theme` block that re-declares these tokens (they are unique-named and won't collide with site tokens like `--foreground`, `--card`, `--background`).
2. The `.color-picker-bare` selector block (copied verbatim from the demo's `globals.css`).
3. The Google Fonts `@import url(...)` line for Inter + Google Sans.

`demo-styles.css` is imported once inside `demo-layout.tsx`. Because Vite bundles CSS imports globally, the utility classes become available everywhere, but in practice only demo components use them.

Demo content is rendered inside a top-level `<div className="white-label-demo">` to provide a clear DOM marker (useful for future scoping if needed).

**Scope containment:** The demo is a fullscreen route with no site Layout present, so there is no visual bleed in either direction. Site dark mode toggle does not affect the demo since it uses its own palette via explicit Tailwind classes.

### Dependency additions

`package.json` gains one dependency:

- `react-colorful` (~2.8 KB gzipped) — provides `HexColorPicker` used in `brand-settings-form.tsx`. Cannot be replaced with the native `<input type="color">` without losing the designed saturation/hue picker UX that is a visual feature of the prototype.

No other dependencies required. All other demo imports (`react`, `react-dom`, Tailwind) are already present.

### CTA on the case study page

In `src/app/components/white-label-esim-page.tsx`, replace this block (around lines 380–384):

```tsx
<SectionAnimate delay={0.24}>
  <div className="-mx-4 sm:mx-0">
    <ImagePlaceholder label="Live demo embed — interactive prototype (to be added)" />
  </div>
</SectionAnimate>
```

with a button-styled `<Link to="/work/white-label-esim/demo">` that:

- Uses the site's existing design tokens (`bg-card`, `card-shadow`, foreground colors) so it feels native to the case study.
- Carries `data-goatcounter-click="launch-white-label-demo"` for analytics consistency.
- Includes a short label like "Launch the prototype" + an arrow icon from `lucide-react` (already a project dependency).

## Data flow

No changes to the demo's internal state model.

- `BrandSettings` lives in `useState` on `CustomizeEsimDemoPage`.
- The parent passes `settings` and a generic `update<K>(key, value)` setter to `BrandDetailsCard`, `BrandStylingCard`, and `PhonePreview`.
- `phone-preview.tsx` recomputes readable foreground color from `settings.brandColor` on every render via the WCAG relative-luminance helper.
- `beforeunload` dirty-state listener remains scoped to the customize page and only fires while the user is on that route.

## Error handling

The prototype has minimal error handling by design. Port as-is:

- File uploads fall back silently if `FileReader` fails.
- URL / email validation surfaces inline in the form; no toast or alert system.
- "Save changes" is a visual confirmation only (no network call).

Do not add new error handling during the port.

## Verification

No automated tests exist in the portfolio (`CLAUDE.md`: "No lint or test scripts are configured"). Manual checks after implementation:

1. `pnpm type-check` passes with no new errors.
2. `pnpm dev` — load the portfolio, navigate to `/work/white-label-esim`, click the new CTA.
3. Company Settings demo screen renders with the Yesim navbar, empty state illustration, and "Add new brand" button.
4. Clicking "Add new brand" navigates to the Customize screen.
5. On the Customize screen:
   - Brand details tab: fields accept input, dirty-state detection enables Save/Reset.
   - Brand styling tab: logo upload shows in preview, color picker changes both background and text-contrast color, banner upload renders, toggles hide/reveal contact card and promotion badge.
6. "Company settings" back-link returns to the Company Settings demo screen.
7. "Back to case study" links return to `/work/white-label-esim`.
8. Fullscreen demo has no portfolio nav/footer visible.
9. `pnpm build` produces a working production bundle.

## Scope guardrails

**Do:**
- Port files mechanically with the minimum adaptations listed above.
- Add the single `react-colorful` dependency.
- Add the CTA to the case study page.

**Do not:**
- Refactor demo internals, extract hooks, or rename variables beyond what is required for imports/routing.
- Add dark-mode support to the demo.
- Add tests or lint configuration.
- Modify any other portfolio page or route.
- Move other demo projects under `docs/` (out of scope).

## Open questions

None — all decisions captured above.
