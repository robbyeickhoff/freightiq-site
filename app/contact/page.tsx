export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-2xl px-6 py-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
            Contact FreightIQ
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">
            Questions, feedback, or something worth discussing?
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Whether you need help, have product feedback, want to test FreightIQ, or are interested
            in working together, send a message below.
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-800" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
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
                required
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800" htmlFor="topic">
                Topic
              </label>
              <select
                id="topic"
                name="topic"
                required
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a topic
                </option>
                <option value="general-question">General question</option>
                <option value="product-feedback">Product feedback</option>
                <option value="testing-support">Testing support</option>
                <option value="partnership-inquiry">Partnership inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
                placeholder="How can we help?"
              />
            </div>

            <button
              type="button"
              className="w-full rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Send Message
            </button>
          </form>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="text-sm font-semibold text-slate-800">Prefer email?</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Contact FreightIQ directly at{" "}
              <a
                href="mailto:hello@freightiqapp.com"
                className="font-semibold text-slate-900 hover:text-orange-600"
              >
                hello@freightiqapp.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
