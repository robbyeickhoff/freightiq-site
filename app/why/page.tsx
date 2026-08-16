import type { Metadata } from "next";
import Link from "next/link";

const description =
  "I’ve been running freight in Western Colorado for 12 years. Here’s why I built FreightIQ—and why practical delivery knowledge should be easier for drivers to save and share.";

export const metadata: Metadata = {
  title: "Why I Built FreightIQ",
  description,
  alternates: {
    canonical: "/why",
  },
  openGraph: {
    title: "Why I Built FreightIQ",
    description,
    url: "https://freightiqapp.com/why",
    siteName: "FreightIQ",
    images: [
      {
        url: "/freightiq-delivery-hero.png",
        width: 1672,
        height: 941,
        alt: "A FreightIQ delivery truck approaching a receiving facility at sunrise",
      },
    ],
    type: "article",
  },
};

export default function WhyPage() {
  return (
    <main className="overflow-hidden bg-[#090c0f] text-white">
      <section className="relative border-b border-white/10 bg-[#080b0d]">
        <div className="absolute inset-0 sunrise-grid opacity-35" aria-hidden="true" />
        <div
          className="absolute left-[55%] top-[-15rem] h-[34rem] w-[34rem] rounded-full bg-orange-500/12 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
          <p className="eyebrow">The origin</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-balance sm:text-6xl lg:text-7xl">
            Why I Built <span className="sunrise-text">FreightIQ</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">
            A driver-built answer to a problem I kept seeing on the road: the knowledge already
            exists, but it is not easy for drivers to save and share.
          </p>
        </div>
      </section>

      <section className="bg-[#f1eee8] text-[#171513]">
        <article className="mx-auto max-w-3xl px-5 py-18 sm:px-8 sm:py-22 lg:py-26">
          <p className="text-xl leading-9 text-stone-700 sm:text-2xl sm:leading-10">
            I’ve been running freight in Western Colorado for the past 12 years.
          </p>

          <div className="mt-10 space-y-7 text-lg leading-9 text-stone-700">
            <p>
              FreightIQ started while I was covering a route I didn’t know well. A handful of the
              stops weren’t obvious—it wasn’t clear where you were actually supposed to deliver. I
              had to park the truck, get out, figure out where I needed to be, move into the right
              spot, and finally get the delivery done.
            </p>
            <p>
              The most annoying part was knowing that several of my coworkers had already delivered
              there. Drivers from other companies had too. That knowledge already existed. There
              just wasn’t an easy way for us to save it and share it with each other.
            </p>
            <blockquote className="border-l-2 border-orange-600 py-2 pl-6 text-2xl font-semibold leading-10 tracking-[-0.025em] text-stone-900 sm:text-3xl sm:leading-11">
              We have a hard enough job as it is. Why are we wasting time figuring things out the
              hard way when another driver already knows the answer?
            </blockquote>
            <p>
              So I started building FreightIQ: a way to capture practical delivery knowledge and
              make it useful to the next driver.
            </p>
            <p>
              If I can spend a couple of minutes saving information that helps another driver save
              10 or 15 minutes, why wouldn’t I?
            </p>
            <p className="text-2xl font-semibold tracking-[-0.025em] text-stone-900">
              That’s where FreightIQ came from.
            </p>
            <p>
              Time constraints, tight locations, bad weather, and difficult receiving situations
              aren’t going away. FreightIQ won’t eliminate every challenge, but it can help drivers
              arrive knowing where to go, what to expect, and how to get the delivery done with a
              little less stress.
            </p>
          </div>
        </article>
      </section>

      <section className="border-t border-white/10 bg-[#080b0d]">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="rounded-[2rem] border border-orange-400/20 bg-[#111518] px-6 py-12 text-center sm:px-10 lg:py-16">
            <p className="eyebrow">Help shape what comes next</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-balance sm:text-5xl">
              Built by a driver. Improved by drivers.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-stone-400">
              FreightIQ is in early access. Join the drivers helping build a better way to preserve
              and share practical delivery knowledge.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/early-access"
                className="sunrise-button inline-flex min-h-13 items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-[#120b06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
              >
                Request Early Access
              </Link>
              <Link
                href="/real-example"
                className="inline-flex min-h-13 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] px-8 py-3.5 text-base font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
              >
                See a Real Example{" "}
                <span className="ml-2" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
