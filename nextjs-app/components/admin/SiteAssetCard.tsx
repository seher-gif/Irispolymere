"use client";

import { useActionState, useTransition, useRef, useEffect } from "react";
import { uploadSiteAsset, resetSiteAsset, type SiteAssetUploadState } from "@/lib/actions/site-assets";
import type { SiteAssetSlot } from "@/lib/data/site-asset-registry";

const initialState: SiteAssetUploadState = {};

export function SiteAssetCard({
  slot,
  currentUrl,
  isOverridden,
  updatedAt,
}: {
  slot: SiteAssetSlot;
  currentUrl: string;
  isOverridden: boolean;
  updatedAt: string | null;
}) {
  const action = uploadSiteAsset.bind(null, slot.key);
  const [state, formAction, pending] = useActionState(action, initialState);
  const [resetting, startReset] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  return (
    <div className="flex gap-5 border border-line bg-white p-5">
      <div className="flex h-24 w-24 shrink-0 items-center justify-center border border-line bg-surface-alt">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={currentUrl} alt={slot.label} className="max-h-full max-w-full object-contain" />
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-ink">{slot.label}</h2>
          <span className={`px-2 py-0.5 text-[11px] font-bold ${isOverridden ? "bg-green-100 text-green-700" : "bg-surface-alt text-muted"}`}>
            {isOverridden ? "Custom" : "Default"}
          </span>
          {slot.buildTime && (
            <span className="px-2 py-0.5 text-[11px] font-bold bg-brand-tint text-brand">Needs rebuild</span>
          )}
        </div>
        <p className="mt-1 text-xs text-muted">{slot.hint}</p>
        {isOverridden && updatedAt && <p className="mt-1 text-[11px] text-muted">Updated {updatedAt}</p>}

        <form ref={formRef} action={formAction} className="mt-3 flex flex-wrap items-center gap-3">
          <input type="file" name="file" required accept={slot.accept} className="text-xs" />
          <button type="submit" disabled={pending} className="bg-brand px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-hover disabled:opacity-60">
            {pending ? "Uploading…" : "Replace"}
          </button>
          {isOverridden && (
            <button
              type="button"
              disabled={resetting}
              onClick={() => startReset(() => resetSiteAsset(slot.key))}
              className="border border-line px-3 py-1.5 text-xs font-bold text-ink-soft hover:border-brand hover:text-brand disabled:opacity-60"
            >
              {resetting ? "Resetting…" : "Reset to default"}
            </button>
          )}
          {state.error && <span className="text-xs font-semibold text-red-600">{state.error}</span>}
          {state.success && <span className="text-xs font-semibold text-green-700">Updated.</span>}
        </form>
      </div>
    </div>
  );
}
