import { useEffect, Suspense } from 'react';
import { MotionConfig } from 'motion/react';
import { Outlet, useLocation } from 'react-router';
import { ShaderBackdrop } from './components/ShaderBackdrop';
import { TopNav } from './components/TopNav';

// Strichpunkt Sans (the .mt-root body font) and Madimi One (the wordmark) are
// used only on this route, so load their stylesheet on mount instead of site-wide
// in index.html — otherwise every page would block on a Google Fonts request for
// a route most visitors never open. No site-wide font preconnects are required.
// Injected once and left in place so the browser cache serves it across the app
// and About pages.
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Strichpunkt+Sans:wght@400..900&family=Madimi+One&display=swap';

function useMissingTracksFonts() {
  useEffect(() => {
    if (document.querySelector('link[data-mt-fonts]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = FONT_HREF;
    link.setAttribute('data-mt-fonts', '');
    document.head.appendChild(link);
  }, []);
}

// Shared shell for the Missing Tracks routes (the watchlist app at the index and
// its About page). .mt-root scopes the dark-green palette + element resets to
// these pages (see src/styles/missing-tracks-theme.css); MotionConfig honors the
// OS reduced-motion preference for every motion/react animation below. These
// routes render outside the portfolio's 576px Layout, so the top nav stays
// mounted here and scroll-to-top on navigation is handled here too.
export function MissingTracksLayout() {
  const { pathname } = useLocation();
  useMissingTracksFonts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <MotionConfig reducedMotion='user'>
      <div id='top' className='mt-root min-h-[100dvh]'>
        <ShaderBackdrop />
        <TopNav />
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </div>
    </MotionConfig>
  );
}
