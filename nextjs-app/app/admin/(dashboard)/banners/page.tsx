import { prisma } from "@/lib/db";
import { BannerGrid } from "@/components/admin/BannerGrid";
import { BannerUploadForm } from "@/components/admin/BannerUploadForm";

export default async function AdminBannersPage() {
  const banners = await prisma.banner.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Homepage Banners</h1>
      <p className="mt-1 text-sm text-muted">
        The images that rotate in the homepage hero. Up to 5, at least 1 required. Shown full-bleed, in the order added
        — no text or overlay is placed on top of them.
      </p>
      <div className="mt-6">
        <BannerUploadForm atMax={banners.length >= 5} />
      </div>
      <BannerGrid items={banners} />
    </div>
  );
}
