import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

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
  const reveal = { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={inView && !reduceMotion ? undefined : reveal}
      whileInView={inView && !reduceMotion ? reveal : undefined}
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
    </motion.div>
  );
}
