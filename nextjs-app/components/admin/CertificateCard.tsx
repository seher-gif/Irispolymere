"use client";

import { useTransition } from "react";
import { updateCertificate } from "@/lib/actions/certificates";

type Certificate = {
  id: string; key: string;
  titleEn: string; titleFr: string; titleAr: string;
  descEn: string; descFr: string; descAr: string;
  pdfUrl: string | null;
};

export function CertificateCard({ cert }: { cert: Certificate }) {
  const [pending, startTransition] = useTransition();
  const action = updateCertificate.bind(null, cert.id);

  function handleSubmit(formData: FormData) {
    startTransition(() => action(formData));
  }

  return (
    <form action={handleSubmit} className="border border-line bg-white p-5">
      <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-brand">{cert.key}</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <input name="titleEn" defaultValue={cert.titleEn} placeholder="Title (EN)" className="border border-line px-2 py-1.5 text-sm" />
        <input name="titleFr" defaultValue={cert.titleFr} placeholder="Title (FR)" className="border border-line px-2 py-1.5 text-sm" />
        <input name="titleAr" defaultValue={cert.titleAr} placeholder="Title (AR)" dir="rtl" className="border border-line px-2 py-1.5 text-sm" />
        <textarea name="descEn" defaultValue={cert.descEn} placeholder="Description (EN)" rows={2} className="border border-line px-2 py-1.5 text-sm" />
        <textarea name="descFr" defaultValue={cert.descFr} placeholder="Description (FR)" rows={2} className="border border-line px-2 py-1.5 text-sm" />
        <textarea name="descAr" defaultValue={cert.descAr} placeholder="Description (AR)" dir="rtl" rows={2} className="border border-line px-2 py-1.5 text-sm" />
      </div>
      <div className="mt-3 flex items-end gap-3">
        <div className="flex-1">
          <label className="mb-1 block text-xs font-bold text-ink-soft">Certificate PDF URL (from Media Library)</label>
          <input name="pdfUrl" defaultValue={cert.pdfUrl ?? ""} placeholder="/uploads/…pdf" className="w-full border border-line px-2 py-1.5 text-sm" />
        </div>
        <button type="submit" disabled={pending} className="bg-brand px-4 py-2 text-sm font-bold text-white hover:bg-brand-hover">
          {pending ? "Saving…" : "Save"}
        </button>
      </div>
      {cert.pdfUrl && (
        <a href={cert.pdfUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs font-bold text-brand hover:text-brand-hover">
          View current PDF ↗
        </a>
      )}
    </form>
  );
}
