"use client";

import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { FormEvent, useState } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const fieldClassName =
  "mt-2.5 min-h-12 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-950 shadow-sm outline-none transition placeholder:text-stone-400 hover:border-stone-400 focus-visible:border-orange-600 focus-visible:ring-3 focus-visible:ring-orange-500/20";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      setStatus("error");
      setErrorMessage("Contact form is not configured yet. Please try again later.");
      return;
    }

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const topic = String(formData.get("topic") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !topic || !message) {
      setStatus("error");
      setErrorMessage("Please fill out your name, email, topic, and message.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const { error } = await supabase.functions.invoke("notify-contact", {
      body: {
        name,
        email,
        topic,
        message,
      },
    });

    if (error) {
      setStatus("error");
      setErrorMessage("Something went wrong sending your message. Please try again.");
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
          Message sent
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
          Thanks for contacting FreightIQ.
        </h2>
        <p className="mt-5 text-base leading-7 text-stone-700">
          Your message was sent successfully. If a response is needed, it will come from{" "}
          <span className="font-semibold text-stone-950">hello@freightiqapp.com</span>.
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
              Contact form
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
              Send us a message.
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
        </div>

        <div>
          <label className="text-sm font-semibold text-stone-800" htmlFor="topic">
            Topic{" "}
            <span className="text-orange-700" aria-hidden="true">
              *
            </span>
          </label>
          <select
            id="topic"
            name="topic"
            required
            className={fieldClassName}
            defaultValue=""
          >
            <option value="" disabled>
              Select a topic
            </option>
            <option value="general-question">General question</option>
            <option value="product-feedback">Product feedback</option>
            <option value="testing-support">Testing support</option>
            <option value="partnership-inquiry">Partnership inquiry</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-stone-800" htmlFor="message">
            Message{" "}
            <span className="text-orange-700" aria-hidden="true">
              *
            </span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            className={fieldClassName}
            placeholder="How can we help?"
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
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
