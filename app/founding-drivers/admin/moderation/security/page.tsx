import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getModerationAdminContext } from "@/lib/moderation/auth";
import { actOnSecurityCase } from "./actions";

export const metadata: Metadata = { title: "Private security review", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";
type Case = {
  id: string; created_at: string; last_seen_at: string; expires_at: string; paused_until: string | null;
  denied: number; disclosed: number; active_minutes: number; version: number; pause_active: boolean;
  metadata_charged_15m?: number; detail_charged_15m?: number; detail_charged_60m?: number;
  deliveries: { state: string; attempt: number }[];
  actions: { action: string; reason: string; happened_at: string; paused_until: string | null; version: number }[];
};
const messages: Record<string, string> = {
  saved: "Decision saved.", stale: "Someone changed this case. Review the current state before trying again.",
  failed: "The decision could not be saved. Refresh and try again.", invalid: "Choose a valid action.",
};
const date = (value: string) => new Date(value).toLocaleString("en-US", { timeZone: "America/Denver" });
export default async function SecurityPage({ searchParams }: { searchParams: Promise<{ case?: string; before?: string; beforeId?: string; result?: string }> }) {
  const admin = await getModerationAdminContext();
  if (!admin) redirect("/founding-drivers/sign-in");
  const params = await searchParams;
  const id = params.case && /^[0-9a-f-]{36}$/.test(params.case) ? params.case : null;
  const beforeId = params.beforeId && /^[0-9a-f-]{36}$/.test(params.beforeId) ? params.beforeId : null;
  const before = beforeId && params.before && Number.isFinite(Date.parse(params.before)) ? params.before : null;
  let data: { cases: Case[]; detection_enabled: boolean; mail_enabled: boolean; last_record_failure_at: string | null; last_worker_at: string | null; oldest_pending_at: string | null } | null = null;
  try {
    const response = await admin.supabase.rpc("get_security_read_cases_v1", { p_case: id, p_before: before, p_before_id: before ? beforeId : null });
    if (!response.error && response.data && Array.isArray(response.data.cases)) data = response.data;
  } catch { /* Render a recoverable failure, not an empty successful queue. */ }
  return <main className="min-h-screen bg-[#090c0f] px-5 py-10 text-white">
    <div className="mx-auto max-w-4xl space-y-6">
      <h1 className="text-3xl font-semibold">Security review</h1>
      <p>Unusual shared-data reading is a reason to investigate, not proof of abuse. Pausing shared reading does not stop contributions. Times below are Mountain Time.</p>
      <Link className="underline" href="/founding-drivers/admin/moderation">Back to moderation</Link>
      {params.result && messages[params.result] ? <p role="status">{messages[params.result]}</p> : null}
      {!data ? <p role="alert">Security cases could not be loaded. <Link className="underline" href="/founding-drivers/admin/moderation/security">Try again</Link></p> : <>
        <p>Detection: {data.detection_enabled ? "enabled" : "not enabled"}. Email queue: {data.mail_enabled ? "enabled" : "not enabled"}. Email service and scheduler must also be healthy; this screen alone does not prove delivery.</p>
        <p>Last mail-worker check: {data.last_worker_at ? date(data.last_worker_at) : "not observed"}. Oldest queued alert: {data.oldest_pending_at ? date(data.oldest_pending_at) : "none"}.</p>
        {data.last_record_failure_at ? <p role="alert">Activity recording failed at {date(data.last_record_failure_at)}. Engineering review required; read limits remain independent.</p> : null}
        {id ? <Link className="underline" href="/founding-drivers/admin/moderation/security">View all cases</Link> : null}
        {data.cases.length === 0 ? <p>No available cases in this view.</p> : data.cases.map(item => {
          const paused = item.pause_active;
          return <section key={item.id} className="space-y-4 rounded-2xl border border-white/20 p-5">
            <h2 className="break-all text-lg font-semibold">Case {item.id}</h2>
            <p>First observed {date(item.created_at)}. Latest signal {date(item.last_seen_at)}.</p>
            <p>Latest recorded 15-minute window: {item.disclosed} returned rows, {item.denied} refused requests, activity in {item.active_minutes} minutes. Returned rows can include repeated data.</p>
            {item.detail_charged_60m !== undefined ? <p>Newly charged library records: {item.metadata_charged_15m} map/search records and {item.detail_charged_15m} detailed records in 15 minutes; {item.detail_charged_60m} detailed records in 60 minutes. Repeated reads within the deduplication window and routine Operations refreshes do not increase these counts. Detailed records include stops and individual reports, not just stops.</p> : null}
            <p>{paused ? `Shared reading paused until ${date(item.paused_until!)}.` : "No active moderator pause. Normal read limits still apply."}</p>
            <p>Email: {item.deliveries.length ? item.deliveries.map(d => `${d.state} (${d.attempt} attempts)`).join(", ") : "No configured recipient delivery"}. Accepted means accepted by the mail provider, not confirmed in the inbox.</p>
            <form action={actOnSecurityCase} className="flex flex-wrap items-end gap-3">
              <input type="hidden" name="case_id" value={item.id} /><input type="hidden" name="version" value={item.version} />
              <input type="hidden" name="reason" value="suspicious_collection" />
              <label>Pause shared reading<select name="seconds" required defaultValue="900" className="ml-3 min-h-12 rounded bg-stone-800 p-2">
                <option value="900">15 minutes</option><option value="3600">1 hour</option><option value="86400">24 hours</option>
              </select></label>
              <button className="min-h-12 rounded bg-amber-500 px-5 text-black">Apply pause</button>
            </form>
            {paused ? <form action={actOnSecurityCase} className="flex flex-wrap items-end gap-3">
              <input type="hidden" name="case_id" value={item.id} /><input type="hidden" name="version" value={item.version} /><input type="hidden" name="seconds" value="0" />
              <label>Restore reason<select name="reason" required className="ml-3 min-h-12 rounded bg-stone-800 p-2"><option value="review_complete">Review complete</option><option value="mistake">Pause was a mistake</option></select></label>
              <button className="min-h-12 rounded border px-5">Restore shared reading</button>
            </form> : null}
            <details><summary className="cursor-pointer">Recent decisions</summary><ul>{item.actions.map(a => <li key={a.version}>{date(a.happened_at)} — {a.action}: {a.reason.replaceAll("_", " ")}</li>)}</ul></details>
          </section>;
        })}
        {!id && data.cases.length === 50 ? <Link className="underline" href={`?before=${encodeURIComponent(data.cases[49].created_at)}&beforeId=${data.cases[49].id}`}>Older cases</Link> : null}
      </>}
    </div>
  </main>;
}
