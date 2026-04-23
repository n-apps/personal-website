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
      className="flex cursor-pointer items-center gap-2 text-sm text-ink-900"
    >
      <span className="relative inline-flex h-4 w-4 items-center justify-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer absolute inset-0 h-4 w-4 cursor-pointer appearance-none rounded-[4px] border border-line bg-white checked:border-[#0088ff] checked:bg-[#0088ff]"
        />
        <svg
          viewBox="0 0 16 16"
          className="pointer-events-none relative h-3 w-3 stroke-white opacity-0 peer-checked:opacity-100"
          fill="none"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 8.5 6.5 12 13 4.5" />
        </svg>
      </span>
      <span>{label}</span>
    </label>
  );
}
