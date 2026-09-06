import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";

const title = "Street Address vs. Delivery Zone";
const description =
  "Learn why a commercial street address and the place where a delivery actually happens are often different—and what drivers need before arrival.";
const canonical = "/resources/street-address-vs-delivery-zone";
const publishedDate = "2026-09-06";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: {
    title: `${title} | FreightIQ`,
    description,
    url: canonical,
    siteName: "FreightIQ",
    images: [{ url: "/freightiq-delivery-hero.png", width: 1672, height: 941, alt: "A FreightIQ delivery truck approaching a receiving facility at sunrise" }],
    type: "article",
  },
};

export default function DeliveryZoneResourcePage() {
  return (
    <main className="overflow-hidden bg-[#090c0f] text-white">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: title, description, datePublished: publishedDate, dateModified: publishedDate, mainEntityOfPage: `https://freightiqapp.com${canonical}`, publisher: { "@id": "https://freightiqapp.com/#organization" }, image: "https://freightiqapp.com/freightiq-delivery-hero.png" }} />

      <section className="relative border-b border-white/10 bg-[#080b0d]">
        <div className="absolute inset-0 sunrise-grid opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
          <Link href="/resources" className="text-sm font-semibold text-orange-300 hover:text-orange-200">← FreightIQ Resources</Link>
          <p className="eyebrow mt-8">Delivery location</p>
          <p className="mt-4 text-sm text-stone-400">
            Published <time dateTime={publishedDate}>September 6, 2026</time>
          </p>
          <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-balance sm:text-5xl lg:text-7xl">
            Street Address vs. Delivery Zone: What Drivers Actually Need
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-stone-300 sm:text-xl">
            A street address identifies the property. A Delivery Zone identifies where the truck
            and freight need to be for the delivery to happen.
          </p>
        </div>
      </section>

      <section className="bg-[#f1eee8] text-[#171513]">
        <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-22 lg:py-24">
          <div className="grid gap-4 sm:grid-cols-2">
            <section className="rounded-[1.6rem] border border-stone-300 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-600">Street address</p>
              <h2 className="mt-3 text-2xl font-semibold text-stone-950">Gets you to the property</h2>
              <p className="mt-3 text-base leading-7 text-stone-700">Useful for identifying the business or parcel and reaching the general destination.</p>
            </section>
            <section className="rounded-[1.6rem] border border-orange-300 bg-orange-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-800">Delivery Zone</p>
              <h2 className="mt-3 text-2xl font-semibold text-stone-950">Gets you to the delivery</h2>
              <p className="mt-3 text-base leading-7 text-stone-700">The precise dock, receiving side, door, yard position, forklift area, or unloading point where the work is completed.</p>
            </section>
          </div>

          <div className="mt-10 space-y-8 text-lg leading-9 text-stone-700">
            <p>
              Navigation applications are good at finding addresses. Commercial deliveries require
              another layer of knowledge because the public-facing destination is often not designed
              for a delivery vehicle.
            </p>
            <p>
              A storefront can face one street while receiving sits behind the building. A campus
              may share one mailing address across several buildings. A warehouse can have separate
              docks for different products. A jobsite may move its unloading area as work progresses.
            </p>

            <h2 className="pt-4 text-3xl font-semibold tracking-[-0.035em] text-stone-950">A precise point is useful only with context</h2>
            <p>
              A Delivery Zone should not be treated as a dot that tells a driver to blindly follow
              the shortest line. The driver still needs to know how to approach it, whether the
              equipment fits, what kind of delivery is expected, and whether backing is required.
            </p>
            <ul className="list-disc space-y-3 pl-6 marker:text-orange-700">
              <li><strong className="text-stone-950">Truck Fit:</strong> what equipment can safely access and work the stop</li>
              <li><strong className="text-stone-950">Delivery Type:</strong> dock, forklift, liftgate, hand unload, jobsite, or another setup</li>
              <li><strong className="text-stone-950">Back In:</strong> whether backing is required and what the setup involves</li>
              <li><strong className="text-stone-950">Delivery Zone:</strong> the place where the freight actually changes hands</li>
            </ul>

            <h2 className="pt-4 text-3xl font-semibold tracking-[-0.035em] text-stone-950">Why the distinction matters</h2>
            <p>
              Entering from the customer side can leave a truck in a small parking lot with no safe
              turning room. Stopping at the office can require another lap around the property.
              Reaching the wrong dock can block another operation or create an unnecessary backing
              move.
            </p>
            <p>
              Knowing the Delivery Zone before arrival helps the driver choose an approach that
              matches the actual work instead of reacting after the truck is already out of position.
            </p>

            <h2 className="pt-4 text-3xl font-semibold tracking-[-0.035em] text-stone-950">The information should improve over time</h2>
            <p>
              The first driver may identify the receiving side. Another may add the useful entrance.
              A driver with different equipment may explain a clearance or turning limitation.
              Someone returning later may correct an outdated instruction.
            </p>
            <blockquote className="border-l-2 border-orange-700 py-2 pl-6 text-2xl font-semibold leading-10 tracking-[-0.025em] text-stone-900">
              The street address is the beginning of the delivery plan—not the whole plan.
            </blockquote>
            <p>
              FreightIQ organizes those contributions so real experience becomes practical stop
              intelligence without pretending that saved information replaces current signs,
              conditions, or professional judgment.
            </p>
          </div>

          <nav className="mt-14 grid gap-4 sm:grid-cols-2" aria-label="Related FreightIQ resources">
            <Link href="/real-example" className="rounded-2xl border border-stone-300 bg-white p-5 font-semibold text-stone-900 hover:border-orange-400">See the address-to-zone example →</Link>
            <Link href="/driver" className="rounded-2xl border border-stone-300 bg-white p-5 font-semibold text-stone-900 hover:border-orange-400">Explore FreightIQ for drivers →</Link>
          </nav>
        </article>
      </section>

      <section className="border-t border-white/10 bg-[#080b0d]">
        <div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 lg:py-20">
          <p className="eyebrow">Real driver intel</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-balance sm:text-5xl">Turn an address into a delivery plan.</h2>
          <Link href="/early-access" className="sunrise-button mt-8 inline-flex min-h-13 items-center justify-center rounded-full px-8 py-3.5 font-semibold text-[#120b06]">Request Early Access</Link>
        </div>
      </section>
    </main>
  );
}
