"use client";

import { useActionState, useEffect, useRef } from "react";
import { changePassword, type ChangePasswordState } from "@/lib/actions/settings";

const initialState: ChangePasswordState = {};

export function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState(changePassword, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  const field = "w-72 border border-line px-3 py-2 text-sm";
  return (
    <form ref={formRef} action={formAction} className="mt-3 flex flex-col items-start gap-3">
      <input type="password" name="current" required placeholder="Current password" autoComplete="current-password" className={field} />
      <input type="password" name="next" required minLength={10} placeholder="New password (10+ characters)" autoComplete="new-password" className={field} />
      <input type="password" name="confirm" required minLength={10} placeholder="Repeat new password" autoComplete="new-password" className={field} />
      <div className="flex items-center gap-3">
        <button type="submit" disabled={pending} className="bg-brand px-3 py-2 text-xs font-bold text-white hover:bg-brand-hover disabled:opacity-60">
          {pending ? "Saving…" : "Change password"}
        </button>
        {state.error && <span className="text-xs font-semibold text-red-600">{state.error}</span>}
        {state.success && <span className="text-xs font-semibold text-green-700">Password changed.</span>}
      </div>
    </form>
  );
}
