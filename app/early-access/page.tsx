"use client";

import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { FormEvent, useState } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export default function EarlyAccessPage() {
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
      <main className="min-h-screen bg-slate-50 text-slate-950">
        <section className="mx-auto max-w-2xl px-6 py-16">
          <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-slate-950">
            ← Back to FreightIQ
          </Link>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
              Request Received
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight">
              Thanks for requesting FreightIQ Early Access.
            </h1>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Your request was submitted successfully. Early Access requests are reviewed manually.
              If approved, you&apos;ll receive install instructions by email.
            </p>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Watch your inbox. If you don&apos;t see an email from FreightIQ, check your spam or
              promotions folder.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-2xl px-6 py-16">
        <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-slate-950">
          ← Back to FreightIQ
        </Link>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
            Early Access
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight">Request FreightIQ Early Access</h1>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            FreightIQ is currently being tested with a small group of drivers. Answer a few quick
            questions so I know what device you use and what kind of driving you do.
          </p>

          <p className="mt-3 text-xs text-slate-500">
            No spam. Your information will only be used for FreightIQ Early Access communication.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-slate-800" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
                placeholder="you@example.com"
              />

              <p className="mt-2 text-xs text-slate-500">
                Use the email associated with the app store on your device:
                <br />
                • Android → Google Play Store account
                <br />• iPhone → Apple App Store account
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800" htmlFor="platform">
                Android or iPhone
              </label>
              <select
                id="platform"
                name="platform"
                required
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
                defaultValue=""
              >
                <option value="" disabled>
                  Select one
                </option>
                <option value="Android">Android</option>
                <option value="iPhone">iPhone</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800" htmlFor="cityState">
                City / State
              </label>
              <input
                id="cityState"
                name="cityState"
                type="text"
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
                placeholder="City, State"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800" htmlFor="driverType">
                Type of driving you do
              </label>
              <input
                id="driverType"
                name="driverType"
                type="text"
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
                placeholder="Local P&D, linehaul, box truck, hotshot, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800" htmlFor="notes">
                Anything you&apos;d like to see in an app like this?
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
                placeholder="Optional"
              />
            </div>

            {status === "error" ? (
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {errorMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Submitting..." : "Submit Request"}
            </button>

            <p className="text-xs leading-5 text-slate-500">
              Early Access requests are reviewed manually. If approved, you&apos;ll receive install
              instructions by email.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
