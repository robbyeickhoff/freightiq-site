import Link from "next/link";
export default function RealExamplePage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Link href="/" className="text-sm font-semibold text-slate-300 hover:text-white">
            ← Back to FreightIQ
          </Link>
          <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-orange-400">
            Real FreightIQ Example
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
            The address is not always where you deliver.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            FreightIQ shows drivers the difference between the business address and the actual
            delivery zone.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Visual Example
          </p>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <img
              src="/real-example-simple.jpg"
              alt="FreightIQ map showing a stop pin and delivery zone pin"
              className="w-full"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
            <h2 className="text-xl font-bold text-red-900">Without FreightIQ</h2>

            <ul className="mt-4 space-y-3 text-red-800">
              <li>❌ Arrive at business address</li>
              <li>❌ No clear delivery zone</li>
              <li>❌ Circle the building looking for access</li>
              <li>❌ Block traffic while figuring it out</li>
              <li>❌ Call customer for directions</li>
              <li>❌ Waste 15+ minutes</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-green-200 bg-green-50 p-6">
            <h2 className="text-xl font-bold text-green-900">With FreightIQ</h2>

            <ul className="mt-4 space-y-3 text-green-800">
              <li>✅ See the delivery zone before arrival</li>
              <li>✅ Know exactly where to go</li>
              <li>✅ Less wasted time</li>
              <li>✅ Safer deliveries</li>
              <li>✅ Less confusion and stress</li>
              <li>✅ Get the job done and move on</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Built for drivers who are tired of guessing.
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-300">
            FreightIQ is currently accepting early drivers for testing.
          </p>

          <a
            href="/early-access"
            className="mt-6 inline-flex rounded-2xl bg-orange-500 px-6 py-4 text-base font-bold text-white transition hover:bg-orange-600"
          >
            Request Early Access
          </a>
        </div>
      </section>
    </main>
  );
}
