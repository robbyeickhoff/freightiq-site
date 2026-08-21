import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FreightIQ Demo Videos | See FreightIQ in Action",
  description:
    "Watch FreightIQ demos for delivery drivers, dispatchers, and supervisors. See how drivers prepare for stops, preserve delivery knowledge, and help new drivers get up to speed faster.",
  alternates: {
    canonical: "/demos",
  },
  openGraph: {
    title: "FreightIQ Demo Videos | See FreightIQ in Action",
    description:
      "Watch FreightIQ help drivers prepare for unfamiliar deliveries, preserve stop knowledge, and bring new drivers up to speed faster.",
    url: "https://freightiqapp.com/demos",
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

const demos = [
  {
    number: "01",
    audience: "For delivery drivers",
    title: "Know before you arrive.",
    description:
      "Search a commercial stop, review real Driver Intel, and use satellite view to confirm exactly where to deliver.",
    videoId: "0Yd5yhLpkfw",
    iframeTitle: "FreightIQ demo — real driver intel before you arrive",
  },
  {
    number: "02",
    audience: "For contributing drivers",
    title: "Help the next driver.",
    description:
      "Create a delivery stop, mark its Delivery Zone, and preserve the practical details that make the next arrival easier.",
    videoId: "SF6BbSbLH5Q",
    iframeTitle: "FreightIQ demo — create a delivery stop and add Driver Intel",
  },
  {
    number: "03",
    audience: "For dispatchers and supervisors",
    title: "Get new drivers up to speed faster.",
    description:
      "See how reusable stop knowledge can help new drivers understand unfamiliar deliveries without starting from zero.",
    videoId: "RT83Pl9qOaA",
    iframeTitle: "FreightIQ demo — help new delivery drivers get up to speed faster",
  },
  {
    number: "04",
    audience: "For Founding Drivers",
    title: "Build better stop intel together.",
    description:
      "See how Founding Drivers turn real delivery experience into useful stop knowledge while working toward meaningful program rewards.",
    videoId: "N80FrPgDa58",
    iframeTitle: "FreightIQ Founding Drivers Program — build better stop intel and earn rewards",
  },
];

export default function DemosPage() {
  return (
    <main className="overflow-hidden bg-[#090c0f] text-white">
      <section className="relative border-b border-white/10 bg-[#080b0d]">
        <div className="absolute inset-0 sunrise-grid opacity-30" aria-hidden="true" />
        <div
          className="absolute left-1/2 top-[-16rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-orange-500/12 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-24 lg:py-28">
          <p className="eyebrow">FreightIQ Demo Library</p>
          <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-balance sm:text-6xl lg:text-7xl">
            See FreightIQ
            <span className="sunrise-text block">in action.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">
            Short, practical demonstrations of how FreightIQ helps drivers prepare, contribute,
            and carry useful stop knowledge forward.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/early-access"
              className="sunrise-button inline-flex min-h-13 items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-[#120b06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
            >
              Request Early Access
            </Link>
            <Link
              href="/demo"
              className="inline-flex min-h-13 items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
            >
              Explore How FreightIQ Works
            </Link>
          </div>
        </div>
      </section>

      <section className="relative bg-[#0d1114]">
        <div className="absolute inset-0 sunrise-grid opacity-15" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-2">
            {demos.map((demo) => (
              <article
                key={demo.videoId}
                className="flex flex-col rounded-[2rem] border border-white/10 bg-[#111518] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.32)] sm:p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-orange-300">
                    Demo {demo.number}
                  </p>
                  <p className="text-right text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
                    {demo.audience}
                  </p>
                </div>
                <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.04em]">
                  {demo.title}
                </h2>
                <p className="mt-4 min-h-21 text-sm leading-7 text-stone-400">
                  {demo.description}
                </p>
                <div className="mx-auto mt-7 w-full max-w-[19rem] overflow-hidden rounded-[1.8rem] border border-white/10 bg-black p-2">
                  <div className="aspect-[9/16] overflow-hidden rounded-[1.4rem] bg-black">
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube-nocookie.com/embed/${demo.videoId}`}
                      title={demo.iframeTitle}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 overflow-hidden rounded-[2rem] border border-orange-400/20 bg-[#080b0d] px-6 py-12 text-center sm:px-10 lg:py-16">
            <p className="eyebrow">Help Build Better Stop Knowledge</p>
            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-balance sm:text-5xl">
              Every useful detail can make the next delivery easier.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-stone-400">
              Request Early Access and help shape FreightIQ with the realities drivers encounter
              every day.
            </p>
            <Link
              href="/early-access"
              className="sunrise-button mt-8 inline-flex min-h-13 items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-[#120b06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
            >
              Request Early Access
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
