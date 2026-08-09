import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getFoundingDriverAdminContext } from "@/lib/founding-drivers/auth";
import { loadFoundingDriverAdminDashboard } from "@/lib/founding-drivers/data";
import type {
  Contribution,
  Enrollment,
  Profile,
  Progress,
  StopSummary,
} from "@/lib/founding-drivers/types";
import {
  confirmQualification,
  enrollDriver,
  extendProgram,
  reviewContribution,
  signOut,
  updateProgramStatus,
  updateReward,
} from "./actions";

export const metadata: Metadata = {
  title: "Founding Driver Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const statusLabels: Record<string, string> = {
  pending: "Pending",
  active: "Active",
  qualified: "Qualified",
  completed: "Completed",
  withdrawn: "Withdrawn",
  counts: "Counts",
  needs_clarification: "Needs clarification",
  does_not_count: "Does not count",
  not_earned: "Not earned",
  earned: "Earned",
  paid: "Paid",
  venmo: "Venmo",
  amazon_gift_card: "Amazon gift card",
  other: "Other",
};

function formatDate(value: string | null, includeTime = false) {
  if (!value) return "—";
  const date = includeTime ? new Date(value) : new Date(`${value}T12:00:00Z`);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...(includeTime
      ? { hour: "numeric", minute: "2-digit", timeZone: "America/Denver" }
      : { timeZone: "UTC" }),
  }).format(date);
}

function denverToday() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Denver",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((item) => item.type === type)?.value ?? "";
  return `${part("year")}-${part("month")}-${part("day")}`;
}

function money(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function statusClass(status: string) {
  if (["active", "counts", "earned", "paid", "qualified"].includes(status)) {
    return "border-emerald-400/25 bg-emerald-400/10 text-emerald-200";
  }
  if (["pending", "needs_clarification"].includes(status)) {
    return "border-amber-400/25 bg-amber-400/10 text-amber-200";
  }
  return "border-white/10 bg-white/5 text-stone-300";
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClass(status)}`}
    >
      {statusLabels[status] ?? status}
    </span>
  );
}

function Metric({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-white">{value}</p>
      {detail ? <p className="mt-1 text-xs text-stone-500">{detail}</p> : null}
    </div>
  );
}

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

function ContributionCard({
  contribution,
  profile,
  stop,
}: {
  contribution: Contribution;
  profile?: Profile;
  stop?: StopSummary;
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-[#171c20] p-5">
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
    </article>
  );
}

function DriverCard({
  enrollment,
  profile,
  progress,
  pendingReviews,
}: {
  enrollment: Enrollment;
  profile?: Profile;
  progress?: Progress;
  pendingReviews: number;
}) {
  const earnedCents = progress?.earned_reward_cents ?? 0;

  return (
    <article className="rounded-[1.75rem] border border-white/10 bg-[#14191d] p-5 sm:p-6">
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-semibold text-white">
              {profile?.username ?? "Unknown driver"}
            </h3>
            <StatusBadge status={enrollment.status} />
            {enrollment.permanent_founding_driver ? (
              <span className="rounded-full bg-gradient-to-r from-orange-700 to-amber-500 px-2.5 py-1 text-xs font-bold text-[#160b05]">
                Founding Driver
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-sm text-stone-400">
            {formatDate(enrollment.start_date)} – {formatDate(enrollment.end_date)} ·{" "}
            {enrollment.time_zone}
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs uppercase tracking-[0.12em] text-stone-500">Reward earned</p>
          <p className="mt-1 text-2xl font-semibold text-amber-300">{money(earnedCents)}</p>
          <StatusBadge status={enrollment.payment_status} />
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric
          label="Active days"
          value={`${progress?.active_days ?? 0} / ${progress?.active_days_target ?? 10}`}
        />
        <Metric
          label="Qualifying stops"
          value={`${progress?.qualifying_stops ?? 0} / ${progress?.base_stop_target ?? 10}`}
          detail={`Bonus target ${progress?.bonus_stop_target ?? 20}`}
        />
        <Metric label="Pending review" value={String(pendingReviews)} />
        <Metric
          label="Eligibility"
          value={
            progress?.bonus_reward_eligible
              ? "$40"
              : progress?.base_reward_eligible
                ? "$25"
                : "Not yet"
          }
          detail={progress?.bonus_reward_eligible ? "Maximum reward" : "Live calculation"}
        />
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-black/15 p-4">
          <h4 className="text-sm font-semibold text-white">Program controls</h4>
          <form
            action={extendProgram}
            className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end"
          >
            <input type="hidden" name="enrollment_id" value={enrollment.id} />
            <label className="grid flex-1 gap-1 text-xs font-semibold text-stone-400">
              Program end date
              <input
                type="date"
                name="end_date"
                defaultValue={enrollment.end_date ?? ""}
                min={enrollment.start_date ?? undefined}
                required
                className="min-h-11 rounded-xl border border-white/15 bg-[#0e1215] px-3 text-sm text-white"
              />
            </label>
            <button className="min-h-11 rounded-full border border-white/15 px-4 text-sm font-semibold text-stone-200 hover:border-amber-400/50">
              Update date
            </button>
          </form>
          <form
            action={updateProgramStatus}
            className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end"
          >
            <input type="hidden" name="enrollment_id" value={enrollment.id} />
            <label className="grid flex-1 gap-1 text-xs font-semibold text-stone-400">
              Program status
              <select
                name="status"
                defaultValue={enrollment.status}
                className="min-h-11 rounded-xl border border-white/15 bg-[#0e1215] px-3 text-sm text-white"
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="qualified">Qualified</option>
                <option value="completed">Completed</option>
                <option value="withdrawn">Withdrawn</option>
              </select>
            </label>
            <button className="min-h-11 rounded-full border border-white/15 px-4 text-sm font-semibold text-stone-200 hover:border-amber-400/50">
              Save status
            </button>
          </form>
          <form action={confirmQualification} className="mt-4">
            <input type="hidden" name="enrollment_id" value={enrollment.id} />
            <button
              disabled={!progress?.base_reward_eligible || enrollment.permanent_founding_driver}
              className="sunrise-button min-h-11 w-full rounded-full px-5 text-sm font-semibold text-[#120b06] disabled:cursor-not-allowed disabled:grayscale disabled:opacity-40"
            >
              {enrollment.permanent_founding_driver
                ? `Qualified ${formatDate(enrollment.qualified_at, true)}`
                : "Confirm qualification"}
            </button>
            <p className="mt-2 text-xs leading-5 text-stone-500">
              Confirmation requires 10 active days and 10 approved stops. Active status keeps the
              remaining program window open for bonus progress.
            </p>
          </form>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/15 p-4">
          <h4 className="text-sm font-semibold text-white">Reward delivery</h4>
          <form action={updateReward} className="mt-4 grid gap-3">
            <input type="hidden" name="enrollment_id" value={enrollment.id} />
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1 text-xs font-semibold text-stone-400">
                Payment method
                <select
                  name="payment_preference"
                  defaultValue={enrollment.payment_preference ?? ""}
                  className="min-h-11 rounded-xl border border-white/15 bg-[#0e1215] px-3 text-sm text-white"
                >
                  <option value="">Not chosen</option>
                  <option value="venmo">Venmo</option>
                  <option value="amazon_gift_card">Amazon gift card</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label className="grid gap-1 text-xs font-semibold text-stone-400">
                Payment status
                <select
                  name="payment_status"
                  defaultValue={enrollment.payment_status}
                  className="min-h-11 rounded-xl border border-white/15 bg-[#0e1215] px-3 text-sm text-white"
                >
                  <option value="not_earned">Not earned</option>
                  <option value="earned">Earned</option>
                  <option value="paid">Paid</option>
                </select>
              </label>
            </div>
            <label className="grid gap-1 text-xs font-semibold text-stone-400">
              Payment note
              <input
                name="payment_preference_note"
                defaultValue={enrollment.payment_preference_note ?? ""}
                maxLength={200}
                placeholder="Optional handle or delivery note—never credentials"
                className="min-h-11 rounded-xl border border-white/15 bg-[#0e1215] px-3 text-sm text-white"
              />
            </label>
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <p className="text-xs text-stone-500">Paid {formatDate(enrollment.paid_at, true)}</p>
              <button className="min-h-11 rounded-full border border-amber-400/35 bg-amber-400/10 px-5 text-sm font-semibold text-amber-200 hover:bg-amber-400/15">
                Save reward details
              </button>
            </div>
          </form>
        </section>
      </div>
    </article>
  );
}

export default async function FoundingDriverAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string; error?: string }>;
}) {
  const admin = await getFoundingDriverAdminContext();
  if (!admin) {
    redirect("/founding-drivers/sign-in");
  }

  const [{ notice, error }, data] = await Promise.all([
    searchParams,
    loadFoundingDriverAdminDashboard(),
  ]);
  const profileById = new Map(data.profiles.map((profile) => [profile.id, profile]));
  const progressByEnrollment = new Map(
    data.progress.map((progress) => [progress.enrollment_id, progress]),
  );
  const stopById = new Map(data.stops.map((stop) => [stop.id, stop]));
  const unresolvedReviews = data.contributions.filter((item) =>
    ["pending", "needs_clarification"].includes(item.review_status),
  );
  const orderedContributions = [...data.contributions].sort((a, b) => {
    const aOpen = ["pending", "needs_clarification"].includes(a.review_status) ? 0 : 1;
    const bOpen = ["pending", "needs_clarification"].includes(b.review_status) ? 0 : 1;
    return aOpen - bOpen || a.submitted_at.localeCompare(b.submitted_at);
  });
  const activeDrivers = data.enrollments.filter((item) => item.status === "active").length;
  const eligibleDrivers = data.progress.filter((item) => item.base_reward_eligible).length;
  const pendingReviewsByEnrollment = new Map<string, number>();
  for (const contribution of unresolvedReviews) {
    pendingReviewsByEnrollment.set(
      contribution.enrollment_id,
      (pendingReviewsByEnrollment.get(contribution.enrollment_id) ?? 0) + 1,
    );
  }

  return (
    <main className="min-h-screen bg-[#090c0f] text-white">
      <section className="border-b border-white/10 bg-[#0b0f12]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow">Private program operations</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Founding Driver Admin
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-stone-400">
                Enroll drivers, review qualifying stops, confirm milestones, and record final reward
                delivery from one Supabase-backed operating view.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/founding-drivers/admin/moderation"
                className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-5 text-sm font-semibold text-stone-300 hover:border-white/30 hover:text-white"
              >
                Content Moderation
              </Link>
              <Link
                href="/founding-drivers/admin/referrals"
                className="sunrise-button inline-flex min-h-11 items-center rounded-full px-5 text-sm font-semibold text-[#120b06]"
              >
                Referral Program
              </Link>
              <form action={signOut}>
                <button className="min-h-11 rounded-full border border-white/15 px-5 text-sm font-semibold text-stone-300 hover:border-white/30 hover:text-white">
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8">
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

        <section aria-labelledby="overview-heading">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">At a glance</p>
              <h2 id="overview-heading" className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
                Program overview
              </h2>
            </div>
            <p className="text-xs text-stone-500">Live from Supabase</p>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="All program drivers" value={String(data.enrollments.length)} />
            <Metric label="Active now" value={String(activeDrivers)} />
            <Metric label="Needs review" value={String(unresolvedReviews.length)} />
            <Metric label="Reward eligible" value={String(eligibleDrivers)} />
          </div>
        </section>

        <section
          className="rounded-[1.75rem] border border-white/10 bg-[#111518] p-5 sm:p-6"
          aria-labelledby="enroll-heading"
        >
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="eyebrow">After onboarding</p>
              <h2 id="enroll-heading" className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
                Enroll a driver
              </h2>
              <p className="mt-3 text-sm leading-6 text-stone-400">
                Select an existing FreightIQ profile. The start date activates an inclusive 30-day
                program window in America/Denver.
              </p>
            </div>
            <form
              action={enrollDriver}
              className="grid gap-3 sm:grid-cols-[1fr_12rem_auto] sm:items-end"
            >
              <label className="grid gap-1 text-xs font-semibold text-stone-400">
                FreightIQ username
                <select
                  name="user_id"
                  required
                  defaultValue=""
                  className="min-h-12 rounded-xl border border-white/15 bg-[#0e1215] px-3 text-sm text-white"
                >
                  <option value="" disabled>
                    Choose an account
                  </option>
                  {data.availableProfiles.map((profile) => (
                    <option key={profile.id} value={profile.id}>
                      {profile.username}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1 text-xs font-semibold text-stone-400">
                Start date
                <input
                  type="date"
                  name="start_date"
                  defaultValue={denverToday()}
                  required
                  className="min-h-12 rounded-xl border border-white/15 bg-[#0e1215] px-3 text-sm text-white"
                />
              </label>
              <button
                disabled={data.availableProfiles.length === 0}
                className="sunrise-button min-h-12 rounded-full px-6 text-sm font-semibold text-[#120b06] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Start 30 days
              </button>
              <label className="flex items-start gap-2 text-xs leading-5 text-stone-400 sm:col-span-3">
                <input
                  type="checkbox"
                  name="confirm_onboarding"
                  value="yes"
                  required
                  className="mt-0.5 h-4 w-4 accent-amber-500"
                />
                I completed the onboarding walkthrough and confirmed this is the correct FreightIQ
                account.
              </label>
            </form>
          </div>
        </section>

        <section aria-labelledby="reviews-heading">
          <div>
            <p className="eyebrow">Quick decisions</p>
            <h2 id="reviews-heading" className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
              Contribution review
            </h2>
            <p className="mt-2 text-sm text-stone-400">
              Open items appear first. Corrected clarification items return to Pending
              automatically.
            </p>
          </div>
          <div className="mt-5 grid gap-4">
            {orderedContributions.length ? (
              orderedContributions.map((contribution) => (
                <ContributionCard
                  key={contribution.id}
                  contribution={contribution}
                  profile={profileById.get(contribution.user_id)}
                  stop={stopById.get(contribution.stop_id)}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.025] px-5 py-10 text-center text-sm text-stone-500">
                No Founding Driver contributions are waiting for review.
              </div>
            )}
          </div>
        </section>

        <section aria-labelledby="drivers-heading">
          <div>
            <p className="eyebrow">Current and past</p>
            <h2 id="drivers-heading" className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
              Program drivers
            </h2>
          </div>
          <div className="mt-5 grid gap-5">
            {data.enrollments.length ? (
              data.enrollments.map((enrollment) => (
                <DriverCard
                  key={enrollment.id}
                  enrollment={enrollment}
                  profile={profileById.get(enrollment.user_id)}
                  progress={progressByEnrollment.get(enrollment.id)}
                  pendingReviews={pendingReviewsByEnrollment.get(enrollment.id) ?? 0}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.025] px-5 py-12 text-center">
                <p className="font-semibold text-stone-300">No drivers are enrolled yet.</p>
                <p className="mt-2 text-sm text-stone-500">
                  Driver #1 will appear here after the onboarding walkthrough and explicit
                  enrollment.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
