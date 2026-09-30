import { m, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useStaticMarkup } from '@/lib/static-markup';

interface SectionAnimateProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  inView?: boolean;
}

export function SectionAnimate({
  children,
  delay = 0,
  className = "",
  inView = false,
}: SectionAnimateProps) {
  const reduceMotion = useReducedMotion() === true;
  const staticMarkup = useStaticMarkup();
  const reveal = { opacity: 1, y: 0 };
  const element = useRef<HTMLDivElement>(null);
  const [viewportReveal, setViewportReveal] = useState<'pending' | 'revealed'>();

  useEffect(() => {
    // Static sections stay readable without JS; viewport gating starts only
    // after hydration. CSS entrances do not wait for deferred Motion features.
    if (!staticMarkup || !inView) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      setViewportReveal(undefined);
      return;
    }
    const node = element.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const visibleHeight = Math.max(0, Math.min(rect.bottom, innerHeight) - Math.max(rect.top, 0));
    if (rect.height > 0 && visibleHeight / rect.height >= 0.1) {
      setViewportReveal('revealed');
      return;
    }
    setViewportReveal('pending');
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
        setViewportReveal('revealed');
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [staticMarkup, inView, reduceMotion]);

  return (
    <m.div
      ref={element}
      className={className}
      data-section-reveal={staticMarkup ? (inView ? viewportReveal : 'revealed') : undefined}
      style={staticMarkup ? { '--section-reveal-delay': `${delay}s` } as CSSProperties : undefined}
      initial={reduceMotion || staticMarkup ? false : { opacity: 0, y: 16 }}
      animate={staticMarkup || (inView && !reduceMotion) ? undefined : reveal}
      whileInView={inView && !reduceMotion && !staticMarkup ? reveal : undefined}
      viewport={inView && !reduceMotion ? { once: true, amount: 0.1 } : undefined}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              duration: 0.5,
              delay,
              ease: [0.4, 0, 0.2, 1],
            }
      }
    >
      {children}
    </m.div>
  );
}
