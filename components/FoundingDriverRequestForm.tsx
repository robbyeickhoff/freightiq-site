"use client";

import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { FormEvent, useState } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const fieldClassName =
  "mt-2.5 min-h-12 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-950 shadow-sm outline-none transition placeholder:text-stone-400 hover:border-stone-400 focus-visible:border-orange-600 focus-visible:ring-3 focus-visible:ring-orange-500/20";

export function FoundingDriverRequestForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      setStatus("error");
      setErrorMessage("The request form is not configured yet. Please try again later.");
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
      request_type: "founding_driver",
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
        requestType: "founding_driver",
      },
    });

    if (notifyError) {
      setStatus("error");
      setErrorMessage("Your request was saved, but the notification could not be sent.");
      return;
    }

    setStatus("success");
  }

  if (status === "success") {
    return (
      <div
        className="relative overflow-hidden rounded-[2rem] border border-amber-300/35 bg-[#f1eee8] p-7 text-[#171513] shadow-[0_30px_90px_rgba(0,0,0,0.32)] sm:p-9"
        role="status"
        aria-live="polite"
      >
        <div
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-700 via-orange-500 to-amber-300"
          aria-hidden="true"
        />
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-700 text-xl font-bold text-white">
          ✓
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-orange-800">
          Request received
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
          Thanks for stepping forward.
        </h2>
        <p className="mt-5 text-base leading-7 text-stone-700">
          Founding Driver requests are reviewed personally. Requesting to join does not create an
          account, enroll you, or start the 30-day program window.
        </p>
        <p className="mt-4 text-sm leading-7 text-stone-600">
          If there is a fit, next steps will arrive from{" "}
          <span className="font-semibold text-stone-950">hello@freightiqapp.com</span>.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="sunrise-button inline-flex min-h-12 items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-[#120b06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700"
          >
            Return to FreightIQ
          </Link>
          <Link
            href="/founding-drivers/sign-in"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-400 px-7 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-600 hover:bg-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700"
          >
            Member Sign In
          </Link>
        </div>
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
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-800">
          Request to Join
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
            Tell us a little about you.
          </h2>
          <p className="text-xs font-medium text-stone-500">
            <span className="text-orange-700" aria-hidden="true">
              *
            </span>{" "}
            Required fields
          </p>
        </div>
      </div>

      <form
        id="founding-driver-request-form"
        className="space-y-6 px-6 py-7 sm:px-8 sm:py-8"
        onSubmit={handleSubmit}
        aria-busy={status === "submitting"}
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-stone-800" htmlFor="fd-name">
              Name <span className="text-orange-700">*</span>
            </label>
            <input
              id="fd-name"
              name="name"
              type="text"
              autoComplete="name"
              maxLength={120}
              required
              className={fieldClassName}
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-stone-800" htmlFor="fd-email">
              Email <span className="text-orange-700">*</span>
            </label>
            <input
              id="fd-email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              required
              className={fieldClassName}
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-stone-800" htmlFor="fd-platform">
            Phone platform <span className="text-orange-700">*</span>
          </label>
          <select id="fd-platform" name="platform" required className={fieldClassName} defaultValue="">
            <option value="" disabled>
              Select Android or iPhone
            </option>
            <option value="Android">Android</option>
            <option value="iPhone">iPhone</option>
          </select>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-stone-800" htmlFor="fd-city-state">
              City / State <span className="font-normal text-stone-500">(optional)</span>
            </label>
            <input
              id="fd-city-state"
              name="cityState"
              type="text"
              autoComplete="address-level2"
              maxLength={120}
              className={fieldClassName}
              placeholder="City, State"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-stone-800" htmlFor="fd-driver-type">
              Type of driving <span className="font-normal text-stone-500">(optional)</span>
            </label>
            <input
              id="fd-driver-type"
              name="driverType"
              type="text"
              maxLength={120}
              className={fieldClassName}
              placeholder="Local, regional, delivery..."
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-stone-800" htmlFor="fd-notes">
            Why are you interested? <span className="font-normal text-stone-500">(optional)</span>
          </label>
          <textarea
            id="fd-notes"
            name="notes"
            rows={5}
            maxLength={2000}
            className={fieldClassName}
            placeholder="Tell us what kind of stops you run and why practical delivery intel matters to you."
          />
        </div>

        <p className="text-sm leading-6 text-stone-600">
          Requests are reviewed manually. Submitting this form does not guarantee selection,
          create a FreightIQ account, or start the 30-day program.
        </p>

        {status === "error" ? (
          <p
            className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-900"
            role="alert"
            aria-live="assertive"
          >
            {errorMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="sunrise-button flex min-h-12 w-full items-center justify-center rounded-full px-7 py-3 text-base font-semibold text-[#120b06] disabled:cursor-wait disabled:opacity-65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700"
        >
          {status === "submitting" ? "Submitting..." : "Request to Join"}
        </button>
      </form>
    </div>
  );
}
