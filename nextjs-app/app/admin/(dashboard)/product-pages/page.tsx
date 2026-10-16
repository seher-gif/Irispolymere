import { getDictionary } from "@/lib/i18n/get-dictionary";
import { tFrom } from "@/lib/i18n/t";
import { productsByCategory, type ProductCategory } from "@/lib/data/products";
import { getHiddenProductPages } from "@/lib/content";
import { ProductVisibilityToggle } from "@/components/admin/ProductVisibilityToggle";

export const dynamic = "force-dynamic";

const CATEGORIES: { slug: ProductCategory; titleKey: string }[] = [
  { slug: "pvc", titleKey: "mega.pvc.title" },
  { slug: "masterbatch", titleKey: "mega.masterbatch.title" },
  { slug: "color-masterbatch", titleKey: "mega.colormb.title" },
];

export default async function AdminProductPagesPage() {
  const [dict, hidden] = await Promise.all([getDictionary("en"), getHiddenProductPages()]);
  const t = tFrom(dict);

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Product Pages</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted">
        Choose which product pages appear on the website. A hidden page disappears from the menu, footer, homepage
        cards, category lists and the sitemap, and its address shows "page not found". Hiding a category also hides
        every product inside it. Changes go live immediately.
      </p>
      <div className="mt-6 flex flex-col gap-4">
        {CATEGORIES.map((c) => {
          const catHidden = hidden.includes(c.slug);
          return (
            <div key={c.slug} className="border border-line bg-white">
              <div className="flex items-center justify-between gap-4 border-b border-line p-4">
                <div>
                  <h2 className="text-sm font-bold text-ink">{t(c.titleKey)}</h2>
                  <p className="text-xs text-muted">Category page · /products/{c.slug}</p>
                </div>
                <ProductVisibilityToggle slug={c.slug} visible={!catHidden} />
              </div>
              {productsByCategory[c.slug].map((p) => (
                <div key={p.slug} className="flex items-center justify-between gap-4 p-4 ps-8">
                  <div>
                    <h3 className="text-sm font-semibold text-ink">{t(p.titleKey)}</h3>
                    <p className="text-xs text-muted">
                      Product page · /products/{p.slug}
                      {catHidden && " · hidden because its category is hidden"}
                    </p>
                  </div>
                  <ProductVisibilityToggle slug={p.slug} visible={!catHidden && !hidden.includes(p.slug)} disabled={catHidden} />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
