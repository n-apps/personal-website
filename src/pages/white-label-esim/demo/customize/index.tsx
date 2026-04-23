import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { BrandDetailsCard, BrandStylingCard } from "../components/brand-settings-form";
import { PhonePreview } from "../components/phone-preview";
import { SegmentedControl } from "../ui/segmented-control";
import { DemoNavbar } from "../components/demo-navbar";

export type BrandSettings = {
  // Brand details
  brandName: string;
  internalName: string;
  brandAlias: string;
  supportEmail: string;
  supportPhone: string;
  defaultBrand: boolean;
  // eSIM settings
  brandedEsimEnabled: boolean;
  // Brand styling
  logoDataUrl: string | null;
  logoFileName: string;
  brandColor: string;
  bannerDataUrl: string | null;
  bannerFileName: string;
  includeYesimPromotion: boolean;
  contactEmail: string;
  privacyPolicyUrl: string;
  termsOfUsageUrl: string;
};

export const defaultBrandSettings: BrandSettings = {
  brandName: "",
  internalName: "",
  brandAlias: "",
  supportEmail: "",
  supportPhone: "",
  defaultBrand: false,
  brandedEsimEnabled: false,
  logoDataUrl: null,
  logoFileName: "",
  brandColor: "#0BBCD6",
  bannerDataUrl: null,
  bannerFileName: "",
  includeYesimPromotion: true,
  contactEmail: "",
  privacyPolicyUrl: "",
  termsOfUsageUrl: "",
};

const DETAILS_KEYS: (keyof BrandSettings)[] = [
  "brandName",
  "internalName",
  "brandAlias",
  "supportEmail",
  "supportPhone",
  "defaultBrand",
];

const STYLING_KEYS: (keyof BrandSettings)[] = [
  "brandedEsimEnabled",
  "logoDataUrl",
  "logoFileName",
  "brandColor",
  "bannerDataUrl",
  "bannerFileName",
  "includeYesimPromotion",
  "contactEmail",
  "privacyPolicyUrl",
  "termsOfUsageUrl",
];

export function CustomizeEsimDemoPage() {
  const [settings, setSettings] = useState<BrandSettings>(defaultBrandSettings);
  const [activeTab, setActiveTab] = useState<"details" | "styling">("details");
  const [detailsSavedAt, setDetailsSavedAt] = useState<number | null>(null);
  const [stylingSavedAt, setStylingSavedAt] = useState<number | null>(null);

  const scrollToTopRef = useRef<(() => void) | null>(null);
  const scrollToBottomRef = useRef<(() => void) | null>(null);
  const handleRegisterScroll = useCallback(
    (fns: { scrollToTop: () => void; scrollToBottom: () => void }) => {
      scrollToTopRef.current = fns.scrollToTop;
      scrollToBottomRef.current = fns.scrollToBottom;
    },
    []
  );
  const scrollPreviewToTop = useCallback(() => scrollToTopRef.current?.(), []);
  const scrollPreviewToBottom = useCallback(
    () => scrollToBottomRef.current?.(),
    []
  );

  const update = <K extends keyof BrandSettings>(
    key: K,
    value: BrandSettings[K]
  ) => setSettings((s) => ({ ...s, [key]: value }));

  const isDetailsDirty = useMemo(
    () => DETAILS_KEYS.some((k) => settings[k] !== defaultBrandSettings[k]),
    [settings]
  );

  const isStylingDirty = useMemo(
    () => STYLING_KEYS.some((k) => settings[k] !== defaultBrandSettings[k]),
    [settings]
  );

  useEffect(() => {
    if (!isDetailsDirty && !isStylingDirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDetailsDirty, isStylingDirty]);

  const handleSaveDetails = () => {
    setDetailsSavedAt(Date.now());
    window.setTimeout(() => setDetailsSavedAt(null), 2400);
  };

  const handleSaveStyling = () => {
    setStylingSavedAt(Date.now());
    window.setTimeout(() => setStylingSavedAt(null), 2400);
  };

  const handleResetDetails = () => {
    setSettings((s) => ({
      ...s,
      ...Object.fromEntries(DETAILS_KEYS.map((k) => [k, defaultBrandSettings[k]])),
    }));
    setDetailsSavedAt(null);
  };

  const handleResetStyling = () => {
    setSettings((s) => ({
      ...s,
      ...Object.fromEntries(STYLING_KEYS.map((k) => [k, defaultBrandSettings[k]])),
    }));
    setStylingSavedAt(null);
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-12">
        {/* Back to case study */}
        <Link
          to="/work/white-label-esim"
          data-goatcounter-click="white-label-demo-back-to-case-study"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-600 transition hover:text-ink-900"
        >
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 12.5 5.5 8 10 3.5" />
          </svg>
          Back to case study
        </Link>

        {/* Header */}
        <div className="mt-6">
          <DemoNavbar />
        </div>

        {/* Hero */}
        <section className="mt-10 max-w-3xl">
          <Link
            to="/work/white-label-esim/demo"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-600 transition hover:text-ink-900"
          >
            <svg
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 12.5 5.5 8 10 3.5" />
            </svg>
            Company settings
          </Link>
          <h1 className="mt-3 font-display text-[36px] font-semibold leading-[1.15] tracking-tight text-ink-900">
            New brand
          </h1>
          <p className="mt-3 text-[15px] leading-6 text-ink-600">
            Set up the brand identity and decide how eSIM details are presented to your customers
          </p>
        </section>

        {/* Segmented control */}
        <div className="mt-8">
          <SegmentedControl
            options={[
              { value: "details" as const, label: "Brand details" },
              { value: "styling" as const, label: "Brand styling" },
            ]}
            value={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Section content */}
        <section className="mt-6">
          {activeTab === "details" ? (
            <div className="lg:max-w-[calc(100%-420px-24px)]">
              <BrandDetailsCard
                settings={settings}
                update={update}
                onSave={handleSaveDetails}
                onReset={handleResetDetails}
                saved={detailsSavedAt !== null}
                dirty={isDetailsDirty}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
              <BrandStylingCard
                settings={settings}
                update={update}
                onSave={handleSaveStyling}
                onReset={handleResetStyling}
                saved={stylingSavedAt !== null}
                dirty={isStylingDirty}
                onScrollPreviewToTop={scrollPreviewToTop}
                onScrollPreviewToBottom={scrollPreviewToBottom}
              />
              <PhonePreview
                settings={settings}
                onRegisterScroll={handleRegisterScroll}
              />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
