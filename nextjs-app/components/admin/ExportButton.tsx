"use client";

import { useActionState } from "react";
import { exportContentAction, type ExportState } from "@/lib/actions/export";

const initialState: ExportState = {};

export function ExportButton() {
  const [state, formAction, pending] = useActionState(async () => exportContentAction(), initialState);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <button type="submit" disabled={pending} className="border border-line px-5 py-2.5 text-sm font-bold text-ink-soft hover:border-brand hover:text-brand disabled:opacity-60">
          {pending ? "Exporting…" : "Export Content Now"}
        </button>
        {state.success && <span className="text-sm font-semibold text-green-700">Exported — run `npm run build` and redeploy to publish.</span>}
        {state.error && <span className="text-sm font-semibold text-red-600">{state.error}</span>}
      </div>
    </form>
  );
}
