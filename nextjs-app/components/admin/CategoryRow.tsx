"use client";

import { useState, useTransition } from "react";
import { updateCategory, deleteCategory } from "@/lib/actions/categories";

type Category = { id: string; slug: string; nameEn: string; nameFr: string; nameAr: string };

export function CategoryRow({ category }: { category: Category }) {
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSave(formData: FormData) {
    startTransition(async () => {
      await updateCategory(category.id, formData);
      setEditing(false);
    });
  }

  function handleDelete() {
    if (!confirm(`Delete category "${category.nameEn}"?`)) return;
    startTransition(async () => {
      setError(null);
      try {
        await deleteCategory(category.id);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to delete.");
      }
    });
  }

  if (editing) {
    return (
      <tr className="border-b border-line">
        <td colSpan={4} className="p-3">
          <form action={handleSave} className="flex flex-wrap items-center gap-2">
            <input name="nameEn" defaultValue={category.nameEn} placeholder="EN" required className="w-32 border border-line px-2 py-1.5 text-sm" />
            <input name="nameFr" defaultValue={category.nameFr} placeholder="FR" className="w-32 border border-line px-2 py-1.5 text-sm" />
            <input name="nameAr" defaultValue={category.nameAr} placeholder="AR" className="w-32 border border-line px-2 py-1.5 text-sm" />
            <button type="submit" disabled={pending} className="bg-brand px-3 py-1.5 text-xs font-bold text-white">Save</button>
            <button type="button" onClick={() => setEditing(false)} className="border border-line px-3 py-1.5 text-xs font-bold text-ink-soft">Cancel</button>
          </form>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b border-line">
      <td className="p-3 text-sm font-semibold text-ink">{category.nameEn}</td>
      <td className="p-3 text-sm text-muted">{category.nameFr}</td>
      <td className="p-3 text-sm text-muted" dir="rtl">{category.nameAr}</td>
      <td className="p-3 text-end">
        <div className="flex justify-end gap-2">
          <button onClick={() => setEditing(true)} className="text-xs font-bold text-brand hover:text-brand-hover">Edit</button>
          <button onClick={handleDelete} disabled={pending} className="text-xs font-bold text-red-600 hover:text-red-700">Delete</button>
        </div>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </td>
    </tr>
  );
}
