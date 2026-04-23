type Props = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
};

export function ToggleSwitch({ checked, onChange, label }: Props) {
  return (
    <label
      className={[
        "relative inline-block h-5 w-10 shrink-0 cursor-pointer rounded-full transition-colors duration-200",
        checked ? "bg-[#0066ff]" : "bg-ink-500/30",
      ].join(" ")}
    >
      <input
        type="checkbox"
        role="switch"
        aria-label={label}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className={[
          "absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white shadow-sm ring-1 transition-all duration-200 peer-focus-visible:ring-2",
          checked
            ? "left-[18px] ring-[#0066ff]"
            : "left-[-2px] ring-ink-500/40",
        ].join(" ")}
      />
    </label>
  );
}
