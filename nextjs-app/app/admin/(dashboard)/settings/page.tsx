import { getContactNotificationEmail } from "@/lib/actions/settings";
import { NotificationEmailForm } from "@/components/admin/NotificationEmailForm";

export default async function AdminSettingsPage() {
  const currentEmail = await getContactNotificationEmail();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Settings</h1>
      <p className="mt-1 text-sm text-muted">Site-wide settings not tied to a specific piece of content.</p>

      <div className="mt-6 max-w-2xl border border-line bg-white p-5">
        <h2 className="text-sm font-bold text-ink">Contact Form Notification Email</h2>
        <p className="mt-1 text-xs text-muted">
          The address new Contact page submissions should notify. This is stored here so it can be changed without a
          code change, but it isn&apos;t wired to actual email sending yet — for now, new submissions still only show
          up under <span className="font-semibold">Messages</span> in this panel. Ask to have email delivery set up
          once you&apos;ve decided how it should be sent (e.g. via a transactional email service or your existing
          mailbox), and it will use whatever address is saved here.
        </p>
        <NotificationEmailForm currentEmail={currentEmail} />
      </div>
    </div>
  );
}
