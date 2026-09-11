"use client";

import { useActionState } from "react";
import { updateNotificationEmail, type UpdateNotificationEmailState } from "@/lib/actions/settings";

const initialState: UpdateNotificationEmailState = {};

export function NotificationEmailForm({ currentEmail }: { currentEmail: string | null }) {
  const [state, formAction, pending] = useActionState(updateNotificationEmail, initialState);

  return (
    <form action={formAction} className="mt-3 flex flex-wrap items-center gap-3">
      <input
        type="email"
        name="email"
        required
        defaultValue={currentEmail ?? ""}
        placeholder="orders@irispolymere.com"
        className="w-72 border border-line px-3 py-2 text-sm"
      />
      <button type="submit" disabled={pending} className="bg-brand px-3 py-2 text-xs font-bold text-white hover:bg-brand-hover disabled:opacity-60">
        {pending ? "Saving…" : "Save"}
      </button>
      {state.error && <span className="text-xs font-semibold text-red-600">{state.error}</span>}
      {state.success && <span className="text-xs font-semibold text-green-700">Saved.</span>}
    </form>
  );
}
