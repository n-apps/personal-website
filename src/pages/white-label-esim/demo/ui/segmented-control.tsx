type Option<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: Props<T>) {
  return (
    <div role="tablist" className="inline-flex rounded-[10px] bg-surface-field p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          role="tab"
          aria-selected={opt.value === value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={[
            "rounded-lg px-5 py-2 text-sm font-medium transition-all",
            opt.value === value
              ? "bg-white text-ink-900 shadow-sm"
              : "text-ink-500 hover:text-ink-900",
          ].join(" ")}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
