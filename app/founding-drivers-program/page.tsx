import type { Metadata } from "next";
import Link from "next/link";
import { FoundingDriverRequestForm } from "../../components/FoundingDriverRequestForm";

export const metadata: Metadata = {
  title: "Founding Drivers Program",
  description:
    "Learn about the FreightIQ Founding Drivers Program, request consideration, or sign in to your private member dashboard.",
  alternates: {
    canonical: "/founding-drivers-program",
  },
  openGraph: {
    title: "Founding Drivers Program | FreightIQ",
    description:
      "Help build the delivery intel drivers actually need through FreightIQ's small Founding Drivers Program.",
    url: "/founding-drivers-program",
    images: [
      {
        url: "/freightiq-delivery-hero.png",
        alt: "A FreightIQ delivery truck approaching a receiving facility at sunrise",
      },
    ],
  },
};

const coreIntel = ["Truck Fit", "Delivery Type", "Back In", "Delivery Zone"];

export default function FoundingDriversProgramPage() {
  return (
    <main className="flex-1 bg-[#090c0f] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="sunrise-grid absolute inset-0 opacity-25" aria-hidden="true" />
        <div
          className="absolute left-1/2 top-[-22rem] h-[44rem] w-[56rem] -translate-x-1/2 rounded-full bg-orange-500/14 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:py-30">
          <div className="max-w-4xl">
            <p className="eyebrow">Founding Drivers Program</p>
            <h1 className="mt-6 text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-balance sm:text-6xl lg:text-7xl">
              Help build the delivery intel
              <span className="sunrise-text block">drivers actually need.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">
              Founding Drivers use FreightIQ on real delivery days, improve Core Intel at the stops
              they know, and help shape a better tool for the drivers coming next.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#request-to-join"
                className="sunrise-button inline-flex min-h-12 items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-[#120b06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
              >
                Request to Join
              </a>
              <Link
                href="/founding-drivers/sign-in"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:border-amber-300/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
              >
                Member Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0d1114]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_0.72fr] lg:items-center lg:py-24">
          <div className="max-w-2xl">
            <p className="eyebrow">See the program in action</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Build better stop intel. Earn meaningful rewards.
            </h2>
            <p className="mt-6 text-base leading-8 text-stone-300">
              Founding Drivers turn what they learn on real delivery days into practical knowledge
              for the next driver. Watch the short overview to see how useful contributions and
              consistent participation move the program forward.
            </p>
            <a
              href="#request-to-join"
              className="mt-8 inline-flex rounded-md font-semibold text-amber-200 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
            >
              Request to Join
            </a>
          </div>
          <div className="mx-auto w-full max-w-[21rem] overflow-hidden rounded-[2rem] border border-white/10 bg-black p-2 shadow-[0_28px_90px_rgba(0,0,0,0.38)]">
            <div className="aspect-[9/16] overflow-hidden rounded-[1.55rem] bg-black">
              <iframe
                className="h-full w-full"
                src="https://www.youtube-nocookie.com/embed/N80FrPgDa58"
                title="FreightIQ Founding Drivers Program — build better stop intel and earn rewards"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="eyebrow">Built from the road</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Real stops. Practical checks. Better intel.
            </h2>
            <p className="mt-6 text-base leading-8 text-stone-300">
              The program is a small, hands-on group—not a survey panel. Founding Drivers use the
              same FreightIQ map and Stop Intel experience they would use on a normal delivery day.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {coreIntel.map((item, index) => (
              <div
                key={item}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">
                  Core Intel {index + 1}
                </p>
                <p className="mt-3 text-xl font-semibold text-stone-100">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0d1114]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            <p className="eyebrow">How the 30 days work</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Simple enough to understand. Real enough to matter.
            </h2>
          </div>
          <ol className="mt-12 grid gap-5 lg:grid-cols-3">
            <li className="rounded-[1.6rem] border border-white/10 bg-[#11171a] p-7">
              <span className="text-4xl font-semibold text-orange-400">01</span>
              <h3 className="mt-8 text-xl font-semibold">Use FreightIQ naturally</h3>
              <p className="mt-3 text-sm leading-7 text-stone-400">
                Viewing Stop Intel, starting navigation, or successfully contributing Intel can
                count as meaningful activity. Merely opening the app does not.
              </p>
            </li>
            <li className="rounded-[1.6rem] border border-white/10 bg-[#11171a] p-7">
              <span className="text-4xl font-semibold text-orange-400">02</span>
              <h3 className="mt-8 text-xl font-semibold">Complete useful stop intel</h3>
              <p className="mt-3 text-sm leading-7 text-stone-400">
                A qualifying stop needs all four Core Intel items. Robby reviews each submitted
                stop before it counts toward the program.
              </p>
            </li>
            <li className="rounded-[1.6rem] border border-white/10 bg-[#11171a] p-7">
              <span className="text-4xl font-semibold text-orange-400">03</span>
              <h3 className="mt-8 text-xl font-semibold">See your progress live</h3>
              <p className="mt-3 text-sm leading-7 text-stone-400">
                Approved members get a private dashboard showing their active days, qualifying
                stops, review status, and reward progress.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-orange-400/25 bg-gradient-to-br from-orange-500/14 to-transparent p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
              Qualification reward
            </p>
            <p className="mt-5 text-5xl font-semibold tracking-[-0.05em]">$25</p>
            <p className="mt-5 max-w-md leading-7 text-stone-300">
              Earned after 10 active days and 10 approved qualifying stops during the program
              window.
            </p>
          </div>
          <div className="rounded-[2rem] border border-amber-300/25 bg-gradient-to-br from-amber-300/12 to-transparent p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
              Maximum reward
            </p>
            <p className="mt-5 text-5xl font-semibold tracking-[-0.05em]">$40</p>
            <p className="mt-5 max-w-md leading-7 text-stone-300">
              Reached at 20 approved qualifying stops. Requests, reviews, and reward delivery are
              handled manually.
            </p>
          </div>
        </div>
        <p className="mt-6 text-sm leading-7 text-stone-500">
          Requesting to join does not guarantee selection, program access, enrollment, or payment.
          The 30-day window begins only after an approved FreightIQ account is personally enrolled.
        </p>
      </section>

      <section className="border-y border-white/10 bg-[#0d1114]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
          <div>
            <p className="eyebrow">Who it is for</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Drivers who notice the details.
            </h2>
          </div>
          <ul className="grid gap-4 text-base leading-7 text-stone-300 sm:grid-cols-2">
            {[
              "Active local, regional, or delivery drivers",
              "Drivers using Android or iPhone",
              "Drivers willing to check practical stop information",
              "Drivers comfortable giving direct early feedback",
            ].map((item) => (
              <li key={item} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <span className="mr-3 text-orange-400" aria-hidden="true">
                  ●
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="request-to-join" className="relative overflow-hidden scroll-mt-8">
        <div className="sunrise-grid absolute inset-0 opacity-15" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.72fr_1.28fr] lg:py-24">
          <div className="lg:pt-8">
            <p className="eyebrow">Take the first step</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Request consideration.
            </h2>
            <p className="mt-6 text-base leading-8 text-stone-300">
              Tell us where and how you drive. Requests are reviewed personally, and a small number
              of drivers will be contacted with next steps.
            </p>
            <div className="mt-8 border-l-2 border-orange-500 pl-5">
              <p className="text-sm leading-7 text-stone-400">
                Already enrolled? Skip the form and open your private dashboard.
              </p>
              <Link
                href="/founding-drivers/sign-in"
                className="mt-3 inline-flex rounded-md font-semibold text-amber-200 underline decoration-amber-300/35 underline-offset-4 transition hover:text-amber-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
              >
                Member Sign In
              </Link>
            </div>
          </div>
          <FoundingDriverRequestForm />
        </div>
      </section>
    </main>
  );
}
