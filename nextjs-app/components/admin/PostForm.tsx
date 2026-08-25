"use client";

import { useActionState, useState } from "react";
import { RichTextEditor } from "./RichTextEditor";
import { MediaPicker } from "./MediaPicker";
import { CounterField } from "./CounterField";
import type { PostFormState } from "@/lib/actions/posts";

type Category = { id: string; nameEn: string };
type PostData = {
  slug: string;
  titleEn: string; titleFr: string | null; titleAr: string | null;
  excerptEn: string; excerptFr: string | null; excerptAr: string | null;
  bodyEn: string; bodyFr: string | null; bodyAr: string | null;
  metaTitleEn: string | null; metaTitleFr: string | null; metaTitleAr: string | null;
  metaDescriptionEn: string | null; metaDescriptionFr: string | null; metaDescriptionAr: string | null;
  coverImage: string | null;
  categoryId: string | null;
  published: boolean;
};

const LOCALES = [
  { code: "en", label: "English", required: true },
  { code: "fr", label: "Français", required: false },
  { code: "ar", label: "العربية", required: false },
] as const;

const initialState: PostFormState = {};

export function PostForm({
  action,
  categories,
  post,
}: {
  action: (prev: PostFormState, formData: FormData) => Promise<PostFormState>;
  categories: Category[];
  post?: PostData;
}) {
  const [tab, setTab] = useState<"en" | "fr" | "ar">("en");
  const [state, formAction, pending] = useActionState(action, initialState);
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-bold text-ink">URL Slug</label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted">/blog/</span>
          <input
            name="slug"
            defaultValue={post?.slug ?? ""}
            placeholder="auto-generated from title if left blank"
            className="flex-1 border border-line px-3 py-2 text-sm outline-none focus:border-brand"
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            title="Lowercase letters, numbers and hyphens only"
          />
        </div>
      </div>

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
        const get = (prefix: string) => (post ? (post as never as Record<string, string>)[`${prefix}${cap}`] : "");
        return (
          <div key={l.code} className={tab === l.code ? "flex flex-col gap-4" : "hidden"} dir={l.code === "ar" ? "rtl" : "ltr"}>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-ink">Title{l.required ? " *" : ""}</label>
              <input name={`title${cap}`} defaultValue={get("title") ?? ""} required={l.required} className="border border-line px-3 py-2.5 text-sm outline-none focus:border-brand" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-ink">Excerpt{l.required ? " *" : ""}</label>
              <textarea name={`excerpt${cap}`} defaultValue={get("excerpt") ?? ""} required={l.required} rows={2} className="border border-line px-3 py-2.5 text-sm outline-none focus:border-brand" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-ink">Body{l.required ? " *" : ""}</label>
              <RichTextEditor name={`body${cap}`} defaultValue={get("body") ?? ""} />
            </div>

            <div className="mt-2 border border-dashed border-line bg-surface-alt p-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-muted">
                SEO (optional — falls back to Title / Excerpt above when blank)
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-ink-soft">Meta Title</label>
                  <CounterField name={`metaTitle${cap}`} defaultValue={get("metaTitle") ?? ""} maxLength={70} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-ink-soft">Meta Description</label>
                  <CounterField name={`metaDescription${cap}`} defaultValue={get("metaDescription") ?? ""} maxLength={165} multiline />
                </div>
              </div>
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
          <label className="text-sm font-bold text-ink">Cover Image</label>
          <div className="flex gap-2">
            <input
              name="coverImage"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="/uploads/… (from Media Library)"
              className="flex-1 border border-line px-3 py-2.5 text-sm outline-none focus:border-brand"
            />
            <MediaPicker kind="image" onSelect={(url) => setCoverImage(url)} label="Browse" />
          </div>
          {coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={coverImage} alt="Cover preview" className="mt-1 h-24 w-auto border border-line object-contain" />
          )}
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm font-bold text-ink">
        <input type="checkbox" name="published" defaultChecked={post?.published ?? false} className="h-4 w-4" />
        Published
      </label>

      {state.error && <p className="text-sm font-semibold text-red-600">{state.error}</p>}

      <div>
        <button type="submit" disabled={pending} className="bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-hover disabled:opacity-60">
          {pending ? "Saving…" : post ? "Save Changes" : "Create Post"}
        </button>
      </div>
    </form>
  );
}
