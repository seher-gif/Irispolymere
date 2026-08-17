export const locales = ["en", "fr", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeMeta: Record<Locale, { label: string; native: string; dir: "ltr" | "rtl" }> = {
  en: { label: "English", native: "English", dir: "ltr" },
  fr: { label: "French", native: "Français", dir: "ltr" },
  ar: { label: "Arabic", native: "العربية", dir: "rtl" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
