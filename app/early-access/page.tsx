export default function EarlyAccessPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-2xl px-6 py-16">
        <a href="/" className="text-sm font-semibold text-slate-600 hover:text-slate-950">
          ← Back to FreightIQ
        </a>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
            Early Access
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight">
            Request FreightIQ Early Access
          </h1>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            FreightIQ is currently being tested with a small group of drivers. Answer a few
            quick questions so I know what device you use and what kind of driving you do.
          </p>

          <p className="mt-3 text-xs text-slate-500">
            No spam. Your information will only be used for FreightIQ Early Access communication.
          </p>

          <form className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-800" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800" htmlFor="platform">
                Android or iPhone
              </label>
              <select
                id="platform"
                name="platform"
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
                defaultValue=""
              >
                <option value="" disabled>
                  Select one
                </option>
                <option value="Android">Android</option>
                <option value="iPhone">iPhone</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800" htmlFor="cityState">
                City / State
              </label>
              <input
                id="cityState"
                name="cityState"
                type="text"
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
                placeholder="City, State"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800" htmlFor="driverType">
                Type of driving you do
              </label>
              <input
                id="driverType"
                name="driverType"
                type="text"
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
                placeholder="Local P&D, linehaul, box truck, hotshot, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800" htmlFor="notes">
                Anything you'd like to see in an app like this?
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
                placeholder="Optional"
              />
            </div>

            <button
              type="button"
              className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Submit Request
            </button>

            <p className="text-xs leading-5 text-slate-500">
              Early Access requests are reviewed manually. If approved, you'll receive install
              instructions by email.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
