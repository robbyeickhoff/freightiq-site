import type { Metadata } from "next";
import Link from "next/link";

const description =
  "Practical FreightIQ guides for delivery drivers, dispatchers, and supervisors who want better stop knowledge and smoother deliveries.";

export const metadata: Metadata = {
  title: "Delivery Driver Resources | FreightIQ",
  description,
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Delivery Driver Resources | FreightIQ",
    description,
    url: "https://freightiqapp.com/resources",
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

export default function ResourcesPage() {
  return (
    <main className="overflow-hidden bg-[#090c0f] text-white">
      <section className="relative border-b border-white/10 bg-[#080b0d]">
        <div className="absolute inset-0 sunrise-grid opacity-30" aria-hidden="true" />
        <div
          className="absolute left-1/2 top-[-16rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-orange-500/12 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-24 lg:py-28">
          <p className="eyebrow">FreightIQ Resources</p>
          <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-balance sm:text-6xl lg:text-7xl">
            Practical knowledge for
            <span className="sunrise-text block">better deliveries.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">
            Straightforward guides for drivers, dispatchers, and supervisors—built around what
            actually happens between the address and the completed delivery.
          </p>
        </div>
      </section>

      <section className="relative bg-[#0d1114]">
        <div className="absolute inset-0 sunrise-grid opacity-15" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
          <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#111518] shadow-[0_28px_90px_rgba(0,0,0,0.32)]">
            <div className="p-7 sm:p-10 lg:p-12">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-orange-300">
                Fleet Operations
              </p>
              <h2 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.045em] text-balance sm:text-4xl lg:text-5xl">
                How to Get New Delivery Drivers Up to Speed Faster—Without Starting Every Stop
                From Zero
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-8 text-stone-400 sm:text-lg">
                Experienced drivers already know which entrances work, where deliveries really
                happen, and what catches new drivers off guard. Here is how supervisors can keep
                that knowledge from disappearing.
              </p>
              <Link
                href="/resources/get-new-delivery-drivers-up-to-speed-faster"
                className="sunrise-button mt-8 inline-flex min-h-13 items-center justify-center rounded-full px-7 py-3.5 text-base font-semibold text-[#120b06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
              >
                Read the Guide <span className="ml-2" aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
