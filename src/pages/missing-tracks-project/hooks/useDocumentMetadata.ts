import { useEffect } from 'react';

interface MetadataOptions {
  favicon: string;
  themeColor: string;
}

/** Route titles and social metadata are centralized; this app only swaps its visual identity. */
export function useDocumentMetadata({ favicon, themeColor }: MetadataOptions) {
  useEffect(() => {
    const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    const theme = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const originalHref = icon?.getAttribute('href');
    const originalType = icon?.getAttribute('type');
    const originalTheme = theme?.content;
    if (icon) {
      icon.href = favicon;
      icon.type = favicon.endsWith('.svg') ? 'image/svg+xml' : 'image/png';
    }
    if (theme) theme.content = themeColor;
    return () => {
      if (icon && originalHref) icon.setAttribute('href', originalHref);
      if (icon && originalType) icon.setAttribute('type', originalType);
      if (theme && originalTheme) theme.content = originalTheme;
    };
  }, [favicon, themeColor]);
}
