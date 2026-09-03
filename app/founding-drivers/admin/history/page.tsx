import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getFoundingDriverAdminContext } from "@/lib/founding-drivers/auth";
import { loadFoundingDriverReviewHistory, parseHistoryPage, REVIEW_HISTORY_PAGE_SIZE } from "@/lib/founding-drivers/data";
import { ContributionCard } from "../contribution-card";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Review History | Founding Driver Admin",
  robots: { index: false, follow: false },
};

export default async function ReviewHistoryPage({ searchParams }: {
  searchParams: Promise<{ page?: string | string[]; notice?: string; error?: string }>;
}) {
  if (!(await getFoundingDriverAdminContext())) redirect("/founding-drivers/sign-in");
  const params = await searchParams;
  const data = await loadFoundingDriverReviewHistory(parseHistoryPage(params.page));
  const profiles = new Map(data.profiles.map((profile) => [profile.id, profile]));
  const stops = new Map(data.stops.map((stop) => [stop.id, stop]));
  const buttonClass = "inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 px-5 text-sm font-semibold text-amber-200";
  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-5 py-10 sm:px-8">
      <Link href="/founding-drivers/admin" className={buttonClass}>← Back to admin</Link>
      <header>
        <p className="eyebrow">Completed decisions</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Reviewed contributions</h1>
        <p className="mt-2 text-sm text-stone-400">Newest reviews first. Open a contribution to inspect or update its decision.</p>
      </header>
      {params.notice ? <p role="status" className="rounded-xl border border-emerald-400/25 bg-emerald-400/10 p-4 text-emerald-200">{params.notice}</p> : null}
      {params.error ? <p role="alert" className="rounded-xl border border-red-400/25 bg-red-400/10 p-4 text-red-200">{params.error}</p> : null}
      <p className="text-sm text-stone-400">{data.total ? `${(data.page - 1) * REVIEW_HISTORY_PAGE_SIZE + 1}–${Math.min(data.page * REVIEW_HISTORY_PAGE_SIZE, data.total)} of ${data.total} reviewed contributions` : "No contributions have been reviewed yet."}</p>
      <div className="grid gap-4">
        {data.contributions.map((contribution) => (
          <ContributionCard key={contribution.id} contribution={contribution} profile={profiles.get(contribution.user_id)} stop={stops.get(contribution.stop_id)} historyPage={data.page} />
        ))}
      </div>
      {data.pageCount > 1 ? (
        <nav aria-label="Review history pages" className="flex flex-wrap items-center justify-between gap-3">
          {data.page > 1 ? <Link href={`?page=${data.page - 1}`} className={buttonClass}>← Previous</Link> : <span className={`${buttonClass} opacity-40`} aria-disabled="true">← Previous</span>}
          <span className="text-sm text-stone-400">Page {data.page} of {data.pageCount}</span>
          {data.page < data.pageCount ? <Link href={`?page=${data.page + 1}`} className={buttonClass}>Next →</Link> : <span className={`${buttonClass} opacity-40`} aria-disabled="true">Next →</span>}
        </nav>
      ) : null}
    </main>
  );
}
