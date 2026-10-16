"use client";

import { createContext, useActionState, useContext, useState, useTransition } from "react";
import { prepareUploads } from "@/lib/blob-client";

const UploadModeContext = createContext(false);

/** Tells admin forms whether to upload files straight to Vercel Blob (hosted) or post them (local dev). */
export function UploadModeProvider({ direct, children }: { direct: boolean; children: React.ReactNode }) {
  return <UploadModeContext.Provider value={direct}>{children}</UploadModeContext.Provider>;
}

/**
 * Drop-in replacement for useActionState on upload forms: uploads the chosen files first,
 * then calls the server action. Use `<form action={submit}>`.
 */
type UploadState = { error?: string; success?: boolean };

export function useUploadAction(action: (prev: UploadState, formData: FormData) => Promise<UploadState>) {
  const direct = useContext(UploadModeContext);
  const [state, dispatch, actionPending] = useActionState(action, {} as UploadState);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  async function submit(formData: FormData) {
    setUploadError(null);
    setUploading(true);
    try {
      const prepared = await prepareUploads(formData, direct);
      startTransition(() => dispatch(prepared));
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Upload failed — please try again.");
    } finally {
      setUploading(false);
    }
  }

  return { state: uploadError ? { ...state, error: uploadError } : state, submit, pending: actionPending || uploading };
}
