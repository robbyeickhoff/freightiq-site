import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getModerationAdminContext } from "@/lib/moderation/auth";
import { loadModerationQueue } from "@/lib/moderation/data";
import { resolveReport } from "./actions";

export const metadata: Metadata = {
  title: "Content Moderation",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const reasonLabels: Record<string, string> = {
  incorrect_or_unsafe: "Incorrect or unsafe",
  private_or_confidential: "Private or confidential information",
  abusive_or_inappropriate: "Abusive or inappropriate",
  spam_or_unrelated: "Spam or unrelated",
  other: "Other",
};

const outcomeOptions = [
  ["dismissed", "Dismissed"],
  ["content_corrected", "Content corrected"],
  ["content_removed", "Content removed"],
  ["contributor_warned", "Contributor warned outside the app"],
  ["contributor_restricted", "Contributor restricted"],
] as const;

function formatDate(value: string | null) {
  if (!value) return "Not reviewed";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Denver",
  }).format(new Date(value));
}

function readableSubject(subject: Record<string, unknown> | null) {
  if (!subject) return "The reported content is no longer available.";
  return JSON.stringify(subject, null, 2);
}

export default async function ModerationPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string; error?: string }>;
}) {
  const admin = await getModerationAdminContext();
  if (!admin) redirect("/founding-drivers/sign-in");

  const [{ notice, error }, queue] = await Promise.all([searchParams, loadModerationQueue()]);
  const openItems = queue.filter((item) => item.status !== "resolved");
  const resolvedItems = queue.filter((item) => item.status === "resolved").reverse();

  return (
    <main className="min-h-screen bg-[#090c0f] text-white">
      <section className="border-b border-white/10 bg-[#0b0f12]">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
          <p className="eyebrow">Private safety operations</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            Content Moderation
          </h1>
          <p className="mt-4 max-w-3xl leading-7 text-stone-400">
            Review driver reports oldest first. Every decision is recorded with the signed-in
            moderator and a server timestamp.
          </p>
          <Link
            href="/founding-drivers/admin"
            className="mt-6 inline-flex min-h-11 items-center rounded-full border border-white/15 px-5 text-sm font-semibold text-stone-300 hover:border-white/30 hover:text-white"
          >
            Back to Admin
          </Link>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-8">
        {notice ? (
          <p
            className="rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-100"
            role="status"
          >
            {notice}
          </p>
        ) : null}
        {error ? (
          <p
            className="rounded-2xl border border-rose-400/25 bg-rose-400/10 px-5 py-4 text-sm text-rose-100"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <section aria-labelledby="open-reports-heading">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Needs attention</p>
              <h2 id="open-reports-heading" className="mt-2 text-2xl font-semibold">
                Open reports
              </h2>
            </div>
            <p className="text-sm text-stone-400">{openItems.length} open</p>
          </div>

          <div className="mt-5 grid gap-5">
            {openItems.length === 0 ? (
              <p className="rounded-3xl border border-white/10 bg-[#111518] p-7 text-stone-400">
                No reports need review.
              </p>
            ) : (
              openItems.map((item) => (
                <article
                  key={item.id}
                  className="rounded-3xl border border-white/10 bg-[#111518] p-5 sm:p-7"
                >
                  <div className="flex flex-col justify-between gap-3 sm:flex-row">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">
                        {item.subject_type === "report" ? "Driver Report" : "Stop"}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold">
                        {reasonLabels[item.reason] ?? item.reason}
                      </h3>
                    </div>
                    <p className="text-sm text-stone-500">{formatDate(item.created_at)}</p>
                  </div>

                  <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <dt className="text-stone-500">Reporter</dt>
                      <dd className="mt-1 text-stone-200">
                        {item.reporter_username || item.reporter_user_id}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-stone-500">Contributor</dt>
                      <dd className="mt-1 text-stone-200">
                        {item.contributor_username || item.subject_owner_user_id || "Unknown"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-stone-500">Prior subject reports</dt>
                      <dd className="mt-1 text-stone-200">{item.prior_subject_report_count}</dd>
                    </div>
                    <div>
                      <dt className="text-stone-500">Prior contributor reports</dt>
                      <dd className="mt-1 text-stone-200">{item.prior_contributor_report_count}</dd>
                    </div>
                  </dl>

                  {item.details ? (
                    <div className="mt-5 rounded-2xl border border-amber-400/15 bg-amber-400/[0.06] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-300">
                        Reporter details
                      </p>
                      <p className="mt-2 whitespace-pre-wrap leading-7 text-stone-200">
                        {item.details}
                      </p>
                    </div>
                  ) : null}

                  <details className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                    <summary className="cursor-pointer font-semibold text-stone-200">
                      View current subject data
                    </summary>
                    <pre className="mt-4 overflow-x-auto whitespace-pre-wrap text-xs leading-6 text-stone-400">
                      {readableSubject(item.subject)}
                    </pre>
                  </details>

                  <form
                    action={resolveReport}
                    className="mt-6 grid gap-4 border-t border-white/10 pt-6"
                  >
                    <input type="hidden" name="content_report_id" value={item.id} />
                    <div>
                      <label
                        htmlFor={`outcome-${item.id}`}
                        className="text-sm font-semibold text-stone-200"
                      >
                        Outcome
                      </label>
                      <select
                        id={`outcome-${item.id}`}
                        name="outcome"
                        required
                        className="mt-2 min-h-12 w-full rounded-xl border border-white/15 bg-black/30 px-4 text-white"
                      >
                        <option value="">Choose an outcome</option>
                        {outcomeOptions.map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor={`notes-${item.id}`}
                        className="text-sm font-semibold text-stone-200"
                      >
                        Review notes
                      </label>
                      <textarea
                        id={`notes-${item.id}`}
                        name="review_notes"
                        maxLength={2000}
                        rows={4}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 p-4 text-white"
                      />
                    </div>
                    <button className="sunrise-button min-h-12 rounded-full px-6 font-semibold text-[#120b06]">
                      Save decision
                    </button>
                  </form>
                </article>
              ))
            )}
          </div>
        </section>

        {resolvedItems.length ? (
          <section aria-labelledby="decision-history-heading">
            <h2 id="decision-history-heading" className="text-2xl font-semibold">
              Decision history
            </h2>
            <div className="mt-5 grid gap-3">
              {resolvedItems.slice(0, 50).map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-white/10 bg-[#111518] p-5"
                >
                  <div className="flex flex-col justify-between gap-2 sm:flex-row">
                    <p className="font-semibold text-stone-200">
                      {item.outcome?.replaceAll("_", " ")}
                    </p>
                    <p className="text-sm text-stone-500">{formatDate(item.reviewed_at)}</p>
                  </div>
                  {item.review_notes ? (
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-stone-400">
                      {item.review_notes}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
