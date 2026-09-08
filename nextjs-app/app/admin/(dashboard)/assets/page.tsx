import { prisma } from "@/lib/db";
import { siteAssetRegistry } from "@/lib/data/site-asset-registry";
import { SiteAssetCard } from "@/components/admin/SiteAssetCard";

export default async function AdminAssetsPage() {
  const rows = await prisma.siteAsset.findMany();
  const byKey = Object.fromEntries(rows.map((r) => [r.key, r]));

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Site Assets</h1>
      <p className="mt-1 text-sm text-muted">
        Brand-wide images used across the whole site — logo, favicon, social share image and QR code. Certificate
        badges aren&apos;t listed here — they&apos;re built as icons in the code, not uploaded images.
      </p>
      <div className="mt-6 flex flex-col gap-4">
        {siteAssetRegistry.map((slot) => {
          const row = byKey[slot.key];
          return (
            <SiteAssetCard
              key={slot.key}
              slot={slot}
              currentUrl={row?.url ?? slot.defaultUrl}
              isOverridden={!!row}
              updatedAt={row ? row.updatedAt.toLocaleDateString() : null}
            />
          );
        })}
      </div>
    </div>
  );
}
