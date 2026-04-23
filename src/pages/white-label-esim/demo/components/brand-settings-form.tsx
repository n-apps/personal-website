import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import type { BrandSettings } from "../customize";
import { Checkbox } from "../ui/checkbox";
import { ToggleSwitch } from "../ui/toggle-switch";

type SectionProps = {
  settings: BrandSettings;
  update: <K extends keyof BrandSettings>(
    key: K,
    value: BrandSettings[K]
  ) => void;
  onSave: () => void;
  onReset: () => void;
  saved: boolean;
  dirty: boolean;
  onScrollPreviewToTop?: () => void;
  onScrollPreviewToBottom?: () => void;
};

/* ─────────────────────────────  Section shell  ───────────────────────────── */

function SectionShell({
  title,
  description,
  children,
  headerActions,
  titleBadge,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  headerActions?: React.ReactNode;
  titleBadge?: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-surface-muted p-7 sm:p-8">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold text-ink-900">{title}</h2>
            {titleBadge}
          </div>
          <p className="mt-1.5 max-w-xl text-[13px] leading-5 text-ink-600">
            {description}
          </p>
        </div>
        {headerActions && (
          <div className="ml-auto shrink-0 pt-0.5">{headerActions}</div>
        )}
      </div>
      <div className="mt-7">{children}</div>
    </section>
  );
}

/* ─────────────────────────────  Section actions  ───────────────────────────── */

function SectionActions({
  onSave,
  onReset,
  saved,
  dirty,
  saveLabel,
}: {
  onSave: () => void;
  onReset: () => void;
  saved: boolean;
  dirty: boolean;
  saveLabel: string;
}) {
  return (
    <div className="mt-7 flex items-center gap-3 border-t border-line pt-6">
      <button
        type="button"
        onClick={onSave}
        className="rounded-lg bg-ink-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-ink-800 active:scale-[0.99]"
      >
        {saved ? "Saved ✓" : saveLabel}
      </button>
      <button
        type="button"
        onClick={onReset}
        disabled={!dirty}
        className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-600 transition hover:text-ink-900 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Reset
      </button>
    </div>
  );
}

/* ─────────────────────────────  Brand Details  ───────────────────────────── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateDetails(settings: BrandSettings): Record<string, string> {
  const errs: Record<string, string> = {};
  if (!settings.brandName.trim()) errs.brandName = "Brand name is required.";
  if (!settings.brandAlias) errs.brandAlias = "Brand alias is required.";
  if (settings.supportEmail && !EMAIL_RE.test(settings.supportEmail))
    errs.supportEmail = "Enter a valid email address.";
  return errs;
}

export function BrandDetailsCard({
  settings,
  update,
  onSave,
  onReset,
  saved,
  dirty,
}: SectionProps) {
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSave = () => {
    const errs = validateDetails(settings);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      if (errs.supportEmail) setAdvancedOpen(true);
      return;
    }
    setErrors({});
    onSave();
  };

  const handleReset = () => {
    setErrors({});
    onReset();
  };

  return (
    <SectionShell
      title="Brand details"
      description="Identify the brand inside YP and on its public surface."
      headerActions={
        <Checkbox
          id="default-brand"
          label="Set as a default brand"
          checked={settings.defaultBrand}
          onChange={(v) => update("defaultBrand", v)}
        />
      }
    >
      <div className="space-y-5">
        <TextField
          label="Brand name"
          required
          placeholder="Acme Mobile"
          value={settings.brandName}
          onChange={(v) => update("brandName", v)}
          error={errors.brandName}
        />
        <TextField
          label="Internal name"
          placeholder="acme-emea"
          helper="Only visible inside YP portal."
          value={settings.internalName}
          onChange={(v) => update("internalName", v)}
        />
        <AliasField
          value={settings.brandAlias}
          onChange={(v) => update("brandAlias", v)}
          error={errors.brandAlias}
        />
      </div>

      {/* Advanced disclosure */}
      <div className="mt-6 border-t border-line pt-5">
        <button
          type="button"
          onClick={() => setAdvancedOpen((v) => !v)}
          aria-expanded={advancedOpen}
          className="flex w-full items-center justify-between text-[13px] font-medium text-ink-900"
        >
          <span className="flex items-center gap-1.5">
            Advanced settings
            <span className="text-ink-500">· customer support</span>
          </span>
          <svg
            viewBox="0 0 16 16"
            className={
              "h-3.5 w-3.5 text-ink-500 transition-transform " +
              (advancedOpen ? "rotate-180" : "")
            }
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m4 6 4 4 4-4" />
          </svg>
        </button>

        {advancedOpen && (
          <div className="mt-5 space-y-5">
            <TextField
              label="Customer support email"
              type="email"
              placeholder="support@company.org"
              value={settings.supportEmail}
              onChange={(v) => update("supportEmail", v)}
              error={errors.supportEmail}
            />
            <TextField
              label="Customer support phone"
              type="text"
              placeholder="+1 555 123 4567"
              value={settings.supportPhone}
              onChange={(v) => update("supportPhone", v)}
            />
          </div>
        )}
      </div>

      <SectionActions
        onSave={handleSave}
        onReset={handleReset}
        saved={saved}
        dirty={dirty}
        saveLabel="Save brand details"
      />
    </SectionShell>
  );
}

/* ─────────────────────────────  Brand Styling  ───────────────────────────── */

function validateStyling(settings: BrandSettings): Record<string, string> {
  const errs: Record<string, string> = {};
  if (settings.brandedEsimEnabled && !/^#[0-9A-Fa-f]{6}$/.test(settings.brandColor))
    errs.brandColor = "Enter a complete hex color (e.g. #FF0000).";
  if (settings.contactEmail && !EMAIL_RE.test(settings.contactEmail))
    errs.contactEmail = "Enter a valid email address.";
  if (settings.privacyPolicyUrl && !/^https?:\/\//.test(settings.privacyPolicyUrl))
    errs.privacyPolicyUrl = "URL must start with http:// or https://.";
  if (settings.termsOfUsageUrl && !/^https?:\/\//.test(settings.termsOfUsageUrl))
    errs.termsOfUsageUrl = "URL must start with http:// or https://.";
  return errs;
}

export function BrandStylingCard({
  settings,
  update,
  onSave,
  onReset,
  saved,
  dirty,
  onScrollPreviewToTop,
  onScrollPreviewToBottom,
}: SectionProps) {
  const branded = settings.brandedEsimEnabled;

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSave = () => {
    const errs = validateStyling(settings);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    onSave();
  };

  const handleReset = () => {
    setErrors({});
    onReset();
  };

  return (
    <SectionShell
      title="Brand styling"
      description="These assets help customers recognize your brand and reflect its personality in the eSIM interface and related communications."
      titleBadge={
        <span className="inline-flex items-center gap-1.5 text-[11px] tracking-wide text-ink-500 uppercase">
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-3.5 w-3.5 text-emerald-600"
          >
            <path
              fillRule="evenodd"
              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.22-9.72a.75.75 0 0 0-1.06-1.06L6.75 7.63 5.84 6.72a.75.75 0 0 0-1.06 1.06l1.44 1.44a.75.75 0 0 0 1.06 0l3.94-3.94Z"
              clipRule="evenodd"
            />
          </svg>
          Included in your plan
        </span>
      }
    >
      {/* eSIM toggle */}
      <div className="flex items-center justify-between gap-4">
        <span className="text-[13px] font-medium text-ink-900">
          Branded eSIM details
        </span>
        <ToggleSwitch
          checked={branded}
          onChange={(v) => update("brandedEsimEnabled", v)}
          label="Branded eSIM details"
        />
      </div>

      {/* Styling fields — disabled when branded toggle is off */}
      <div
        className={
          "mt-6 transition-opacity " +
          (!branded ? "pointer-events-none select-none opacity-50" : "")
        }
        aria-disabled={!branded || undefined}
      >
        <div className="space-y-6">
          <FileField
            label="Logo"
            helper="PNG or JPG, recommended 240×120 px"
            fileName={settings.logoFileName}
            onSelect={(dataUrl, name) => {
              update("logoDataUrl", dataUrl);
              update("logoFileName", name);
            }}
            onClear={() => {
              update("logoDataUrl", null);
              update("logoFileName", "");
            }}
            onScrollToTop={onScrollPreviewToTop}
          />

          <ColorField
            label="Brand (background) color"
            required
            value={settings.brandColor}
            onChange={(v) => update("brandColor", v)}
            onScrollToTop={onScrollPreviewToTop}
            error={errors.brandColor}
          />

          <FileField
            label="Banner (hero) image"
            helper="PNG or JPG, recommended 1200×600 px"
            fileName={settings.bannerFileName}
            onSelect={(dataUrl, name) => {
              update("bannerDataUrl", dataUrl);
              update("bannerFileName", name);
            }}
            onClear={() => {
              update("bannerDataUrl", null);
              update("bannerFileName", "");
            }}
            onScrollToTop={onScrollPreviewToTop}
          />

          <Checkbox
            id="include-yesim-promotion"
            label="Include Yesim promotion"
            checked={settings.includeYesimPromotion}
            onChange={(v) => update("includeYesimPromotion", v)}
          />
        </div>

        <div className="my-7 h-px bg-line" />

        <div className="space-y-5">
          <TextField
            label="Contact email"
            type="email"
            placeholder="example@company.org"
            value={settings.contactEmail}
            onChange={(v) => update("contactEmail", v)}
            onFocus={onScrollPreviewToBottom}
            error={errors.contactEmail}
          />
          <TextField
            label="Privacy policy link"
            type="url"
            placeholder="https://"
            value={settings.privacyPolicyUrl}
            onChange={(v) => update("privacyPolicyUrl", v)}
            onFocus={onScrollPreviewToBottom}
            error={errors.privacyPolicyUrl}
          />
          <TextField
            label="Terms of usage link"
            type="url"
            placeholder="https://"
            value={settings.termsOfUsageUrl}
            onChange={(v) => update("termsOfUsageUrl", v)}
            onFocus={onScrollPreviewToBottom}
            error={errors.termsOfUsageUrl}
          />
        </div>
      </div>

      <SectionActions
        onSave={handleSave}
        onReset={handleReset}
        saved={saved}
        dirty={dirty}
        saveLabel="Save brand styling"
      />
    </SectionShell>
  );
}

/* ─────────────────────────────  Field components  ───────────────────────────── */
/* These are unchanged from the original file. */

function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor?: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[13px] font-medium text-ink-900"
    >
      {children}
      {required && <span className="ml-0.5 text-[#c70036]">*</span>}
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  helper,
  required,
  type = "text",
  onFocus,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  helper?: string;
  required?: boolean;
  type?: "text" | "email" | "url";
  onFocus?: () => void;
  error?: string;
}) {
  const id = label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className="space-y-1.5">
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        className={
          "block h-10 w-full rounded-lg border bg-white px-3 text-sm text-ink-900 placeholder:text-ink-500/70 focus:outline-none " +
          (error
            ? "border-[#c70036] ring-1 ring-[#c70036] focus:border-[#c70036] focus:ring-[#c70036]/15"
            : "border-line focus:border-[#0088ff] focus:ring-2 focus:ring-[#0088ff]/15")
        }
      />
      {helper && <p className="text-[12px] text-ink-500">{helper}</p>}
      {error && <p className="text-[12px] text-[#c70036]">{error}</p>}
    </div>
  );
}

function AliasField({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const id = "brand-alias";
  return (
    <div className="space-y-1.5">
      <FieldLabel htmlFor={id} required>
        Brand alias
      </FieldLabel>
      <div
        className={
          "flex h-10 w-full items-center overflow-hidden rounded-lg border bg-white focus-within:ring-2 " +
          (error
            ? "border-[#c70036] ring-1 ring-[#c70036] focus-within:border-[#c70036] focus-within:ring-[#c70036]/15"
            : "border-line focus-within:border-[#0088ff] focus-within:ring-[#0088ff]/15")
        }
      >
        <input
          id={id}
          type="text"
          value={value}
          placeholder="acme"
          onChange={(e) =>
            onChange(
              e.target.value
                .toLowerCase()
                .replace(/[^a-z0-9-]/g, "")
                .slice(0, 32)
            )
          }
          className="h-full flex-1 bg-white px-3 text-sm text-ink-900 placeholder:text-ink-500/70 focus:outline-none"
        />
        <span className="flex h-full items-center border-l border-line bg-surface-field px-3 font-mono text-[12px] text-ink-600">
          .cloud-esim.me
        </span>
      </div>
      <p className="text-[12px] text-ink-500">
        Used for the customer subdomain and the partner API. Lowercase letters,
        numbers and hyphens only.
      </p>
      {error && <p className="text-[12px] text-[#c70036]">{error}</p>}
    </div>
  );
}

function FileField({
  label,
  helper,
  fileName,
  onSelect,
  onClear,
  onScrollToTop,
}: {
  label: string;
  helper: string;
  fileName: string;
  onSelect: (dataUrl: string, name: string) => void;
  onClear: () => void;
  onScrollToTop?: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const id = label.replace(/\s+/g, "-").toLowerCase();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onSelect(String(reader.result), file.name);
      onScrollToTop?.();
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-1.5">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="flex h-10 w-full items-center overflow-hidden rounded-lg border border-line bg-white">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-full w-24 shrink-0 items-center justify-center border-r border-line bg-surface-field px-3 text-[13px] font-medium text-ink-900 transition hover:bg-line/60"
        >
          Choose file
        </button>
        <span className="flex-1 truncate px-3 text-[13px] text-ink-500">
          {fileName || "No file chosen"}
        </span>
        {fileName && (
          <button
            type="button"
            aria-label="Remove file"
            onClick={onClear}
            className="mr-2 grid h-6 w-6 place-items-center rounded text-ink-500 hover:bg-surface-field hover:text-ink-900"
          >
            <svg
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
            >
              <path d="m4 4 8 8M12 4l-8 8" />
            </svg>
          </button>
        )}
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          onChange={handleChange}
        />
      </div>
      <p className="text-[12px] text-ink-500">{helper}</p>
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
  required,
  onScrollToTop,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  onScrollToTop?: () => void;
  error?: string;
}) {
  const id = label.replace(/\s+/g, "-").toLowerCase();
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open, handleClickOutside]);

  return (
    <div className="space-y-1.5">
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <div className="relative" ref={popoverRef}>
        <div
          className={
            "flex h-10 w-full items-center overflow-hidden rounded-lg border bg-white " +
            (error ? "border-[#c70036] ring-1 ring-[#c70036]" : "border-line")
          }
        >
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="h-10 w-24 shrink-0 border-r border-line"
            style={{ backgroundColor: value }}
            aria-label="Open color picker"
          />
          <input
            id={id}
            aria-label={`${label} hex value`}
            value={value}
            onChange={(e) => {
              const v = e.target.value.toUpperCase();
              if (/^#?[0-9A-F]{0,6}$/.test(v)) {
                onChange(v.startsWith("#") ? v : `#${v}`);
                onScrollToTop?.();
              }
            }}
            className="h-full flex-1 bg-white px-3 font-mono text-[13px] text-ink-900 focus:outline-none"
          />
        </div>
        {open && (
          <div className="absolute left-0 top-full z-50 mt-2 rounded-xl border border-line bg-white p-3 shadow-card">
            <HexColorPicker
              color={value}
              onChange={(c) => {
                onChange(c.toUpperCase());
                onScrollToTop?.();
              }}
            />
          </div>
        )}
      </div>
      {error && <p className="text-[12px] text-[#c70036]">{error}</p>}
    </div>
  );
}
