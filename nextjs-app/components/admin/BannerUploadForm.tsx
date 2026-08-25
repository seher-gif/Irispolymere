"use client";

import { useActionState, useRef, useEffect } from "react";
import { uploadBanner, type BannerUploadState } from "@/lib/actions/banners";

const initialState: BannerUploadState = {};

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
    <form ref={formRef} action={formAction} className="flex flex-wrap items-center gap-3 border border-line bg-white p-4">
      <input type="file" name="file" required accept=".png,.jpg,.jpeg,.webp,.svg" className="text-sm" />
      <input
        type="text"
        name="altText"
        placeholder="Alt text (describe what's shown)"
        className="min-w-[240px] flex-1 border border-line px-3 py-2 text-sm outline-none focus:border-brand"
      />
      <button type="submit" disabled={pending} className="bg-brand px-4 py-2 text-sm font-bold text-white hover:bg-brand-hover disabled:opacity-60">
        {pending ? "Uploading…" : "Add Banner"}
      </button>
      {state.error && <span className="text-sm font-semibold text-red-600">{state.error}</span>}
      {state.success && <span className="text-sm font-semibold text-green-700">Added.</span>}
    </form>
  );
}
