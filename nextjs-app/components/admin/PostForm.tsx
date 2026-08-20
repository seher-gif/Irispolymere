"use client";

import { useState } from "react";
import { RichTextEditor } from "./RichTextEditor";

type Category = { id: string; nameEn: string };
type PostData = {
  titleEn: string; titleFr: string | null; titleAr: string | null;
  excerptEn: string; excerptFr: string | null; excerptAr: string | null;
  bodyEn: string; bodyFr: string | null; bodyAr: string | null;
  coverImage: string | null;
  categoryId: string | null;
  published: boolean;
};

const LOCALES = [
  { code: "en", label: "English", required: true },
  { code: "fr", label: "Français", required: false },
  { code: "ar", label: "العربية", required: false },
] as const;

export function PostForm({
  action,
  categories,
  post,
}: {
  action: (formData: FormData) => void;
  categories: Category[];
  post?: PostData;
}) {
  const [tab, setTab] = useState<"en" | "fr" | "ar">("en");

  return (
    <form action={action} className="flex flex-col gap-6">
      <div className="flex gap-1 border-b border-line">
        {LOCALES.map((l) => (
          <button
            key={l.code}
            type="button"
            onClick={() => setTab(l.code)}
            className={`px-4 py-2 text-sm font-bold ${tab === l.code ? "border-b-2 border-brand text-brand" : "text-muted"}`}
          >
            {l.label}{l.required ? " *" : ""}
          </button>
        ))}
      </div>

      {LOCALES.map((l) => {
        const cap = l.code.charAt(0).toUpperCase() + l.code.slice(1);
        const titleVal = post ? (post as never as Record<string, string>)[`title${cap}`] : "";
        const excerptVal = post ? (post as never as Record<string, string>)[`excerpt${cap}`] : "";
        const bodyVal = post ? (post as never as Record<string, string>)[`body${cap}`] : "";
        return (
          <div key={l.code} className={tab === l.code ? "flex flex-col gap-4" : "hidden"} dir={l.code === "ar" ? "rtl" : "ltr"}>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-ink">Title{l.required ? " *" : ""}</label>
              <input name={`title${cap}`} defaultValue={titleVal ?? ""} required={l.required} className="border border-line px-3 py-2.5 text-sm outline-none focus:border-brand" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-ink">Excerpt{l.required ? " *" : ""}</label>
              <textarea name={`excerpt${cap}`} defaultValue={excerptVal ?? ""} required={l.required} rows={2} className="border border-line px-3 py-2.5 text-sm outline-none focus:border-brand" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-ink">Body{l.required ? " *" : ""}</label>
              <RichTextEditor name={`body${cap}`} defaultValue={bodyVal ?? ""} />
            </div>
          </div>
        );
      })}

      <div className="grid grid-cols-1 gap-4 border-t border-line pt-6 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-ink">Category</label>
          <select name="categoryId" defaultValue={post?.categoryId ?? ""} className="border border-line px-3 py-2.5 text-sm">
            <option value="">— None —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.nameEn}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-ink">Cover Image URL</label>
          <input name="coverImage" defaultValue={post?.coverImage ?? ""} placeholder="/uploads/… (from Media Library)" className="border border-line px-3 py-2.5 text-sm outline-none focus:border-brand" />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm font-bold text-ink">
        <input type="checkbox" name="published" defaultChecked={post?.published ?? false} className="h-4 w-4" />
        Published
      </label>

      <div>
        <button type="submit" className="bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-hover">
          {post ? "Save Changes" : "Create Post"}
        </button>
      </div>
    </form>
  );
}
