import { AnimatePresence, m } from "motion/react";

type Props = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  id?: string;
};

export function Checkbox({ checked, onChange, label, id }: Props) {
  return (
    <label
      htmlFor={id}
      className="flex min-h-11 cursor-pointer select-none items-center gap-2 text-sm text-ink-900"
    >
      <span className="relative inline-flex h-4 w-4 items-center justify-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="absolute inset-0 h-4 w-4 cursor-pointer appearance-none rounded-[4px] border border-line bg-white transition-[background-color,border-color] duration-150 ease-out checked:border-demo-accent checked:bg-demo-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-demo-accent/30"
        />
        <AnimatePresence initial={false}>
          {checked && (
            <m.svg
              key="checkmark"
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="pointer-events-none relative h-3 w-3 stroke-white"
              fill="none"
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
              transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            >
              <path d="M3 8.5 6.5 12 13 4.5" />
            </m.svg>
          )}
        </AnimatePresence>
      </span>
      <span>{label}</span>
    </label>
  );
}
