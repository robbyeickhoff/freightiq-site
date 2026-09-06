import type { Metadata } from "next";
import Link from "next/link";

const description =
  "Practical FreightIQ guides for delivery drivers, dispatchers, and supervisors who want better stop knowledge and smoother deliveries.";

const resources = [
  {
    category: "Driver Planning",
    title: "How to Prepare for an Unfamiliar Delivery Location",
    description:
      "A practical pre-arrival checklist for access, truck fit, backing space, receiving, and current conditions.",
    href: "/resources/prepare-for-an-unfamiliar-commercial-delivery-stop",
  },
  {
    category: "Entrance and Receiving",
    title: "How to Find the Correct Truck Entrance and Receiving Area",
    description:
      "Separate the public address from the gate, check-in point, dock, and unloading area the truck actually needs.",
    href: "/resources/find-the-correct-truck-entrance-and-receiving-area",
  },
  {
    category: "Delivery Location",
    title: "Street Address vs. Delivery Zone: What Drivers Actually Need",
    description:
      "Understand why reaching the property and reaching the place where the delivery happens are different problems.",
    href: "/resources/street-address-vs-delivery-zone",
  },
  {
    category: "Fleet Operations",
    title: "How to Get New Delivery Drivers Up to Speed Faster—Without Starting Every Stop From Zero",
    description:
      "Preserve the practical knowledge experienced drivers already have and make it useful to the people learning the route next.",
    href: "/resources/get-new-delivery-drivers-up-to-speed-faster",
  },
] as const;

export const metadata: Metadata = {
  title: "Delivery Driver Resources",
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
          <div className="grid gap-6 lg:grid-cols-2">
            {resources.map((resource) => (
              <article key={resource.href} className="flex flex-col rounded-[2rem] border border-white/10 bg-[#111518] p-7 shadow-[0_28px_90px_rgba(0,0,0,0.24)] sm:p-9">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-orange-300">{resource.category}</p>
                <h2 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.04em] text-balance sm:text-3xl">{resource.title}</h2>
                <p className="mt-5 flex-1 text-base leading-8 text-stone-400">{resource.description}</p>
                <Link href={resource.href} className="mt-7 inline-flex w-fit items-center rounded-md text-sm font-semibold text-orange-300 hover:text-orange-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400">
                  Read the Guide <span className="ml-2" aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
