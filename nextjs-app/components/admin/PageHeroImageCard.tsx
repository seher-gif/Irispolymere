"use client";

import { useActionState, useTransition, useRef, useEffect } from "react";
import { uploadPageHeroImage, resetPageHeroImage, type PageHeroUploadState } from "@/lib/actions/page-hero-images";

const initialState: PageHeroUploadState = {};

export function PageHeroImageCard({ slug, currentUrl }: { slug: string; currentUrl: string | null }) {
  const action = uploadPageHeroImage.bind(null, slug);
  const [state, formAction, pending] = useActionState(action, initialState);
  const [resetting, startReset] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  return (
    <div className="border border-line bg-white p-5">
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-bold text-ink">Header Background Image</h2>
        <span className={`px-2 py-0.5 text-[11px] font-bold ${currentUrl ? "bg-green-100 text-green-700" : "bg-surface-alt text-muted"}`}>
          {currentUrl ? "Custom" : "Plain navy"}
        </span>
      </div>
      <p className="mt-1 text-xs text-muted">
        Photo behind the navy title area at the top of this page. Upload it at its original size — recommended{" "}
        <strong>2400×600px</strong> (4:1), JPG/WEBP/PNG, but any size works and no resizing is needed. The title is
        white text over the image's left side with a dark-navy fade added there, so keep the left ~55% calm and the
        subject on the right; on narrow screens only the empty left edge is trimmed.
      </p>

      {currentUrl && (
        <div className="mt-3 w-full overflow-hidden border border-line bg-surface-alt">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={currentUrl} alt="Header background" className="block h-auto w-full" />
        </div>
      )}

      <form ref={formRef} action={formAction} className="mt-3 flex flex-wrap items-center gap-3">
        <input type="file" name="file" required accept="image/png,image/jpeg,image/webp" className="text-xs" />
        <button type="submit" disabled={pending} className="bg-brand px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-hover disabled:opacity-60">
          {pending ? "Uploading…" : currentUrl ? "Replace" : "Upload"}
        </button>
        {currentUrl && (
          <button
            type="button"
            disabled={resetting}
            onClick={() => startReset(() => resetPageHeroImage(slug))}
            className="border border-line px-3 py-1.5 text-xs font-bold text-ink-soft hover:border-brand hover:text-brand disabled:opacity-60"
          >
            {resetting ? "Removing…" : "Remove"}
          </button>
        )}
        {state.error && <span className="text-xs font-semibold text-red-600">{state.error}</span>}
        {state.success && <span className="text-xs font-semibold text-green-700">Saved.</span>}
      </form>
    </div>
  );
}
