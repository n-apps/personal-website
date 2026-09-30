import { useEffect, useState } from "react";
import { RiContrast2Fill } from "@remixicon/react";
import { m, useReducedMotion } from "motion/react";
import { playToggleSound } from "@/lib/ui-sounds";
import { readThemePreference, systemPrefersDark, writeThemePreference } from "@/lib/theme";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [preference, setPreference] = useState(readThemePreference);
  const [systemDark, setSystemDark] = useState(systemPrefersDark);
  const isDark = preference === "dark" || (preference === null && systemDark);
  const reduceMotion = useReducedMotion() === true;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      setSystemDark(event.matches);
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const handleToggle = () => {
    const next = !isDark;
    playToggleSound(next);
    const nextPreference = next ? "dark" : "light";
    setPreference(nextPreference);
    writeThemePreference(nextPreference);
  };

  return (
    <m.button
      onClick={handleToggle}
      className={`relative flex size-11 cursor-pointer items-center justify-center rounded-full ${className}`}
      style={{ color: "var(--foreground)" }}
      aria-label="Toggle color theme"
      whileTap={reduceMotion ? undefined : { scale: 0.96 }}
    >
      <RiContrast2Fill size={16} aria-hidden />
    </m.button>
  );
}
