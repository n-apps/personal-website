import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { Link } from "react-router";
import { BrandDetailsCard, BrandStylingCard } from "../components/brand-settings-form";
import { PhonePreview } from "../components/phone-preview";
import { SegmentedControl } from "../ui/segmented-control";
import { DemoNavbar } from "../components/demo-navbar";

const pageReveal: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const pageRevealReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const revealItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

const revealItemReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const tabContent: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

const tabContentReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

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
  showContacts: boolean;
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
  showContacts: false,
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
  "showContacts",
  "contactEmail",
  "privacyPolicyUrl",
  "termsOfUsageUrl",
];

export function CustomizeEsimDemoPage() {
  const reduceMotion = useReducedMotion();
  const [settings, setSettings] = useState<BrandSettings>(defaultBrandSettings);
  const [activeTab, setActiveTab] = useState<"details" | "styling">("details");
  const [brandCreated, setBrandCreated] = useState(false);
  const [detailsValidationRequest, setDetailsValidationRequest] = useState(0);
  const [continueToStyling, setContinueToStyling] = useState(false);
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
    setBrandCreated(true);
    setDetailsSavedAt(Date.now());
    window.setTimeout(() => setDetailsSavedAt(null), 2400);

    if (continueToStyling) {
      setContinueToStyling(false);
      setActiveTab("styling");
    }
  };

  const handleSaveStyling = () => {
    if (!brandCreated) {
      setContinueToStyling(true);
      setDetailsValidationRequest((request) => request + 1);
      setActiveTab("details");
      return;
    }

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
      <motion.div
        className="mx-auto w-full max-w-[1440px] px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-12"
        variants={reduceMotion ? pageRevealReduced : pageReveal}
        initial="hidden"
        animate="show"
      >
        {/* Back to case study */}
        <motion.div variants={reduceMotion ? revealItemReduced : revealItem}>
          <Link
            to="/work/white-label-esim"
            data-goatcounter-click="white-label-demo-back-to-case-study"
            className="-ms-2 inline-flex min-h-11 select-none items-center gap-1.5 rounded-lg px-2 text-sm font-medium text-ink-600 transition-[background-color,color,scale] duration-150 ease-out hover:bg-surface-field hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-demo-accent/30 active:scale-[0.96]"
          >
            <svg
              aria-hidden="true"
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
        </motion.div>

        {/* Header */}
        <motion.div
          className="mt-6"
          variants={reduceMotion ? revealItemReduced : revealItem}
        >
          <DemoNavbar />
        </motion.div>

        {/* Hero */}
        <motion.section
          className="mt-10 max-w-3xl"
          variants={reduceMotion ? revealItemReduced : revealItem}
        >
          <Link
            to="/work/white-label-esim/demo"
            data-goatcounter-click="white-label-demo-customize-back-to-settings"
            className="-ms-2 inline-flex min-h-11 select-none items-center gap-1.5 rounded-lg px-2 text-sm font-medium text-ink-600 transition-[background-color,color,scale] duration-150 ease-out hover:bg-surface-field hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-demo-accent/30 active:scale-[0.96]"
          >
            <svg
              aria-hidden="true"
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
          <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink-900">
            New brand
          </h1>
          <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-ink-600">
            Set up the brand identity and decide how eSIM details are presented to your customers
          </p>
        </motion.section>

        {/* Segmented control */}
        <motion.div
          className="mt-8"
          variants={reduceMotion ? revealItemReduced : revealItem}
        >
          <SegmentedControl
            options={[
              { value: "details" as const, label: "Brand details" },
              { value: "styling" as const, label: "Brand styling" },
            ]}
            value={activeTab}
            onChange={setActiveTab}
          />
        </motion.div>

        {/* Section content */}
        <motion.section
          className="mt-6"
          variants={reduceMotion ? revealItemReduced : revealItem}
        >
          <AnimatePresence initial={false} mode="wait">
            {activeTab === "details" ? (
              <motion.div
                key="details"
                className="lg:max-w-[calc(100%-420px-24px)]"
                variants={reduceMotion ? tabContentReduced : tabContent}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <BrandDetailsCard
                  settings={settings}
                  update={update}
                  onSave={handleSaveDetails}
                  onReset={handleResetDetails}
                  saved={detailsSavedAt !== null}
                  dirty={isDetailsDirty}
                  validationRequest={detailsValidationRequest}
                  continueToStyling={continueToStyling}
                />
              </motion.div>
            ) : (
              <motion.div
                key="styling"
                className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-start"
                variants={reduceMotion ? tabContentReduced : tabContent}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <BrandStylingCard
                  settings={settings}
                  update={update}
                  onSave={handleSaveStyling}
                  onReset={handleResetStyling}
                  saved={stylingSavedAt !== null}
                  dirty={isStylingDirty}
                  brandCreated={brandCreated}
                  onScrollPreviewToTop={scrollPreviewToTop}
                  onScrollPreviewToBottom={scrollPreviewToBottom}
                />
                <div className="hidden xl:block">
                  <PhonePreview
                    settings={settings}
                    onRegisterScroll={handleRegisterScroll}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        <motion.footer
          className="mt-12 border-t border-line pt-6 text-xs leading-normal text-ink-500 sm:mt-16"
          variants={reduceMotion ? revealItemReduced : revealItem}
        >
          functional prototype for the feature X. v 1.1.0
        </motion.footer>
      </motion.div>
    </main>
  );
}
