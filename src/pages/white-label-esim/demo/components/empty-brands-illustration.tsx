export function EmptyBrandsIllustration({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {/* Soft background disc */}
      <circle cx="80" cy="80" r="72" fill="#f3f4f6" />

      {/* Back card (offset, lighter) */}
      <rect
        x="38"
        y="44"
        width="80"
        height="56"
        rx="8"
        fill="#ffffff"
        stroke="#e5e7eb"
        strokeWidth="1.5"
      />
      <rect x="50" y="58" width="34" height="6" rx="3" fill="#e5e7eb" />
      <rect x="50" y="72" width="22" height="4" rx="2" fill="#e5e7eb" />

      {/* Front card */}
      <rect
        x="30"
        y="62"
        width="100"
        height="62"
        rx="10"
        fill="#ffffff"
        stroke="#e5e7eb"
        strokeWidth="1.5"
      />

      {/* Color swatch */}
      <rect x="42" y="78" width="28" height="28" rx="6" fill="#0088ff" />
      <circle cx="56" cy="92" r="6" fill="#ffffff" fillOpacity="0.9" />

      {/* Text lines */}
      <rect x="78" y="80" width="44" height="6" rx="3" fill="#101828" />
      <rect x="78" y="92" width="34" height="4" rx="2" fill="#e5e7eb" />
      <rect x="78" y="102" width="28" height="4" rx="2" fill="#e5e7eb" />

      {/* Plus badge */}
      <circle
        cx="120"
        cy="50"
        r="13"
        fill="#0088ff"
        stroke="#ffffff"
        strokeWidth="3"
      />
      <path
        d="M120 44.5v11M114.5 50h11"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
