import type { Metadata } from "next";
import Link from "next/link";
import { DriverShareActions } from "@/components/DriverShareActions";

export const metadata: Metadata = {
  title: "FreightIQ for Drivers | Know Before You Arrive",
  description:
    "See how FreightIQ helps delivery drivers understand truck fit, backing requirements, receiving locations, and real stop conditions before arriving.",
  alternates: {
    canonical: "/driver",
  },
  openGraph: {
    title: "FreightIQ for Drivers | Know Before You Arrive",
    description:
      "Real delivery knowledge from drivers who have already made the stop. See FreightIQ in action and request Early Access.",
    url: "https://freightiqapp.com/driver",
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
  twitter: {
    card: "summary_large_image",
    title: "FreightIQ for Drivers | Know Before You Arrive",
    description:
      "Real delivery knowledge from drivers who have already made the stop. See FreightIQ in action and request Early Access.",
    images: ["/freightiq-delivery-hero.png"],
  },
};

const driverBenefits = [
  {
    number: "01",
    title: "Truck Fit",
    description: "Know whether your equipment can safely access and work the stop.",
  },
  {
    number: "02",
    title: "Delivery Details",
    description: "See the delivery type, backing requirements, and useful approach information.",
  },
  {
    number: "03",
    title: "Delivery Zone",
    description: "Find the actual receiving location—not just the mailing address.",
  },
  {
    number: "04",
    title: "Driver Intel",
    description: "Learn from drivers who have already made the delivery.",
  },
];

export default function DriverPage() {
  return (
    <main className="overflow-hidden bg-[#090c0f] text-white">
      <section className="relative border-b border-white/10 bg-[#080b0d]">
        <div className="absolute inset-0 sunrise-grid opacity-30" aria-hidden="true" />
        <div
          className="absolute left-1/2 top-[-14rem] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-orange-500/12 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">FreightIQ for Drivers</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1] tracking-[-0.055em] text-balance sm:text-6xl lg:text-7xl">
              Know before
              <span className="sunrise-text block">you arrive.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">
              FreightIQ helps delivery drivers understand where the delivery actually happens,
              whether the truck will fit, and what to expect before entering the stop.
            </p>
            <div className="mx-auto mt-9 max-w-xl">
              <DriverShareActions />
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
              Driver-built stop knowledge. Clear when it matters.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0d1114]">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-2">
            {driverBenefits.map((benefit) => (
              <article key={benefit.title} className="bg-[#14191d] p-6 sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold tracking-[-0.025em]">{benefit.title}</h2>
                  <span className="font-mono text-xs text-orange-300">{benefit.number}</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-stone-400">{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/10 bg-[#080b0d]">
        <div className="absolute inset-0 sunrise-grid opacity-15" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-5xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_20rem] lg:items-center lg:py-22">
          <div>
            <p className="eyebrow">See FreightIQ in Action</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-balance sm:text-5xl">
              Real stop intelligence in about a minute.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-stone-400">
              Search a commercial stop, review practical Driver Intel, and use satellite view to
              confirm exactly where to deliver.
            </p>
          </div>
          <div className="mx-auto w-full max-w-[20rem] overflow-hidden rounded-[1.8rem] border border-white/10 bg-black p-2 shadow-[0_28px_80px_rgba(0,0,0,0.4)]">
            <div className="aspect-[9/16] overflow-hidden rounded-[1.4rem] bg-black">
              <iframe
                className="h-full w-full"
                src="https://www.youtube-nocookie.com/embed/0Yd5yhLpkfw"
                title="FreightIQ demo — real driver intel before you arrive"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f1eee8] text-[#171513]">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="overflow-hidden rounded-[2rem] border border-stone-300 bg-white px-6 py-12 text-center shadow-[0_24px_70px_rgba(54,42,30,0.1)] sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-700">
              FreightIQ Early Access
            </p>
            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-balance sm:text-5xl">
              Help make unfamiliar stops easier for the next driver.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-stone-600">
              FreightIQ is being tested with a small group of drivers. Request access and help
              shape a better way to preserve practical delivery knowledge.
            </p>
            <Link
              href="/early-access"
              className="sunrise-button mt-8 inline-flex min-h-13 items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-[#120b06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700"
            >
              Request Early Access
            </Link>
            <div className="mt-7">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-md text-sm font-semibold text-stone-600 transition-colors hover:text-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700"
              >
                Explore the full FreightIQ website <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
