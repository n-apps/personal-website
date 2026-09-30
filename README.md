# Roma Shuliatiev — Product Designer Portfolio

This is the source code for my personal portfolio website, available at [romamakes.com](https://romamakes.com/).

## Overview
I am a Product Designer with over 5 years of experience turning complex problems into simple, useful solutions for B2B and consumer markets (SaaS, marketplaces, e-commerce). I am also the creator of Score Counter, a top-rated Android app with over 180,000 monthly active users.

## Tech Stack
This project is built using modern web technologies to ensure optimal performance, responsive design, and smooth interactions:
*   **Framework**: React 19, Vite 8
*   **Routing**: React Router 7
*   **Styling**: Tailwind CSS v4
*   **Animations**: Motion (Framer Motion)
*   **Icons**: Remix Icon React

## Validation and deployment

Use Node 24 or newer. Run `pnpm type-check`, `pnpm check:theme`, `pnpm build`, then `pnpm check:routes`. Route checks verify all known entry URLs, canonical/social metadata, referenced assets, sitemap, robots, redirects and a genuine 404 fallback.

GitHub Actions runs these checks on pull requests and before deployment. Only main pushes and manual workflow runs deploy to GitHub Pages. Add route metadata in `src/lib/route-metadata.ts` whenever adding a page in `src/app/route-config.ts`. Eight content routes also have visible prerendered page bodies. Interactive tools and reviews remain client-rendered.

## Media

Case-study image dimensions and video posters are explicit to reserve layout space. The two case videos use `public/videos/score-counter-*.web.mp4`, H.264 delivery encodes at the original resolution with CRF 20, `yuv420p`, no audio, and MP4 fast-start metadata. Original MP4s remain source masters. Re-create a delivery encode with FFmpeg:

```sh
ffmpeg -i public/videos/score-counter-flow.mp4 -an -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -movflags +faststart public/videos/score-counter-flow.web.mp4
```

Posters are actual clip frames, not generated illustrations. `useViewportVideo` gates source assignment/playback by proximity, viewport visibility, document visibility and user preference; reduced-motion users see a poster and can explicitly play. The native play call stays inside the click gesture. The Score Counter landing preview keeps its WebM/MP4 source fallback and uses the same playback controls.

## Asset generation

`pnpm encode:images` uses development-only Sharp to produce checked-in, content-hashed AVIF (4:4:4) and WebP files plus `src/data/responsive-images.json`. Originals remain untouched. `ResponsiveImage` currently serves the original image files after a quality rollback; generated variants are not selected. The root HTML preloads the original first PNG cover. The favicon is a 48px PNG; the 180px Apple touch icon is separate.

For fonts, install Python `fonttools[woff]`, then run `python3 scripts/subset-fonts.py`. OpenRunde's initial subsets cover Latin, punctuation and all current source/data characters; remaining glyphs use the original WOFF2 files only when needed. Regenerate after adding copy in a new script. Newsreader retains both variable axes and is self-hosted using the original Google Fonts Latin faces. Font license notices are in `public/fonts/`. WOFF fallbacks and Google Fonts preconnects are no longer needed for the portfolio; Missing Tracks still loads its own route-only fonts.

## Interaction and animation

Missing Tracks renders a CSS green backdrop on phones, coarse-pointer devices, data-saving connections and reduced-motion visits. Suitable desktops load the original shader after 800ms; hidden tabs unmount its canvas, and import/render/context failures leave the CSS backdrop available. Paper Shaders already pauses its own offscreen/hidden animation loop, so no additional lifecycle wrapper is needed there.

Missing Tracks menus support arrows, Home/End, Tab and Escape with focus restoration; native modal dialogs supply inertness and modal focus behavior. Demo tabs use a named tablist, roving focus and a labelled panel. Form text is 16px on mobile, secondary text no longer loses contrast through opacity, and mobile icon targets are at least 44px. The footer typewriter and glow stop for reduced motion or hidden tabs; the minute-only clock updates once a minute. Weather and its existing client key are retained.

## Static output and security

`pnpm build` builds the browser bundle, temporarily builds the shared route tree for server rendering, and writes eight finished HTML bodies. Route CSS is linked before hydration. The server bundle and SSR manifest are removed; deployment remains static. `src/lib/static-routes.ts` selects content pages; tools and reviews stay client-rendered. React still hydrates content pages for navigation and interactions. Initial static content skips entrance hiding, while subsequent navigation retains motion.

Motion uses `m` under a strict `LazyMotion` boundary with deferred `domAnimation` features. Keep this boundary and avoid importing full `motion` components into route code. The decorative separator uses native markup; unused camera-controls, three-stdlib and Radix separator dependencies are removed. Fiber and Three remain required by the desktop shader; the lockfile now resolves Fiber 9.8.1.

A build-generated meta CSP hashes the early theme script and permits existing weather, analytics, music search, artwork and route-specific fonts. JavaScript has no `unsafe-inline` or `unsafe-eval` allowance. Inline styles remain allowed for React and Motion. The favicon, theme-color and route metadata share one source, including Missing Tracks navigation.
