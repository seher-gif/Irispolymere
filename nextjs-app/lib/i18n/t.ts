import type { Dictionary } from "./get-dictionary";

export function tFrom(dict: Dictionary) {
  return (key: string, fallback?: string) => dict[key] ?? fallback ?? key;
}
export type TFunc = ReturnType<typeof tFrom>;
