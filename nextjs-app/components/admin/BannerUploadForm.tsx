"use client";

import { useActionState, useRef, useEffect } from "react";
import { uploadBanner, type BannerUploadState } from "@/lib/actions/banners";

const initialState: BannerUploadState = {};

const LOCALES = [
  { code: "En", label: "English", required: true },
  { code: "Fr", label: "Français", required: false },
  { code: "Ar", label: "العربية", required: false },
] as const;

export function BannerUploadForm({ atMax }: { atMax: boolean }) {
  const [state, formAction, pending] = useActionState(uploadBanner, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  if (atMax) {
    return (
      <p className="border border-dashed border-line bg-surface-alt p-4 text-sm text-muted">
        Maximum of 5 banners reached — delete one before adding another.
      </p>
    );
  }

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4 border border-line bg-white p-4">
      <p className="text-xs text-muted">
        Each banner's artwork has its own language-specific text, so upload it per language. English is required —
        French and Arabic fall back to the English image if left blank. Upload at original size (recommended
        2400×1050px): banners are shown whole and fit every screen automatically, nothing is cropped.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {LOCALES.map((l) => (
          <div key={l.code} className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-ink">
              {l.label}
              {l.required ? " *" : ""}
            </label>
            <input type="file" name={`file${l.code}`} required={l.required} accept=".png,.jpg,.jpeg,.webp,.svg" className="text-xs" />
            <input
              type="text"
              name={`altText${l.code}`}
              placeholder="Alt text"
              className="border border-line px-2.5 py-1.5 text-xs outline-none focus:border-brand"
            />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button type="submit" disabled={pending} className="bg-brand px-4 py-2 text-sm font-bold text-white hover:bg-brand-hover disabled:opacity-60">
          {pending ? "Uploading…" : "Add Banner"}
        </button>
        {state.error && <span className="text-sm font-semibold text-red-600">{state.error}</span>}
        {state.success && <span className="text-sm font-semibold text-green-700">Added.</span>}
      </div>
    </form>
  );
}
