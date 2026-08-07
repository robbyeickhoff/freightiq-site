"use client";

import { useActionState } from "react";
import { signIn, type SignInState } from "./actions";

const initialState: SignInState = { message: "" };

export default function SignInForm() {
  const [state, action, pending] = useActionState(signIn, initialState);

  return (
    <form action={action} className="mt-8 grid gap-5">
      <div>
        <label htmlFor="email" className="text-sm font-semibold text-stone-200">
          FreightIQ email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          className="mt-2 min-h-12 w-full rounded-xl border border-white/15 bg-black/30 px-4 text-white outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-semibold text-stone-200">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          maxLength={1024}
          className="mt-2 min-h-12 w-full rounded-xl border border-white/15 bg-black/30 px-4 text-white outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
        />
      </div>
      <p className="min-h-6 text-sm text-rose-300" aria-live="polite">
        {state.message}
      </p>
      <button
        type="submit"
        disabled={pending}
        className="sunrise-button min-h-12 rounded-full px-6 font-semibold text-[#120b06] disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? "Checking access…" : "Sign in to Founding Drivers"}
      </button>
    </form>
  );
}
