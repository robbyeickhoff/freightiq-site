import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";

const title = "Street Address vs. Delivery Zone: What Drivers Actually Need";
const description =
  "Learn why a commercial street address and the place where a delivery actually happens are often different—and what drivers need before arrival.";
const canonical = "/resources/street-address-vs-delivery-zone";
const publishedDate = "2026-09-06";
const modifiedDate = "2026-09-23";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: {
    title: `${title} | FreightIQ`,
    description,
    url: canonical,
    siteName: "FreightIQ",
    images: [{ url: "/freightiq-social.jpg", width: 1200, height: 630, alt: "A FreightIQ delivery truck approaching a receiving facility at sunrise" }],
    type: "article",
  },
};

export default function DeliveryZoneResourcePage() {
  return (
    <main className="overflow-hidden bg-[#090c0f] text-white">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: title, description, author: { "@id": "https://freightiqapp.com/#organization" }, datePublished: publishedDate, dateModified: modifiedDate, mainEntityOfPage: `https://freightiqapp.com${canonical}`, publisher: { "@id": "https://freightiqapp.com/#organization" }, image: "https://freightiqapp.com/freightiq-social.jpg" }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://freightiqapp.com/" }, { "@type": "ListItem", position: 2, name: "Resources", item: "https://freightiqapp.com/resources" }, { "@type": "ListItem", position: 3, name: "Street Address vs. Delivery Zone", item: "https://freightiqapp.com/resources/street-address-vs-delivery-zone" }] }} />

      <section className="relative border-b border-white/10 bg-[#080b0d]">
        <div className="absolute inset-0 sunrise-grid opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
          <Link href="/resources" className="text-sm font-semibold text-orange-300 hover:text-orange-200">← FreightIQ Resources</Link>
          <p className="eyebrow mt-8">Delivery location</p>
          <p className="mt-4 text-sm text-stone-400">
            Published <time dateTime={publishedDate}>September 6, 2026</time> · Updated <time dateTime={modifiedDate}>September 23, 2026</time>
          </p>
          <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-balance sm:text-5xl lg:text-7xl">
            Street Address vs. Delivery Zone: What Drivers Actually Need
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-stone-300 sm:text-xl">
            Your GPS can be right and still put you in the wrong place. A street address finds the property; the Delivery Zone finds where the freight changes hands.
          </p>
        </div>
      </section>

      <section className="bg-[#f1eee8] text-[#171513]">
        <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-22 lg:py-24">
          <div className="space-y-7 text-lg leading-9 text-stone-700">
          <p>Your GPS can be right and still put you in the wrong place.</p>
          <p>The street address on the BOL, the dispatch note, or the map pin usually points to the property. For a commercial delivery, that is only half the problem. The other half is where the truck actually works — the receiving door, dock, yard spot, or unload point where freight changes hands.</p>
          <p>That second place is what FreightIQ calls the <strong className="text-stone-950">Delivery Zone</strong>. This guide is for local freight, LTL (less-than-truckload — freight that shares truck space), and commercial drivers who hit unfamiliar stops, and for the dispatchers and supervisors who want those drivers to arrive prepared.</p>
          <p>Navigation apps are good at finding addresses. Commercial stops often need another layer of knowledge, because the public-facing destination is frequently not designed for a delivery vehicle.</p>
          <h2 className="pt-5 text-3xl font-semibold tracking-[-0.035em] text-stone-950">Two destinations that look like one address</h2>
          <p>A mailing address, a storefront pin, and a receiving location can all “belong” to the same business and still send a truck three different ways.</p>
          <p>Common patterns (examples, not case studies):</p>
          <ul className="list-disc space-y-3 pl-6 marker:text-orange-700">
            <li>A storefront faces Main Street; receiving sits in an alley or behind the building.</li>
            <li>An industrial park has a car entrance for customers and employees, and a separate truck gate with a wider curb cut or guard shack.</li>
            <li>A campus or office park shares one mailing address across several buildings.</li>
            <li>A warehouse has docks numbered by product, carrier, or door type — the “right” address still leaves the wrong door.</li>
            <li>A jobsite moves its unload area as work progresses, so last month’s memory is already stale.</li>
          </ul>
          <p>If you only follow the street address, you are solving the property problem. You still have to solve the delivery problem.</p>
          <p>For a fuller walkthrough of how to prep before you commit the truck, see <Link href="/resources/prepare-for-an-unfamiliar-commercial-delivery-stop" className="font-semibold text-orange-800 underline underline-offset-4 hover:text-orange-600">How to prepare for an unfamiliar commercial delivery stop</Link>.</p>
          <h2 className="pt-5 text-3xl font-semibold tracking-[-0.035em] text-stone-950">What “Delivery Zone” means</h2>
          <p>A <strong className="text-stone-950">Delivery Zone</strong> is the dock, door, yard position, forklift area, or unloading point where the work is completed — not merely where the business is listed.</p>
          <p>Think of it this way:</p>
          <ul className="list-disc space-y-3 pl-6 marker:text-orange-700">
            <li>The street address gets you to the property.</li>
            <li>The Delivery Zone gets you to the delivery.</li>
          </ul>
          <p>It is a plain-language label for the place freight actually changes hands. It is not a promise that one pin replaces judgment, signs, or a call to receiving.</p>
          <h3 className="pt-5 text-2xl font-semibold tracking-[-0.035em] text-stone-950">Why a precise pin alone is not enough</h3>
          <p>A precise point on a map is useful. Treated as a blind “follow the shortest line” instruction, it can still put a truck in trouble.</p>
          <p>Even when you know the unload point, you still need to know:</p>
          <ul className="list-disc space-y-3 pl-6 marker:text-orange-700">
            <li><strong className="text-stone-950">Truck Fit</strong> — what equipment can safely access and work the stop</li>
            <li><strong className="text-stone-950">Delivery Type</strong> — dock, forklift, liftgate, hand unload, jobsite, or another setup</li>
            <li><strong className="text-stone-950">Back In</strong> — whether backing is required and what the maneuver involves</li>
            <li><strong className="text-stone-950">Delivery Zone</strong> — where the freight actually changes hands</li>
          </ul>
          <p>A pin without that context can still drop you into a tight customer lot, the wrong approach lane, or a backing move you did not plan for.</p>
          <h2 className="pt-5 text-3xl font-semibold tracking-[-0.035em] text-stone-950">What usually goes wrong when you only follow the street address</h2>
          <p>These are everyday outcomes, not scare stories:</p>
          <ul className="list-disc space-y-3 pl-6 marker:text-orange-700">
            <li>You enter from the customer side and end up in a small parking lot with no safe turning room for the trailer.</li>
            <li>You check in at the office, then take another lap around the property to find shipping and receiving.</li>
            <li>You reach the wrong dock or the wrong building on a shared address and block another operation.</li>
            <li>You commit to an unnecessary or unsafe back-in because the approach was wrong from the start.</li>
          </ul>
          <p>Knowing the Delivery Zone before arrival helps you choose an approach that matches the actual work — instead of reacting after the truck is already out of position.</p>
          <p>Practical help on finding the truck path (not the front door) is in <Link href="/resources/find-the-correct-truck-entrance-and-receiving-area" className="font-semibold text-orange-800 underline underline-offset-4 hover:text-orange-600">Find the correct truck entrance and receiving area</Link>.</p>
          <h2 className="pt-5 text-3xl font-semibold tracking-[-0.035em] text-stone-950">A simple pre-arrival check (before you commit the truck)</h2>
          <p>You do not need a long report. You need a short sequence.</p>
          <h3 className="pt-5 text-2xl font-semibold tracking-[-0.035em] text-stone-950">1. Confirm the property, then find the truck path</h3>
          <p>Satellite view and Street View will not replace a good note from a driver who has been there, but they help you spot:</p>
          <ul className="list-disc space-y-3 pl-6 marker:text-orange-700">
            <li>Wider curb cuts and reinforced entrances meant for trucks</li>
            <li>A guard shack, intercom, or gate that is not the customer lobby</li>
            <li>Signs that say “Trucks,” “Shipping,” or “Receiving”</li>
            <li>Dock doors on the side or rear of the building</li>
          </ul>
          <p>Ask yourself: if I follow the blue line to the front door, can this truck still turn around?</p>
          <h3 className="pt-5 text-2xl font-semibold tracking-[-0.035em] text-stone-950">2. Look for the four essentials</h3>
          <p>Before you commit the truck, answer these roughly:</p>
          <ol className="list-decimal space-y-3 pl-6 marker:text-orange-700">
            <li><strong className="text-stone-950">Truck Fit</strong> — Will this equipment fit and work the stop safely?</li>
            <li><strong className="text-stone-950">Delivery Type</strong> — Dock, forklift, liftgate, hand unload, or something else?</li>
            <li><strong className="text-stone-950">Back In</strong> — Is backing required, and what does the setup look like?</li>
            <li><strong className="text-stone-950">Delivery Zone</strong> — Where does the freight actually change hands?</li>
          </ol>
          <p>If any are blank, check dispatch notes, call receiving when appropriate, or slow down at the gate instead of forcing the customer entrance.</p>
          <h3 className="pt-5 text-2xl font-semibold tracking-[-0.035em] text-stone-950">3. Prefer current instructions over memory alone</h3>
          <p>Stop knowledge goes stale. Construction, a new tenant, a changed gate code, or a seasonal trailer pool can invalidate yesterday’s tip.</p>
          <p>Prefer, in this order when you can: current dispatch notes; what receiving or security says today; on-site signs and the layout in front of you; then saved driver intel from earlier visits — as a head start, not an override.</p>
          <p>Saved information should help you arrive prepared. It should never outrank current signs, conditions, or professional judgment.</p>
          <h2 className="pt-5 text-3xl font-semibold tracking-[-0.035em] text-stone-950">Why teams lose this knowledge (and how it should improve)</h2>
          <p>On many routes, the useful details live only in experienced drivers’ heads. When routes change, people leave, or a new hire draws the stop, the next truck starts over from the street address.</p>
          <p>Good stop intel should accumulate:</p>
          <ul className="list-disc space-y-3 pl-6 marker:text-orange-700">
            <li>The first driver identifies the receiving side.</li>
            <li>Another adds the useful truck entrance.</li>
            <li>A driver with different equipment notes a clearance or turning limit.</li>
            <li>Someone returning later corrects an outdated tip.</li>
          </ul>
          <p>That is how tribal knowledge becomes reusable — without pretending every future visit will be identical.</p>
          <p>FreightIQ is built around that idea: drivers contribute practical stop intel while it is fresh, and the next arrival — including the same driver months later — gets a head start. See the <Link href="/demo" className="font-semibold text-orange-800 underline underline-offset-4 hover:text-orange-600">demo</Link> and a <Link href="/real-example" className="font-semibold text-orange-800 underline underline-offset-4 hover:text-orange-600">real example</Link>.</p>
          <p>To help build stop intel that outlasts one driver’s memory, <Link href="/early-access" className="font-semibold text-orange-800 underline underline-offset-4 hover:text-orange-600">join early access</Link>.</p>
          <h2 className="pt-5 text-3xl font-semibold tracking-[-0.035em] text-stone-950">How FreightIQ fits</h2>
          <p>FreightIQ does not replace your navigation app. It adds the layer commercial deliveries often miss: <strong className="text-stone-950">Truck Fit</strong>, <strong className="text-stone-950">Delivery Type</strong>, <strong className="text-stone-950">Back In</strong>, and <strong className="text-stone-950">Delivery Zone</strong>.</p>
          <p>With satellite context and driver-contributed notes, the goal is simple: know where the delivery actually happens — and what to expect — before you arrive.</p>
          <p>The street address is the beginning of the delivery plan. It is not the whole plan.</p>
          <p>Ready to help shape that stop knowledge? <Link href="/early-access" className="font-semibold text-orange-800 underline underline-offset-4 hover:text-orange-600">Request early access</Link>.</p>
          <h2 className="pt-5 text-3xl font-semibold tracking-[-0.035em] text-stone-950">FAQ</h2>
          <p><strong className="text-stone-950">Is the GPS wrong if it finds the business?</strong> Not necessarily. It may have found the correct property while still missing receiving, the truck entrance, or the unload point.</p>
          <p><strong className="text-stone-950">What is the difference between a map pin and a Delivery Zone?</strong> A pin is a point on a map. A Delivery Zone is that real-world unload or receiving place, plus the understanding that approach, equipment, and delivery type still matter.</p>
          <p><strong className="text-stone-950">Should I ignore the street address?</strong> No. Use it to reach the property. Then confirm the truck path and Delivery Zone before you commit the vehicle.</p>
          <p><strong className="text-stone-950">Does FreightIQ replace calling receiving or reading signs?</strong> No. Current instructions, on-site signs, and judgment come first. Saved stop intel is a head start for the next driver, not a substitute for reality on the ground.</p>
          </div>
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
