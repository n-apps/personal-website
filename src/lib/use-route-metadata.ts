import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { appearanceForPath, metadataForPath, metadataValues, notFoundMetadata } from './route-metadata';

export function useRouteMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = metadataForPath(pathname);
    const current = metadata ?? notFoundMetadata;
    document.title = current.title;
    const appearance = appearanceForPath(new URL(current.url).pathname);
    const icon = document.head.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (icon) { icon.href = appearance.favicon; icon.type = appearance.type; }
    document.head.querySelectorAll(
      'meta[property="og:image:alt"], meta[name="twitter:image:alt"], meta[name="robots"], link[rel="canonical"]',
    ).forEach((element) => element.remove());

    for (const [attribute, key, value] of metadataValues(current)) {
      const element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
        ?? document.createElement('meta');
      element.setAttribute(attribute, key);
      element.content = value;
      document.head.append(element);
    }

    if (metadata) {
      const canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = metadata.url;
      document.head.append(canonical);
    } else {
      const robots = document.createElement('meta');
      robots.name = 'robots';
      robots.content = 'noindex';
      document.head.append(robots);
    }
  }, [pathname]);
}
