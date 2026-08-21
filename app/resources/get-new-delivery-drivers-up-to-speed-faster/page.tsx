import type { Metadata } from "next";
import Link from "next/link";

const title = "How to Get New Delivery Drivers Up to Speed Faster";
const description =
  "Learn how supervisors can preserve practical stop knowledge, reduce repeated questions, and help new delivery drivers prepare for unfamiliar commercial stops.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/resources/get-new-delivery-drivers-up-to-speed-faster" },
  openGraph: {
    title: `${title} | FreightIQ`,
    description,
    url: "https://freightiqapp.com/resources/get-new-delivery-drivers-up-to-speed-faster",
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

export default function NewDriverTrainingResourcePage() {
  return (
    <main className="overflow-hidden bg-[#090c0f] text-white">
      <section className="relative border-b border-white/10 bg-[#080b0d]">
        <div className="absolute inset-0 sunrise-grid opacity-30" aria-hidden="true" />
        <div className="absolute left-[52%] top-[-15rem] h-[36rem] w-[36rem] rounded-full bg-orange-500/12 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
          <Link href="/resources" className="text-sm font-semibold text-orange-300 hover:text-orange-200">
            ← FreightIQ Resources
          </Link>
          <p className="eyebrow mt-8">For Dispatchers and Supervisors</p>
          <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-balance sm:text-5xl lg:text-7xl">
            How to Get New Delivery Drivers Up to Speed Faster—Without Starting Every Stop From Zero
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-stone-300 sm:text-xl">
            The difficult part of training a new delivery driver is not always the route. It is
            transferring the practical knowledge experienced drivers have already learned at each stop.
          </p>
        </div>
      </section>

      <section className="bg-[#f1eee8] text-[#171513]">
        <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-22 lg:py-24">
          <aside className="rounded-[1.6rem] border border-orange-200 bg-orange-50 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-700">The short version</p>
            <p className="mt-3 text-xl font-semibold leading-8 text-stone-900">
              New drivers get productive faster when the stop knowledge your experienced drivers
              already have is saved, organized, and available before the next driver arrives.
            </p>
          </aside>

          <div className="mt-10 space-y-8 text-lg leading-9 text-stone-700">
            <p>
              Bringing a new delivery driver onto a route involves more than teaching them how to
              operate the truck and follow directions.
            </p>
            <p>The difficult part is transferring everything experienced drivers learn between the address and the completed delivery:</p>
            <ul className="list-disc space-y-2 pl-6 marker:text-orange-600">
              <li>Which entrance actually works for a truck</li>
              <li>Where receiving is located</li>
              <li>Whether the truck will fit</li>
              <li>What kind of delivery the stop expects</li>
              <li>Whether the driver needs to back in</li>
              <li>Where the delivery actually happens</li>
            </ul>
            <p>
              That information can determine whether a stop goes smoothly or becomes a frustrating,
              time-consuming problem. Unfortunately, it often exists only in the memories of the
              drivers who have already been there.
            </p>

            <h2 className="pt-4 text-3xl font-semibold tracking-[-0.035em] text-stone-950">New drivers inherit the route—but not its knowledge</h2>
            <p>
              A route sheet can provide addresses and delivery windows. A dispatcher can explain the
              obvious problem stops. Another driver may offer a few warnings before the new driver
              leaves the yard.
            </p>
            <p>But there is usually too much stop-specific knowledge to transfer through memory, texts, paper notes, and quick conversations.</p>
            <blockquote className="border-l-2 border-orange-600 py-2 pl-6 text-2xl font-semibold leading-10 tracking-[-0.025em] text-stone-900 sm:text-3xl">
              The problem is not always that the knowledge does not exist. The problem is that it is
              not organized and available when the next driver needs it.
            </blockquote>

            <h2 className="pt-4 text-3xl font-semibold tracking-[-0.035em] text-stone-950">The real training gap happens at individual stops</h2>
            <p>
              New drivers rarely struggle because they cannot reach the street address. They struggle
              with what happens after they arrive: finding the correct entrance, deciding whether a
              turn is possible, locating receiving, understanding where to stage, or learning that the
              delivery point is on the opposite side of the property.
            </p>
            <p>Each lesson may take only a few minutes to explain. Relearning those lessons across an entire route adds up quickly.</p>

            <h2 className="pt-4 text-3xl font-semibold tracking-[-0.035em] text-stone-950">Stop knowledge should survive driver changes</h2>
            <p>
              When an experienced driver changes routes, takes time off, or leaves the company, the
              knowledge they built should not disappear with them. Useful stop information should
              become part of the operation—not remain trapped in one person’s memory.
            </p>

            <h2 className="pt-4 text-3xl font-semibold tracking-[-0.035em] text-stone-950">Start with the details that matter most</h2>
            <p>Not every fact needs to become a long instruction manual. A useful system starts with the questions a driver needs answered before arrival.</p>
            <h3 className="text-2xl font-semibold text-stone-900">Will the truck fit?</h3>
            <p>A stop that works for a cargo van may not work for a straight truck, tractor-trailer, or truck with a liftgate.</p>
            <h3 className="text-2xl font-semibold text-stone-900">What kind of delivery is it?</h3>
            <p>Knowing whether the stop uses a dock, forklift, inside delivery, jobsite handoff, or customer unloading changes how the driver prepares.</p>
            <h3 className="text-2xl font-semibold text-stone-900">Is backing required?</h3>
            <p>A driver can approach very differently when they know in advance that the stop requires a blind-side back, alley entry, or tight setup.</p>
            <h3 className="text-2xl font-semibold text-stone-900">Where does the delivery actually happen?</h3>
            <p>The street address is often only the beginning. A precise delivery point can save circling, phone calls, and unnecessary backing.</p>

            <h2 className="pt-4 text-3xl font-semibold tracking-[-0.035em] text-stone-950">Make the information available before arrival</h2>
            <p>
              The best time for a driver to learn about a difficult stop is not while blocking traffic
              or sitting at the wrong gate. Stop information is most useful when the driver can review
              it while planning the route or before leaving the previous delivery.
            </p>

            <h2 className="pt-4 text-3xl font-semibold tracking-[-0.035em] text-stone-950">Use experienced drivers as part of the training system</h2>
            <p>
              Experienced drivers are already solving these problems every day. Giving them a simple
              way to save what they learned turns individual experience into reusable training material.
            </p>
            <p>The goal is not to create more paperwork. The goal is to capture the few practical details that would help the next driver avoid learning the same lesson the hard way.</p>
          </div>

          <section className="my-14 rounded-[2rem] bg-[#0d1114] p-6 text-white sm:p-9">
            <p className="eyebrow">See the idea in action</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">Help new drivers start with useful stop knowledge.</h2>
            <div className="mx-auto mt-8 w-full max-w-[19rem] overflow-hidden rounded-[1.8rem] border border-white/10 bg-black p-2">
              <div className="aspect-[9/16] overflow-hidden rounded-[1.4rem] bg-black">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube-nocookie.com/embed/RT83Pl9qOaA"
                  title="How FreightIQ helps new delivery drivers get up to speed faster"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </section>

          <div className="space-y-8 text-lg leading-9 text-stone-700">
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-stone-950">Keep human judgment involved</h2>
            <p>
              No saved note replaces a driver paying attention, checking current conditions, and using
              professional judgment. Businesses change entrances. Construction changes access. Weather
              changes what is safe. Stop knowledge should prepare the driver, not pretend every delivery
              will always happen the same way.
            </p>

            <h2 className="pt-4 text-3xl font-semibold tracking-[-0.035em] text-stone-950">What better stop knowledge can change</h2>
            <p>When useful information is preserved and easy to find, operations can reduce repeated calls, prevent avoidable wrong turns, shorten the learning curve, and make unfamiliar stops less stressful.</p>
            <p>It also gives supervisors a more consistent way to pass experience from established drivers to the people learning the route next.</p>

            <h2 className="pt-4 text-3xl font-semibold tracking-[-0.035em] text-stone-950">How FreightIQ approaches the problem</h2>
            <p>
              FreightIQ is built around practical stop knowledge from drivers who have actually made
              the delivery. It helps organize details such as truck fit, delivery type, backing
              requirements, Driver Reports, and the precise Delivery Zone so the next driver can prepare
              before arrival.
            </p>

            <h2 className="pt-4 text-3xl font-semibold tracking-[-0.035em] text-stone-950">Stop making every driver learn the same lesson the hard way</h2>
            <p>
              Experienced drivers have already solved many of the problems new drivers are about to
              face. The opportunity is to preserve that knowledge, keep it current, and put it where the
              next driver can use it.
            </p>
            <p>That does not replace training. It makes training more useful—and helps every driver arrive better prepared.</p>
          </div>
        </article>
      </section>

      <section className="border-t border-white/10 bg-[#080b0d]">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="rounded-[2rem] border border-orange-400/20 bg-[#111518] px-6 py-12 text-center sm:px-10 lg:py-16">
            <p className="eyebrow">See FreightIQ in action</p>
            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-balance sm:text-5xl">Turn real delivery experience into reusable stop knowledge.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-stone-400">Explore the FreightIQ demos or contact us to talk about how better stop knowledge could help your drivers.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/demos" className="sunrise-button inline-flex min-h-13 items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-[#120b06]">Watch the Demos</Link>
              <Link href="/contact" className="inline-flex min-h-13 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] px-8 py-3.5 text-base font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/[0.08]">Contact FreightIQ</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
