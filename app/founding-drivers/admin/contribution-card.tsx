import type { Contribution, Profile, StopSummary } from "@/lib/founding-drivers/types";
import { reviewContribution } from "./actions";
import { formatDate, StatusBadge } from "./review-display";

function fieldLabel(value: string) {
  return value
    .replace("back_in", "Back In")
    .replace("truck_fit", "Truck Fit")
    .replace("delivery_type", "Delivery Type")
    .replace("delivery_zone", "Delivery Zone");
}

function snapshotValue(key: string, value: unknown) {
  if (key === "delivery_zone") return value ? "Captured" : "Missing";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (value === null || value === undefined || value === "") return "Missing";
  return String(value).replaceAll("_", " ");
}

export function ContributionCard({
  contribution,
  profile,
  stop,
  historyPage,
}: {
  contribution: Contribution;
  profile?: Profile;
  stop?: StopSummary;
  historyPage?: number;
}) {
  return (
    <details className="group rounded-2xl border border-white/10 bg-[#171c20]">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 marker:content-none">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-white">{stop?.name ?? "Unknown stop"}</h3>
            <StatusBadge status={contribution.review_status} />
          </div>
          <p className="mt-1 text-sm text-stone-400">
            {profile?.username ?? "Unknown driver"} ·{" "}
            {contribution.contribution_type === "new_stop" ? "New stop" : "Completed existing stop"}
          </p>
          <p className="mt-1 text-xs text-stone-500">
            {historyPage && contribution.reviewed_at ? "Reviewed" : "Submitted"} {formatDate(historyPage && contribution.reviewed_at ? contribution.reviewed_at : contribution.submitted_at, true)}
          </p>
        </div>
        <span
          aria-hidden="true"
          className="mt-1 text-lg text-stone-500 transition-transform group-open:rotate-180"
        >
          ⌄
        </span>
      </summary>
      <div className="border-t border-white/10 p-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-white">{stop?.name ?? "Unknown stop"}</h3>
            <StatusBadge status={contribution.review_status} />
          </div>
          <p className="mt-1 text-sm text-stone-400">
            {profile?.username ?? "Unknown driver"} ·{" "}
            {contribution.contribution_type === "new_stop" ? "New stop" : "Completed existing stop"}
          </p>
          <p className="mt-1 text-xs text-stone-500">
            {stop?.address ?? contribution.stop_id} · Submitted{" "}
            {formatDate(contribution.submitted_at, true)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {contribution.completed_fields.map((field) => (
            <span
              key={field}
              className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-stone-300"
            >
              {fieldLabel(field)}
            </span>
          ))}
        </div>
      </div>

      <dl className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(contribution.core_snapshot).map(([key, value]) => (
          <div key={key} className="rounded-xl border border-white/8 bg-black/20 p-3">
            <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-stone-500">
              {fieldLabel(key)}
            </dt>
            <dd className="mt-1 text-sm capitalize text-stone-200">{snapshotValue(key, value)}</dd>
          </div>
        ))}
      </dl>

      <form action={reviewContribution} className="mt-5 grid gap-3 lg:grid-cols-[13rem_1fr_auto]">
        {historyPage ? <input type="hidden" name="history_page" value={historyPage} /> : null}
        <input type="hidden" name="contribution_id" value={contribution.id} />
        <label className="grid gap-1 text-xs font-semibold text-stone-400">
          Decision
          <select
            name="review_status"
            defaultValue={contribution.review_status}
            className="min-h-11 rounded-xl border border-white/15 bg-[#0e1215] px-3 text-sm text-white"
          >
            <option value="pending">Pending</option>
            <option value="counts">Counts</option>
            <option value="needs_clarification">Needs clarification</option>
            <option value="does_not_count">Does not count</option>
          </select>
        </label>
        <label className="grid gap-1 text-xs font-semibold text-stone-400">
          Review note
          <input
            name="review_note"
            defaultValue={contribution.review_note ?? ""}
            maxLength={500}
            placeholder="Optional clarification or reason"
            className="min-h-11 rounded-xl border border-white/15 bg-[#0e1215] px-3 text-sm text-white"
          />
        </label>
        <button className="sunrise-button min-h-11 self-end rounded-full px-5 text-sm font-semibold text-[#120b06]">
          Save review
        </button>
      </form>
      </div>
    </details>
  );
}

