type Option<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  label: string;
  idPrefix: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
  idPrefix,
}: Props<T>) {
  return (
    <div role="tablist" aria-label={label} className="inline-flex rounded-[10px] bg-surface-field p-1">
      {options.map((opt, index) => (
        <button
          key={opt.value}
          role="tab"
          id={`${idPrefix}-${opt.value}`}
          aria-controls={`${idPrefix}-panel`}
          tabIndex={opt.value === value ? 0 : -1}
          aria-selected={opt.value === value}
          type="button"
          onClick={() => onChange(opt.value)}
          onKeyDown={event => {
            if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
            event.preventDefault();
            const next = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 :
              (index + (event.key === 'ArrowRight' ? 1 : -1) + options.length) % options.length;
            onChange(options[next].value);
            event.currentTarget.parentElement?.querySelectorAll('button')[next]?.focus();
          }}
          className={[
            "min-h-11 select-none rounded-lg px-5 text-sm font-medium transition-[background-color,color,scale] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-demo-accent/30 active:scale-[0.96]",
            opt.value === value
              ? "bg-white text-ink-900 shadow-sm"
              : "text-ink-600 hover:text-ink-900",
          ].join(" ")}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
