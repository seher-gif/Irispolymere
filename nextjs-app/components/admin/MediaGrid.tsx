"use client";

import { useState, useTransition } from "react";
import { deleteMedia } from "@/lib/actions/media";

type MediaItem = {
  id: string;
  originalName: string;
  url: string;
  kind: string;
  sizeBytes: number;
  uploadedAt: Date;
};

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function MediaGrid({ items }: { items: MediaItem[] }) {
  const [pending, startTransition] = useTransition();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    startTransition(() => deleteMedia(id));
  }

  function handleCopy(url: string, id: string) {
    navigator.clipboard.writeText(window.location.origin + url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    });
  }

  if (items.length === 0) {
    return <p className="mt-6 border border-dashed border-line bg-white p-8 text-center text-sm text-muted">No files uploaded yet.</p>;
  }

  return (
    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((m) => (
        <div key={m.id} className="border border-line bg-white p-3">
          <div className="mb-2 flex h-28 items-center justify-center bg-surface-alt">
            {m.kind === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={m.url} alt={m.originalName} className="max-h-28 max-w-full object-contain" />
            ) : (
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-brand">
                <path d="M6 2h9l5 5v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" />
                <path d="M15 2v5h5" />
              </svg>
            )}
          </div>
          <p className="truncate text-xs font-semibold text-ink" title={m.originalName}>{m.originalName}</p>
          <p className="text-[11px] text-muted">{formatSize(m.sizeBytes)}</p>
          <div className="mt-2 flex gap-2">
            <button onClick={() => handleCopy(m.url, m.id)} className="flex-1 border border-line py-1 text-[11px] font-bold text-ink-soft hover:border-brand hover:text-brand">
              {copiedId === m.id ? "Copied!" : "Copy URL"}
            </button>
            <button onClick={() => handleDelete(m.id, m.originalName)} disabled={pending} className="flex-1 border border-line py-1 text-[11px] font-bold text-red-600 hover:border-red-400">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
