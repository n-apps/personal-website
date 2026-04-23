# White-label eSIM Demo Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the standalone Next.js prototype at `docs/white-label-esim-page-demo/` into the Vite portfolio as a fullscreen, light-themed mini-app reachable from the white-label eSIM case study page via a CTA button.

**Architecture:** Demo becomes a sibling route tree to the main `/` Layout (same pattern as `/work/score-counter/reviews` → `ReviewsLayout`), so the demo renders without the portfolio's nav/footer. Demo files live in a dedicated subdirectory `src/app/components/white-label-esim-demo/`. Tailwind 3 tokens the demo relies on (`ink-*`, `surface-*`, `line`, `shadow-phone`, `font-display`) are re-declared via a Tailwind 4 `@theme` block in a scoped CSS file imported by the demo layout. Each demo file is ported mechanically (strip `"use client"`, rewrite `next/link` → `react-router`, update internal route paths).

**Tech Stack:** React 18, React Router 7, Vite, Tailwind CSS 4, TypeScript, `react-colorful` (new dep), `lucide-react` (already present).

**Reference spec:** `docs/superpowers/specs/2026-04-17-white-label-esim-demo-integration-design.md`

---

## File inventory

**Created under `src/app/components/white-label-esim-demo/`:**
- `demo-layout.tsx` — Outlet wrapper that imports scoped CSS
- `demo-styles.css` — `@theme` block + font `@import` + `.color-picker-bare` selector
- `demo-navbar.tsx` — dark navbar (ported from `navbar.tsx`, renamed)
- `yesim-wordmark.tsx` — SVG wordmark (ported verbatim minus `"use client"`)
- `empty-brands-illustration.tsx` — SVG illustration (ported verbatim)
- `company-settings-demo-page.tsx` — empty-state landing screen
- `customize-esim-demo-page.tsx` — interactive form + live phone preview container
- `brand-settings-form.tsx` — form sections (Brand details + Brand styling)
- `phone-preview.tsx` — live iPhone preview
- `ui/checkbox.tsx`
- `ui/segmented-control.tsx`
- `ui/toggle-switch.tsx`

**Modified:**
- `package.json` — add `react-colorful` dep
- `src/app/routes.ts` — add demo routes
- `src/app/components/white-label-esim-page.tsx` — replace Section 5 placeholder with CTA button

---

## Testing strategy

The portfolio has **no automated tests or linter** configured (per `CLAUDE.md`). Each task ends with:

1. `pnpm type-check` must pass with no new errors introduced by that task.
2. A manual smoke check where the task produces visible output (run `pnpm dev`, navigate to the relevant URL, verify rendering).
3. A single `git commit` per task.

Do not add tests. Do not add lint rules. Do not refactor code outside the scope of each task.

---

## Task 1: Install dependency, create scaffold directory and scoped CSS

**Files:**
- Modify: `package.json` (dependency addition)
- Create: `src/app/components/white-label-esim-demo/` (directory)
- Create: `src/app/components/white-label-esim-demo/demo-styles.css`
- Create: `src/app/components/white-label-esim-demo/demo-layout.tsx`

- [ ] **Step 1: Add `react-colorful` to package.json**

Run: `pnpm add react-colorful@^5.6.1`

Expected: `pnpm-lock.yaml` and `package.json` updated. `package.json` `dependencies` now includes `"react-colorful": "^5.6.1"`.

- [ ] **Step 2: Create the subdirectory**

Run: `mkdir -p src/app/components/white-label-esim-demo/ui`

- [ ] **Step 3: Create `demo-styles.css`**

Create file `src/app/components/white-label-esim-demo/demo-styles.css` with this exact content:

```css
/* Scoped styles for the white-label eSIM demo.
 * Imported only by demo-layout.tsx. Re-declares Tailwind 3 tokens the demo
 * relies on as a Tailwind 4 @theme block. Names are unique and do not
 * collide with portfolio tokens.
 */

@import url("https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap");

@theme {
  --color-ink-900: #101828;
  --color-ink-800: #1e2939;
  --color-ink-600: #4a5565;
  --color-ink-500: #6a7282;

  --color-surface-page: #ffffff;
  --color-surface-muted: #f9f9f9;
  --color-surface-field: #f3f4f6;

  --color-line: #e5e7eb;

  --font-display: "Google Sans", "Inter", ui-sans-serif, system-ui, sans-serif;

  --shadow-phone: 0 8px 24px rgba(0, 0, 0, 0.15);
  --shadow-card: 0 1px 2px rgba(16, 24, 40, 0.04);
}

/* Hide native color input chrome but keep it interactive.
 * Ported verbatim from the prototype's globals.css. */
input[type="color"].color-picker-bare {
  -webkit-appearance: none;
  appearance: none;
  border: none;
  padding: 0;
  background: transparent;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
input[type="color"].color-picker-bare::-webkit-color-swatch-wrapper {
  padding: 0;
}
input[type="color"].color-picker-bare::-webkit-color-swatch {
  border: none;
  border-radius: 6px;
}
input[type="color"].color-picker-bare::-moz-color-swatch {
  border: none;
  border-radius: 6px;
}
```

- [ ] **Step 4: Create `demo-layout.tsx`**

Create file `src/app/components/white-label-esim-demo/demo-layout.tsx` with this exact content:

```tsx
import { Outlet } from "react-router";
import "./demo-styles.css";

export function WhiteLabelDemoLayout() {
  return (
    <div className="white-label-demo min-h-screen bg-surface-page text-ink-900">
      <Outlet />
    </div>
  );
}
```

- [ ] **Step 5: Run type-check**

Run: `pnpm type-check`
Expected: PASS (no new errors — the new file exports a component that is not yet routed, which is fine).

- [ ] **Step 6: Commit**

```bash
git add package.json pnpm-lock.yaml src/app/components/white-label-esim-demo/
git commit -m "feat(white-label-demo): scaffold demo directory, scoped styles, layout"
```

---

## Task 2: Port the three UI primitives

**Files:**
- Create: `src/app/components/white-label-esim-demo/ui/checkbox.tsx`
- Create: `src/app/components/white-label-esim-demo/ui/segmented-control.tsx`
- Create: `src/app/components/white-label-esim-demo/ui/toggle-switch.tsx`

These files are leaf components with no internal cross-imports. Port verbatim, dropping `"use client"`.

- [ ] **Step 1: Create `ui/checkbox.tsx`**

Create file `src/app/components/white-label-esim-demo/ui/checkbox.tsx` with this exact content:

```tsx
type Props = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  id?: string;
};

export function Checkbox({ checked, onChange, label, id }: Props) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-2 text-sm text-ink-900"
    >
      <span className="relative inline-flex h-4 w-4 items-center justify-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer absolute inset-0 h-4 w-4 cursor-pointer appearance-none rounded-[4px] border border-line bg-white checked:border-[#0088ff] checked:bg-[#0088ff]"
        />
        <svg
          viewBox="0 0 16 16"
          className="pointer-events-none relative h-3 w-3 stroke-white opacity-0 peer-checked:opacity-100"
          fill="none"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 8.5 6.5 12 13 4.5" />
        </svg>
      </span>
      <span>{label}</span>
    </label>
  );
}
```

- [ ] **Step 2: Create `ui/segmented-control.tsx`**

Create file `src/app/components/white-label-esim-demo/ui/segmented-control.tsx` with this exact content:

```tsx
type Option<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: Props<T>) {
  return (
    <div role="tablist" className="inline-flex rounded-[10px] bg-surface-field p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          role="tab"
          aria-selected={opt.value === value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={[
            "rounded-lg px-5 py-2 text-sm font-medium transition-all",
            opt.value === value
              ? "bg-white text-ink-900 shadow-sm"
              : "text-ink-500 hover:text-ink-900",
          ].join(" ")}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create `ui/toggle-switch.tsx`**

Create file `src/app/components/white-label-esim-demo/ui/toggle-switch.tsx` with this exact content:

```tsx
type Props = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
};

export function ToggleSwitch({ checked, onChange, label }: Props) {
  return (
    <label
      className={[
        "relative inline-block h-5 w-10 shrink-0 cursor-pointer rounded-full transition-colors duration-200",
        checked ? "bg-[#0066ff]" : "bg-ink-500/30",
      ].join(" ")}
    >
      <input
        type="checkbox"
        role="switch"
        aria-label={label}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className={[
          "absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white shadow-sm ring-1 transition-all duration-200 peer-focus-visible:ring-2",
          checked
            ? "left-[18px] ring-[#0066ff]"
            : "left-[-2px] ring-ink-500/40",
        ].join(" ")}
      />
    </label>
  );
}
```

- [ ] **Step 4: Run type-check**

Run: `pnpm type-check`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/white-label-esim-demo/ui/
git commit -m "feat(white-label-demo): port ui primitives (checkbox, segmented-control, toggle-switch)"
```

---

## Task 3: Port `yesim-wordmark.tsx`

**Files:**
- Source: `docs/white-label-esim-page-demo/src/components/customize-esim/yesim-wordmark.tsx`
- Create: `src/app/components/white-label-esim-demo/yesim-wordmark.tsx`

This file has no imports and no cross-references. Copy the source file, remove line 1 (`"use client";`) and the blank line 2.

- [ ] **Step 1: Copy the source file**

Run:
```bash
cp docs/white-label-esim-page-demo/src/components/customize-esim/yesim-wordmark.tsx \
   src/app/components/white-label-esim-demo/yesim-wordmark.tsx
```

- [ ] **Step 2: Remove `"use client"` directive**

Edit `src/app/components/white-label-esim-demo/yesim-wordmark.tsx`.

Remove these two lines from the top of the file:

```tsx
"use client";

```

The first line of the file should become:
```tsx
export function YesimWordmark({ className = "" }: { className?: string }) {
```

- [ ] **Step 3: Run type-check**

Run: `pnpm type-check`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/app/components/white-label-esim-demo/yesim-wordmark.tsx
git commit -m "feat(white-label-demo): port yesim-wordmark"
```

---

## Task 4: Port `demo-navbar.tsx`

**Files:**
- Source: `docs/white-label-esim-page-demo/src/components/navbar.tsx`
- Create: `src/app/components/white-label-esim-demo/demo-navbar.tsx`

The source uses `next/link` and imports `YesimWordmark` from `@/components/customize-esim/yesim-wordmark`. Both need rewriting. The nav items and "Go to dashboard" button are decorative dummy links (`href="#"`) and stay as dead links.

- [ ] **Step 1: Create `demo-navbar.tsx` with the final content**

Create file `src/app/components/white-label-esim-demo/demo-navbar.tsx` with this exact content:

```tsx
import { Link } from "react-router";
import { YesimWordmark } from "./yesim-wordmark";

const NAV_ITEMS = ["eSIMs", "Orders", "Users", "API", "Reports"] as const;

export function DemoNavbar() {
  return (
    <header className="flex items-center justify-between rounded-2xl bg-ink-900 px-6 py-3">
      <YesimWordmark className="cursor-pointer text-white" />

      <nav className="hidden items-center gap-1 md:flex">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item}
            to="#"
            className="rounded-lg px-4 py-2 text-[14px] font-medium text-white/70 transition hover:text-white"
          >
            {item}
          </Link>
        ))}
      </nav>

      <Link
        to="#"
        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-[14px] font-semibold text-ink-900 transition hover:bg-white/90"
      >
        Go to dashboard
        <svg
          viewBox="0 0 16 16"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3.5 8h9M8.5 3.5 13 8l-4.5 4.5" />
        </svg>
      </Link>
    </header>
  );
}
```

- [ ] **Step 2: Run type-check**

Run: `pnpm type-check`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/app/components/white-label-esim-demo/demo-navbar.tsx
git commit -m "feat(white-label-demo): port navbar as DemoNavbar"
```

---

## Task 5: Port `empty-brands-illustration.tsx`

**Files:**
- Source: `docs/white-label-esim-page-demo/src/components/company-settings/empty-brands-illustration.tsx`
- Create: `src/app/components/white-label-esim-demo/empty-brands-illustration.tsx`

Pure SVG component, no imports. Copy verbatim (the source has no `"use client"` directive).

- [ ] **Step 1: Copy the source file**

Run:
```bash
cp docs/white-label-esim-page-demo/src/components/company-settings/empty-brands-illustration.tsx \
   src/app/components/white-label-esim-demo/empty-brands-illustration.tsx
```

- [ ] **Step 2: Run type-check**

Run: `pnpm type-check`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/app/components/white-label-esim-demo/empty-brands-illustration.tsx
git commit -m "feat(white-label-demo): port empty-brands illustration"
```

---

## Task 6: Port `company-settings-demo-page.tsx` and wire first demo route

**Files:**
- Source: `docs/white-label-esim-page-demo/src/components/company-settings/company-settings-page.tsx`
- Create: `src/app/components/white-label-esim-demo/company-settings-demo-page.tsx`
- Modify: `src/app/routes.ts`

The source uses `next/link`, imports `Navbar` (our renamed `DemoNavbar`), and links to `/customize-esim`. It also does not have a "back to case study" link — we add one.

- [ ] **Step 1: Create `company-settings-demo-page.tsx` with the final content**

Create file `src/app/components/white-label-esim-demo/company-settings-demo-page.tsx` with this exact content:

```tsx
import { Link } from "react-router";
import { DemoNavbar } from "./demo-navbar";
import { EmptyBrandsIllustration } from "./empty-brands-illustration";

export function CompanySettingsDemoPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-12">
        {/* Back to case study */}
        <Link
          to="/work/white-label-esim"
          data-goatcounter-click="white-label-demo-back-to-case-study"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-600 transition hover:text-ink-900"
        >
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 12.5 5.5 8 10 3.5" />
          </svg>
          Back to case study
        </Link>

        {/* Header */}
        <div className="mt-6">
          <DemoNavbar />
        </div>

        {/* Title row + primary action */}
        <section className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="font-display text-[36px] font-semibold leading-[1.15] tracking-tight text-ink-900">
            Company settings
          </h1>
          <Link
            to="/work/white-label-esim/demo/customize"
            className="inline-flex h-11 items-center gap-2 self-start rounded-lg bg-ink-900 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-ink-800 active:scale-[0.99] sm:self-auto"
          >
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
            >
              <path d="M8 3.5v9M3.5 8h9" />
            </svg>
            Add new brand
          </Link>
        </section>

        {/* Brands table */}
        <section className="mt-8 overflow-hidden rounded-2xl bg-surface-muted">
          {/* Table header */}
          <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)_minmax(0,1.6fr)_120px] gap-4 border-b border-line px-7 py-3.5 sm:px-8">
            <span className="text-[12px] font-medium uppercase tracking-wide text-ink-500">
              Brand
            </span>
            <span className="text-[12px] font-medium uppercase tracking-wide text-ink-500">
              Brand alias
            </span>
            <span className="text-[12px] font-medium uppercase tracking-wide text-ink-500">
              Default
            </span>
            <span className="text-right text-[12px] font-medium uppercase tracking-wide text-ink-500">
              Actions
            </span>
          </div>

          {/* Empty state */}
          <div className="flex flex-col items-center justify-center px-7 py-20 text-center sm:px-8">
            <EmptyBrandsIllustration className="h-32 w-32" />
            <p className="mt-6 max-w-sm text-[15px] leading-6 text-ink-600">
              <span className="font-medium text-ink-900">
                No brand setting yet.
              </span>{" "}
              You can add and manage your brand settings here.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Add demo routes to `src/app/routes.ts`**

Modify `src/app/routes.ts`. After the `WorkInProgress` lazy import (around line 22-23), add these lazy imports:

```ts
const WhiteLabelDemoLayout = lazy(() =>
  import("./components/white-label-esim-demo/demo-layout").then((m) => ({ default: m.WhiteLabelDemoLayout }))
);
const CompanySettingsDemoPage = lazy(() =>
  import("./components/white-label-esim-demo/company-settings-demo-page").then((m) => ({ default: m.CompanySettingsDemoPage }))
);
```

Then, inside `createBrowserRouter([...])`, after the object for `/work/score-counter/reviews`, add a new route object:

```ts
{
  path: "/work/white-label-esim/demo",
  Component: WhiteLabelDemoLayout,
  children: [
    { index: true, Component: CompanySettingsDemoPage },
    // customize child route added in a later task
  ],
},
```

After the edit, `src/app/routes.ts` should look like this in full:

```ts
import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import { Layout } from "./components/layout";
import { ReviewsLayout } from "./components/reviews-layout";
import { HomePage } from "./components/home-page";
import { NotFoundPage } from "./components/not-found-page";

// These pages are only loaded when the user navigates to them
const ScoreCounterPage = lazy(() =>
  import("./components/score-counter-page").then((m) => ({ default: m.ScoreCounterPage }))
);
const DesignSystemPage = lazy(() =>
  import("./components/design-system-page").then((m) => ({ default: m.DesignSystemPage }))
);
const WhiteLabelEsimPage = lazy(() =>
  import("./components/white-label-esim-page").then((m) => ({ default: m.WhiteLabelEsimPage }))
);
const SupportPage = lazy(() =>
  import("./components/support-page").then((m) => ({ default: m.SupportPage }))
);
const WorkInProgress = lazy(() =>
  import("./components/work-in-progress").then((m) => ({ default: m.WorkInProgress }))
);
const ReviewsPage = lazy(() =>
  import("./components/reviews-page").then((m) => ({ default: m.ReviewsPage }))
);
const WhiteLabelDemoLayout = lazy(() =>
  import("./components/white-label-esim-demo/demo-layout").then((m) => ({ default: m.WhiteLabelDemoLayout }))
);
const CompanySettingsDemoPage = lazy(() =>
  import("./components/white-label-esim-demo/company-settings-demo-page").then((m) => ({ default: m.CompanySettingsDemoPage }))
);

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "work/score-counter", Component: ScoreCounterPage },
      { path: "work/design-system", Component: DesignSystemPage },
      { path: "work/white-label-esim", Component: WhiteLabelEsimPage },
      { path: "work/coming-soon", Component: WorkInProgress },
      { path: "support", Component: SupportPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
  {
    path: "/work/score-counter/reviews",
    Component: ReviewsLayout,
    children: [{ index: true, Component: ReviewsPage }],
  },
  {
    path: "/work/white-label-esim/demo",
    Component: WhiteLabelDemoLayout,
    children: [
      { index: true, Component: CompanySettingsDemoPage },
      // customize child route added in a later task
    ],
  },
]);
```

- [ ] **Step 3: Run type-check**

Run: `pnpm type-check`
Expected: PASS.

- [ ] **Step 4: Manual smoke check**

Run: `pnpm dev`
Open: `http://localhost:<port>/work/white-label-esim/demo`

Expected:
- Dark navbar with Yesim wordmark at top.
- "Back to case study" chevron link above the navbar.
- "Company settings" heading with an "Add new brand" dark button.
- Empty-state illustration and the "No brand setting yet." message.
- No portfolio nav or footer visible.
- Clicking "Back to case study" returns to `/work/white-label-esim`.

Stop the dev server after verifying.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/white-label-esim-demo/company-settings-demo-page.tsx src/app/routes.ts
git commit -m "feat(white-label-demo): add company-settings screen and demo route"
```

---

## Task 7: Create `customize-esim-demo-page.tsx` type skeleton

**Files:**
- Create: `src/app/components/white-label-esim-demo/customize-esim-demo-page.tsx` (skeleton only)

The full page depends on `BrandSettings` type + `PhonePreview` + form sections. We establish the type and a minimal render now so the next tasks (phone-preview, brand-settings-form) can import `BrandSettings` from a stable location. The full page is completed in Task 10.

- [ ] **Step 1: Create the skeleton file**

Create file `src/app/components/white-label-esim-demo/customize-esim-demo-page.tsx` with this exact content:

```tsx
import { useState } from "react";

export type BrandSettings = {
  // Brand details
  brandName: string;
  internalName: string;
  brandAlias: string;
  supportEmail: string;
  supportPhone: string;
  defaultBrand: boolean;
  // eSIM settings
  brandedEsimEnabled: boolean;
  // Brand styling
  logoDataUrl: string | null;
  logoFileName: string;
  brandColor: string;
  bannerDataUrl: string | null;
  bannerFileName: string;
  includeYesimPromotion: boolean;
  contactEmail: string;
  privacyPolicyUrl: string;
  termsOfUsageUrl: string;
};

export const defaultBrandSettings: BrandSettings = {
  brandName: "",
  internalName: "",
  brandAlias: "",
  supportEmail: "",
  supportPhone: "",
  defaultBrand: false,
  brandedEsimEnabled: false,
  logoDataUrl: null,
  logoFileName: "",
  brandColor: "#0BBCD6",
  bannerDataUrl: null,
  bannerFileName: "",
  includeYesimPromotion: true,
  contactEmail: "",
  privacyPolicyUrl: "",
  termsOfUsageUrl: "",
};

// Skeleton — filled out in a later task. Keeps the type exported so
// phone-preview and brand-settings-form can import it now.
export function CustomizeEsimDemoPage() {
  const [settings] = useState<BrandSettings>(defaultBrandSettings);
  return (
    <main className="min-h-screen bg-white p-8">
      <p className="text-ink-600 text-sm">Customize eSIM demo — stub (settings: {Object.keys(settings).length} keys)</p>
    </main>
  );
}
```

Note: `defaultBrandSettings` is renamed from the original `defaultSettings` so it can be exported at module scope without shadowing a more local name later. It is only referenced inside `CustomizeEsimDemoPage`.

- [ ] **Step 2: Run type-check**

Run: `pnpm type-check`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/app/components/white-label-esim-demo/customize-esim-demo-page.tsx
git commit -m "feat(white-label-demo): add customize page skeleton exporting BrandSettings type"
```

---

## Task 8: Port `phone-preview.tsx`

**Files:**
- Source: `docs/white-label-esim-page-demo/src/components/customize-esim/phone-preview.tsx`
- Create: `src/app/components/white-label-esim-demo/phone-preview.tsx`

This file is ~809 lines. It imports the `BrandSettings` type from `./customize-esim-page`. After porting, it must import from `./customize-esim-demo-page` instead. The file uses only React hooks — no `next/link`, no `next/image` (verified via Grep earlier).

- [ ] **Step 1: Copy the source file**

Run:
```bash
cp docs/white-label-esim-page-demo/src/components/customize-esim/phone-preview.tsx \
   src/app/components/white-label-esim-demo/phone-preview.tsx
```

- [ ] **Step 2: Remove `"use client"` directive**

Edit `src/app/components/white-label-esim-demo/phone-preview.tsx`.

Change the top of the file from:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import type { BrandSettings } from "./customize-esim-page";
```

to:

```tsx
import { useEffect, useRef, useState } from "react";
import type { BrandSettings } from "./customize-esim-demo-page";
```

(Removes the `"use client"` line and the blank line below it; rewrites the BrandSettings import path.)

- [ ] **Step 3: Verify no other imports need rewriting**

Run: `grep -n "from \"" src/app/components/white-label-esim-demo/phone-preview.tsx`

Expected output shows only two imports:
```
import { useEffect, useRef, useState } from "react";
import type { BrandSettings } from "./customize-esim-demo-page";
```

If any other import appears (for example `next/image`), STOP and escalate — the source file has been read once (first 30 lines) and a full audit is required before proceeding.

- [ ] **Step 4: Run type-check**

Run: `pnpm type-check`
Expected: PASS. All Tailwind classes referenced (e.g. `bg-ink-900`, `font-display`, `shadow-phone`) resolve via the `@theme` block in `demo-styles.css`; but type-check does not validate CSS class names so this step only catches TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/white-label-esim-demo/phone-preview.tsx
git commit -m "feat(white-label-demo): port phone-preview"
```

---

## Task 9: Port `brand-settings-form.tsx`

**Files:**
- Source: `docs/white-label-esim-page-demo/src/components/customize-esim/brand-settings-form.tsx`
- Create: `src/app/components/white-label-esim-demo/brand-settings-form.tsx`

~687 lines. Imports: React hooks, `react-colorful` (installed in Task 1), `BrandSettings` type from `./customize-esim-page`, `Checkbox` from `./ui/checkbox`, `ToggleSwitch` from `./ui/toggle-switch`.

- [ ] **Step 1: Copy the source file**

Run:
```bash
cp docs/white-label-esim-page-demo/src/components/customize-esim/brand-settings-form.tsx \
   src/app/components/white-label-esim-demo/brand-settings-form.tsx
```

- [ ] **Step 2: Rewrite the top import block**

Edit `src/app/components/white-label-esim-demo/brand-settings-form.tsx`.

Change the top of the file from:

```tsx
"use client";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import type { BrandSettings } from "./customize-esim-page";
import { Checkbox } from "./ui/checkbox";
import { ToggleSwitch } from "./ui/toggle-switch";
```

to:

```tsx
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import type { BrandSettings } from "./customize-esim-demo-page";
import { Checkbox } from "./ui/checkbox";
import { ToggleSwitch } from "./ui/toggle-switch";
```

(Removes `"use client"` and the blank line; rewrites the `BrandSettings` import path.)

- [ ] **Step 3: Verify no other imports need rewriting**

Run: `grep -n "from \"" src/app/components/white-label-esim-demo/brand-settings-form.tsx`

Expected output shows exactly these five imports:
```
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import type { BrandSettings } from "./customize-esim-demo-page";
import { Checkbox } from "./ui/checkbox";
import { ToggleSwitch } from "./ui/toggle-switch";
```

If any other import appears, STOP and audit before proceeding.

- [ ] **Step 4: Run type-check**

Run: `pnpm type-check`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/white-label-esim-demo/brand-settings-form.tsx
git commit -m "feat(white-label-demo): port brand-settings-form"
```

---

## Task 10: Complete `customize-esim-demo-page.tsx` and wire second demo route

**Files:**
- Modify: `src/app/components/white-label-esim-demo/customize-esim-demo-page.tsx`
- Modify: `src/app/routes.ts`

Replace the skeleton from Task 7 with the full page. The original uses `next/link` with `href="/"` to return to the Company Settings screen, and imports `Navbar` from `@/components/navbar`. We use `react-router` Link with `to="/work/white-label-esim/demo"` and our `DemoNavbar`.

- [ ] **Step 1: Overwrite `customize-esim-demo-page.tsx` with the full implementation**

Overwrite `src/app/components/white-label-esim-demo/customize-esim-demo-page.tsx` with this exact content:

```tsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { BrandDetailsCard, BrandStylingCard } from "./brand-settings-form";
import { PhonePreview } from "./phone-preview";
import { SegmentedControl } from "./ui/segmented-control";
import { DemoNavbar } from "./demo-navbar";

export type BrandSettings = {
  // Brand details
  brandName: string;
  internalName: string;
  brandAlias: string;
  supportEmail: string;
  supportPhone: string;
  defaultBrand: boolean;
  // eSIM settings
  brandedEsimEnabled: boolean;
  // Brand styling
  logoDataUrl: string | null;
  logoFileName: string;
  brandColor: string;
  bannerDataUrl: string | null;
  bannerFileName: string;
  includeYesimPromotion: boolean;
  contactEmail: string;
  privacyPolicyUrl: string;
  termsOfUsageUrl: string;
};

export const defaultBrandSettings: BrandSettings = {
  brandName: "",
  internalName: "",
  brandAlias: "",
  supportEmail: "",
  supportPhone: "",
  defaultBrand: false,
  brandedEsimEnabled: false,
  logoDataUrl: null,
  logoFileName: "",
  brandColor: "#0BBCD6",
  bannerDataUrl: null,
  bannerFileName: "",
  includeYesimPromotion: true,
  contactEmail: "",
  privacyPolicyUrl: "",
  termsOfUsageUrl: "",
};

const DETAILS_KEYS: (keyof BrandSettings)[] = [
  "brandName",
  "internalName",
  "brandAlias",
  "supportEmail",
  "supportPhone",
  "defaultBrand",
];

const STYLING_KEYS: (keyof BrandSettings)[] = [
  "brandedEsimEnabled",
  "logoDataUrl",
  "logoFileName",
  "brandColor",
  "bannerDataUrl",
  "bannerFileName",
  "includeYesimPromotion",
  "contactEmail",
  "privacyPolicyUrl",
  "termsOfUsageUrl",
];

export function CustomizeEsimDemoPage() {
  const [settings, setSettings] = useState<BrandSettings>(defaultBrandSettings);
  const [activeTab, setActiveTab] = useState<"details" | "styling">("details");
  const [detailsSavedAt, setDetailsSavedAt] = useState<number | null>(null);
  const [stylingSavedAt, setStylingSavedAt] = useState<number | null>(null);

  const scrollToTopRef = useRef<(() => void) | null>(null);
  const scrollToBottomRef = useRef<(() => void) | null>(null);
  const handleRegisterScroll = useCallback(
    (fns: { scrollToTop: () => void; scrollToBottom: () => void }) => {
      scrollToTopRef.current = fns.scrollToTop;
      scrollToBottomRef.current = fns.scrollToBottom;
    },
    []
  );
  const scrollPreviewToTop = useCallback(() => scrollToTopRef.current?.(), []);
  const scrollPreviewToBottom = useCallback(
    () => scrollToBottomRef.current?.(),
    []
  );

  const update = <K extends keyof BrandSettings>(
    key: K,
    value: BrandSettings[K]
  ) => setSettings((s) => ({ ...s, [key]: value }));

  const isDetailsDirty = useMemo(
    () => DETAILS_KEYS.some((k) => settings[k] !== defaultBrandSettings[k]),
    [settings]
  );

  const isStylingDirty = useMemo(
    () => STYLING_KEYS.some((k) => settings[k] !== defaultBrandSettings[k]),
    [settings]
  );

  useEffect(() => {
    if (!isDetailsDirty && !isStylingDirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDetailsDirty, isStylingDirty]);

  const handleSaveDetails = () => {
    setDetailsSavedAt(Date.now());
    window.setTimeout(() => setDetailsSavedAt(null), 2400);
  };

  const handleSaveStyling = () => {
    setStylingSavedAt(Date.now());
    window.setTimeout(() => setStylingSavedAt(null), 2400);
  };

  const handleResetDetails = () => {
    setSettings((s) => ({
      ...s,
      ...Object.fromEntries(DETAILS_KEYS.map((k) => [k, defaultBrandSettings[k]])),
    }));
    setDetailsSavedAt(null);
  };

  const handleResetStyling = () => {
    setSettings((s) => ({
      ...s,
      ...Object.fromEntries(STYLING_KEYS.map((k) => [k, defaultBrandSettings[k]])),
    }));
    setStylingSavedAt(null);
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-12">
        {/* Back to case study */}
        <Link
          to="/work/white-label-esim"
          data-goatcounter-click="white-label-demo-back-to-case-study"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-600 transition hover:text-ink-900"
        >
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 12.5 5.5 8 10 3.5" />
          </svg>
          Back to case study
        </Link>

        {/* Header */}
        <div className="mt-6">
          <DemoNavbar />
        </div>

        {/* Hero */}
        <section className="mt-10 max-w-3xl">
          <Link
            to="/work/white-label-esim/demo"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-600 transition hover:text-ink-900"
          >
            <svg
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 12.5 5.5 8 10 3.5" />
            </svg>
            Company settings
          </Link>
          <h1 className="mt-3 font-display text-[36px] font-semibold leading-[1.15] tracking-tight text-ink-900">
            New brand
          </h1>
          <p className="mt-3 text-[15px] leading-6 text-ink-600">
            Set up the brand identity and decide how eSIM details are presented to your customers
          </p>
        </section>

        {/* Segmented control */}
        <div className="mt-8">
          <SegmentedControl
            options={[
              { value: "details" as const, label: "Brand details" },
              { value: "styling" as const, label: "Brand styling" },
            ]}
            value={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Section content */}
        <section className="mt-6">
          {activeTab === "details" ? (
            <div className="lg:max-w-[calc(100%-420px-24px)]">
              <BrandDetailsCard
                settings={settings}
                update={update}
                onSave={handleSaveDetails}
                onReset={handleResetDetails}
                saved={detailsSavedAt !== null}
                dirty={isDetailsDirty}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
              <BrandStylingCard
                settings={settings}
                update={update}
                onSave={handleSaveStyling}
                onReset={handleResetStyling}
                saved={stylingSavedAt !== null}
                dirty={isStylingDirty}
                onScrollPreviewToTop={scrollPreviewToTop}
                onScrollPreviewToBottom={scrollPreviewToBottom}
              />
              <PhonePreview
                settings={settings}
                onRegisterScroll={handleRegisterScroll}
              />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
```

Key differences vs. the source `customize-esim-page.tsx`:
- No `"use client"`
- `import Link from "next/link"` → `import { Link } from "react-router"`
- `href="/"` → `to="/work/white-label-esim/demo"` (returns to company-settings demo)
- `Navbar` from `@/components/navbar` → `DemoNavbar` from `./demo-navbar`
- `defaultSettings` renamed to `defaultBrandSettings` (matches Task 7 skeleton)
- Added a "Back to case study" top link (new, not in the original)

- [ ] **Step 2: Add the `customize` child route in `src/app/routes.ts`**

Edit `src/app/routes.ts`.

Add this lazy import after `CompanySettingsDemoPage`:

```ts
const CustomizeEsimDemoPage = lazy(() =>
  import("./components/white-label-esim-demo/customize-esim-demo-page").then((m) => ({ default: m.CustomizeEsimDemoPage }))
);
```

Inside the `/work/white-label-esim/demo` route's `children` array, replace:

```ts
children: [
  { index: true, Component: CompanySettingsDemoPage },
  // customize child route added in a later task
],
```

with:

```ts
children: [
  { index: true, Component: CompanySettingsDemoPage },
  { path: "customize", Component: CustomizeEsimDemoPage },
],
```

- [ ] **Step 3: Run type-check**

Run: `pnpm type-check`
Expected: PASS.

- [ ] **Step 4: Manual smoke check**

Run: `pnpm dev`
Navigate through this flow:
1. `http://localhost:<port>/work/white-label-esim/demo` — Company Settings screen loads.
2. Click "Add new brand" — URL changes to `/work/white-label-esim/demo/customize`.
3. Verify the navbar + "New brand" heading + segmented control ("Brand details" / "Brand styling") render.
4. Click the "Brand styling" tab — form and iPhone preview appear side-by-side on desktop.
5. Type a brand name → nothing breaks. Open the color picker → change color → preview background updates. Upload an image for logo → preview shows it. Text color on the brand background flips correctly when switching between a light and a dark color.
6. Click "Company settings" back link → returns to `/work/white-label-esim/demo`.
7. Click "Back to case study" → returns to `/work/white-label-esim`.

Stop the dev server after verifying.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/white-label-esim-demo/customize-esim-demo-page.tsx src/app/routes.ts
git commit -m "feat(white-label-demo): complete customize page and wire route"
```

---

## Task 11: Replace the Section 5 placeholder in the case study with a CTA button

**Files:**
- Modify: `src/app/components/white-label-esim-page.tsx` (lines 380–384)

The current placeholder is:

```tsx
<SectionAnimate delay={0.24}>
  <div className="-mx-4 sm:mx-0">
    <ImagePlaceholder label="Live demo embed — interactive prototype (to be added)" />
  </div>
</SectionAnimate>
```

Replace it with a Link-styled CTA that uses site design tokens (`bg-card`, `card-shadow`, `text-foreground`) so it feels native to the case study.

- [ ] **Step 1: Edit the case study page**

In `src/app/components/white-label-esim-page.tsx`, find the block:

```tsx
      <SectionAnimate delay={0.24}>
        <div className="-mx-4 sm:mx-0">
          <ImagePlaceholder label="Live demo embed \u2014 interactive prototype (to be added)" />
        </div>
      </SectionAnimate>
```

and replace it with:

```tsx
      <SectionAnimate delay={0.24}>
        <Link
          to="/work/white-label-esim/demo"
          data-goatcounter-click="launch-white-label-demo"
          className="group flex items-center justify-between gap-4 rounded-xl bg-card card-shadow p-5 sm:p-6 border-l-[3px] border-foreground/20 transition-colors hover:border-foreground/40"
        >
          <div className="flex flex-col gap-1">
            <span
              className="font-medium"
              style={{ fontSize: fluidBase, lineHeight: 1.4 }}
            >
              Launch the interactive prototype
            </span>
            <span
              className="text-muted-foreground"
              style={{ fontSize: fluidSmall, lineHeight: 1.5 }}
            >
              Open the working demo in a new view and edit the form to see the preview update.
            </span>
          </div>
          <ArrowRight
            size={20}
            className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
          />
        </Link>
      </SectionAnimate>
```

`Link`, `ArrowRight`, `fluidBase`, and `fluidSmall` are already imported in this file (lines 1, 2, 5). `ImagePlaceholder` remains used elsewhere in the file (earlier sections still have placeholders), so do not remove that import.

- [ ] **Step 2: Run type-check**

Run: `pnpm type-check`
Expected: PASS.

- [ ] **Step 3: Manual smoke check**

Run: `pnpm dev`
Navigate to `http://localhost:<port>/work/white-label-esim`.

Expected:
- Scroll to Section 5 ("The Prototype in Action").
- Instead of the gray "Live demo embed" placeholder, see a card with "Launch the interactive prototype" heading, subtitle, and a right-arrow icon on the right.
- Hover: card's left border darkens, arrow nudges right.
- Click: navigates to `/work/white-label-esim/demo` and renders the Company Settings screen.

Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/app/components/white-label-esim-page.tsx
git commit -m "feat(white-label-esim): replace demo placeholder with launch CTA"
```

---

## Task 12: Final verification

**Files:** None (verification only).

- [ ] **Step 1: Full type-check**

Run: `pnpm type-check`
Expected: PASS, no errors anywhere in the codebase.

- [ ] **Step 2: Production build**

Run: `pnpm build`
Expected: PASS, a `dist/` directory is produced with no errors. Vite may report chunk size warnings, which are informational — only fail the task on hard errors.

- [ ] **Step 3: Full end-to-end smoke run**

Run: `pnpm dev`

Walk through every route:
1. `/` — home page loads (portfolio Layout present).
2. `/work/white-label-esim` — case study loads; scroll to Section 5; CTA card is visible.
3. Click CTA → `/work/white-label-esim/demo` — Company Settings demo renders; portfolio Layout NOT present; back-to-case-study chevron visible.
4. Click "Add new brand" → `/work/white-label-esim/demo/customize` — Customize screen renders.
5. Switch to "Brand styling" tab, change a color, upload a logo, toggle the promotion switch, fill in fields — preview reacts in real time, contrast text color adjusts with background luminance.
6. Click "Company settings" → returns to the empty-brands list.
7. Click "Back to case study" → returns to `/work/white-label-esim`.
8. Navigate to `/work/score-counter` — portfolio Layout reappears, case study renders (regression check: demo styles did not leak).
9. Toggle site dark mode — home page + other case studies flip theme; the demo route stays light (expected).

Stop the dev server after verifying.

- [ ] **Step 4: Confirm git history**

Run: `git log --oneline -15`

Expected: One commit per task, in order, all with `feat(white-label-demo):` or `feat(white-label-esim):` prefixes.

- [ ] **Step 5: Final commit or note**

If the above walkthrough produces no issues, no commit is needed. If a small fix was required, commit it with:

```bash
git add -A
git commit -m "fix(white-label-demo): <specific fix>"
```

---

## Rollback notes

If at any point a task must be rolled back, `git reset --hard HEAD~1` (with user confirmation) reverts a single task. The subdirectory `src/app/components/white-label-esim-demo/` can be deleted wholesale in a rollback without affecting anything else, because no code outside it references it until Task 6 (routes) and Task 11 (case study page).

## Scope reminders

- Do not refactor demo internals beyond the listed import/route adaptations.
- Do not add dark-mode support to the demo.
- Do not add tests, lint rules, or CI changes.
- Do not touch any other portfolio page.
- Do not delete the original demo at `docs/white-label-esim-page-demo/` — it is the reference source and its removal is out of scope.
