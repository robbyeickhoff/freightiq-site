import Image from "next/image";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getFoundingDriverContext } from "@/lib/founding-drivers/auth";
import { loadFoundingDriverDashboard } from "@/lib/founding-drivers/driver-data";
import type {
  DriverContribution,
  DriverProgress,
  LeaderboardEntry,
  StopSummary,
} from "@/lib/founding-drivers/types";
import ProfileImageForm from "./ProfileImageForm";
import { signOut } from "./actions";

export const metadata: Metadata = {
  title: "Founding Drivers",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const reviewLabels: Record<string, string> = {
  pending: "Pending review",
  counts: "Counts",
  needs_clarification: "Needs clarification",
  does_not_count: "Does not count",
};

function formatDate(value: string | null, includeTime = false) {
  if (!value) return "—";
  const date = includeTime ? new Date(value) : new Date(`${value}T12:00:00Z`);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: includeTime ? "America/Denver" : "UTC",
    ...(includeTime ? { hour: "numeric", minute: "2-digit" } : {}),
  }).format(date);
}

function todayInTimeZone(timeZone: string) {
  const dateParts = (zone: string) => {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: zone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date());
    const part = (type: Intl.DateTimeFormatPartTypes) =>
      parts.find((item) => item.type === type)?.value ?? "";
    return `${part("year")}-${part("month")}-${part("day")}`;
  };

  try {
    return dateParts(timeZone);
  } catch {
    return dateParts("America/Denver");
  }
}

function programDay(progress: DriverProgress) {
  if (!progress.start_date || !progress.end_date) return "Not started";
  const today = todayInTimeZone(progress.time_zone);
  if (today < progress.start_date) return `Starts ${formatDate(progress.start_date)}`;
  if (today > progress.end_date) return "Program window complete";

  const start = new Date(`${progress.start_date}T12:00:00Z`).getTime();
  const current = new Date(`${today}T12:00:00Z`).getTime();
  return `Day ${Math.floor((current - start) / 86_400_000) + 1}`;
}

function money(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function statusClass(status: string) {
  if (status === "counts") return "border-emerald-400/25 bg-emerald-400/10 text-emerald-200";
  if (status === "needs_clarification") {
    return "border-amber-400/25 bg-amber-400/10 text-amber-200";
  }
  if (status === "does_not_count") return "border-white/10 bg-white/5 text-stone-400";
  return "border-sky-400/25 bg-sky-400/10 text-sky-200";
}

function DriverAvatar({
  username,
  hasImage,
  foundingDriver,
  size = 72,
}: {
  username: string;
  hasImage: boolean;
  foundingDriver: boolean;
  size?: number;
}) {
  const imageSource = hasImage
    ? `/founding-drivers/profile-image?username=${encodeURIComponent(username)}`
    : "/freightiq-sunrise-icon-v1.png";

  return (
    <div
      className={`shrink-0 rounded-full p-[3px] ${
        foundingDriver ? "bg-gradient-to-br from-amber-300 via-orange-500 to-orange-800" : "bg-white/15"
      }`}
    >
      <Image
        src={imageSource}
        alt={hasImage ? `${username}'s Founding Driver profile` : "FreightIQ Sunrise logo"}
        width={size}
        height={size}
        sizes={`${size}px`}
        unoptimized={hasImage}
        className="aspect-square rounded-full bg-[#0b0f12] object-cover"
      />
    </div>
  );
}

function ProgressBar({ value, target }: { value: number; target: number }) {
  const percent = target > 0 ? Math.min(100, Math.round((value / target) * 100)) : 0;
  return (
    <div
      className="mt-3 h-2 overflow-hidden rounded-full bg-white/8"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={target}
      aria-valuenow={Math.min(value, target)}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-orange-700 via-orange-500 to-amber-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

function ProgressCard({
  label,
  value,
  target,
  detail,
}: {
  label: string;
  value: number;
  target: number;
  detail: string;
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">
        {value} <span className="text-lg text-stone-500">/ {target}</span>
      </p>
      <ProgressBar value={value} target={target} />
      <p className="mt-3 text-xs leading-5 text-stone-500">{detail}</p>
    </article>
  );
}

function nextMilestone(progress: DriverProgress) {
  if (progress.next_milestone === "maximum_reward") {
    return "You reached the maximum reward. Your Founding Driver impact keeps growing.";
  }
  if (progress.next_milestone === "bonus_reward") {
    return `${progress.bonus_stops_remaining} more qualifying ${
      progress.bonus_stops_remaining === 1 ? "stop" : "stops"
    } unlocks the full $40 reward.`;
  }

  const needs: string[] = [];
  if (progress.active_days_remaining > 0) {
    needs.push(
      `${progress.active_days_remaining} active ${
        progress.active_days_remaining === 1 ? "day" : "days"
      }`,
    );
  }
  if (progress.base_stops_remaining > 0) {
    needs.push(
      `${progress.base_stops_remaining} qualifying ${
        progress.base_stops_remaining === 1 ? "stop" : "stops"
      }`,
    );
  }
  return needs.length ? `${needs.join(" and ")} to reach the $25 qualification reward.` : "Ready for qualification review.";
}

function ContributionRow({
  contribution,
  stop,
}: {
  contribution: DriverContribution;
  stop?: StopSummary;
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-black/15 p-4 sm:p-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <h3 className="font-semibold text-white">{stop?.name ?? "FreightIQ stop"}</h3>
          <p className="mt-1 text-xs text-stone-500">Submitted {formatDate(contribution.submitted_at, true)}</p>
        </div>
        <span className={`w-fit rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClass(contribution.review_status)}`}>
          {reviewLabels[contribution.review_status] ?? contribution.review_status}
        </span>
      </div>
      {contribution.review_note ? (
        <div className="mt-4 rounded-xl border border-amber-400/15 bg-amber-400/[0.06] px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-amber-300">Robby’s note</p>
          <p className="mt-1 text-sm leading-6 text-stone-300">{contribution.review_note}</p>
        </div>
      ) : null}
      {contribution.review_status === "needs_clarification" ? (
        <p className="mt-3 text-xs leading-5 text-stone-500">
          Open this stop in the FreightIQ app, correct the Intel, and save it. It will return for review automatically.
        </p>
      ) : null}
    </article>
  );
}

function LeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
  return (
    <li className="grid grid-cols-[2rem_1fr_auto] items-center gap-3 rounded-2xl border border-white/8 bg-black/15 px-4 py-3">
      <span className="text-center text-sm font-bold text-amber-300">{entry.leaderboard_rank}</span>
      <div className="flex min-w-0 items-center gap-3">
        <DriverAvatar
          username={entry.username}
          hasImage={entry.has_profile_image}
          foundingDriver={entry.founding_driver}
          size={42}
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{entry.username}</p>
          <p className="text-xs text-stone-500">
            {entry.active_days} active {entry.active_days === 1 ? "day" : "days"}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold text-white">{entry.qualifying_stops}</p>
        <p className="text-[0.65rem] uppercase tracking-[0.1em] text-stone-500">Stops</p>
      </div>
    </li>
  );
}

export default async function FoundingDriversPage() {
  const driver = await getFoundingDriverContext();
  if (!driver) redirect("/founding-drivers/sign-in");

  const data = await loadFoundingDriverDashboard();
  const stopById = new Map(data.stops.map((stop) => [stop.id, stop]));
  const unresolvedReviews = data.contributions.filter((item) =>
    ["pending", "needs_clarification"].includes(item.review_status),
  ).length;

  return (
    <main className="min-h-screen bg-[#090c0f] text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0b0f12]">
        <div className="sunrise-grid absolute inset-0 opacity-25" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <DriverAvatar
                username={data.profile.username}
                hasImage={Boolean(data.profile.profile_image_path)}
                foundingDriver={data.progress.permanent_founding_driver}
                size={72}
              />
              <div>
                <p className="eyebrow">Founding Drivers</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                  Welcome, {data.profile.username}
                </h1>
              </div>
            </div>
            <form action={signOut}>
              <button className="min-h-11 rounded-full border border-white/15 px-5 text-sm font-semibold text-stone-300 hover:border-white/30 hover:text-white">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-8">
        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#111518]">
          <div className="grid gap-6 border-b border-white/10 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow">Your 30-day program</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em]">{programDay(data.progress)}</h2>
              <p className="mt-3 text-sm leading-6 text-stone-400">
                Program window: {formatDate(data.progress.start_date)} – {formatDate(data.progress.end_date)}
              </p>
            </div>
            <div className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.07] px-5 py-4 lg:text-right">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-300">Reward earned</p>
              <p className="mt-1 text-3xl font-semibold text-amber-100">{money(data.progress.earned_reward_cents)}</p>
              <p className="mt-1 text-xs capitalize text-stone-500">Payment {data.progress.payment_status.replaceAll("_", " ")}</p>
            </div>
          </div>

          <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-3">
            <ProgressCard
              label="Active days"
              value={data.progress.active_days}
              target={data.progress.active_days_target}
              detail="Viewing Intel, starting navigation, or contributing Intel counts."
            />
            <ProgressCard
              label="Qualifying stops"
              value={data.progress.qualifying_stops}
              target={data.progress.base_stop_target}
              detail="Stops count after Robby’s quick review."
            />
            <ProgressCard
              label="Bonus progress"
              value={data.progress.qualifying_stops}
              target={data.progress.bonus_stop_target}
              detail="20 qualifying stops unlocks the full $40 reward."
            />
          </div>

          <div className="mx-6 mb-6 rounded-2xl border border-white/10 bg-black/20 p-5 sm:mx-8 sm:mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Next milestone</p>
            <p className="mt-2 text-base leading-7 text-stone-200">{nextMilestone(data.progress)}</p>
            {data.progress.permanent_founding_driver ? (
              <span className="mt-4 inline-flex rounded-full bg-gradient-to-r from-orange-700 to-amber-400 px-3 py-1.5 text-xs font-bold text-[#160b05]">
                Permanent Founding Driver
              </span>
            ) : null}
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <section aria-labelledby="reviews-heading">
            <p className="eyebrow">Your Intel</p>
            <div className="mt-2 flex items-end justify-between gap-4">
              <h2 id="reviews-heading" className="text-2xl font-semibold tracking-[-0.03em]">Contribution reviews</h2>
              <p className="text-xs text-stone-500">{unresolvedReviews} open</p>
            </div>
            <div className="mt-5 grid gap-3">
              {data.contributions.length ? (
                data.contributions.map((contribution) => (
                  <ContributionRow
                    key={contribution.id}
                    contribution={contribution}
                    stop={stopById.get(contribution.stop_id)}
                  />
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.025] px-5 py-10 text-center">
                  <p className="font-semibold text-stone-300">No qualifying-stop submissions yet.</p>
                  <p className="mt-2 text-sm leading-6 text-stone-500">
                    Complete the four Core Intel fields in FreightIQ and your stop will appear here for review.
                  </p>
                </div>
              )}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-white/10 bg-[#111518] p-5 sm:p-6" aria-labelledby="leaderboard-heading">
            <p className="eyebrow">Building together</p>
            <h2 id="leaderboard-heading" className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Friendly leaderboard</h2>
            <p className="mt-2 text-sm leading-6 text-stone-400">
              Recognition for useful contributions—not a performance scorecard.
            </p>
            <ol className="mt-5 grid gap-2">
              {data.leaderboard.map((entry) => (
                <LeaderboardRow key={`${entry.leaderboard_rank}-${entry.username}`} entry={entry} />
              ))}
            </ol>
          </section>
        </div>

        <section className="rounded-[1.75rem] border border-white/10 bg-[#111518] p-5 sm:p-6" aria-labelledby="identity-heading">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="flex items-center gap-4">
              <DriverAvatar
                username={data.profile.username}
                hasImage={Boolean(data.profile.profile_image_path)}
                foundingDriver={data.progress.permanent_founding_driver}
                size={80}
              />
              <div>
                <p className="eyebrow">Founder identity</p>
                <h2 id="identity-heading" className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Your profile image</h2>
              </div>
            </div>
            <div>
              <p className="text-sm leading-6 text-stone-400">
                Add a photo of yourself or your truck for recognition inside the private Founding Drivers group. The FreightIQ logo remains your default.
              </p>
              <ProfileImageForm
                userId={driver.userId}
                hasProfileImage={Boolean(data.profile.profile_image_path)}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
