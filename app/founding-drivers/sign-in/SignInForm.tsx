"use client";

import { useActionState, useState } from "react";
import { signIn, type SignInState } from "./actions";

const initialState: SignInState = { message: "" };

export default function SignInForm() {
  const [state, action, pending] = useActionState(signIn, initialState);
  const [showPassword, setShowPassword] = useState(false);

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
        <div className="relative mt-2">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            maxLength={1024}
            className="min-h-12 w-full rounded-xl border border-white/15 bg-black/30 px-4 pr-12 text-white outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            title={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 z-10 flex w-12 cursor-pointer items-center justify-center text-stone-400 transition hover:text-white focus-visible:rounded-r-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-400"
          >
            {showPassword ? (
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none">
                <path
                  d="M3 3l18 18M10.6 10.7a2 2 0 002.7 2.7M9.9 4.2A10.8 10.8 0 0112 4c5.2 0 9 5.3 9 5.3a16 16 0 01-2.2 2.7M6.2 6.2C4.2 7.6 3 9.3 3 9.3s3.8 5.3 9 5.3c1 0 2-.2 2.9-.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none">
                <path
                  d="M3 12s3.8-5.3 9-5.3S21 12 21 12s-3.8 5.3-9 5.3S3 12 3 12z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <p className="min-h-6 text-sm text-rose-300" aria-live="polite">
        {state.message}
      </p>
      <button
        type="submit"
        disabled={pending}
        className="sunrise-button min-h-12 rounded-full px-6 font-semibold text-[#120b06] disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? "Checking access…" : "Sign in to FreightIQ Operations"}
      </button>
    </form>
  );
}
