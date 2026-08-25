"use client";

import { useTransition } from "react";
import { deleteBanner } from "@/lib/actions/banners";

type BannerItem = {
  id: string;
  url: string;
  altText: string | null;
};

export function BannerGrid({ items }: { items: BannerItem[] }) {
  const [pending, startTransition] = useTransition();
  const canDelete = items.length > 1;

  function handleDelete(id: string) {
    if (!canDelete) return;
    if (!confirm("Delete this banner? This cannot be undone.")) return;
    startTransition(() => deleteBanner(id));
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((banner) => (
        <div key={banner.id} className="border border-line bg-white p-3">
          <div className="mb-2 flex h-32 items-center justify-center overflow-hidden bg-surface-alt">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={banner.url} alt={banner.altText || "Homepage banner"} className="h-full w-full object-cover" />
          </div>
          <p className="truncate text-xs text-muted" title={banner.altText ?? ""}>{banner.altText || "No alt text"}</p>
          <button
            onClick={() => handleDelete(banner.id)}
            disabled={!canDelete || pending}
            title={!canDelete ? "At least one banner is required" : undefined}
            className="mt-2 w-full border border-line py-1.5 text-[11px] font-bold text-red-600 hover:border-red-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {canDelete ? "Delete" : "Required (min. 1)"}
          </button>
        </div>
      ))}
    </div>
  );
}
