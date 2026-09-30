import { useLayoutEffect, useRef, type ImgHTMLAttributes } from 'react';
import manifest from '@/data/responsive-images.json';
import { useStaticMarkup } from '@/lib/static-markup';

export const portfolioImageSizes = '(min-width: 608px) 576px, calc(100vw - 32px)';
type Entry = { avif: { src: string; width: number }[]; webp: { src: string; width: number }[] };
export function imageVariants(src?: string) {
  return src ? (manifest as Record<string, Entry>)[src] : undefined;
}
export function imageSrcSet(variants: { src: string; width: number }[]) {
  return variants.map(({ src, width }) => `${src} ${width}w`).join(', ');
}

export function ResponsiveImage({ src, sizes = portfolioImageSizes, loading, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const imageRef = useRef<HTMLImageElement>(null);
  const staticMarkup = useStaticMarkup();
  useLayoutEffect(() => {
    // WebKit can fetch a detached eager <img> before React attaches its <picture>.
    // Defer that fallback until the source elements are connected; the AVIF
    // preload is already in flight, and this runs before the first paint.
    if (imageRef.current) imageRef.current.loading = loading ?? 'eager';
  }, [src, loading]);
  const images = imageVariants(src);
  if (!images) return <img src={src} loading={loading} {...props} />;
  return (
    <picture>
      <source type="image/avif" srcSet={imageSrcSet(images.avif)} sizes={sizes} />
      <img ref={imageRef} src={images.webp[0].src} srcSet={imageSrcSet(images.webp)} sizes={sizes} loading={staticMarkup ? loading : 'lazy'} {...props} />
    </picture>
  );
}
