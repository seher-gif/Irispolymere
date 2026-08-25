"use client";

import { useActionState, useRef, useEffect } from "react";
import { uploadMedia, type UploadState } from "@/lib/actions/media";

const initialState: UploadState = {};

export function MediaUploadForm() {
  const [state, formAction, pending] = useActionState(uploadMedia, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-wrap items-center gap-3 border border-line bg-white p-4">
      <input type="file" name="file" required accept=".pdf,.png,.jpg,.jpeg,.webp,.svg" className="text-sm" />
      <input
        type="text"
        name="altText"
        placeholder="Alt text (for images — describe what's shown)"
        className="min-w-[240px] flex-1 border border-line px-3 py-2 text-sm outline-none focus:border-brand"
      />
      <button type="submit" disabled={pending} className="bg-brand px-4 py-2 text-sm font-bold text-white hover:bg-brand-hover disabled:opacity-60">
        {pending ? "Uploading…" : "Upload"}
      </button>
      {state.error && <span className="text-sm font-semibold text-red-600">{state.error}</span>}
      {state.success && <span className="text-sm font-semibold text-green-700">Uploaded.</span>}
    </form>
  );
}
