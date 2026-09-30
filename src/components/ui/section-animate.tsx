import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
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

  return (
    <m.div
      className={className}
      initial={reduceMotion || staticMarkup ? false : { opacity: 0, y: 16 }}
      animate={inView && !reduceMotion && !staticMarkup ? undefined : reveal}
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
