import { useEffect, useRef, useState } from "react";
import type { BrandSettings } from "./customize-esim-demo-page";

type Props = {
  settings: BrandSettings;
  onRegisterScroll?: (fns: {
    scrollToTop: () => void;
    scrollToBottom: () => void;
  }) => void;
};

// Pencil is the source of truth for these preview sections.
// Use this map to implement or refine the live preview one section at a time.
export const PHONE_PREVIEW_PENCIL_COMPONENTS = [
  {
    id: "WLGld",
    name: "Header",
    implementedAt: "PhoneScreen > header block",
  },
  {
    id: "1Z8Yi",
    name: "S-HI",
    implementedAt: "PhoneScreen > hero/banner block",
  },
  {
    id: "TprOc",
    name: "S-PKGINF",
    implementedAt: "PackageInfoCard",
  },
  {
    id: "FDnmP",
    name: "S-STS",
    implementedAt: "StatusCard",
  },
  {
    id: "Uwxve",
    name: "S–DUSAGE",
    implementedAt: "DataUsageCard",
  },
  {
    id: "61YI3",
    name: "S–INSTALL",
    implementedAt: "InstallationCard",
  },
  {
    id: "qk9iz",
    name: "S-AD01",
    implementedAt: "YesimPromoCard",
  },
  {
    id: "bCEs1",
    name: "S-LNK",
    implementedAt: "ContactCard",
  },
  {
    id: "AHi83",
    name: "Footer",
    implementedAt: "PhoneScreen > footer badge",
  },
] as const;

/* ──────────────  helpers  ────────────── */

function hexToRgb(hex: string): [number, number, number] {
  const m = hex.replace("#", "").match(/^([0-9a-f]{6})$/i);
  if (!m) return [11, 188, 214];
  const v = parseInt(m[1], 16);
  return [(v >> 16) & 0xff, (v >> 8) & 0xff, v & 0xff];
}

function relLuminance([r, g, b]: [number, number, number]) {
  const f = (c: number) => {
    const cs = c / 255;
    return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function readableTextColor(hex: string) {
  return relLuminance(hexToRgb(hex)) > 0.55 ? "#101828" : "#ffffff";
}

/* ──────────────  phone shell  ────────────── */

const YESIM_DEFAULT_ACCENT = "#0088ff";

export function PhonePreview({ settings, onRegisterScroll }: Props) {
  const branded = settings.brandedEsimEnabled;
  const [mode, setMode] = useState<"mobile" | "desktop">("mobile");
  const [isLoading, setIsLoading] = useState(true);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const modeRef = useRef(mode);
  modeRef.current = mode;

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    onRegisterScroll?.({
      scrollToTop: () => {
        const el =
          modeRef.current === "mobile"
            ? mobileScrollRef.current
            : desktopScrollRef.current;
        el?.scrollTo({ top: 0, behavior: "smooth" });
      },
      scrollToBottom: () => {
        const el =
          modeRef.current === "mobile"
            ? mobileScrollRef.current
            : desktopScrollRef.current;
        el?.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      },
    });
  }, [onRegisterScroll]);

  return (
    <aside className="flex w-[704px] flex-col items-center justify-center gap-4 rounded-2xl bg-surface-muted p-8">
      <span className="text-[12px] uppercase tracking-[0.08em] text-ink-500">
        Live preview {branded ? (settings.brandName ? `· ${settings.brandName}` : "· branded") : "· unbranded"}
      </span>

      {/* Device toggle */}
      <DeviceToggle value={mode} onChange={setMode} />

      {mode === "mobile" ? (
        <div className="relative h-[612px] w-[284px] rounded-[40px] bg-black p-2 shadow-phone">
          {/* Notch */}
          <div className="pointer-events-none absolute left-1/2 top-1.5 z-10 h-[22px] w-[96px] -translate-x-1/2 rounded-b-[14px] rounded-t-[10px] bg-black" />

          {/* Screen */}
          <div className="relative h-full w-full overflow-hidden rounded-[32px] bg-white">
            <div
              className={`pointer-events-none absolute inset-0 z-20 transition-opacity duration-500 ease-out ${
                isLoading ? "opacity-100" : "opacity-0"
              }`}
            >
              <PhoneScreenSkeleton />
            </div>
            <div
              className={`h-full transition-opacity duration-700 ease-out ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
            >
              <PhoneScreen settings={settings} scrollAreaRef={mobileScrollRef} />
            </div>
          </div>
        </div>
      ) : (
        <DesktopShell settings={settings} scrollAreaRef={desktopScrollRef} isLoading={isLoading} />
      )}
    </aside>
  );
}

/* ──────────────  device toggle  ────────────── */

function DeviceToggle({
  value,
  onChange,
}: {
  value: "mobile" | "desktop";
  onChange: (v: "mobile" | "desktop") => void;
}) {
  return (
    <div className="relative flex rounded-[10px] bg-[#e8e8e8] p-[3px]">
      {/* Sliding highlight */}
      <div
        className="pointer-events-none absolute top-[3px] h-[calc(100%-6px)] w-[calc(50%-3px)] rounded-[8px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-[left] duration-200 ease-in-out"
        style={{ left: value === "desktop" ? "3px" : "50%" }}
      />
      <button
        type="button"
        aria-label="Desktop preview"
        onClick={() => onChange("desktop")}
        className="relative z-[1] grid h-9 w-10 place-items-center rounded-[8px]"
      >
        <DesktopIcon active={value === "desktop"} />
      </button>
      <button
        type="button"
        aria-label="Mobile preview"
        onClick={() => onChange("mobile")}
        className="relative z-[1] grid h-9 w-10 place-items-center rounded-[8px]"
      >
        <MobileIcon active={value === "mobile"} />
      </button>
    </div>
  );
}

/* ──────────────  desktop shell  ────────────── */

function DesktopShell({
  settings,
  scrollAreaRef,
  isLoading,
}: Props & { scrollAreaRef?: React.RefObject<HTMLDivElement | null>; isLoading?: boolean }) {
  return (
    <div className="w-[640px] overflow-hidden rounded-[12px] bg-[#c8c8c8] shadow-phone">
      {/* Browser chrome */}
      <div className="flex h-[32px] items-center gap-2 bg-[#e0e0e0] px-3">
        <div className="flex gap-[5px]">
          <span className="h-[10px] w-[10px] rounded-full bg-[#ff5f57]" />
          <span className="h-[10px] w-[10px] rounded-full bg-[#febc2e]" />
          <span className="h-[10px] w-[10px] rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex h-[20px] w-[260px] items-center justify-center rounded-[4px] bg-white/70 text-[9px] text-ink-500">
          esimpass.cloud
        </div>
      </div>
      {/* Page content */}
      <div
        ref={scrollAreaRef}
        className="relative flex max-h-[580px] justify-center overflow-y-auto bg-[#c8c8c8] p-6"
      >
        <div
          className={`pointer-events-none absolute inset-0 z-10 flex justify-center p-6 transition-opacity duration-500 ease-out ${
            isLoading ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-[380px]">
            <DesktopSkeleton />
          </div>
        </div>
        <div
          className={`w-[380px] transition-opacity duration-700 ease-out ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        >
          <PhoneScreen settings={settings} constrainHeight={false} />
        </div>
      </div>
    </div>
  );
}

/* ──────────────  screen  ────────────── */

function PhoneScreen({
  settings,
  scrollAreaRef,
  constrainHeight = true,
}: Props & {
  scrollAreaRef?: React.RefObject<HTMLDivElement | null>;
  constrainHeight?: boolean;
}) {
  const branded = settings.brandedEsimEnabled;
  // When the brand toggle is off, fall back to the Yesim default look so
  // operators can preview exactly what unbranded customers will see.
  const accent = branded
    ? settings.brandColor || "#0BBCD6"
    : YESIM_DEFAULT_ACCENT;
  const logoDataUrl = branded ? settings.logoDataUrl : null;
  const bannerDataUrl = branded ? settings.bannerDataUrl : null;
  const includePromotion = branded ? settings.includeYesimPromotion : true;
  const contactEmail = branded ? settings.contactEmail : "";
  const privacyPolicyUrl = branded ? settings.privacyPolicyUrl : "";
  const termsOfUsageUrl = branded ? settings.termsOfUsageUrl : "";

  const textOnAccent = readableTextColor(accent);
  const hasContact = !!contactEmail || !!privacyPolicyUrl || !!termsOfUsageUrl;

  return (
    <div
      className={`flex w-full flex-col${constrainHeight ? " h-full" : ""}`}
      style={{ backgroundColor: accent }}
    >
      {/* Status bar */}
      <div
        className="flex h-9 shrink-0 items-end justify-between px-6 pb-1 pt-2 text-[11px] font-semibold"
        style={{ color: textOnAccent }}
      >
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <SignalIcon />
          <WifiIcon />
          <BatteryIcon />
        </div>
      </div>

      {/* Scroll area */}
      <div
        ref={scrollAreaRef}
        className={`flex-1 px-2 pb-4${constrainHeight ? " overflow-y-auto" : ""}`}
      >
        <div className="flex flex-col gap-2">
          {/* Header / Pencil source: WLGld / Header */}
          <div className="flex h-[60px] items-center justify-center border-b border-white/20 px-[11px]">
            {logoDataUrl ? (
              <div className="flex h-[27px] w-[55px] items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logoDataUrl ?? undefined}
                  alt="Brand logo"
                  className="h-[27px] w-[55px] object-contain"
                />
              </div>
            ) : (
              <div className="flex h-[27px] w-[55px] items-center justify-center">
                <span
                  className="font-display text-[13px] font-bold tracking-tight"
                  style={{ color: textOnAccent }}
                >
                  {branded ? (settings.brandName || "eSIM") : "yesim"}
                </span>
              </div>
            )}
          </div>

          {/* Hero / Pencil source: 1Z8Yi / S-HI */}
          {bannerDataUrl && (
            <div className="overflow-hidden rounded-[11px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={bannerDataUrl}
                alt="Brand banner"
                className="block h-[124px] w-full object-cover"
              />
            </div>
          )}

          {/* Card stack */}
          <PackageInfoCard />
          <StatusCard accent={accent} />
          <DataUsageCard />
          <InstallationCard />

          {includePromotion && <YesimPromoCard />}

          {hasContact && (
            <ContactCard
              email={contactEmail}
              privacy={privacyPolicyUrl}
              terms={termsOfUsageUrl}
            />
          )}

          {/* Footer / Pencil source: AHi83 / Footer */}
          {includePromotion && (
            <div className="flex h-[38px] items-center justify-center border-t border-white/20">
              <div
                className="rounded-full border border-white/20 px-[10px] py-1 text-center text-[8px] font-medium leading-[1.33]"
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: textOnAccent,
                }}
              >
                Powered by Yesim
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ──────────────  skeletons  ────────────── */

function ShimmerStyle() {
  return (
    <style>{`
      @keyframes skeleton-sweep {
        0%   { background-position: -200% 0; }
        100% { background-position:  200% 0; }
      }
      .skeleton-shimmer {
        background: #e5e7eb;
        background-image: linear-gradient(
          90deg,
          #e5e7eb 0%,
          #f3f4f6 45%,
          #e5e7eb 90%
        );
        background-size: 200% 100%;
        animation: skeleton-sweep 1.5s infinite linear;
      }
    `}</style>
  );
}

function PhoneScreenSkeleton() {
  return (
    <>
      <ShimmerStyle />
      <div className="flex h-full w-full flex-col bg-[#d1d5db]">
        {/* Status bar */}
        <div className="flex h-9 shrink-0 items-end justify-between px-6 pb-1 pt-2">
          <div className="skeleton-shimmer h-2.5 w-6 rounded" />
          <div className="skeleton-shimmer h-2.5 w-12 rounded" />
        </div>
        {/* Header */}
        <div className="flex h-[60px] items-center justify-center border-b border-white/20">
          <div className="skeleton-shimmer h-4 w-10 rounded-md" />
        </div>
        {/* Cards */}
        <div className="flex flex-1 flex-col gap-2 px-2 pb-4 pt-2">
          <div className="skeleton-shimmer h-[100px] rounded-[11px]" style={{ animationDelay: "0.05s" }} />
          <div className="skeleton-shimmer h-[56px] rounded-[11px]" style={{ animationDelay: "0.12s" }} />
          <div className="skeleton-shimmer h-[120px] rounded-[11px]" style={{ animationDelay: "0.20s" }} />
          <div className="skeleton-shimmer h-[90px] rounded-[11px]" style={{ animationDelay: "0.28s" }} />
          <div className="skeleton-shimmer h-[64px] rounded-[11px]" style={{ animationDelay: "0.35s" }} />
        </div>
      </div>
    </>
  );
}

function DesktopSkeleton() {
  return (
    <>
      <ShimmerStyle />
      <div className="flex flex-col rounded-[11px] overflow-hidden">
        {/* Top accent strip */}
        <div className="skeleton-shimmer h-[52px] rounded-t-[11px]" />
        {/* Cards */}
        <div className="flex flex-col gap-3 bg-[#d1d5db] p-3">
          <div className="skeleton-shimmer h-[120px] rounded-[11px]" style={{ animationDelay: "0.05s" }} />
          <div className="skeleton-shimmer h-[72px] rounded-[11px]" style={{ animationDelay: "0.12s" }} />
          <div className="skeleton-shimmer h-[144px] rounded-[11px]" style={{ animationDelay: "0.20s" }} />
          <div className="skeleton-shimmer h-[110px] rounded-[11px]" style={{ animationDelay: "0.28s" }} />
          <div className="skeleton-shimmer h-[80px] rounded-[11px]" style={{ animationDelay: "0.35s" }} />
        </div>
      </div>
    </>
  );
}

/* ──────────────  cards  ────────────── */

function PackageInfoCard() {
  return (
    /* Pencil source: TprOc / S-PKGINF */
    <section className="overflow-hidden rounded-[11px] bg-white">
      <div className="flex items-start justify-between gap-2 px-[14px] pb-[10px] pt-[14px]">
        <h3 className="text-[15px] font-bold leading-[1.05] text-ink-900">
          Global eSIM
        </h3>
      </div>
      <div className="flex flex-col gap-2 px-[14px] pb-[14px] pt-0">
        <p className="text-[10px] font-medium text-ink-500">Package info</p>
        <div className="flex flex-col gap-1">
          <InfoListItem value="5 GB" label="Data amount" />
          <InfoListItem value="3 days" label="Validity" />
          <InfoListItem value="147 countries" label="Coverage" />
        </div>
      </div>
    </section>
  );
}

function StatusCard({ accent }: { accent: string }) {
  return (
    /* Pencil source: FDnmP / S-STS */
    <section className="flex flex-col gap-[5px] rounded-[11px] bg-white px-[14px] py-[12px]">
      <p className="text-[10px] font-medium text-ink-500">
        eSIM status
      </p>
      <div className="flex items-center gap-[5px]">
        <span className="grid h-[11px] w-[11px] place-items-center rounded-full bg-[#007a55]">
          <svg
            viewBox="0 0 12 12"
            className="h-[7px] w-[7px]"
            fill="none"
            stroke="#ffffff"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.5 6.5 5 9l4.5-5" />
          </svg>
        </span>
        <span className="text-[10px] font-bold text-[#007a55]">Installed</span>
      </div>
    </section>
  );
}

function DataUsageCard() {
  return (
    /* Pencil source: Uwxve / S–DUSAGE */
    <section className="flex flex-col gap-[6px] rounded-[11px] bg-white px-[14px] py-[12px]">
      <p className="text-[10px] font-medium text-ink-500">
        data usage
      </p>
      <div className="flex items-end justify-between">
        <span className="text-[14px] font-bold text-ink-900">
          5 GB data left
        </span>
        <span className="text-[8px] text-ink-500">out of 5 GB</span>
      </div>
      <div className="h-[9px] w-full rounded-full bg-gradient-to-r from-[#28a745] to-[#11998e]" />
      <button
        type="button"
        className="mt-2 w-full rounded-[12px] bg-[#1e2939] px-4 py-[10px] text-[11px] font-medium leading-none text-white shadow-[0_1px_4px_rgba(29,41,61,0.12)]"
      >
        Top up eSIM
      </button>
      <div className="mt-1 flex items-center justify-between gap-2">
        <div className="flex flex-col gap-px">
          <span className="text-[9px] text-ink-600">Expires in 6 days, 23 hours</span>
          <p className="text-[8px] text-ink-600">25 Oct 2025 00:34 UTC</p>
        </div>
        <InfoIcon />
      </div>
    </section>
  );
}

function InstallationCard() {
  return (
    /* Pencil source: 61YI3 / S–INSTALL */
    <section className="flex flex-col gap-2 rounded-[11px] bg-white px-[14px] py-[12px]">
      <p className="text-[10px] font-medium text-ink-500">Installation</p>
      <div className="flex flex-col gap-5 rounded-[8px] bg-[#0821251f] px-4 py-5">
        <div className="flex items-start gap-2">
          <div className="grid h-7 w-7 shrink-0 place-items-center rounded-[6px] bg-[#f3f4f6]">
            <QrIcon />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="text-[8px] leading-[1.25] text-ink-600">
              Follow the step-by-step guide below to install and activate your
              eSIM
            </p>
          </div>
        </div>
        <button
          type="button"
          className="w-full rounded-[12px] bg-[#1e2939] px-4 py-[10px] text-[9px] font-medium leading-none text-white shadow-[0_1px_4px_rgba(29,41,61,0.12)]"
        >
          View installation instructions
        </button>
      </div>
      <div className="flex flex-col gap-px">
        <p className="font-mono text-[8px] text-ink-900">8937204017187875409</p>
        <p className="text-[8px] text-ink-600">ICCID number</p>
      </div>
    </section>
  );
}

function YesimPromoCard() {
  return (
    /* Pencil source: qk9iz / S-AD01 */
    <section className="overflow-hidden rounded-[11px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/pencil-assets/qk9iz.png"
        alt="Yesim promotion"
        className="block h-auto w-full"
      />
    </section>
  );
}

function ContactCard({
  email,
  privacy,
  terms,
}: {
  email: string;
  privacy: string;
  terms: string;
}) {
  return (
    /* Pencil source: bCEs1 / S-LNK */
    <section className="flex flex-col gap-2 rounded-[11px] bg-white px-[14px] py-[12px]">
      <p className="text-[10px] font-medium text-ink-500">
        Contact us
      </p>
      <div className="flex flex-col gap-2 text-[9px] leading-[1.15]">
        {email && (
          <a
            href={`mailto:${email}`}
            className="block truncate text-[#1e3a8a] hover:underline"
          >
            {email}
          </a>
        )}
        {privacy && (
          <a
            href={privacy}
            target="_blank"
            rel="noreferrer"
            className="block truncate text-[#1e3a8a] hover:underline"
          >
            Privacy policy
          </a>
        )}
        {terms && (
          <a
            href={terms}
            target="_blank"
            rel="noreferrer"
            className="block truncate text-[#1e3a8a] hover:underline"
          >
            Terms of usage
          </a>
        )}
      </div>
    </section>
  );
}

/* ──────────────  device toggle icons  ────────────── */

function DesktopIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-[18px] w-[18px] ${active ? "text-ink-900" : "text-ink-500"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="16" height="11" rx="1.5" />
      <path d="M7 17h6M10 14v3" />
    </svg>
  );
}

function MobileIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-[18px] w-[18px] ${active ? "text-ink-900" : "text-ink-500"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="2" width="10" height="16" rx="2" />
      <circle cx="10" cy="15" r="0.5" fill="currentColor" />
    </svg>
  );
}

/* ──────────────  primitives  ────────────── */

function InfoListItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[14px] font-bold leading-none text-ink-900">{value}</span>
      <span className="text-[8px] leading-none text-ink-500">{label}</span>
    </div>
  );
}

/* ──────────────  icons  ────────────── */

function SignalIcon() {
  return (
    <svg viewBox="0 0 18 12" className="h-2.5 w-3.5" fill="currentColor">
      <rect x="0" y="8" width="3" height="4" rx="0.5" />
      <rect x="5" y="5" width="3" height="7" rx="0.5" />
      <rect x="10" y="2" width="3" height="10" rx="0.5" />
      <rect x="15" y="0" width="3" height="12" rx="0.5" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg
      viewBox="0 0 16 12"
      className="h-2.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
    >
      <path d="M2 4.5a9 9 0 0 1 12 0" />
      <path d="M4 7a6 6 0 0 1 8 0" />
      <path d="M6 9.5a3 3 0 0 1 4 0" />
      <circle cx="8" cy="11" r="0.6" fill="currentColor" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg viewBox="0 0 24 12" className="h-2.5 w-5" fill="none">
      <rect
        x="0.5"
        y="0.5"
        width="20"
        height="11"
        rx="2.5"
        stroke="currentColor"
      />
      <rect x="2.5" y="2.5" width="16" height="7" rx="1" fill="currentColor" />
      <rect x="21.5" y="4" width="1.5" height="4" rx="0.5" fill="currentColor" />
    </svg>
  );
}

function QrIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M9 3H4.0001C3.44782 3 3.00011 3.4477 3.0001 3.99998L3 9M15.0001 3H20.0001C20.5524 3 21.0001 3.44772 21.0001 4V9M3.00006 15L3.00011 20C3.00012 20.5523 3.44783 21 4.00011 21H9M15.0001 21H20.0001C20.5524 21 21.0001 20.5523 21.0001 20V15"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <rect
          x="7"
          y="7"
          width="3"
          height="3"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linejoin="round"
        />
        <rect
          x="14"
          y="7"
          width="3"
          height="3"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linejoin="round"
        />
        <rect
          x="7"
          y="14"
          width="3"
          height="3"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linejoin="round"
        />
        <rect
          x="14"
          y="14"
          width="0.1"
          height="0.1"
          stroke="currentColor"
          stroke-width="1.50"
        />
        <rect
          className="oi-mini-squre"
          x="14"
          y="17"
          width="0.1"
          height="0.1"
          stroke="currentColor"
          stroke-width="1.50"
        />
        <rect
          x="17"
          y="14"
          width="0.1"
          height="0.1"
          stroke="currentColor"
          stroke-width="1.50"
        />
        <rect
          x="17"
          y="17"
          width="0.1"
          height="0.1"
          stroke="currentColor"
          stroke-width="1.50"
        />
        <rect
          x="15.45"
          y="15.5"
          width="0.1"
          height="0.1"
          stroke="currentColor"
          stroke-width="1.50"
        />
      </g>
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      viewBox="0 0 14 14"
      className="h-[14px] w-[14px] shrink-0 text-[#1e2939]"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
    >
      <circle cx="7" cy="7" r="5.6" />
      <path d="M7 6.5v3.5M7 4.5v.4" strokeLinecap="round" />
    </svg>
  );
}
