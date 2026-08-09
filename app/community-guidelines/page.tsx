import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Community Guidelines",
  description:
    "Read the FreightIQ rules for useful, accurate, respectful, and safe driver contributions.",
  alternates: { canonical: "/community-guidelines" },
};

const guidelines = [
  {
    title: "Keep contributions operational",
    copy: "Share delivery access, equipment fit, approach, receiving, parking, and temporary-condition information that helps another driver complete the stop.",
  },
  {
    title: "Be accurate and clear",
    copy: "Describe what you observed, distinguish temporary conditions from permanent details, and correct information when you learn it is no longer accurate.",
  },
  {
    title: "Protect private information",
    copy: "Do not post passwords, gate codes, private paperwork, personal details, or unrelated contact information. Only share business contact details when they are appropriate for completing a delivery.",
  },
  {
    title: "Treat people professionally",
    copy: "Threats, harassment, discrimination, sexual content, impersonation, spam, scams, and illegal content are not allowed.",
  },
  {
    title: "Do not create unsafe directions",
    copy: "Do not knowingly submit false clearance, access, routing, or site-condition information, or present an unsafe instruction as verified fact.",
  },
];

export default function CommunityGuidelinesPage() {
  return (
    <main className="relative flex-1 overflow-hidden bg-[#0a0d0f] text-white">
      <div className="absolute inset-0 sunrise-grid opacity-25" aria-hidden="true" />
      <div
        className="absolute left-[-12rem] top-[-14rem] h-[42rem] w-[42rem] rounded-full bg-orange-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <p className="eyebrow">Community Guidelines</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.05em] text-balance sm:text-5xl lg:text-6xl">
          Keep FreightIQ <span className="sunrise-text">useful and trusted.</span>
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-stone-300">
          FreightIQ is a professional operations network. Every contribution should help drivers
          complete deliveries safely, accurately, and respectfully.
        </p>

        <section className="mt-12 grid gap-4" aria-label="Contribution rules">
          {guidelines.map((guideline, index) => (
            <article
              key={guideline.title}
              className="grid gap-4 rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-6 sm:grid-cols-[3rem_1fr]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-400/10 text-sm font-semibold text-amber-300">
                {index + 1}
              </span>
              <div>
                <h2 className="text-xl font-semibold tracking-[-0.025em]">{guideline.title}</h2>
                <p className="mt-2 leading-7 text-stone-300">{guideline.copy}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-[1.5rem] border border-orange-400/20 bg-orange-400/[0.07] p-7 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-[-0.035em]">Reporting and enforcement</h2>
          <div className="mt-4 space-y-4 leading-7 text-stone-300">
            <p>
              Report content that is incorrect, unsafe, private, abusive, or unrelated. FreightIQ
              may review, correct, limit, or remove contributions and may restrict accounts that
              violate these guidelines.
            </p>
            <p>
              Need help now? Use the{" "}
              <Link
                href="/contact"
                className="font-semibold text-amber-300 underline decoration-amber-300/50 underline-offset-4 hover:text-amber-200"
              >
                FreightIQ support form
              </Link>
              .
            </p>
          </div>
        </section>

        <p className="mt-8 text-sm text-stone-500">Last updated August 2026.</p>
      </div>
    </main>
  );
}
