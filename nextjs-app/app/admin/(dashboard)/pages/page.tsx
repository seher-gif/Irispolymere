import Link from "next/link";
import { prisma } from "@/lib/db";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { tFrom } from "@/lib/i18n/t";
import { pageRegistry } from "@/lib/data/page-registry";

const GROUPS = ["Site", "Corporate", "Products"] as const;

export default async function AdminPagesList() {
  const [dict, overrides] = await Promise.all([getDictionary("en"), prisma.pageMeta.findMany()]);
  const t = tFrom(dict);
  const overriddenKeys = new Set(
    overrides
      .filter((o) => o.metaTitleEn || o.metaTitleFr || o.metaTitleAr || o.metaDescriptionEn || o.metaDescriptionFr || o.metaDescriptionAr)
      .map((o) => o.key)
  );

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Pages</h1>
      <p className="mt-1 text-sm text-muted">
        Override the meta title / description for any static page. Leave a page&apos;s fields blank to keep using its
        default site copy.
      </p>

      {GROUPS.map((group) => {
        const entries = pageRegistry.filter((p) => p.group === group);
        return (
          <div key={group} className="mt-8">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-muted">{group}</h2>
            <div className="border border-line bg-white">
              {entries.map((entry, i) => (
                <Link
                  key={entry.key}
                  href={`/admin/pages/${entry.key}`}
                  className={`flex items-center justify-between p-3.5 text-sm hover:bg-surface-alt ${i > 0 ? "border-t border-line" : ""}`}
                >
                  <span className="font-semibold text-ink">{t(entry.labelKey)}</span>
                  <span className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 text-[11px] font-bold ${overriddenKeys.has(entry.key) ? "bg-green-100 text-green-700" : "bg-surface-alt text-muted"}`}>
                      {overriddenKeys.has(entry.key) ? "Custom" : "Default"}
                    </span>
                    <span className="text-xs font-bold text-brand">Edit</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
