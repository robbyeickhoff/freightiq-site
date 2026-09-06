import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";

const title = "Find the Correct Truck Entrance and Receiving Area";
const description =
  "Learn how delivery drivers can distinguish a business address from the correct truck entrance, check-in point, receiving dock, and unloading area.";
const canonical = "/resources/find-the-correct-truck-entrance-and-receiving-area";
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

export default function TruckEntrancePage() {
  return (
    <main className="overflow-hidden bg-[#090c0f] text-white">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: title, description, datePublished: publishedDate, dateModified: publishedDate, mainEntityOfPage: `https://freightiqapp.com${canonical}`, publisher: { "@id": "https://freightiqapp.com/#organization" }, image: "https://freightiqapp.com/freightiq-delivery-hero.png" }} />

      <section className="relative border-b border-white/10 bg-[#080b0d]">
        <div className="absolute inset-0 sunrise-grid opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
          <Link href="/resources" className="text-sm font-semibold text-orange-300 hover:text-orange-200">← FreightIQ Resources</Link>
          <p className="eyebrow mt-8">Entrance and receiving</p>
          <p className="mt-4 text-sm text-stone-400">
            Published <time dateTime={publishedDate}>September 6, 2026</time>
          </p>
          <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-balance sm:text-5xl lg:text-7xl">
            How to Find the Correct Truck Entrance and Receiving Area
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-stone-300 sm:text-xl">
            The sign on the front of the building may confirm the business. It does not necessarily
            confirm where a delivery truck should enter, check in, back up, or unload.
          </p>
        </div>
      </section>

      <section className="bg-[#f1eee8] text-[#171513]">
        <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-22 lg:py-24">
          <aside className="rounded-[1.6rem] border border-orange-200 bg-orange-50 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-800">Start with this distinction</p>
            <p className="mt-3 text-xl font-semibold leading-8 text-stone-900">
              The public address, truck entrance, driver check-in point, receiving dock, and final
              delivery area can all be different places.
            </p>
          </aside>

          <div className="mt-10 space-y-8 text-lg leading-9 text-stone-700">
            <p>
              Commercial properties are often designed for customers, employees, production, and
              freight at the same time. The address usually points to the property as a whole. A
              driver still has to determine which part of that property supports the delivery.
            </p>

            <h2 className="pt-4 text-3xl font-semibold tracking-[-0.035em] text-stone-950">Look for evidence before committing the truck</h2>
            <p>
              Review the property from more than one angle while safely parked. Look for marked
              truck routes, receiving signs, gatehouses, docks, service roads, pavement wear, other
              commercial vehicles, and a path that appears to support both entry and exit.
            </p>
            <p>
              None of those clues is proof by itself. Signs can be outdated, an obvious dock can
              serve another tenant, and a driveway that looks wide from above may have a tight gate
              or turn at ground level.
            </p>

            <h2 className="pt-4 text-3xl font-semibold tracking-[-0.035em] text-stone-950">Separate four different questions</h2>
            <ol className="space-y-4">
              {[
                ["Where should the truck enter?", "The approved driveway or gate may be on another side of the property or a different street."],
                ["Where does the driver check in?", "A guard shack, office, call box, receiving door, or posted phone procedure may come before the dock."],
                ["Where should I end up?", "The correct dock, staging area, forklift side, customer unloading point, or jobsite position is the actual delivery zone."],
                ["How does the truck leave?", "Confirm that the plan preserves enough room to pull through, turn around, or complete the required backing setup."],
              ].map(([heading, copy], index) => (
                <li key={heading} className="rounded-[1.4rem] border border-stone-300 bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold text-orange-800">0{index + 1}</p>
                  <h3 className="mt-2 text-xl font-semibold text-stone-950">{heading}</h3>
                  <p className="mt-2 text-base leading-7">{copy}</p>
                </li>
              ))}
            </ol>

            <h2 className="pt-4 text-3xl font-semibold tracking-[-0.035em] text-stone-950">If the evidence conflicts, stop and verify</h2>
            <p>
              A map pin, sign, delivery document, and driver note may point in different directions.
              Do not turn uncertainty into a forced maneuver. Pause in a safe location, contact the
              business or dispatch when appropriate, and follow current authorized instructions.
            </p>
            <p>
              A useful driver note should also be specific enough to resolve the same uncertainty
              next time: identify the entrance street, direction of approach, gate or landmark,
              check-in point, and where the delivery actually takes place.
            </p>

            <h2 className="pt-4 text-3xl font-semibold tracking-[-0.035em] text-stone-950">Current information matters</h2>
            <p>
              Construction, security procedures, tenant changes, seasonal access, and yard
              congestion can change a correct entrance. Treat saved information as preparation,
              not permission to ignore current signs or conditions.
            </p>
            <blockquote className="border-l-2 border-orange-700 py-2 pl-6 text-2xl font-semibold leading-10 tracking-[-0.025em] text-stone-900">
              Good stop intelligence tells a driver where to look and what to expect while leaving
              room for the conditions that exist today.
            </blockquote>
          </div>

          <nav className="mt-14 grid gap-4 sm:grid-cols-2" aria-label="Related FreightIQ resources">
            <Link href="/resources/street-address-vs-delivery-zone" className="rounded-2xl border border-stone-300 bg-white p-5 font-semibold text-stone-900 hover:border-orange-400">Understand the Delivery Zone →</Link>
            <Link href="/demo" className="rounded-2xl border border-stone-300 bg-white p-5 font-semibold text-stone-900 hover:border-orange-400">See how FreightIQ works →</Link>
          </nav>
        </article>
      </section>

      <section className="border-t border-white/10 bg-[#080b0d]">
        <div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 lg:py-20">
          <p className="eyebrow">From address to delivery</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-balance sm:text-5xl">Know where the truck belongs before you turn in.</h2>
          <Link href="/early-access" className="sunrise-button mt-8 inline-flex min-h-13 items-center justify-center rounded-full px-8 py-3.5 font-semibold text-[#120b06]">Request Early Access</Link>
        </div>
      </section>
    </main>
  );
}
