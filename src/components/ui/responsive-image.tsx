import type { ImgHTMLAttributes } from 'react';
import manifest from '@/data/responsive-images.json';

export const portfolioImageSizes = '(min-width: 608px) 576px, calc(100vw - 32px)';
type Entry = { avif: { src: string; width: number }[]; webp: { src: string; width: number }[] };
export function imageVariants(src?: string) {
  return src ? (manifest as Record<string, Entry>)[src] : undefined;
}
export function imageSrcSet(variants: { src: string; width: number }[]) {
  return variants.map(({ src, width }) => `${src} ${width}w`).join(', ');
}

export function ResponsiveImage({ src, sizes = portfolioImageSizes, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const images = imageVariants(src);
  if (!images) return <img src={src} {...props} />;
  return (
    <picture>
      <source type="image/avif" srcSet={imageSrcSet(images.avif)} sizes={sizes} />
      <img src={images.webp[0].src} srcSet={imageSrcSet(images.webp)} sizes={sizes} {...props} />
    </picture>
  );
}
