import type { Metadata } from "next";
import { EarlyAccessForm } from "../../components/EarlyAccessForm";

export const metadata: Metadata = {
  title: "Request FreightIQ Early Access",
  description:
    "Request FreightIQ Early Access and help shape a better way for drivers to share and use practical delivery knowledge.",
  alternates: {
    canonical: "/early-access",
  },
  openGraph: {
    title: "Request FreightIQ Early Access | FreightIQ",
    description:
      "Request FreightIQ Early Access and help shape a better way for drivers to share and use practical delivery knowledge.",
    url: "/early-access",
    images: [
      {
        url: "/freightiq-delivery-hero.png",
        alt: "A FreightIQ delivery truck approaching a receiving facility at sunrise",
      },
    ],
  },
};

export default function EarlyAccessPage() {
  return (
    <main className="relative flex-1 overflow-hidden bg-[#0a0d0f] text-white">
      <div className="absolute inset-0 sunrise-grid opacity-25" aria-hidden="true" />
      <div
        className="absolute left-[-8rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-orange-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-16rem] right-[-12rem] h-[40rem] w-[40rem] rounded-full bg-amber-400/8 blur-3xl"
        aria-hidden="true"
      />

      <section className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-18 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(32rem,1.18fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10">
          <div className="max-w-xl lg:col-start-1 lg:row-start-1 lg:pt-8">
            <p className="eyebrow">FreightIQ Early Access</p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.04] tracking-[-0.05em] text-balance sm:text-5xl lg:text-6xl">
              Request access.
              <span className="sunrise-text block">Help shape what comes next.</span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-8 text-stone-300">
              FreightIQ is currently being tested with a small group of drivers. Tell us what
              device you use and what kind of driving you do so we can review your request.
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
                No spam. Your information will only be used for FreightIQ Early Access
                communication.
              </p>
            </div>
          </div>

          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <EarlyAccessForm />
          </div>

          <aside
            className="max-w-xl rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-6 lg:col-start-1 lg:row-start-2 lg:self-start"
            aria-labelledby="what-happens-next"
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-orange-400/25 bg-orange-400/10 text-orange-300"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-4 w-4"
                >
                  <path
                    d="M4.5 7.5 12 13l7.5-5.5M6 19h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h2 id="what-happens-next" className="text-lg font-semibold text-white">
                What happens next
              </h2>
            </div>
            <p className="mt-4 text-sm leading-7 text-stone-300">
              Early Access requests are reviewed manually. If your request is approved, install
              instructions will arrive from{" "}
              <span className="font-semibold text-amber-200">hello@freightiqapp.com</span>.
            </p>
            <p className="mt-3 text-sm leading-7 text-stone-400">
              Add that address to your contacts or safe-sender list, and check spam, promotions, or
              updates if the message does not appear in your main inbox.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
