import { locales, type Locale } from "./config";

/** Given the current pathname (e.g. /en/products/pvc) and a target locale,
 * returns the equivalent path in that locale (e.g. /fr/products/pvc). */
export function switchLocalePath(pathname: string, target: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && (locales as readonly string[]).includes(segments[0])) {
    segments[0] = target;
  } else {
    segments.unshift(target);
  }
  return "/" + segments.join("/");
}
