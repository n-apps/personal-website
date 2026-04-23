import { motion } from "motion/react";
import type { ReactNode } from "react";

interface SectionAnimateProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function SectionAnimate({
  children,
  delay = 0,
  className = "",
}: SectionAnimateProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
