import Image from "next/image";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { logoutAction } from "@/lib/actions/auth";
import { prisma } from "@/lib/db";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/posts", label: "Blog Posts" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/media", label: "Media Library" },
  { href: "/admin/certificates", label: "Certificates" },
  { href: "/admin/messages", label: "Messages" },
];

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const [session, unreadCount] = await Promise.all([
    getSession(),
    prisma.contactSubmission.count({ where: { read: false } }),
  ]);

  return (
    <div className="flex min-h-screen bg-surface-alt">
      <aside className="flex w-60 shrink-0 flex-col border-r border-line bg-white">
        <div className="flex items-center gap-2 border-b border-line p-5">
          <Image src="/brand/logo-mark.webp" alt="Iris Polymere" width={30} height={28} className="h-7 w-auto" />
          <span className="text-sm font-bold text-ink">Admin</span>
        </div>
        <nav className="flex-1 p-3">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-ink-soft hover:bg-surface-alt hover:text-brand">
              {item.label}
              {item.href === "/admin/messages" && unreadCount > 0 && (
                <span className="rounded-full bg-brand px-2 py-0.5 text-[11px] font-bold text-white">{unreadCount}</span>
              )}
            </Link>
          ))}
        </nav>
        <div className="border-t border-line p-4">
          <p className="mb-2 truncate text-xs text-muted">{session?.email}</p>
          <form action={logoutAction}>
            <button type="submit" className="w-full border border-line px-3 py-2 text-xs font-bold text-ink-soft hover:border-brand hover:text-brand">
              Sign Out
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
