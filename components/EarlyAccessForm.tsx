"use client";

import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { FormEvent, useState } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const fieldClassName =
  "mt-2.5 min-h-12 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-950 shadow-sm outline-none transition placeholder:text-stone-400 hover:border-stone-400 focus-visible:border-orange-600 focus-visible:ring-3 focus-visible:ring-orange-500/20";

export function EarlyAccessForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      setStatus("error");
      setErrorMessage("Early Access form is not configured yet. Please try again later.");
      return;
    }

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const platform = String(formData.get("platform") ?? "").trim();
    const cityState = String(formData.get("cityState") ?? "").trim();
    const driverType = String(formData.get("driverType") ?? "").trim();
    const notes = String(formData.get("notes") ?? "").trim();

    if (!name || !email || !platform) {
      setStatus("error");
      setErrorMessage("Please fill out your name, email, and Android/iPhone selection.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const { error } = await supabase.from("early_access_requests").insert({
      name,
      email,
      platform,
      city_state: cityState || null,
      driver_type: driverType || null,
      notes: notes || null,
    });

    if (error) {
      setStatus("error");
      setErrorMessage("Something went wrong submitting your request. Please try again.");
      return;
    }

    const { error: notifyError } = await supabase.functions.invoke("notify-early-access", {
      body: {
        name,
        email,
        platform,
        cityState,
        driverType,
        notes,
      },
    });

    if (notifyError) {
      setStatus("error");
      setErrorMessage(`Request saved, but notification failed: ${notifyError.message}`);
      return;
    }

    setStatus("success");
  }

  if (status === "success") {
    return (
      <div
        className="relative overflow-hidden rounded-[2rem] border border-amber-300/35 bg-[#f1eee8] p-6 text-[#171513] shadow-[0_30px_90px_rgba(0,0,0,0.32)] sm:p-9"
        role="status"
        aria-live="polite"
      >
        <div
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-700 via-orange-500 to-amber-300"
          aria-hidden="true"
        />
        <span
          className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-700 text-white"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6"
          >
            <path d="m6 12 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-orange-800">
          Request received
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
          Your Early Access request is in.
        </h2>
        <p className="mt-5 text-base leading-7 text-stone-700">
          Thanks for your interest in FreightIQ. Requests are reviewed manually. If approved,
          you&apos;ll receive install instructions from{" "}
          <span className="font-semibold text-stone-950">hello@freightiqapp.com</span>.
        </p>
        <p className="mt-4 text-sm leading-7 text-stone-600">
          Add the address to your contacts or safe-sender list, and check spam, promotions, or
          updates if needed.
        </p>
        <Link
          href="/"
          className="sunrise-button mt-8 inline-flex min-h-12 items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-[#120b06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700"
        >
          Return to FreightIQ
        </Link>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-stone-300/80 bg-[#f1eee8] text-[#171513] shadow-[0_30px_90px_rgba(0,0,0,0.32)]">
      <div
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-700 via-orange-500 to-amber-300"
        aria-hidden="true"
      />
      <div className="border-b border-stone-300/80 px-6 py-6 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-800">
              Early Access request
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
              Tell us a little about you.
            </h2>
          </div>
          <p className="text-xs font-medium text-stone-500">
            <span className="text-orange-700" aria-hidden="true">
              *
            </span>{" "}
            Required fields
          </p>
        </div>
      </div>

      <form
        className="space-y-6 px-6 py-7 sm:px-8 sm:py-8"
        onSubmit={handleSubmit}
        aria-busy={status === "submitting"}
      >
        <div>
          <label className="text-sm font-semibold text-stone-800" htmlFor="name">
            Name{" "}
            <span className="text-orange-700" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={fieldClassName}
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-stone-800" htmlFor="email">
            Email{" "}
            <span className="text-orange-700" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={fieldClassName}
            placeholder="you@example.com"
          />
          <p className="mt-2.5 text-xs leading-5 text-stone-600">
            Use the email associated with the app store on your phone: your Google Play account for
            Android or Apple App Store account for iPhone.
          </p>
        </div>

        <div>
          <label className="text-sm font-semibold text-stone-800" htmlFor="platform">
            Phone{" "}
            <span className="text-orange-700" aria-hidden="true">
              *
            </span>
          </label>
          <select
            id="platform"
            name="platform"
            required
            className={fieldClassName}
            defaultValue=""
          >
            <option value="" disabled>
              Select Android or iPhone
            </option>
            <option value="Android">Android</option>
            <option value="iPhone">iPhone</option>
          </select>
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-4">
            <label className="text-sm font-semibold text-stone-800" htmlFor="cityState">
              City / State
            </label>
            <span className="text-xs text-stone-500">Optional</span>
          </div>
          <input
            id="cityState"
            name="cityState"
            type="text"
            className={fieldClassName}
            placeholder="City, State"
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-4">
            <label className="text-sm font-semibold text-stone-800" htmlFor="driverType">
              Type of driving
            </label>
            <span className="text-xs text-stone-500">Optional</span>
          </div>
          <input
            id="driverType"
            name="driverType"
            type="text"
            className={fieldClassName}
            placeholder="Local P&amp;D, linehaul, box truck, hotshot, etc."
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-4">
            <label className="text-sm font-semibold text-stone-800" htmlFor="notes">
              What would you like FreightIQ to help with?
            </label>
            <span className="text-xs text-stone-500">Optional</span>
          </div>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            className={fieldClassName}
            placeholder="Share anything that would make unfamiliar stops easier."
          />
        </div>

        {status === "error" ? (
          <div
            className="flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-800"
            role="alert"
          >
            <span aria-hidden="true">!</span>
            <p>{errorMessage}</p>
          </div>
        ) : null}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="sunrise-button flex min-h-13 w-full items-center justify-center rounded-full px-6 py-3.5 text-base font-semibold text-[#120b06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Submitting..." : "Submit Request"}
        </button>

        <p className="text-center text-xs leading-5 text-stone-500">
          Requests are reviewed manually. Submitting this form does not guarantee access.
        </p>
      </form>
    </div>
  );
}
