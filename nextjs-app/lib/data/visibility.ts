import { products, type Product } from "@/lib/data/products";

// Slugs the admin has switched off ("Product Pages" in the admin panel): category slugs
// ("pvc", "masterbatch", "color-masterbatch") and/or product slugs. Hiding a category also hides
// the products inside it.
export const HIDDEN_PAGES_KEY = "hiddenProductPages";

export function isCategoryHidden(hidden: readonly string[], category: string) {
  return hidden.includes(category);
}

export function isProductHidden(hidden: readonly string[], product: Product) {
  return hidden.includes(product.slug) || hidden.includes(product.category);
}

export function visibleProducts(hidden: readonly string[]) {
  return products.filter((p) => !isProductHidden(hidden, p));
}

// nav-data hrefs look like "products/pvc" — the last segment is the category slug.
export function filterProductLinks<T extends { href: string }>(links: T[], hidden: readonly string[]) {
  return links.filter((l) => !isCategoryHidden(hidden, l.href.split("/").pop() ?? ""));
}

// Any /products/<slug> target (category or product).
export function isSlugHidden(hidden: readonly string[], slug: string) {
  const product = products.find((p) => p.slug === slug);
  return product ? isProductHidden(hidden, product) : isCategoryHidden(hidden, slug);
}

// Admin-added categories show text that isn't in the dictionaries. Pass a key prefixed with
// "=" to a translator wrapped by literalT() and it comes back as-is ("=Fillers" → "Fillers").
export function literalT<F extends (key: string) => string>(t: F) {
  return (key: string) => (key.startsWith("=") ? key.slice(1) : t(key));
}
