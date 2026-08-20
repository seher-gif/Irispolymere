import { prisma } from "@/lib/db";
import { createCategory } from "@/lib/actions/categories";
import { CategoryRow } from "@/components/admin/CategoryRow";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Categories</h1>
      <p className="mt-1 text-sm text-muted">Blog categories, with names in English, French and Arabic.</p>

      <form action={createCategory} className="mt-6 flex flex-wrap items-end gap-2 border border-line bg-white p-4">
        <div>
          <label className="mb-1 block text-xs font-bold text-ink-soft">Name (EN) *</label>
          <input name="nameEn" required className="w-40 border border-line px-2 py-1.5 text-sm" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold text-ink-soft">Name (FR)</label>
          <input name="nameFr" className="w-40 border border-line px-2 py-1.5 text-sm" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold text-ink-soft">Name (AR)</label>
          <input name="nameAr" className="w-40 border border-line px-2 py-1.5 text-sm" dir="rtl" />
        </div>
        <button type="submit" className="bg-brand px-4 py-2 text-sm font-bold text-white hover:bg-brand-hover">Add Category</button>
      </form>

      <table className="mt-6 w-full border border-line bg-white text-start">
        <thead>
          <tr className="border-b border-line bg-surface-alt text-start">
            <th className="p-3 text-start text-xs font-bold uppercase text-muted">EN</th>
            <th className="p-3 text-start text-xs font-bold uppercase text-muted">FR</th>
            <th className="p-3 text-start text-xs font-bold uppercase text-muted">AR</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <CategoryRow key={c.id} category={c} />
          ))}
          {categories.length === 0 && (
            <tr>
              <td colSpan={4} className="p-6 text-center text-sm text-muted">No categories yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
