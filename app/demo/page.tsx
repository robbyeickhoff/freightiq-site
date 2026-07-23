import type { Metadata } from "next";
import Link from "next/link";
import { HowItWorksWorkflow } from "@/components/HowItWorksWorkflow";

export const metadata: Metadata = {
  title: "How FreightIQ Works | FreightIQ",
  description:
    "See how FreightIQ helps local delivery drivers find stops, review practical stop intelligence, plan deliveries, and preserve knowledge for the next driver.",
  alternates: {
    canonical: "/demo",
  },
  openGraph: {
    title: "How FreightIQ Works | FreightIQ",
    description:
      "See how FreightIQ helps local delivery drivers find stops, review practical stop intelligence, plan deliveries, and preserve knowledge for the next driver.",
    url: "https://freightiqapp.com/demo",
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

const workflowLabels = ["Find", "Review", "Plan", "Contribute"];

export default function DemoPage() {
  return (
    <main className="overflow-hidden bg-[#090c0f] text-white">
      <section className="relative border-b border-white/10 bg-[#080b0d]">
        <div className="absolute inset-0 sunrise-grid opacity-35" aria-hidden="true" />
        <div
          className="absolute left-[62%] top-[-15rem] h-[36rem] w-[36rem] rounded-full bg-orange-500/12 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:min-h-[38rem] lg:grid-cols-[1.18fr_0.82fr] lg:items-center lg:py-28">
          <div>
            <p className="eyebrow">How FreightIQ Works</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-balance sm:text-6xl lg:text-7xl">
              Find the stop. Read the intel.
              <span className="sunrise-text block">Arrive prepared.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">
              FreightIQ turns real delivery experience into practical stop knowledge drivers can
              review before arrival and improve after learning the stop.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#workflow"
                className="sunrise-button inline-flex min-h-13 items-center justify-center rounded-full px-7 py-3.5 text-base font-semibold text-[#120b06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
              >
                Follow the Workflow
                <span className="ml-2" aria-hidden="true">
                  ↓
                </span>
              </a>
              <Link
                href="/real-example"
                className="inline-flex min-h-13 items-center justify-center rounded-full border border-white/20 bg-black/20 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
              >
                See a Real Example
              </Link>
            </div>
          </div>

          <div className="lg:justify-self-end">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm sm:p-6 lg:w-[23rem]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-300">
                The knowledge loop
              </p>
              <ol className="mt-6 space-y-3">
                {workflowLabels.map((label, index) => (
                  <li key={label} className="flex items-center gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-orange-400/25 bg-orange-400/10 font-mono text-[0.65rem] font-semibold text-orange-300">
                      0{index + 1}
                    </span>
                    <span className="text-sm font-semibold text-stone-200">{label}</span>
                    {index < workflowLabels.length - 1 ? (
                      <span className="ml-auto text-stone-700" aria-hidden="true">
                        ↓
                      </span>
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <HowItWorksWorkflow />

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
              <p className="eyebrow">Join Early Access</p>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-balance sm:text-5xl">
                Help make unfamiliar stops easier to understand.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-stone-400">
                Request early access and help shape a better way to find, use, and preserve
                practical delivery knowledge.
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
