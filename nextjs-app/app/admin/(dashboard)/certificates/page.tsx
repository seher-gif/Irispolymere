import { prisma } from "@/lib/db";
import { CertificateCard } from "@/components/admin/CertificateCard";
import { NewCertificateForm } from "@/components/admin/NewCertificateForm";

export default async function AdminCertificatesPage() {
  const certs = await prisma.certificate.findMany({ orderBy: { key: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Certificates</h1>
      <p className="mt-1 text-sm text-muted">
        Edit certificate text and attach the real PDF (upload it in Media Library first, then pick it below).
      </p>
      <div className="mt-6 flex flex-col gap-4">
        {certs.map((c) => (
          <CertificateCard key={c.id} cert={c} />
        ))}
        <NewCertificateForm />
      </div>
    </div>
  );
}
