import { Suspense, type ReactNode } from 'react';
import { LazyMotion, MotionConfig } from 'motion/react';
import { PageTransitionOverlay } from '@/components/ui/page-transition-overlay';
import { RouteLoading } from '@/components/ui/route-status';
import { StaticMarkupContext } from '@/lib/static-markup';

const loadFeatures = () => import('@/lib/motion-features').then(module => module.default);

export function AppShell({ children, staticMarkup = false }: { children: ReactNode; staticMarkup?: boolean }) {
  return (
    <StaticMarkupContext value={staticMarkup}>
      <LazyMotion features={loadFeatures} strict>
        <MotionConfig reducedMotion="user">
          <Suspense fallback={<RouteLoading fullPage />}>{children}</Suspense>
          <PageTransitionOverlay />
        </MotionConfig>
      </LazyMotion>
    </StaticMarkupContext>
  );
}
