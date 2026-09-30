# Roma Shuliatiev — Product Designer Portfolio

This is the source code for my personal portfolio website, available at [romamakes.com](https://romamakes.com/).

## Overview
I am a Product Designer with over 5 years of experience turning complex problems into simple, useful solutions for B2B and consumer markets (SaaS, marketplaces, e-commerce). I am also the creator of Score Counter, a top-rated Android app with over 180,000 monthly active users.

## Tech Stack
This project is built using modern web technologies to ensure optimal performance, responsive design, and smooth interactions:
*   **Framework**: React 19, Vite 8
*   **Routing**: React Router 7
*   **Styling**: Tailwind CSS v4
*   **UI Components**: Radix UI primitives
*   **Animations**: Motion (Framer Motion)
*   **Icons**: Remix Icon React

## Validation and deployment

Use Node 24 or newer. Run `pnpm type-check`, `pnpm check:theme`, `pnpm build`, then `pnpm check:routes`. Route checks verify all known entry URLs, canonical/social metadata, referenced assets, sitemap, robots, redirects and a genuine 404 fallback.

GitHub Actions runs these checks on pull requests and before deployment. Only main pushes and manual workflow runs deploy to GitHub Pages. Add route metadata in `src/lib/route-metadata.ts` whenever adding a page in `src/app/routes.ts`. The generated HTML provides entry metadata; page bodies still render in React.

## Media

Case-study image dimensions and video posters are explicit to reserve layout space. The two case videos use `public/videos/score-counter-*.web.mp4`, H.264 delivery encodes at the original resolution with CRF 20, `yuv420p`, no audio, and MP4 fast-start metadata. Original MP4s remain source masters. Re-create a delivery encode with FFmpeg:

```sh
ffmpeg -i public/videos/score-counter-flow.mp4 -an -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -movflags +faststart public/videos/score-counter-flow.web.mp4
```

Posters are actual clip frames, not generated illustrations. `useViewportVideo` gates source assignment/playback by proximity, viewport visibility, document visibility and user preference; reduced-motion users see a poster and can explicitly play. The native play call stays inside the click gesture. The Score Counter landing preview keeps its WebM/MP4 source fallback and uses the same playback controls.
