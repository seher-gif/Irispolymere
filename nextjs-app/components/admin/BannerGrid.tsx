"use client";

import { useTransition } from "react";
import { deleteBanner } from "@/lib/actions/banners";

type BannerItem = {
  id: string;
  urlEn: string;
  urlFr: string | null;
  urlAr: string | null;
  altTextEn: string | null;
  altTextFr: string | null;
  altTextAr: string | null;
};

const VARIANTS = [
  { key: "En", label: "EN" },
  { key: "Fr", label: "FR" },
  { key: "Ar", label: "AR" },
] as const;

export function BannerGrid({ items }: { items: BannerItem[] }) {
  const [pending, startTransition] = useTransition();
  const canDelete = items.length > 1;

  function handleDelete(id: string) {
    if (!canDelete) return;
    if (!confirm("Delete this banner (all language versions)? This cannot be undone.")) return;
    startTransition(() => deleteBanner(id));
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((banner) => (
        <div key={banner.id} className="border border-line bg-white p-3">
          <div className="grid grid-cols-3 gap-1.5">
            {VARIANTS.map((v) => {
              const url = (banner as never as Record<string, string | null>)[`url${v.key}`] ?? banner.urlEn;
              const alt = (banner as never as Record<string, string | null>)[`altText${v.key}`] ?? banner.altTextEn;
              const isFallback = v.key !== "En" && !(banner as never as Record<string, string | null>)[`url${v.key}`];
              return (
                <div key={v.key} className="flex flex-col gap-1">
                  <div className="overflow-hidden bg-surface-alt">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={alt || "Homepage banner"} className="block h-auto w-full" />
                  </div>
                  <span className="text-center text-[10px] font-bold text-muted">{v.label}{isFallback ? " (EN)" : ""}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-2 truncate text-xs text-muted" title={banner.altTextEn ?? ""}>{banner.altTextEn || "No alt text"}</p>
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
