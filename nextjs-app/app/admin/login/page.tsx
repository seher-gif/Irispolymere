"use client";

import { useActionState } from "react";
import Image from "next/image";
import { loginAction, type LoginState } from "@/lib/actions/auth";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-alt px-4">
      <div className="w-full max-w-sm border border-line bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <Image src="/brand/logo-mark.webp" alt="Iris Polymere" width={44} height={42} className="h-10 w-auto" />
          <h1 className="text-lg font-bold text-ink">Admin Panel</h1>
          <p className="text-sm text-muted">Sign in to manage blog posts, categories, media and certificates.</p>
        </div>
        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-bold text-ink">Email</label>
            <input id="email" name="email" type="email" required autoComplete="username" className="border border-line px-3 py-2.5 text-sm outline-none focus:border-brand" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-bold text-ink">Password</label>
            <input id="password" name="password" type="password" required autoComplete="current-password" className="border border-line px-3 py-2.5 text-sm outline-none focus:border-brand" />
          </div>
          {state.error && <p className="text-sm font-semibold text-red-600">{state.error}</p>}
          <button type="submit" disabled={pending} className="mt-2 bg-brand py-2.5 text-sm font-bold text-white hover:bg-brand-hover disabled:opacity-60">
            {pending ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
