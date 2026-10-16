"use client";

import { useOptimistic, useTransition } from "react";
import { setProductPageVisible } from "@/lib/actions/product-visibility";

export function ProductVisibilityToggle({ slug, visible, disabled = false }: { slug: string; visible: boolean; disabled?: boolean }) {
  const [optimistic, setOptimistic] = useOptimistic(visible);
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={optimistic}
      disabled={pending || disabled}
      onClick={() =>
        startTransition(async () => {
          setOptimistic(!optimistic);
          await setProductPageVisible(slug, !optimistic);
        })
      }
      className={`flex items-center gap-2 text-xs font-bold disabled:opacity-50 ${optimistic ? "text-green-700" : "text-muted"}`}
    >
      <span className={`relative inline-block h-5 w-9 rounded-full transition-colors ${optimistic ? "bg-green-600" : "bg-line"}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${optimistic ? "left-[18px]" : "left-0.5"}`} />
      </span>
      {optimistic ? "Visible" : "Hidden"}
    </button>
  );
}
