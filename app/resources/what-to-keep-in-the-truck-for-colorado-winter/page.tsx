import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";

const title = "What to Keep in the Truck for Colorado Winter";
const description =
  "A short cab checklist for mountain LTL winters — chains, light, layers, and what to do before you leave the yard.";
const canonical = "/resources/what-to-keep-in-the-truck-for-colorado-winter";
const publishedDate = "2026-10-26";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: {
    title: `${title} | FreightIQ`,
    description,
    url: canonical,
    siteName: "FreightIQ",
    images: [
      {
        url: "/freightiq-social.jpg",
        width: 1200,
        height: 630,
        alt: "A FreightIQ delivery truck approaching a receiving facility at sunrise",
      },
    ],
    type: "article",
  },
};

const cabGear = [
  ["Ice scraper + brush", " — mirrors and glass, not just the windshield"],
  ["Work gloves you can chain in", " — spare pair when the first ones soak through"],
  [
    "Chain-up tools",
    " so you can get chains on correctly and as efficiently as possible (Tag Snowman chain ramps and Chain Dawg)",
  ],
  [
    "Headlamp or flashlight",
    ", plus charging cable or spare batteries — chaining at 4am in sideways snow",
  ],
  ["Reflectors or flares", " — so you're seen when you're stopped"],
  ["Jumper cables or a jump pack", ""],
  ["Phone power bank + cable", " — maps, DOT alerts, and calling for help"],
  [
    "Phone numbers written on paper",
    " in case your phone dies and you need to borrow one (none of us remember anyone's number anymore)",
  ],
  ["Hand warmers", ""],
  ["Extra socks, hat, and a warm layer", " that stays dry in a bag"],
  [
    "Non-perishable snacks + water",
    " — don't leave water to freeze solid in the sleeper; grab it before a mountain day",
  ],
  ["First aid + your own meds", ""],
  [
    "Winter washer fluid",
    " topped off, with a spare jug if you burn through it on salt spray",
  ],
  ["Spare jug of coolant", ""],
  ["Collapsible shovel", " — docks and shoulders bury tires too"],
  ["Paper map of your route area", " — when the phone dies or coverage drops"],
] as const;

const beforeYouLeave = [
  "Fuel above half a tank when you're heading into the mountains",
  "Make sure your chains are in good working condition",
  "Check the weather forecast and DOT road conditions (closures, chains, incidents) before you roll",
  "Tell someone the route and rough ETA",
] as const;

const ifYoureStuck = [
  "Stay with the truck when you can",
  "Don't idle for hours with the exhaust buried — clear the pipe and run heat in short bursts",
  "Make yourself visible before you step out",
] as const;

export default function ColoradoWinterCabGearPage() {
  return (
    <main className="overflow-hidden bg-[#090c0f] text-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description,
          author: { "@id": "https://freightiqapp.com/#organization" },
          datePublished: publishedDate,
          dateModified: publishedDate,
          mainEntityOfPage: `https://freightiqapp.com${canonical}`,
          publisher: { "@id": "https://freightiqapp.com/#organization" },
          image: "https://freightiqapp.com/freightiq-social.jpg",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://freightiqapp.com/" },
            {
              "@type": "ListItem",
              position: 2,
              name: "Resources",
              item: "https://freightiqapp.com/resources",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Colorado Winter Cab Gear",
              item: `https://freightiqapp.com${canonical}`,
            },
          ],
        }}
      />

      <section className="relative border-b border-white/10 bg-[#080b0d]">
        <div className="absolute inset-0 sunrise-grid opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
          <Link
            href="/resources"
            className="text-sm font-semibold text-orange-300 hover:text-orange-200"
          >
            ← FreightIQ Resources
          </Link>
          <p className="eyebrow mt-8">Winter cab gear</p>
          <p className="mt-4 text-sm text-stone-400">
            Published <time dateTime={publishedDate}>October 26, 2026</time>
          </p>
          <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-balance sm:text-5xl lg:text-7xl">
            What to Keep in the Truck for Colorado Winter
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-stone-300 sm:text-xl">
            Mountain LTL means chain-ups, closed roads, and delays that go way longer than
            expected. Lugging extra gear around is inconvenient, but when your day goes sideways
            you&apos;ll be glad you packed it.
          </p>
        </div>
      </section>

      <section className="bg-[#f1eee8] text-[#171513]">
        <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-22 lg:py-24">
          <div className="space-y-7 text-lg leading-9 text-stone-700">
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-stone-950">
              Always in the cab
            </h2>
            <ol className="list-decimal space-y-4 pl-6 marker:font-semibold marker:text-orange-700">
              {cabGear.map(([lead, rest]) => (
                <li key={lead}>
                  <strong className="text-stone-950">{lead}</strong>
                  {rest}
                </li>
              ))}
            </ol>

            <h2 className="pt-5 text-3xl font-semibold tracking-[-0.035em] text-stone-950">
              Before you leave the yard
            </h2>
            <ul className="list-disc space-y-3 pl-6 marker:text-orange-700">
              {beforeYouLeave.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2 className="pt-5 text-3xl font-semibold tracking-[-0.035em] text-stone-950">
              If you&apos;re stuck
            </h2>
            <ul className="list-disc space-y-3 pl-6 marker:text-orange-700">
              {ifYoureStuck.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p>
              FreightIQ is built to turn real delivery experience into clear stop notes for the next
              driver—including you when you return.
            </p>
          </div>

          <nav className="mt-14 grid gap-4 sm:grid-cols-2" aria-label="Related FreightIQ resources">
            <Link
              href="/resources/prepare-for-an-unfamiliar-commercial-delivery-stop"
              className="rounded-2xl border border-stone-300 bg-white p-5 font-semibold text-stone-900 hover:border-orange-400"
            >
              Prepare for an unfamiliar stop →
            </Link>
            <Link
              href="/resources/street-address-vs-delivery-zone"
              className="rounded-2xl border border-stone-300 bg-white p-5 font-semibold text-stone-900 hover:border-orange-400"
            >
              Street address vs. Delivery Zone →
            </Link>
          </nav>
        </article>
      </section>

      <section className="border-t border-white/10 bg-[#080b0d]">
        <div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 lg:py-20">
          <p className="eyebrow">Know before you arrive</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-balance sm:text-5xl">
            Practical stop knowledge belongs where drivers can use it.
          </h2>
          <Link
            href="/early-access"
            className="sunrise-button mt-8 inline-flex min-h-13 items-center justify-center rounded-full px-8 py-3.5 font-semibold text-[#120b06]"
          >
            Request Early Access
          </Link>
        </div>
      </section>
    </main>
  );
}
