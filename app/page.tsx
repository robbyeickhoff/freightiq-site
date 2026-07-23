import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FreightIQ | Real Driver Intel for Better Deliveries",
  description:
    "FreightIQ helps local delivery drivers understand where the delivery actually happens, how to approach the stop, and what to expect before arriving.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FreightIQ | Real Driver Intel for Better Deliveries",
    description:
      "FreightIQ helps local delivery drivers understand where the delivery actually happens, how to approach the stop, and what to expect before arriving.",
    url: "https://freightiqapp.com",
    siteName: "FreightIQ",
    images: [
      {
        url: "/freightiq-delivery-hero.png",
        width: 1672,
        height: 941,
        alt: "A FreightIQ delivery truck approaching a receiving facility at sunrise",
      },
    ],
    type: "website",
  },
};

const essentials = [
  {
    number: "01",
    title: "Truck Fit",
    description: "Understand what equipment can safely access and work the stop.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 7h11v9H3zM14 10h3l4 4v2h-7zM6.5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM17.5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Delivery Type",
    description:
      "Know whether the delivery uses a dock, forklift, liftgate, hand unload, or another setup.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Back In",
    description: "See whether backing is required and what the maneuver involves.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 6h-8a6 6 0 0 0-6 6v5M8 14l-3 3-3-3M15 3l4 3-4 3" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Delivery Zone",
    description: "Find the actual receiving or unloading location—not just the mailing address.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
];

const trustPillars = [
  {
    title: "Built for drivers",
    description: "Designed around the decisions drivers make before entering a stop.",
  },
  {
    title: "Real operational knowledge",
    description:
      "Guidance comes from actual delivery experience rather than assumptions based only on an address.",
  },
  {
    title: "Simple contribution",
    description:
      "Drivers can preserve the most important information without writing a lengthy report.",
  },
  {
    title: "Clear stop intelligence",
    description:
      "FreightIQ organizes practical details so they are easy to understand when they matter.",
  },
];

export default function FreightIQLandingPage() {
  return (
    <main className="overflow-hidden bg-[#090c0f] text-white">
      <section className="relative border-b border-white/10 bg-[#080b0d]">
        <div className="relative h-[23rem] overflow-hidden lg:absolute lg:inset-0 lg:h-auto">
          <Image
            src="/freightiq-delivery-hero.png"
            alt="A FreightIQ delivery truck approaching a receiving facility at sunrise"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[64%_center] lg:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080b0d] via-transparent to-black/20 lg:bg-[linear-gradient(90deg,rgba(8,11,13,0.98)_0%,rgba(8,11,13,0.86)_35%,rgba(8,11,13,0.25)_63%,rgba(8,11,13,0.12)_100%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:flex lg:min-h-[46rem] lg:items-center lg:py-24">
          <div className="max-w-2xl lg:w-[56%]">
            <p className="eyebrow">Built from real delivery experience</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-balance sm:text-6xl lg:text-7xl">
              Real Driver Intel.
              <span className="sunrise-text block">Better Deliveries.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-stone-300 sm:text-xl">
              Know where the delivery actually happens—and what to expect before you arrive.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/early-access"
                className="sunrise-button inline-flex min-h-13 items-center justify-center rounded-full px-7 py-3.5 text-base font-semibold text-[#120b06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
              >
                Request Early Access
              </Link>
              <Link
                href="/demo"
                className="inline-flex min-h-13 items-center justify-center rounded-full border border-white/20 bg-black/20 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
              >
                See How It Works
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <span className="h-px w-10 bg-gradient-to-r from-orange-600 to-amber-300" />
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">
                Confidence Delivered.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/10 bg-[#0d1114]">
        <div className="absolute inset-0 sunrise-grid opacity-30" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:py-28">
          <div>
            <p className="eyebrow">The driver problem</p>
            <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.045em] text-balance sm:text-5xl">
              The address isn’t always where the delivery happens.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-stone-400 lg:pb-1">
            Drivers regularly arrive at the correct street address without knowing which entrance
            to use, whether the truck will fit, where to back in, or where receiving is actually
            located. That knowledge usually lives only in the experience of the drivers who have
            already made the delivery.
          </p>
        </div>
      </section>

      <section id="about" className="border-b border-white/10 bg-[#f1eee8] text-[#171513]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-18 sm:px-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-center lg:py-22">
          <div>
            <p className="eyebrow text-orange-700">Why FreightIQ matters</p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.045em] text-balance sm:text-5xl">
              FreightIQ preserves the knowledge behind a successful delivery.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
              Drivers contribute practical stop intelligence while it is still fresh. FreightIQ
              organizes that experience into clear, useful guidance for the next driver—including
              the same driver returning weeks or months later.
            </p>
            <p className="mt-8 border-l-2 border-orange-600 pl-5 text-sm font-semibold uppercase tracking-[0.14em] text-stone-700">
              Real experience becomes reusable operational knowledge.
            </p>
            <Link
              href="/real-example"
              className="mt-8 inline-flex items-center gap-2 rounded-md text-sm font-semibold text-orange-800 transition-colors hover:text-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700"
            >
              View a Real Example <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="rounded-[2rem] border border-stone-300/80 bg-[#e8e3db] p-4 shadow-[0_28px_80px_rgba(54,42,30,0.12)] sm:p-5">
            <div className="rounded-[1.6rem] bg-[#111518] p-5 text-white sm:p-6">
              <div className="flex items-end justify-between gap-6 border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-400">
                    Operational Essentials
                  </p>
                  <p className="mt-2 text-xl font-semibold">Know the essentials before you arrive.</p>
                </div>
                <span className="hidden font-mono text-xs text-stone-600 sm:block">01—04</span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {essentials.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="essential-icon h-10 w-10">{item.icon}</span>
                      <span className="font-mono text-[0.65rem] text-stone-600">{item.number}</span>
                    </div>
                    <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-stone-400">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-[#111518] text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-18 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:py-22">
          <div>
            <p className="eyebrow">Why drivers can trust the approach</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-balance sm:text-5xl">
              Built for the realities of local delivery.
            </h2>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <h3 className="text-lg font-semibold">
                Driver knowledge should not disappear when routes change.
              </h3>
              <p className="mt-3 text-sm leading-7 text-stone-400">
                By preserving practical stop intelligence, FreightIQ can help teams retain
                operational knowledge across drivers, routes, and staffing changes.
              </p>
            </div>
          </div>

          <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-2">
            {trustPillars.map((pillar, index) => (
              <article key={pillar.title} className="bg-[#171c20] p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-orange-400/25 bg-orange-400/10 text-xs font-semibold text-orange-300">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold">{pillar.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-400">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#080b0d]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="relative overflow-hidden rounded-[2rem] border border-orange-400/20 bg-[#111518] px-6 py-12 text-center sm:px-10 lg:py-16">
            <div
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute left-1/2 top-0 h-44 w-80 -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />
            <div className="relative">
              <p className="eyebrow">Join the early-access community</p>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Arrive prepared.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-stone-400">
                Join the early-access list and help shape a better way to share delivery knowledge.
              </p>
              <Link
                href="/early-access"
                className="sunrise-button mt-8 inline-flex min-h-13 items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-[#120b06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
              >
                Request Early Access
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
