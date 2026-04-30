import { useEffect, useState } from "react";
import { RiMoonLine, RiSunLine } from "@remixicon/react";
import { AnimatePresence, motion } from "motion/react";

function getInitialTheme() {
  if (typeof window === "undefined") return false;
  const saved = localStorage.getItem("theme");
  if (saved === "dark") return true;
  if (saved === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (localStorage.getItem("theme") === null) {
        setIsDark(event.matches);
      }
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const handleToggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="relative flex items-center justify-center w-8 h-8 rounded-full text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      whileTap={{ scale: 0.96 }}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
        >
          {isDark ? <RiSunLine size={16} /> : <RiMoonLine size={16} />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
