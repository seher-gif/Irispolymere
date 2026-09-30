"use client";

import { useActionState, useTransition, useRef, useEffect } from "react";
import {
  uploadCorporateHeroImage,
  resetCorporateHeroImage,
  type CorporateHeroUploadState,
} from "@/lib/actions/corporate-images";

const initialState: CorporateHeroUploadState = {};

const LOCALES = [
  { code: "En", label: "English", required: true },
  { code: "Fr", label: "Français", required: false },
  { code: "Ar", label: "العربية", required: false },
] as const;

export function CorporateHeroImageCard({
  slug,
  current,
}: {
  slug: string;
  current: { urlEn: string; urlFr: string | null; urlAr: string | null } | null;
}) {
  const action = uploadCorporateHeroImage.bind(null, slug);
  const [state, formAction, pending] = useActionState(action, initialState);
  const [resetting, startReset] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  return (
    <div className="border border-line bg-white p-5">
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-bold text-ink">Hero Image</h2>
        <span className={`px-2 py-0.5 text-[11px] font-bold ${current ? "bg-green-100 text-green-700" : "bg-surface-alt text-muted"}`}>
          {current ? "Custom" : "Default"}
        </span>
      </div>
      <p className="mt-1 text-xs text-muted">
        Full-width photo shown on this page — roughly 2400×1050px (21:9). Each language's photo has its own text baked in — English
        is required, French and Arabic fall back to it if left blank.
      </p>

      {current && (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {LOCALES.map((l) => {
            const url = (current as never as Record<string, string | null>)[`url${l.code}`] ?? current.urlEn;
            return (
              <div key={l.code} className="flex flex-col gap-1">
                <div className="flex h-16 items-center justify-center overflow-hidden border border-line bg-surface-alt">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`${l.label} hero`} className="h-full w-full object-cover" />
                </div>
                <span className="text-center text-[10px] font-bold text-muted">{l.label}</span>
              </div>
            );
          })}
        </div>
      )}

      <form ref={formRef} action={formAction} className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {LOCALES.map((l) => (
          <div key={l.code} className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-ink">
              {l.label}
              {l.required && !current ? " *" : ""}
            </label>
            <input type="file" name={`file${l.code}`} required={l.required && !current} accept="image/png,image/jpeg,image/webp" className="text-xs" />
          </div>
        ))}
        <div className="col-span-full flex items-center gap-3">
          <button type="submit" disabled={pending} className="bg-brand px-4 py-2 text-xs font-bold text-white hover:bg-brand-hover disabled:opacity-60">
            {pending ? "Uploading…" : current ? "Replace" : "Upload"}
          </button>
          {current && (
            <button
              type="button"
              disabled={resetting}
              onClick={() => startReset(() => resetCorporateHeroImage(slug))}
              className="border border-line px-4 py-2 text-xs font-bold text-ink-soft hover:border-brand hover:text-brand disabled:opacity-60"
            >
              {resetting ? "Removing…" : "Remove"}
            </button>
          )}
          {state.error && <span className="text-xs font-semibold text-red-600">{state.error}</span>}
          {state.success && <span className="text-xs font-semibold text-green-700">Saved.</span>}
        </div>
      </form>
    </div>
  );
}
