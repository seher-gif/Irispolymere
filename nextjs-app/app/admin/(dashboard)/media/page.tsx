import { prisma } from "@/lib/db";
import { MediaUploadForm } from "@/components/admin/MediaUploadForm";
import { MediaGrid } from "@/components/admin/MediaGrid";

export default async function AdminMediaPage() {
  const items = await prisma.media.findMany({ orderBy: { uploadedAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Media Library</h1>
      <p className="mt-1 text-sm text-muted">Upload PDFs and images. PDF max 20MB — used for certificates and blog attachments.</p>
      <div className="mt-6">
        <MediaUploadForm />
      </div>
      <MediaGrid items={items} />
    </div>
  );
}
