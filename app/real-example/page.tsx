import type { Metadata } from "next";
import Link from "next/link";
import { RealExampleDiagram } from "@/components/RealExampleDiagram";

export const metadata: Metadata = {
  title: "Real Delivery Example | FreightIQ",
  description:
    "See how FreightIQ helps a local delivery driver understand the correct truck approach, delivery zone, and stop details behind a business address.",
  alternates: {
    canonical: "/real-example",
  },
  openGraph: {
    title: "Real Delivery Example | FreightIQ",
    description:
      "See how FreightIQ helps a local delivery driver understand the correct truck approach, delivery zone, and stop details behind a business address.",
    url: "https://freightiqapp.com/real-example",
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
  { number: "01", label: "Truck Fit", value: "28-foot trailer" },
  { number: "02", label: "Delivery Type", value: "Single rear dock" },
  { number: "03", label: "Back In", value: "Required" },
  { number: "04", label: "Delivery Zone", value: "North side of building" },
];

export default function RealExamplePage() {
  return (
    <main className="overflow-hidden bg-[#090c0f] text-white">
      <section className="relative border-b border-white/10 bg-[#080b0d]">
        <div className="absolute inset-0 sunrise-grid opacity-35" aria-hidden="true" />
        <div
          className="absolute left-[58%] top-[-14rem] h-[34rem] w-[34rem] rounded-full bg-orange-500/12 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:min-h-[38rem] lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-28">
          <div>
            <p className="eyebrow">A FreightIQ delivery example</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-balance sm:text-6xl lg:text-7xl">
              The address gets you close.
              <span className="sunrise-text block">Driver intel gets you to the right place.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">
              Follow one delivery from the public entrance to the actual receiving zone—and see
              the practical stop knowledge a normal address leaves out.
            </p>
            <a
              href="#example-stop"
              className="sunrise-button mt-9 inline-flex min-h-13 items-center justify-center rounded-full px-7 py-3.5 text-base font-semibold text-[#120b06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
            >
              Explore the Stop
              <span className="ml-2" aria-hidden="true">
                ↓
              </span>
            </a>
          </div>

          <div className="lg:justify-self-end">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm sm:p-6 lg:max-w-sm">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-300">
                  Example stop
                </span>
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-stone-400">
                  Illustrative
                </span>
              </div>
              <p className="mt-5 text-2xl font-semibold tracking-[-0.025em]">
                Canyon Peak Industrial Supply
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-xs text-stone-500">Equipment</p>
                  <p className="mt-1 font-semibold text-stone-200">28&apos; trailer</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-xs text-stone-500">Receiving</p>
                  <p className="mt-1 font-semibold text-stone-200">North side</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="example-stop" className="scroll-mt-24 bg-[#f1eee8] text-[#171513]">
        <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:py-22">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="eyebrow text-orange-700">Example stop</p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.045em] text-balance sm:text-5xl">
                Canyon Peak Industrial Supply
              </h2>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                Illustrative scenario
              </p>
            </div>
            <p className="max-w-2xl text-base leading-8 text-stone-600 lg:justify-self-end">
              The listed address points to the public entrance and customer parking. Receiving is
              behind the building, reached from a separate service driveway. Before entering the
              property, the driver can see the correct approach, the rear delivery zone, and the
              stop details needed to plan the delivery.
            </p>
          </div>

          <div className="mt-10">
            <RealExampleDiagram />
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-[#111518]">
        <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:py-22">
          <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
            <div>
              <p className="eyebrow">What the driver knows before arriving</p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.045em] text-balance sm:text-5xl">
                The address identifies the business. Driver intel explains the delivery.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-stone-400">
                Enter through the south service driveway, follow the side access lane, and prepare
                to back into the single dock on the north side.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#0c1013] p-4 sm:p-5">
              <div className="flex items-end justify-between gap-6 border-b border-white/10 px-1 pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-400">
                    Stop Intelligence
                  </p>
                  <p className="mt-2 text-xl font-semibold">Operational Essentials</p>
                </div>
                <span className="hidden font-mono text-xs text-stone-600 sm:block">01—04</span>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-3">
                {essentials.map((item) => (
                  <div
                    key={item.label}
                    className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
                        {item.label}
                      </dt>
                      <span className="font-mono text-[0.65rem] text-stone-600" aria-hidden="true">
                        {item.number}
                      </span>
                    </div>
                    <dd className="mt-3 text-base font-semibold leading-6 text-stone-100">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-12 grid gap-3 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
            <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                Conventional map
              </p>
              <p className="mt-3 text-base leading-7 text-stone-300">
                Arrive at Canyon Peak Industrial Supply&apos;s public address.
              </p>
            </article>
            <div className="flex items-center justify-center text-orange-400" aria-hidden="true">
              <span className="flex h-9 w-9 rotate-90 items-center justify-center rounded-full border border-orange-400/25 bg-orange-400/10 lg:rotate-0">
                →
              </span>
            </div>
            <article className="rounded-2xl border border-orange-400/20 bg-orange-400/[0.06] p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-300">
                FreightIQ stop intelligence
              </p>
              <p className="mt-3 text-base leading-7 text-stone-200">
                Enter through the south service driveway, follow the side access lane, and prepare
                to back into the single dock on the north side.
              </p>
            </article>
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
            <div
              className="absolute left-1/2 top-0 h-44 w-80 -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <p className="eyebrow">Confidence delivered</p>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Arrive prepared.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-stone-400">
                Request early access and help shape a better way to preserve and share practical
                delivery knowledge.
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
