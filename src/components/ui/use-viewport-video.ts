import { useCallback, useEffect, useRef, useState } from 'react';

/** Keep muted preview playback tied to the viewport, visibility, and explicit user intent. */
export function useViewportVideo(autoplay: boolean, deferredSrc?: string) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [inViewport, setInViewport] = useState(false);
  const [posterReady, setPosterReady] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => typeof document === 'undefined' || !document.hidden);
  const [intent, setIntent] = useState<'play' | 'pause' | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const ensureSource = useCallback(() => {
    const video = videoRef.current;
    if (video && deferredSrc && video.getAttribute('src') !== deferredSrc) {
      video.src = deferredSrc;
    }
    return video;
  }, [deferredSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const nearby = new IntersectionObserver(([entry]) => {
      setNearViewport(entry.isIntersecting);
      if (entry.isIntersecting) setPosterReady(true);
    }, { rootMargin: '200px 0px' });
    const visible = new IntersectionObserver(([entry]) => {
      setInViewport(entry.isIntersecting && entry.intersectionRatio >= 0.15);
    }, { threshold: [0, 0.15] });
    const updateVisibility = () => setPageVisible(!document.hidden);
    nearby.observe(video);
    visible.observe(video);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      nearby.disconnect();
      visible.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
      video.pause();
    };
  }, []);

  useEffect(() => {
    // No source assignment for reduced-motion visitors until they press Play.
    if (nearViewport && autoplay) ensureSource();
  }, [nearViewport, autoplay, ensureSource]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const shouldPlay = inViewport && pageVisible && intent !== 'pause'
      && (autoplay || intent === 'play');
    if (!shouldPlay) {
      video.pause();
      return;
    }
    ensureSource();
    if (video.paused) void video.play().catch(() => setIsPlaying(false));
  }, [inViewport, pageVisible, intent, autoplay, ensureSource]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      setIntent('pause');
      video.pause();
    } else {
      setIntent('play');
      // Assign and play within the click gesture, including on iOS/reduced motion.
      ensureSource();
      void video.play().catch(() => setIsPlaying(false));
    }
  };

  return {
    videoRef, posterReady, isPlaying, togglePlayback,
    onPlay: () => setIsPlaying(true),
    onPause: () => setIsPlaying(false),
  };
}
