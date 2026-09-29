import { prisma } from "@/lib/db";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { tFrom } from "@/lib/i18n/t";
import { products } from "@/lib/data/products";
import { ProductImageCard } from "@/components/admin/ProductImageCard";

export default async function AdminProductImagesPage() {
  const [rows, dict] = await Promise.all([prisma.productImage.findMany(), getDictionary("en")]);
  const t = tFrom(dict);
  const byKey = Object.fromEntries(rows.map((r) => [r.slug, r.url]));

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Product Photos</h1>
      <p className="mt-1 text-sm text-muted">
        One real photo per product, shown on its detail page. A product with no photo shows a placeholder graphic
        instead.
      </p>
      <div className="mt-6 flex flex-col gap-4">
        {products.map((p) => (
          <ProductImageCard key={p.slug} slug={p.slug} label={t(p.titleKey)} currentUrl={byKey[p.slug] ?? null} />
        ))}
      </div>
    </div>
  );
}
