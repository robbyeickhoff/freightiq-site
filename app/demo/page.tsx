export default function DemoPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-400">
            FreightIQ Demo
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            A map gets you there. FreightIQ tells you how the delivery actually works.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            This is a sample commercial delivery. It is not tied to one real location, because the
            problem is the same everywhere: the address is not always where the delivery happens.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Without FreightIQ
            </p>

            <h2 className="mt-4 text-2xl font-bold">123 Main Street</h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              A normal map can get you to the address, but it usually drops you near the front door
              or customer entrance.
            </p>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="text-4xl">📍</div>

              <div className="mt-3 space-y-2 text-sm text-slate-700">
                <p>Arrive at front entrance</p>
                <p>No receiving</p>
                <p>Circle building</p>
                <p>Block traffic</p>
                <p>Call customer</p>
                <p className="font-semibold text-slate-950">Lose 15 minutes</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-orange-200 bg-orange-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
              With FreightIQ
            </p>

            <h2 className="mt-4 text-2xl font-bold">Rear Receiving Dock</h2>

            <p className="mt-3 text-sm leading-6 text-slate-700">
              FreightIQ helps drivers go directly to the delivery area instead of wasting time
              guessing where freight is actually received.
            </p>

            <div className="mt-6 grid gap-3 text-sm">
              <div className="rounded-2xl bg-white p-4">
                <span className="font-semibold">Delivery Area:</span> Rear receiving dock
              </div>
              <div className="rounded-2xl bg-white p-4">
                <span className="font-semibold">Truck Fit:</span> 53&apos; possible, tight turn
              </div>
              <div className="rounded-2xl bg-white p-4">
                <span className="font-semibold">Back In Required:</span> Yes
              </div>
              <div className="rounded-2xl bg-white p-4">
                <span className="font-semibold">Approach:</span> Enter from south side only
              </div>
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-800">
              Go directly to receiving. Unload. Move on to the next stop.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Satellite Delivery Zone View
            </p>
            <div className="mt-4 flex h-44 items-center justify-center rounded-2xl bg-slate-100 px-6 text-center text-sm font-semibold text-slate-500">
              Stop pin + delivery zone pin shown on satellite view
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Drivers can use satellite view to see where the delivery zone is in relation to the
              address pin.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Driver Notes
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Do not use the main entrance. Low branches on the north side. Receiving opens at 7am.
              Construction near customer parking lot.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Community Intel
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <p>
                <span className="font-bold text-slate-950">4</span> driver reports
              </p>
              <p>
                <span className="font-bold text-slate-950">12</span> helpful votes
              </p>
              <p>
                <span className="font-bold text-slate-950">Updated recently</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-3xl bg-slate-950 p-8 text-white">
          <h2 className="text-3xl font-bold">That is the FreightIQ difference.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            A normal map helps you find the address. FreightIQ helps you understand the delivery,
            avoid wasted time, and help the next driver.
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
