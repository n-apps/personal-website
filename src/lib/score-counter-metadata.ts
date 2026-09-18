export const scoreCounterMetadata = {
  title: 'Score Counter — Keep Score for Any Game',
  description:
    'A simple, ad-free score tracker with built-in dice, timer, and score history. Free for iPhone, iPad, and Android.',
  url: 'https://romamakes.com/score-counter',
  image: 'https://romamakes.com/images/score-counter/metadata.png',
};

const portfolioMetadata = {
  title: 'Roma Shuliatiev — Product Designer',
  description: 'Product Designer based in Kyiv. Open to product design roles.',
  url: 'https://romamakes.com/',
  image: 'https://romamakes.com/images/social.png',
};

export const scoreCounterPrivacyMetadata = {
  ...portfolioMetadata,
  title: 'Score Counter Privacy Policy',
  description: 'Privacy Policy for Score Counter on Android and iOS.',
  url: 'https://romamakes.com/score-counter/privacy',
};

/** Apply route metadata and restore portfolio defaults on unmount, including direct entries. */
export function applyScoreCounterMetadata(metadata: typeof scoreCounterMetadata) {
  const apply = ({ title, description, url, image }: typeof scoreCounterMetadata) => {
    document.title = title;
    const values: [string, string, string][] = [
      ['name', 'description', description],
      ['property', 'og:title', title],
      ['property', 'og:description', description],
      ['property', 'og:url', url],
      ['property', 'og:image', image],
      ['name', 'twitter:title', title],
      ['name', 'twitter:description', description],
      ['name', 'twitter:url', url],
      ['name', 'twitter:image', image],
    ];
    for (const [attribute, key, value] of values) {
      const element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
        ?? document.createElement('meta');
      element.setAttribute(attribute, key);
      element.content = value;
      document.head.append(element);
    }
    document.head.querySelectorAll('meta[property="og:image:alt"], meta[name="twitter:image:alt"], link[rel="canonical"]')
      .forEach((element) => element.remove());
  };

  apply(metadata);
  const canonical = document.createElement('link');
  canonical.rel = 'canonical';
  canonical.href = metadata.url;
  document.head.append(canonical);
  if (metadata.image === scoreCounterMetadata.image) {
    for (const [attribute, key] of [['property', 'og:image:alt'], ['name', 'twitter:image:alt']]) {
      const element = document.createElement('meta');
      element.setAttribute(attribute, key);
      element.content = 'Score Counter in use during a board game';
      document.head.append(element);
    }
  }
  return () => apply(portfolioMetadata);
}

/** Shared by the static entry point and client-side navigation. */
export function scoreCounterHead(html: string) {
  const { title, description, url, image } = scoreCounterMetadata;
  return html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /(<meta\s+(?:name|property)="(?:description|og:description|twitter:description)"\s+content=")[^"]*("\s*\/?>)/g,
      `$1${description}$2`,
    )
    .replace(
      /(<meta\s+(?:name|property)="(?:og:title|twitter:title)"\s+content=")[^"]*("\s*\/?>)/g,
      `$1${title}$2`,
    )
    .replace(
      /(<meta\s+(?:name|property)="(?:og:url|twitter:url)"\s+content=")[^"]*("\s*\/?>)/g,
      `$1${url}$2`,
    )
    .replace(
      /(<meta\s+(?:name|property)="(?:og:image|twitter:image)"\s+content=")[^"]*("\s*\/?>)/g,
      `$1${image}$2`,
    )
    .replace(
      '</head>',
      `<link rel="canonical" href="${url}" />\n<meta property="og:image:alt" content="Score Counter in use during a board game" />\n<meta name="twitter:image:alt" content="Score Counter in use during a board game" />\n</head>`,
    );
}

export function scoreCounterPrivacyHead(html: string) {
  const { title, description, url } = scoreCounterPrivacyMetadata;
  return html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /(<meta\s+(?:name|property)="(?:description|og:description|twitter:description)"\s+content=")[^"]*("\s*\/?>)/g,
      `$1${description}$2`,
    )
    .replace(
      /(<meta\s+(?:name|property)="(?:og:title|twitter:title)"\s+content=")[^"]*("\s*\/?>)/g,
      `$1${title}$2`,
    )
    .replace(
      /(<meta\s+(?:name|property)="(?:og:url|twitter:url)"\s+content=")[^"]*("\s*\/?>)/g,
      `$1${url}$2`,
    )
    .replace('</head>', `<link rel="canonical" href="${url}" />\n</head>`);
}
