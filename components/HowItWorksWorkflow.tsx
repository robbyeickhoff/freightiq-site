const essentials = [
  { label: "Truck Fit", value: "28′" },
  { label: "Delivery Type", value: "Dock" },
  { label: "Back In", value: "Yes" },
  { label: "Delivery Zone", value: "Set" },
];

const workflowSteps = [
  {
    number: "01",
    title: "Find the Stop",
    description:
      "Search by business name or address, select a stop from the map, or review nearby stops.",
    preview: "find",
  },
  {
    number: "02",
    title: "Review Stop Intel",
    description:
      "Scan the available Operational Essentials. Open Driver Reports when you need more context.",
    preview: "review",
  },
  {
    number: "03",
    title: "Plan the Delivery",
    description:
      "Use the available approach, receiving, check-in, and driver-note details before entering the property.",
    preview: "plan",
  },
] as const;

function FindPreview() {
  return (
    <div className="space-y-3" aria-hidden="true">
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0 fill-none stroke-stone-500"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="6" />
          <path d="m16 16 4 4" />
        </svg>
        <span className="text-xs text-stone-500">Search business name or address…</span>
      </div>
      <div className="relative h-28 overflow-hidden rounded-xl border border-white/10 bg-[#22282c]">
        <div className="absolute inset-0 opacity-40">
          <svg viewBox="0 0 320 120" className="h-full w-full">
            <path d="M-20 88 85 50l74 22 88-43 95 22" fill="none" stroke="#667075" strokeWidth="18" />
            <path d="M110-10v54l36 29v57M245-10v40l-28 33v67" fill="none" stroke="#778186" strokeWidth="10" />
            <path d="M0 88 85 50l74 22 88-43 95 22" fill="none" stroke="#c7bfae" strokeOpacity=".5" strokeWidth="2" strokeDasharray="8 7" />
          </svg>
        </div>
        <div className="absolute left-[28%] top-[34%] flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-orange-500 text-[0.65rem] font-bold text-[#1b1109] shadow-lg">
          3
        </div>
        <div className="absolute right-[22%] top-[52%] h-5 w-5 rounded-full border-2 border-white bg-stone-600" />
        <div className="absolute bottom-2 left-2 rounded-full border border-white/10 bg-black/55 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-stone-300">
          Nearby stops
        </div>
      </div>
    </div>
  );
}

function ReviewPreview() {
  return (
    <div className="grid grid-cols-2 gap-2" aria-hidden="true">
      {essentials.map((item, index) => (
        <div key={item.label} className="rounded-xl border border-white/10 bg-black/20 p-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-stone-500">
              {item.label}
            </span>
            <span className="font-mono text-[0.55rem] text-stone-700">0{index + 1}</span>
          </div>
          <p className="mt-2 text-sm font-semibold text-stone-100">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

function PlanPreview() {
  return (
    <div className="space-y-3" aria-hidden="true">
      <div className="relative h-24 overflow-hidden rounded-xl border border-white/10 bg-[#22282c]">
        <div className="absolute left-4 top-4 h-14 w-24 rounded-md bg-stone-600/70" />
        <div className="absolute right-4 top-4 h-14 w-28 rounded-md bg-stone-700/70" />
        <svg viewBox="0 0 320 96" className="absolute inset-0 h-full w-full">
          <path
            d="M15 82c30-4 46-28 78-28h58c35 0 45-24 76-24h68"
            fill="none"
            stroke="#f29b35"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path d="m283 20 14 10-14 10" fill="none" stroke="#f29b35" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="absolute bottom-2 left-3 rounded-full border border-orange-300/20 bg-orange-400/10 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-orange-300">
          Best approach
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <p className="text-[0.6rem] uppercase tracking-[0.1em] text-stone-500">Deliver from</p>
          <p className="mt-1.5 text-xs font-semibold text-stone-200">Receiving side</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <p className="text-[0.6rem] uppercase tracking-[0.1em] text-stone-500">Check-in</p>
          <p className="mt-1.5 text-xs font-semibold text-stone-200">Details available</p>
        </div>
      </div>
    </div>
  );
}

function WorkflowPreview({ type }: { type: (typeof workflowSteps)[number]["preview"] }) {
  if (type === "find") {
    return <FindPreview />;
  }

  if (type === "review") {
    return <ReviewPreview />;
  }

  return <PlanPreview />;
}

export function HowItWorksWorkflow() {
  return (
    <>
      <section id="workflow" className="scroll-mt-24 bg-[#f1eee8] text-[#171513]">
        <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:py-22">
          <div className="max-w-3xl">
            <p className="eyebrow text-orange-700">Before you arrive</p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.045em] text-balance sm:text-5xl">
              Turn an address into a delivery plan.
            </h2>
          </div>

          <div className="relative mt-12">
            <div
              className="absolute bottom-0 left-[1.2rem] top-0 w-px bg-stone-300 lg:bottom-auto lg:left-[12%] lg:right-[12%] lg:top-[1.35rem] lg:h-px lg:w-auto"
              aria-hidden="true"
            />
            <ol className="relative grid gap-5 lg:grid-cols-3">
              {workflowSteps.map((step) => (
                <li key={step.number} className="relative pl-12 lg:pl-0">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#f1eee8] bg-[#20262b] font-mono text-xs font-semibold text-white lg:relative lg:left-auto lg:top-auto lg:mx-auto">
                    {step.number}
                  </div>
                  <article className="rounded-[1.75rem] border border-stone-300 bg-[#e8e3db] p-4 shadow-[0_18px_50px_rgba(54,42,30,0.08)] lg:mt-5">
                    <div className="rounded-[1.35rem] bg-[#111518] p-4 text-white sm:p-5">
                      <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-400">
                          Step {step.number}
                        </p>
                        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-stone-600">
                          Illustrative
                        </span>
                      </div>
                      <WorkflowPreview type={step.preview} />
                    </div>
                    <div className="px-1 pb-1 pt-5">
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-stone-600">{step.description}</p>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-[#111518] text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-18 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:py-22">
          <div>
            <p className="eyebrow">After you learn the stop</p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.045em] text-balance sm:text-5xl">
              One useful detail can help the next driver.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-stone-400">
              Contribute what you know while it is still fresh. You do not need to complete every
              field or write a lengthy report.
            </p>
            <p className="mt-8 border-l-2 border-orange-400 pl-5 text-sm font-semibold uppercase tracking-[0.14em] text-stone-300">
              Small contributions build a clearer understanding of the stop over time.
            </p>
          </div>

          <div className="rounded-[2rem] border border-orange-400/20 bg-[#0c1013] p-4 sm:p-5">
            <div className="rounded-[1.55rem] border border-white/10 bg-white/[0.035] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-400">
                    Add what you know
                  </p>
                  <p className="mt-2 text-xl font-semibold">One useful detail is enough.</p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-orange-400/25 bg-orange-400/10 text-xl text-orange-300" aria-hidden="true">
                  +
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.13em] text-stone-500">
                    Operational Essentials
                  </p>
                  <p className="mt-3 text-sm leading-7 text-stone-300">
                    Add or update Truck Fit, Delivery Type, Back In, or the Delivery Zone.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.13em] text-stone-500">
                    Additional Driver Intel
                  </p>
                  <p className="mt-3 text-sm leading-7 text-stone-300">
                    When useful, add Deliver From, Best Approach, Contact / Check-In, or Driver
                    Notes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
