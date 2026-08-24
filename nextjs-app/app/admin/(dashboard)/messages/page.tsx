import { prisma } from "@/lib/db";
import { MessageRow } from "@/components/admin/MessageRow";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });
  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Contact Messages</h1>
      <p className="mt-1 text-sm text-muted">
        {messages.length} total{unreadCount > 0 ? ` · ${unreadCount} unread` : ""} — submitted through the public Contact page.
      </p>

      <div className="mt-6 flex flex-col gap-2">
        {messages.map((m) => (
          <MessageRow key={m.id} message={m} />
        ))}
        {messages.length === 0 && (
          <p className="border border-dashed border-line bg-white p-8 text-center text-sm text-muted">
            No messages yet. They will appear here when a visitor submits the Contact form (locally — see ADMIN.md for the production limitation).
          </p>
        )}
      </div>
    </div>
  );
}
