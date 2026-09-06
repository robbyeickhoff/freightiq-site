import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";

const title = "How to Prepare for an Unfamiliar Delivery Location";
const headline = title;
const description =
  "Use this practical pre-arrival checklist to review truck access, receiving entrances, backing space, delivery zones, and stop conditions.";
const canonical = "/resources/prepare-for-an-unfamiliar-commercial-delivery-stop";

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
        url: "/freightiq-delivery-hero.png",
        width: 1672,
        height: 941,
        alt: "A FreightIQ delivery truck approaching a receiving facility at sunrise",
      },
    ],
    type: "article",
  },
};

const checks = [
  ["Confirm the actual destination", "A street address may identify the business without showing the truck entrance, receiving door, dock, yard, or unloading area."],
  ["Review the approach", "Look for medians, one-way access, narrow turns, weight restrictions, low clearances, steep grades, and roads that leave no practical recovery room."],
  ["Check truck fit", "Consider the full equipment combination—not only whether the road reaches the property. Account for gate width, overhead clearance, turning space, dock layout, and room to leave."],
  ["Plan the backing move", "Identify whether the stop requires a straight back, sight-side setup, blind-side maneuver, alley approach, or backing from a public road."],
  ["Locate receiving and check-in", "Know whether the driver checks in at a guard shack, office, receiving door, dock, call box, or another designated point."],
  ["Check current conditions", "Construction, weather, closures, parked vehicles, temporary hazards, and changing business procedures can make an otherwise familiar plan unusable."],
] as const;

export default function UnfamiliarDeliveryStopPage() {
  return (
    <main className="overflow-hidden bg-[#090c0f] text-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline,
          description,
          mainEntityOfPage: `https://freightiqapp.com${canonical}`,
          publisher: { "@id": "https://freightiqapp.com/#organization" },
          image: "https://freightiqapp.com/freightiq-delivery-hero.png",
        }}
      />

      <section className="relative border-b border-white/10 bg-[#080b0d]">
        <div className="absolute inset-0 sunrise-grid opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
          <Link href="/resources" className="text-sm font-semibold text-orange-300 hover:text-orange-200">
            ← FreightIQ Resources
          </Link>
          <p className="eyebrow mt-8">Pre-arrival planning</p>
          <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-balance sm:text-5xl lg:text-7xl">
            How to Prepare for an Unfamiliar Delivery Location
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-stone-300 sm:text-xl">
            A route can bring you to the right address and still leave the most important delivery
            questions unanswered. A short review before arrival gives you more room to make a good
            decision before the property, traffic, and clock start making it for you.
          </p>
        </div>
      </section>

      <section className="bg-[#f1eee8] text-[#171513]">
        <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-22 lg:py-24">
          <aside className="rounded-[1.6rem] border border-orange-200 bg-orange-50 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-800">The short version</p>
            <p className="mt-3 text-xl font-semibold leading-8 text-stone-900">
              Before entering an unfamiliar stop, confirm where the truck belongs, whether the
              equipment fits, how you will approach and leave, and what has changed recently.
            </p>
          </aside>

          <div className="mt-10 space-y-8 text-lg leading-9 text-stone-700">
            <p>
              The hardest part of an unfamiliar commercial stop often begins after navigation says
              you have arrived. The business name may be visible from the road while receiving is
              behind the building, through another gate, or reached from a different street.
            </p>
            <p>
              That is why preparation should be about completing the delivery—not merely reaching
              the address. Review the stop while parked safely, before committing the truck to an
              entrance or maneuver that may be difficult to undo.
            </p>

            <h2 className="pt-4 text-3xl font-semibold tracking-[-0.035em] text-stone-950">
              A practical pre-arrival checklist
            </h2>
            <div className="space-y-4">
              {checks.map(([check, explanation], index) => (
                <section key={check} className="rounded-[1.4rem] border border-stone-300 bg-white p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-900">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-stone-950">{check}</h3>
                      <p className="mt-2 text-base leading-7 text-stone-700">{explanation}</p>
                    </div>
                  </div>
                </section>
              ))}
            </div>

            <h2 className="pt-4 text-3xl font-semibold tracking-[-0.035em] text-stone-950">
              Satellite imagery helps, but it cannot tell the whole story
            </h2>
            <p>
              An overhead view can reveal driveways, docks, buildings, and possible turning areas.
              It cannot reliably tell you which entrance is approved today, whether a gate is open,
              what is parked in the yard, or whether receiving procedures have changed.
            </p>
            <p>
              Use imagery as one piece of evidence. Combine it with current signs, business
              instructions, professional judgment, and practical information from drivers who have
              already worked the stop.
            </p>

            <h2 className="pt-4 text-3xl font-semibold tracking-[-0.035em] text-stone-950">
              Leave yourself a recovery plan
            </h2>
            <p>
              Before turning in, know what you will do if the entrance is wrong or blocked. If the
              answer is “there is nowhere to stop, turn around, or safely get back out,” pause before
              entering. A few minutes spent checking is usually better than forcing a bad setup.
            </p>
            <blockquote className="border-l-2 border-orange-700 py-2 pl-6 text-2xl font-semibold leading-10 tracking-[-0.025em] text-stone-900">
              The goal is not to remove driver judgment. It is to give that judgment better
              information before the truck is committed.
            </blockquote>

            <h2 className="pt-4 text-3xl font-semibold tracking-[-0.035em] text-stone-950">
              Preserve what you learn
            </h2>
            <p>
              After the delivery, save the details that would have helped before arrival: the useful
              entrance, actual delivery area, truck-fit limitations, backing setup, check-in point,
              and any temporary condition another driver should verify.
            </p>
            <p>
              FreightIQ is built to turn that real delivery experience into clear stop intelligence
              for the next driver—including you when you return weeks or months later.
            </p>
          </div>

          <nav className="mt-14 grid gap-4 sm:grid-cols-2" aria-label="Related FreightIQ resources">
            <Link href="/resources/find-the-correct-truck-entrance-and-receiving-area" className="rounded-2xl border border-stone-300 bg-white p-5 font-semibold text-stone-900 hover:border-orange-400">
              Find the correct truck entrance →
            </Link>
            <Link href="/real-example" className="rounded-2xl border border-stone-300 bg-white p-5 font-semibold text-stone-900 hover:border-orange-400">
              See a real delivery example →
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
          <Link href="/early-access" className="sunrise-button mt-8 inline-flex min-h-13 items-center justify-center rounded-full px-8 py-3.5 font-semibold text-[#120b06]">
            Request Early Access
          </Link>
        </div>
      </section>
    </main>
  );
}
