import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Delete Your FreightIQ Account",
  description:
    "Learn how to request deletion of your FreightIQ account and associated personal data.",
  alternates: {
    canonical: "/delete-account",
  },
  openGraph: {
    title: "Delete Your FreightIQ Account | FreightIQ",
    description:
      "Learn how to request deletion of your FreightIQ account and associated personal data.",
    url: "/delete-account",
    images: [
      {
        url: "/freightiq-delivery-hero.png",
        alt: "A FreightIQ delivery truck approaching a receiving facility at sunrise",
      },
    ],
  },
};

const deletionSteps = [
  {
    title: "Use your account email",
    description:
      "Send the request from the email address associated with your FreightIQ account.",
  },
  {
    title: "Use the deletion subject line",
    description: "Use the subject: “Delete My FreightIQ Account.”",
  },
  {
    title: "Send the request",
    description: "Email the request to hello@freightiqapp.com.",
  },
];

export default function DeleteAccountPage() {
  return (
    <main className="relative flex-1 overflow-hidden bg-[#0a0d0f] text-white">
      <div className="absolute inset-0 sunrise-grid opacity-25" aria-hidden="true" />
      <div
        className="absolute left-[-10rem] top-[-12rem] h-[38rem] w-[38rem] rounded-full bg-orange-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-18rem] right-[-10rem] h-[42rem] w-[42rem] rounded-full bg-amber-400/8 blur-3xl"
        aria-hidden="true"
      />

      <section className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-18 lg:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(32rem,1.18fr)] lg:gap-x-16">
          <div className="max-w-xl lg:pt-8">
            <p className="eyebrow">Account deletion</p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.04] tracking-[-0.05em] text-balance sm:text-5xl lg:text-6xl">
              Delete your
              <span className="sunrise-text block">FreightIQ account.</span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-8 text-stone-300">
              You can request deletion of your FreightIQ account and associated personal data using
              the steps below.
            </p>
            <div className="mt-7 flex items-start gap-3 border-l-2 border-orange-500 pl-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="mt-0.5 h-5 w-5 shrink-0 text-amber-300"
                aria-hidden="true"
              >
                <path
                  d="M12 3 5.5 6v5.2c0 4.3 2.7 8.2 6.5 9.8 3.8-1.6 6.5-5.5 6.5-9.8V6L12 3Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="m9.5 12 1.7 1.7 3.6-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-sm leading-6 text-stone-400">
                You do not need access to the FreightIQ app to submit a deletion request.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-stone-300/80 bg-[#f1eee8] text-[#171513] shadow-[0_30px_90px_rgba(0,0,0,0.32)]">
            <div
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-700 via-orange-500 to-amber-300"
              aria-hidden="true"
            />
            <div className="border-b border-stone-300/80 px-6 py-6 sm:px-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-800">
                Deletion request
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
                How to request deletion
              </h2>
            </div>

            <div className="px-6 py-7 sm:px-8 sm:py-8">
              <ol className="space-y-6">
                {deletionSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-700 text-sm font-semibold text-white"
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                    <div className="pt-1">
                      <h3 className="text-base font-semibold text-stone-950">{step.title}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-stone-600">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <a
                href="mailto:hello@freightiqapp.com?subject=Delete%20My%20FreightIQ%20Account"
                className="sunrise-button mt-8 flex min-h-13 w-full items-center justify-center rounded-full px-6 py-3.5 text-center text-base font-semibold text-[#120b06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700"
              >
                Request Account Deletion
              </a>

              <p className="mt-4 text-center text-xs leading-5 text-stone-500">
                This opens a pre-addressed email to hello@freightiqapp.com. Nothing is sent
                automatically.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <section className="rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-400/25 bg-orange-400/10 text-orange-300"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path d="M7 8h10m-9 0 .7 11h6.6L16 8M10 8V5h4v3M5 8h14" />
              </svg>
            </span>
            <h2 className="mt-5 text-xl font-semibold text-white">What will be deleted</h2>
            <p className="mt-3 text-sm leading-7 text-stone-300">
              After the request is confirmed, FreightIQ will delete your account and personal data
              associated with it, except information that must be retained for legitimate legal,
              security, fraud-prevention, or regulatory reasons.
            </p>
            <p className="mt-3 text-sm leading-7 text-stone-400">
              Any information FreightIQ is required to retain will be handled according to the{" "}
              <Link
                href="/privacy"
                className="rounded-sm font-semibold text-amber-200 underline decoration-amber-300/35 underline-offset-4 transition-colors hover:text-amber-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section className="rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-400/25 bg-orange-400/10 text-orange-300"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path
                  d="M4.5 7.5 12 13l7.5-5.5M6 19h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h2 className="mt-5 text-xl font-semibold text-white">What happens next</h2>
            <p className="mt-3 text-sm leading-7 text-stone-300">
              Deletion requests are reviewed manually. FreightIQ may contact you at your account
              email if additional information is needed to confirm the request.
            </p>
            <p className="mt-3 text-sm leading-7 text-stone-400">
              You will receive an email confirmation when the deletion request has been completed.
            </p>
          </section>
        </div>

        <p className="mt-8 text-center text-xs text-stone-500">Last updated: July 2026</p>
      </section>
    </main>
  );
}
