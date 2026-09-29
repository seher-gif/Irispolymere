"use client";

import { useActionState, useTransition, useRef, useEffect } from "react";
import { uploadProductImage, resetProductImage, type ProductImageUploadState } from "@/lib/actions/product-images";

const initialState: ProductImageUploadState = {};

export function ProductImageCard({
  slug,
  label,
  currentUrl,
}: {
  slug: string;
  label: string;
  currentUrl: string | null;
}) {
  const action = uploadProductImage.bind(null, slug);
  const [state, formAction, pending] = useActionState(action, initialState);
  const [resetting, startReset] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  return (
    <div className="flex gap-5 border border-line bg-white p-5">
      <div className="flex h-24 w-24 shrink-0 items-center justify-center border border-line bg-surface-alt">
        {currentUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={currentUrl} alt={label} className="max-h-full max-w-full object-contain" />
        ) : (
          <span className="px-1 text-center text-[10px] text-muted">No photo yet</span>
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-ink">{label}</h2>
          <span className={`px-2 py-0.5 text-[11px] font-bold ${currentUrl ? "bg-green-100 text-green-700" : "bg-surface-alt text-muted"}`}>
            {currentUrl ? "Custom" : "Placeholder"}
          </span>
        </div>
        <p className="mt-1 text-xs text-muted">Shown on this product's detail page. PNG, JPG or WEBP.</p>

        <form ref={formRef} action={formAction} className="mt-3 flex flex-wrap items-center gap-3">
          <input type="file" name="file" required accept="image/png,image/jpeg,image/webp" className="text-xs" />
          <button type="submit" disabled={pending} className="bg-brand px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-hover disabled:opacity-60">
            {pending ? "Uploading…" : "Replace"}
          </button>
          {currentUrl && (
            <button
              type="button"
              disabled={resetting}
              onClick={() => startReset(() => resetProductImage(slug))}
              className="border border-line px-3 py-1.5 text-xs font-bold text-ink-soft hover:border-brand hover:text-brand disabled:opacity-60"
            >
              {resetting ? "Removing…" : "Remove"}
            </button>
          )}
          {state.error && <span className="text-xs font-semibold text-red-600">{state.error}</span>}
          {state.success && <span className="text-xs font-semibold text-green-700">Updated.</span>}
        </form>
      </div>
    </div>
  );
}
