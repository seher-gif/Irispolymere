import "server-only";
import type { Locale } from "./config";

const dictionaries: Record<Locale, () => Promise<Record<string, string>>> = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  fr: () => import("./dictionaries/fr.json").then((m) => m.default),
  ar: () => import("./dictionaries/ar.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}

export type Dictionary = Record<string, string>;
