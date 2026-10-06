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
    hint: "Header logo (icon, or icon + wordmark) — shown ~48px tall. PNG or WEBP on a transparent background; empty transparent margins are trimmed automatically, so no cropping or resizing is needed.",
    defaultUrl: "/brand/logo-mark.webp",
    accept: "image/png,image/webp",
  },
  {
    key: "logo-full",
    label: "Full Logo Lockup",
    hint: "Icon + wordmark, white-on-transparent — sits on the navy footer. PNG or WEBP; empty transparent margins are trimmed automatically, no resizing needed.",
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
  // QR code has locale-specific text baked into the artwork, so it's one
  // slot per language rather than a single global image (see
  // qrCodeLocaleSlots below, used to group these 3 in the admin UI).
  {
    key: "qr-code-en",
    label: "QR Code (English)",
    hint: "Shown on the Contact page for English visitors. PNG, square.",
    defaultUrl: "/brand/qr-code-en.png",
    accept: "image/png",
  },
  {
    key: "qr-code-fr",
    label: "QR Code (Français)",
    hint: "Shown on the Contact page for French visitors. PNG, square.",
    defaultUrl: "/brand/qr-code-fr.png",
    accept: "image/png",
  },
  {
    key: "qr-code-ar",
    label: "QR Code (العربية)",
    hint: "Shown on the Contact page for Arabic visitors. PNG, square.",
    defaultUrl: "/brand/qr-code-ar.png",
    accept: "image/png",
  },
];

export const siteAssetRegistryByKey = Object.fromEntries(siteAssetRegistry.map((s) => [s.key, s]));
