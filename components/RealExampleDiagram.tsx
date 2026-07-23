const routeSteps = [
  {
    number: "1",
    title: "Public address",
    detail: "Front entrance and customer parking",
  },
  {
    number: "2",
    title: "Correct entry",
    detail: "South service driveway",
  },
  {
    number: "3",
    title: "Truck approach",
    detail: "Follow the west-side access lane",
  },
  {
    number: "4",
    title: "Delivery zone",
    detail: "Single dock on the north side",
  },
];

function StepMarker({
  number,
  x,
  y,
  emphasized = false,
}: {
  number: string;
  x: number;
  y: number;
  emphasized?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {emphasized ? <circle r="25" fill="#f59e0b" opacity="0.18" /> : null}
      <circle
        r="17"
        fill={emphasized ? "#f59e0b" : "#20262b"}
        stroke={emphasized ? "#fff3d6" : "#f8f5ef"}
        strokeWidth="4"
      />
      <text
        y="1"
        fill={emphasized ? "#17100a" : "#ffffff"}
        fontSize="14"
        fontWeight="800"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {number}
      </text>
    </g>
  );
}

export function RealExampleDiagram() {
  return (
    <figure>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-stone-300 bg-[#cfc7ba] shadow-[0_30px_90px_rgba(52,41,29,0.18)] sm:aspect-[16/10]">
        <svg
          viewBox="0 0 960 660"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
          role="img"
          aria-labelledby="real-example-diagram-title real-example-diagram-description"
        >
          <title id="real-example-diagram-title">
            Canyon Peak Industrial Supply delivery site plan
          </title>
          <desc id="real-example-diagram-description">
            A fictional overhead site plan showing the public entrance on the south side, a
            separate south service driveway, the truck route along the west side of the building,
            and a single delivery dock on the north side.
          </desc>

          <defs>
            <linearGradient id="site-ground" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d9d2c6" />
              <stop offset="100%" stopColor="#beb5a7" />
            </linearGradient>
            <linearGradient id="building-roof" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8f918e" />
              <stop offset="100%" stopColor="#6d716f" />
            </linearGradient>
            <linearGradient id="route-line" x1="0" y1="1" x2="0.75" y2="0">
              <stop offset="0%" stopColor="#c85e24" />
              <stop offset="100%" stopColor="#f6b73c" />
            </linearGradient>
            <pattern id="roof-seams" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M0 0V28" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="2" />
            </pattern>
            <filter id="site-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="12"
                stdDeviation="12"
                floodColor="#25211c"
                floodOpacity="0.22"
              />
            </filter>
            <marker
              id="route-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 10 5 0 10Z" fill="#f6b73c" />
            </marker>
          </defs>

          <rect width="960" height="660" fill="url(#site-ground)" />

          <g aria-hidden="true">
            <rect y="562" width="960" height="98" fill="#343a3e" />
            <path d="M0 611H960" stroke="#f7e7bb" strokeWidth="3" strokeDasharray="24 18" />
            <path d="M0 569H960M0 653H960" stroke="#f8f5ef" strokeOpacity="0.6" strokeWidth="2" />

            <rect x="74" y="48" width="812" height="514" rx="14" fill="#a9a397" />
            <rect x="104" y="76" width="142" height="486" rx="8" fill="#565d60" />
            <rect x="246" y="76" width="530" height="122" rx="8" fill="#5d6466" />
            <rect x="246" y="438" width="530" height="124" rx="8" fill="#777d7d" />
            <rect x="776" y="76" width="80" height="486" rx="8" fill="#817e74" />

            <g fill="#eee9df" opacity="0.72">
              <rect x="278" y="475" width="58" height="3" />
              <rect x="354" y="475" width="58" height="3" />
              <rect x="430" y="475" width="58" height="3" />
              <rect x="506" y="475" width="58" height="3" />
              <rect x="582" y="475" width="58" height="3" />
              <rect x="658" y="475" width="58" height="3" />
              <rect x="278" y="475" width="3" height="66" />
              <rect x="354" y="475" width="3" height="66" />
              <rect x="430" y="475" width="3" height="66" />
              <rect x="506" y="475" width="3" height="66" />
              <rect x="582" y="475" width="3" height="66" />
              <rect x="658" y="475" width="3" height="66" />
              <rect x="716" y="475" width="3" height="66" />
            </g>

            <g fill="#4f5759">
              <rect x="294" y="492" width="44" height="22" rx="7" />
              <rect x="521" y="502" width="46" height="22" rx="7" />
              <rect x="666" y="492" width="44" height="22" rx="7" />
            </g>
            <rect x="373" y="505" width="42" height="21" rx="7" fill="#b65d30" />

            <g fill="#5f7458">
              <circle cx="92" cy="92" r="31" />
              <circle cx="858" cy="104" r="27" />
              <circle cx="830" cy="532" r="24" />
              <circle cx="746" cy="526" r="20" />
              <circle cx="274" cy="528" r="21" />
            </g>
            <g fill="#d2c19d" opacity="0.65">
              <circle cx="92" cy="92" r="18" />
              <circle cx="858" cy="104" r="15" />
              <circle cx="830" cy="532" r="13" />
              <circle cx="746" cy="526" r="11" />
              <circle cx="274" cy="528" r="12" />
            </g>

            <g filter="url(#site-shadow)">
              <rect x="286" y="158" width="448" height="280" rx="6" fill="url(#building-roof)" />
              <rect x="286" y="158" width="448" height="280" rx="6" fill="url(#roof-seams)" />
              <path
                d="M302 174H718V422H302Z"
                fill="none"
                stroke="#c9c9c2"
                strokeOpacity="0.55"
                strokeWidth="4"
              />
              <rect x="340" y="211" width="52" height="36" rx="4" fill="#676b69" />
              <rect x="620" y="334" width="70" height="48" rx="4" fill="#777b78" />
              <rect x="445" y="176" width="130" height="8" rx="4" fill="#a9aaa5" />
            </g>

            <rect x="443" y="142" width="82" height="22" rx="4" fill="#34393b" />
            <rect x="454" y="148" width="60" height="12" rx="2" fill="#d6d2c8" />
            <path d="M454 154H514" stroke="#717675" strokeWidth="2" strokeDasharray="8 4" />

            <rect x="575" y="434" width="92" height="18" rx="4" fill="#e3ded4" />
            <rect x="603" y="440" width="36" height="8" rx="3" fill="#3f4547" />

            <g transform="translate(448 83)">
              <rect width="70" height="124" rx="9" fill="#22282b" />
              <rect x="9" y="13" width="52" height="75" rx="5" fill="#d8d3c8" />
              <rect x="13" y="94" width="44" height="24" rx="6" fill="#bd5a27" />
              <rect x="-4" y="20" width="6" height="22" rx="2" fill="#171b1d" />
              <rect x="68" y="20" width="6" height="22" rx="2" fill="#171b1d" />
              <rect x="-4" y="89" width="6" height="22" rx="2" fill="#171b1d" />
              <rect x="68" y="89" width="6" height="22" rx="2" fill="#171b1d" />
            </g>

            <path
              d="M235 648V230Q235 105 326 105H422"
              fill="none"
              stroke="#34271d"
              strokeOpacity="0.35"
              strokeWidth="18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M235 648V230Q235 105 326 105H422"
              fill="none"
              stroke="url(#route-line)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              markerEnd="url(#route-arrow)"
            />
            <path
              d="M448 105H482V142"
              fill="none"
              stroke="#fff4d8"
              strokeWidth="5"
              strokeDasharray="10 8"
              strokeLinecap="round"
              markerEnd="url(#route-arrow)"
            />

            <path d="M617 454V491" stroke="#707675" strokeWidth="3" strokeDasharray="7 6" />
            <path d="M617 491 607 477M617 491 627 477" stroke="#707675" strokeWidth="3" />

            <g transform="translate(823 34)">
              <path d="M0 36 14 0 28 36 14 28Z" fill="#24292c" />
              <text
                x="14"
                y="54"
                fill="#24292c"
                fontSize="13"
                fontWeight="800"
                textAnchor="middle"
              >
                N
              </text>
            </g>
          </g>

          <StepMarker number="1" x={617} y={465} />
          <StepMarker number="2" x={235} y={573} emphasized />
          <StepMarker number="3" x={235} y={285} emphasized />
          <StepMarker number="4" x={484} y={143} emphasized />

          <g className="hidden sm:block" aria-hidden="true">
            <g transform="translate(650 398)">
              <rect width="190" height="50" rx="14" fill="#f8f5ef" fillOpacity="0.96" />
              <text x="16" y="21" fill="#202326" fontSize="12" fontWeight="800">
                PUBLIC ADDRESS
              </text>
              <text x="16" y="38" fill="#68645e" fontSize="12">
                Front entrance
              </text>
            </g>
            <g transform="translate(42 494)">
              <rect width="174" height="50" rx="14" fill="#1b2023" fillOpacity="0.96" />
              <text x="16" y="21" fill="#f6b73c" fontSize="12" fontWeight="800">
                SERVICE ENTRY
              </text>
              <text x="16" y="38" fill="#d6d3cd" fontSize="12">
                Enter from the south
              </text>
            </g>
            <g transform="translate(538 82)">
              <rect width="184" height="50" rx="14" fill="#1b2023" fillOpacity="0.96" />
              <text x="16" y="21" fill="#f6b73c" fontSize="12" fontWeight="800">
                DELIVERY ZONE
              </text>
              <text x="16" y="38" fill="#d6d3cd" fontSize="12">
                Single north-side dock
              </text>
            </g>
          </g>
        </svg>

        <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center justify-between sm:inset-x-6 sm:top-6">
          <span className="rounded-full border border-white/15 bg-[#171c20]/90 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-stone-200 backdrop-blur">
            Illustrative site plan
          </span>
          <span className="hidden rounded-full border border-orange-300/20 bg-[#171c20]/90 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-orange-300 backdrop-blur sm:block">
            28&apos; trailer route
          </span>
        </div>
      </div>

      <figcaption className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {routeSteps.map((step) => (
          <div
            key={step.number}
            className="flex gap-3 rounded-2xl border border-stone-300 bg-[#e8e3db] p-4"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#20262b] text-xs font-semibold text-white">
              {step.number}
            </span>
            <div>
              <p className="text-sm font-semibold text-stone-900">{step.title}</p>
              <p className="mt-1 text-xs leading-5 text-stone-600">{step.detail}</p>
            </div>
          </div>
        ))}
      </figcaption>
    </figure>
  );
}
