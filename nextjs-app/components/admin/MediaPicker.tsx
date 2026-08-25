"use client";

import { useState, useTransition } from "react";
import { listMedia } from "@/lib/actions/media";

type MediaItem = {
  id: string;
  originalName: string;
  url: string;
  kind: string;
  altText: string | null;
};

export function MediaPicker({
  kind,
  onSelect,
  label = "Browse Media Library",
  triggerClassName,
}: {
  kind: "image" | "pdf";
  onSelect: (url: string, altText: string | null) => void;
  label?: string;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<MediaItem[] | null>(null);
  const [pending, startTransition] = useTransition();

  function openPicker() {
    setOpen(true);
    if (!items) {
      startTransition(async () => {
        const result = await listMedia(kind);
        setItems(result);
      });
    }
  }

  function pick(item: MediaItem) {
    onSelect(item.url, item.altText);
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={openPicker}
        aria-label={label === "🖼" ? "Insert image" : label === "📎" ? "Link a PDF" : label}
        title={label === "🖼" ? "Insert image" : label === "📎" ? "Link a PDF" : label}
        className={triggerClassName ?? "shrink-0 border border-line px-3 py-2 text-xs font-bold text-ink-soft hover:border-brand hover:text-brand"}
      >
        {label}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6" onClick={() => setOpen(false)}>
          <div className="max-h-[80vh] w-full max-w-2xl overflow-y-auto border border-line bg-white p-5" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-ink">Select {kind === "image" ? "an image" : "a PDF"}</h3>
              <button type="button" onClick={() => setOpen(false)} className="text-sm font-bold text-muted hover:text-ink">✕</button>
            </div>
            {pending && !items && <p className="text-sm text-muted">Loading…</p>}
            {items && items.length === 0 && (
              <p className="border border-dashed border-line bg-surface-alt p-6 text-center text-sm text-muted">
                No {kind === "image" ? "images" : "PDFs"} uploaded yet — add one under Media Library first.
              </p>
            )}
            {items && items.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => pick(item)}
                    className="flex flex-col items-center gap-2 border border-line p-3 text-start hover:border-brand"
                  >
                    <div className="flex h-20 w-full items-center justify-center bg-surface-alt">
                      {item.kind === "image" ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.url} alt={item.altText || item.originalName} className="max-h-20 max-w-full object-contain" />
                      ) : (
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-brand">
                          <path d="M6 2h9l5 5v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" />
                          <path d="M15 2v5h5" />
                        </svg>
                      )}
                    </div>
                    <span className="w-full truncate text-[11px] font-semibold text-ink" title={item.originalName}>{item.originalName}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
