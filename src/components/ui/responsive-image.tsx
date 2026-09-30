import type { ImgHTMLAttributes } from 'react';

/** Serve original assets to preserve screenshot detail and image quality. */
export function ResponsiveImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img {...props} />;
}
