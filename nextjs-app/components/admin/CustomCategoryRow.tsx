"use client";

import { useState, useTransition } from "react";
import { deleteCustomCategory } from "@/lib/actions/custom-categories";
import { CustomCategoryForm } from "./CustomCategoryForm";
import { ProductVisibilityToggle } from "./ProductVisibilityToggle";

type Category = { id: string; slug: string; titleEn: string; titleAr: string; titleFr: string; descEn: string; descAr: string; descFr: string; hasImage: boolean };

export function CustomCategoryRow({ category, visible }: { category: Category; visible: boolean }) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <div className="border border-line bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-sm font-bold text-ink">{category.titleEn}</h2>
          <p className="text-xs text-muted">Category page · /products/{category.slug}</p>
        </div>
        <div className="flex items-center gap-4">
          <ProductVisibilityToggle slug={category.slug} visible={visible} />
          <button type="button" onClick={() => setEditing((e) => !e)} className="text-xs font-bold text-brand hover:underline">
            {editing ? "Close" : "Edit"}
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              if (!confirm(`Delete the category "${category.titleEn}"? Its page will be removed from the site.`)) return;
              startTransition(() => deleteCustomCategory(category.id));
            }}
            className="text-xs font-bold text-red-600 hover:underline disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </div>
      {editing && (
        <div className="mt-4 border-t border-line pt-4">
          <CustomCategoryForm category={category} onDone={() => setEditing(false)} />
        </div>
      )}
    </div>
  );
}
