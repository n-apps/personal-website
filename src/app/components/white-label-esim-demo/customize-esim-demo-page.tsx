import { useState } from "react";

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

// Skeleton — filled out in a later task. Keeps the type exported so
// phone-preview and brand-settings-form can import it now.
export function CustomizeEsimDemoPage() {
  const [settings] = useState<BrandSettings>(defaultBrandSettings);
  return (
    <main className="min-h-screen bg-white p-8">
      <p className="text-ink-600 text-sm">Customize eSIM demo — stub (settings: {Object.keys(settings).length} keys)</p>
    </main>
  );
}
