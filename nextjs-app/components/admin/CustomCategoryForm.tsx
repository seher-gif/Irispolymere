"use client";

import { useEffect, useRef } from "react";
import { useUploadAction } from "./UploadMode";
import { createCustomCategory, updateCustomCategory } from "@/lib/actions/custom-categories";

type Values = { id: string; titleEn: string; titleAr: string; titleFr: string; descEn: string; descAr: string; descFr: string; hasImage: boolean };

const LANGS = [
  { code: "En", label: "English", required: true, dir: "ltr" },
  { code: "Ar", label: "العربية", required: false, dir: "rtl" },
  { code: "Fr", label: "Français", required: false, dir: "ltr" },
] as const;

// One form for both "add" (no `category`) and "edit".
export function CustomCategoryForm({ category, onDone }: { category?: Values; onDone?: () => void }) {
  const { state, submit, pending } = useUploadAction(category ? updateCustomCategory.bind(null, category.id) : createCustomCategory);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state.success) return;
    if (!category) formRef.current?.reset();
    onDone?.();
  }, [state.success]); // eslint-disable-line react-hooks/exhaustive-deps

  const input = "w-full border border-line bg-white px-3 py-2 text-sm";
  return (
    <form ref={formRef} action={submit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {LANGS.map((l) => (
          <div key={l.code} className="flex flex-col gap-2">
            <span className="text-xs font-bold text-ink">
              {l.label}
              {l.required ? " *" : ""}
            </span>
            <input
              name={`title${l.code}`}
              dir={l.dir}
              required={l.required}
              defaultValue={category?.[`title${l.code}` as const] ?? ""}
              placeholder="Category name"
              className={input}
            />
            <textarea
              name={`desc${l.code}`}
              dir={l.dir}
              required={l.required}
              rows={3}
              defaultValue={category?.[`desc${l.code}` as const] ?? ""}
              placeholder="Short description"
              className={input}
            />
          </div>
        ))}
      </div>
      <p className="text-xs text-muted">Arabic and French fall back to the English text if left blank.</p>
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-xs font-bold text-ink">
          Photo (optional){category?.hasImage ? " — choose a file to replace the current one" : ""}
        </label>
        <input type="file" name="file" accept="image/png,image/jpeg,image/webp" className="text-xs" />
        <span className="text-xs text-muted">Any size works — recommended 2400×1050px. It is shown whole, never cropped.</span>
      </div>
      {state.error && <p className="text-xs font-semibold text-red-600">{state.error}</p>}
      <div className="flex items-center gap-3">
        <button type="submit" disabled={pending} className="bg-brand px-4 py-2 text-xs font-bold text-white hover:bg-brand-hover disabled:opacity-60">
          {pending ? "Saving…" : category ? "Save changes" : "Add category"}
        </button>
        {state.success && !category && <span className="text-xs font-semibold text-green-700">Category added — it's live on the site.</span>}
        {category && (
          <button type="button" onClick={onDone} className="border border-line px-4 py-2 text-xs font-bold text-ink-soft hover:border-brand hover:text-brand">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
