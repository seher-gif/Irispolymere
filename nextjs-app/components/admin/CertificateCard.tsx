"use client";

import { useState, useTransition } from "react";
import { updateCertificate, deleteCertificate } from "@/lib/actions/certificates";
import { MediaPicker } from "./MediaPicker";

type Certificate = {
  id: string; key: string;
  titleEn: string; titleFr: string; titleAr: string;
  descEn: string; descFr: string; descAr: string;
  pdfUrl: string | null;
};

export function CertificateCard({ cert }: { cert: Certificate }) {
  const [pending, startTransition] = useTransition();
  const [pdfUrl, setPdfUrl] = useState(cert.pdfUrl ?? "");
  const action = updateCertificate.bind(null, cert.id);

  function handleSubmit(formData: FormData) {
    startTransition(() => action(formData));
  }

  function handleDelete() {
    if (!confirm(`Delete the "${cert.key}" certificate? This cannot be undone.`)) return;
    startTransition(() => deleteCertificate(cert.id));
  }

  return (
    <form action={handleSubmit} className="border border-line bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wide text-brand">{cert.key}</h2>
        <button type="button" onClick={handleDelete} disabled={pending} className="text-xs font-bold text-red-600 hover:text-red-700">
          Delete
        </button>
      </div>
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
          <label className="mb-1 block text-xs font-bold text-ink-soft">Certificate PDF</label>
          <div className="flex gap-2">
            <input name="pdfUrl" value={pdfUrl} onChange={(e) => setPdfUrl(e.target.value)} placeholder="/uploads/…pdf" className="flex-1 border border-line px-2 py-1.5 text-sm" />
            <MediaPicker kind="pdf" label="Browse" onSelect={(url) => setPdfUrl(url)} />
          </div>
        </div>
        <button type="submit" disabled={pending} className="bg-brand px-4 py-2 text-sm font-bold text-white hover:bg-brand-hover">
          {pending ? "Saving…" : "Save"}
        </button>
      </div>
      {pdfUrl && (
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs font-bold text-brand hover:text-brand-hover">
          View current PDF ↗
        </a>
      )}
    </form>
  );
}
