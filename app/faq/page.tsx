import type { Metadata } from "next";
import Link from "next/link";

const description =
  "Straight answers to common driver questions about FreightIQ, including how it works, contributing stop information, privacy, availability, and early access.";

const questions = [
  {
    question: "Is FreightIQ just another navigation app?",
    answer:
      "No. Navigation gets you to the address. FreightIQ helps with what happens after you arrive—which entrance to use, whether your truck fits, where receiving is, and what to expect at the stop.",
  },
  {
    question: "What kind of information does FreightIQ provide?",
    answer:
      "FreightIQ focuses on practical stop information from drivers. That can include entrances, approach details, truck fit, delivery areas, receiving locations, check-in instructions, business contacts, and reports from drivers who have already been there.",
  },
  {
    question: "Do I have to write a long report?",
    answer:
      "No. You can add one useful detail or complete a fuller report when you know more. A useful contribution can take less than a minute, and there is no requirement to fill out every field.",
  },
  {
    question: "What if the information is wrong or incomplete?",
    answer:
      "FreightIQ is built from real driver experience, and conditions can change. Drivers can add updated information or correct what is no longer accurate. The goal is useful, current guidance—not pretending every stop will always be perfect.",
  },
  {
    question: "Who can see what I contribute?",
    answer:
      "Stop information and Driver Reports you share can be seen by other FreightIQ drivers. Your contributions help the next driver who runs that stop. Locked Personal Intel is different. It is private to your FreightIQ account and is never added to shared Driver Intel.",
  },
  {
    question: "Should I share gate codes, passwords, or personal information?",
    answer:
      "No. Passwords, gate codes, access codes, private paperwork, and unrelated personal information should not be added to shared Driver Intel. If you need to save something sensitive for your own use, FreightIQ provides Locked Personal Intel. It requires your FreightIQ account and your device’s secure unlock before the note can be viewed.",
  },
  {
    question: "Does FreightIQ work for different companies and delivery types?",
    answer:
      "Yes. FreightIQ is designed around local pickup-and-delivery work, including LTL and dedicated routes, but it can help anywhere drivers need practical information about completing a stop.",
  },
  {
    question: "Is FreightIQ available on iPhone and Android?",
    answer: "Yes. FreightIQ is being tested on both iPhone and Android during early access.",
  },
  {
    question: "Do I need an account?",
    answer:
      "You can explore the map and available stop information without contributing. A FreightIQ account is required to add Driver Intel, save private information, and use account-based features.",
  },
  {
    question: "Is FreightIQ free for drivers?",
    answer: "Yes. FreightIQ is free for drivers during early access.",
  },
] as const;

export const metadata: Metadata = {
  title: "FreightIQ FAQ: Common Questions from Drivers",
  description,
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FreightIQ FAQ: Common Questions from Drivers",
    description,
    url: "https://freightiqapp.com/faq",
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

export default function FaqPage() {
  return (
    <main className="overflow-hidden bg-[#f1eee8] text-[#171513]">
      <section className="relative border-b border-white/10 bg-[#080b0d] text-white">
        <div className="absolute inset-0 sunrise-grid opacity-35" aria-hidden="true" />
        <div
          className="absolute left-[55%] top-[-15rem] h-[34rem] w-[34rem] rounded-full bg-orange-500/12 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
          <p className="eyebrow">Driver questions</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-balance sm:text-6xl lg:text-7xl">
            Common Questions from <span className="sunrise-text">Drivers</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">
            Straight answers to the questions drivers commonly ask about FreightIQ.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
          <div className="space-y-4">
            {questions.map((item) => (
              <details
                key={item.question}
                className="group rounded-[1.5rem] border border-stone-300 bg-white shadow-sm open:border-orange-300 open:shadow-md"
              >
                <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 rounded-[1.5rem] px-6 py-5 text-xl font-semibold tracking-[-0.025em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600 sm:px-8 sm:text-2xl [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <span
                    className="shrink-0 text-2xl text-orange-600 transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="border-t border-stone-200 px-6 py-6 text-base leading-8 text-stone-700 sm:px-8 sm:text-lg">
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#080b0d] text-white">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="rounded-[2rem] border border-orange-400/20 bg-[#111518] px-6 py-12 text-center sm:px-10 lg:py-16">
            <p className="eyebrow">Still have a question?</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-balance sm:text-5xl">
              Reach out anytime.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-stone-400">
              Or request early access and start exploring practical stop information from drivers.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/early-access"
                className="sunrise-button inline-flex min-h-13 items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-[#120b06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
              >
                Request Early Access
              </Link>
              <Link
                href="/real-example"
                className="inline-flex min-h-13 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] px-8 py-3.5 text-base font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
              >
                See a Real Example{" "}
                <span className="ml-2" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
