"use client";

import { useActionState, useState } from "react";
import { CounterField } from "./CounterField";
import type { PageMetaFormState } from "@/lib/actions/pages";

const LOCALES = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
] as const;

type PageMetaData = {
  metaTitleEn: string | null; metaTitleFr: string | null; metaTitleAr: string | null;
  metaDescriptionEn: string | null; metaDescriptionFr: string | null; metaDescriptionAr: string | null;
};

const initialState: PageMetaFormState = {};

export function PageMetaForm({
  action,
  data,
  defaults,
}: {
  action: (prev: PageMetaFormState, formData: FormData) => Promise<PageMetaFormState>;
  data: PageMetaData | null;
  defaults: Record<"en" | "fr" | "ar", { title: string; description: string }>;
}) {
  const [tab, setTab] = useState<"en" | "fr" | "ar">("en");
  const [state, formAction, pending] = useActionState(action, initialState);

  const get = (prefix: string, code: string) => {
    const cap = code.charAt(0).toUpperCase() + code.slice(1);
    return data ? (data as never as Record<string, string>)[`${prefix}${cap}`] ?? "" : "";
  };

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="flex gap-1 border-b border-line">
        {LOCALES.map((l) => (
          <button
            key={l.code}
            type="button"
            onClick={() => setTab(l.code)}
            className={`px-4 py-2 text-sm font-bold ${tab === l.code ? "border-b-2 border-brand text-brand" : "text-muted"}`}
          >
            {l.label}
          </button>
        ))}
      </div>

      {LOCALES.map((l) => (
        <div key={l.code} className={tab === l.code ? "flex flex-col gap-4" : "hidden"} dir={l.code === "ar" ? "rtl" : "ltr"}>
          <div className="border border-dashed border-line bg-surface-alt p-3 text-xs text-muted">
            <strong className="block text-ink-soft">Default (used when blank)</strong>
            <p className="mt-1">{defaults[l.code].title}</p>
            <p className="mt-1">{defaults[l.code].description}</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-ink">Meta Title</label>
            <CounterField name={`metaTitle${l.code.charAt(0).toUpperCase()}${l.code.slice(1)}`} defaultValue={get("metaTitle", l.code)} maxLength={70} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-ink">Meta Description</label>
            <CounterField name={`metaDescription${l.code.charAt(0).toUpperCase()}${l.code.slice(1)}`} defaultValue={get("metaDescription", l.code)} maxLength={165} multiline />
          </div>
        </div>
      ))}

      {state.error && <p className="text-sm font-semibold text-red-600">{state.error}</p>}

      <div className="flex items-center gap-3">
        <button type="submit" disabled={pending} className="bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-hover disabled:opacity-60">
          {pending ? "Saving…" : "Save"}
        </button>
        {state.success && <span className="text-sm font-semibold text-green-700">Saved.</span>}
      </div>
    </form>
  );
}
