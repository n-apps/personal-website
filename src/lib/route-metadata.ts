export type PageMetadata = {
  title: string;
  description: string;
  url: string;
  image: string;
  imageAlt?: string;
};

const origin = 'https://romamakes.com';
const portfolioImage = `${origin}/images/social.png`;

function page(path: string, title: string, description: string, image = portfolioImage): PageMetadata {
  return { title, description, url: `${origin}${path === '/' ? '/' : `${path}/`}`, image };
}

export const scoreCounterMetadata = {
  ...page('/score-counter', 'Score Counter — Keep Score for Any Game',
    'A simple, ad-free score tracker with built-in dice, timer, and score history. Free for iPhone, iPad, and Android.',
    `${origin}/images/score-counter/metadata.png`),
  imageAlt: 'Score Counter in use during a board game',
};

export const scoreCounterPrivacyMetadata = page('/score-counter/privacy',
  'Score Counter Privacy Policy', 'Privacy Policy for Score Counter on Android and iOS.');

/** Shared by static entry generation and client-side navigation. Keys match router paths. */
export const routeMetadata: Record<string, PageMetadata> = {
  '/': page('/', 'Roma Shuliatiev — Product Designer',
    'Product Designer based in Kyiv. Open to product design roles.'),
  '/score-counter': scoreCounterMetadata,
  '/score-counter/privacy': scoreCounterPrivacyMetadata,
  '/work/score-counter': page('/work/score-counter', 'Score Counter Case Study — Roma Shuliatiev',
    'Designing, building, and running Score Counter: a solo app with over one million installs.',
    `${origin}/images/score-counter-cover.png`),
  '/work/design-system': page('/work/design-system', 'Yesim Design System — Roma Shuliatiev',
    'One design system for three B2B products: shared components, faster setup, and fewer style QA issues.',
    `${origin}/images/design-system-cover.png`),
  '/work/white-label-esim': page('/work/white-label-esim', 'White-label eSIM Case Study — Roma Shuliatiev',
    'A working eSIM concept used to resolve contrast, validation, and conditional interface states.',
    `${origin}/images/white-label-esim-cover.png`),
  '/work/saas-onboarding': page('/work/saas-onboarding', 'Self-serve SaaS Onboarding — Roma Shuliatiev',
    'Designing a self-serve path from an empty account to the first active eSIM.',
    `${origin}/images/saas-onboarding-cover.png`),
  '/support': page('/support', 'Support Score Counter — Roma Shuliatiev',
    'Help support the development of Score Counter, an ad-free scorekeeper for game nights.'),
  '/work/score-counter/reviews': page('/work/score-counter/reviews', 'Score Counter Reviews — Roma Shuliatiev',
    'Read what players say about Score Counter, a scorekeeper for board games and game nights.'),
  '/work/white-label-esim/demo': page('/work/white-label-esim/demo', 'White-label eSIM Demo — Company Settings',
    'Explore the interactive white-label eSIM prototype and its company settings.'),
  '/work/white-label-esim/demo/customize': page('/work/white-label-esim/demo/customize', 'White-label eSIM Demo — Customize',
    'Try the white-label eSIM prototype with customizable branding and interface settings.'),
  '/missing-tracks-project': page('/missing-tracks-project', 'Missing Tracks — A Watchlist for Unavailable Songs',
    'Keep a local watchlist of tracks unavailable on Spotify so you can check them again later.'),
  '/missing-tracks-project/about': page('/missing-tracks-project/about', 'About Missing Tracks — Roma Shuliatiev',
    'How Missing Tracks helps you remember unavailable songs and recheck them later.'),
};

export const notFoundMetadata = page('/', 'Page Not Found — Roma Shuliatiev',
  'This page could not be found. Explore Roma Shuliatiev’s portfolio.');

export function metadataForPath(pathname: string) {
  const path = pathname.replace(/\/+$/, '').toLowerCase() || '/';
  return Object.prototype.hasOwnProperty.call(routeMetadata, path) ? routeMetadata[path] : null;
}

export function appearanceForPath(pathname: string) {
  return pathname.startsWith('/missing-tracks-project')
    ? { favicon: '/favicon-mt.svg', type: 'image/svg+xml', themeColor: '#141b16' }
    : { favicon: '/favicon-48.png', type: 'image/png', themeColor: '#F55817' };
}

export function metadataValues(metadata: PageMetadata) {
  const appearance = appearanceForPath(new URL(metadata.url).pathname);
  return [
    ['name', 'theme-color', appearance.themeColor],
    ['name', 'description', metadata.description],
    ['property', 'og:title', metadata.title],
    ['property', 'og:description', metadata.description],
    ['property', 'og:url', metadata.url],
    ['property', 'og:image', metadata.image],
    ['name', 'twitter:title', metadata.title],
    ['name', 'twitter:description', metadata.description],
    ['name', 'twitter:url', metadata.url],
    ['name', 'twitter:image', metadata.image],
    ...(metadata.imageAlt ? [
      ['property', 'og:image:alt', metadata.imageAlt],
      ['name', 'twitter:image:alt', metadata.imageAlt],
    ] : []),
  ];
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]!);
}

/** Replace template metadata without duplicating tags or changing scripts/assets. */
export function routeHead(html: string, metadata: PageMetadata, notFound = false) {
  const clean = html
    .replace(/<title>[\s\S]*?<\/title>/g, '')
    .replace(/<meta\s+(?:name|property)="(?:theme-color|description|robots|og:(?:title|description|url|image(?::alt)?)|twitter:(?:title|description|url|image(?::alt)?))"[^>]*>/g, '')
    .replace(/<link\s+rel="(?:canonical|icon)"[^>]*>/g, '');
  const appearance = appearanceForPath(new URL(metadata.url).pathname);
  const tags = [
    `<title>${escapeHtml(metadata.title)}</title>`,
    `<link rel="icon" href="${appearance.favicon}" type="${appearance.type}" />`,
    ...metadataValues(metadata).map(([attribute, key, value]) =>
      `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`),
    notFound ? '<meta name="robots" content="noindex" />'
      : `<link rel="canonical" href="${escapeHtml(metadata.url)}" />`,
  ];
  return clean.replace('</head>', `${tags.join('\n')}\n</head>`);
}
