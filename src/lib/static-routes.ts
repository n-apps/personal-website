/** Public content has a useful HTML body; tools/reviews still initialize on the client. */
export const staticRouteModules: Record<string, string> = {
  '/': 'src/pages/home/index.tsx',
  '/work/score-counter': 'src/pages/score-counter/index.tsx',
  '/work/design-system': 'src/pages/design-system/index.tsx',
  '/work/white-label-esim': 'src/pages/white-label-esim/index.tsx',
  '/work/saas-onboarding': 'src/pages/saas-onboarding/index.tsx',
  '/support': 'src/pages/support/index.tsx',
  '/score-counter': 'src/pages/score-counter-download/index.tsx',
  '/score-counter/privacy': 'src/pages/score-counter-privacy/index.tsx',
};
