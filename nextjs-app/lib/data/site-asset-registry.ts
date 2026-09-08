export type SiteAssetSlot = {
  key: string;
  label: string;
  hint: string;
  defaultUrl: string; // bundled fallback shown when no admin override exists
  accept: string; // input[accept] + allowed MIME types
  buildTime?: boolean; // written to app/icon.png or app/apple-icon.png instead of /public/uploads
};

export const siteAssetRegistry: SiteAssetSlot[] = [
  {
    key: "logo-mark",
    label: "Logo Mark",
    hint: "The icon alone, no wordmark — shown ~36px tall in the header. PNG or WEBP, transparent, near-square (min 800×720).",
    defaultUrl: "/brand/logo-mark.webp",
    accept: "image/png,image/webp",
  },
  {
    key: "logo-full",
    label: "Full Logo Lockup",
    hint: "Icon + wordmark, white-on-transparent — sits on the navy footer. PNG or WEBP (min 2400×1140).",
    defaultUrl: "/brand/logo-full-white.webp",
    accept: "image/png,image/webp",
  },
  {
    key: "og-image",
    label: "Social Share Image",
    hint: "Shown when a page link is shared (WhatsApp, LinkedIn…). PNG, exactly 1200×630.",
    defaultUrl: "/brand/og-image.png",
    accept: "image/png",
  },
  {
    key: "qr-code",
    label: "QR Code",
    hint: "Shown on the Contact page. PNG, square. Replace if contact details change.",
    defaultUrl: "/brand/qr-code.png",
    accept: "image/png",
  },
  {
    key: "favicon",
    label: "Favicon",
    hint: "Browser tab icon. PNG, exactly 512×512. Requires a rebuild + redeploy to take effect.",
    defaultUrl: "/icon.png",
    accept: "image/png",
    buildTime: true,
  },
  {
    key: "apple-icon",
    label: "Apple Touch Icon",
    hint: "iOS home-screen icon. PNG, exactly 180×180, no rounded corners baked in. Requires a rebuild + redeploy to take effect.",
    defaultUrl: "/apple-icon.png",
    accept: "image/png",
    buildTime: true,
  },
];

export const siteAssetRegistryByKey = Object.fromEntries(siteAssetRegistry.map((s) => [s.key, s]));
