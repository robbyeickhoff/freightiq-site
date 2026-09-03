import { requireFoundingDriverAdmin } from "./auth";
import type {
  Contribution,
  Enrollment,
  Profile,
  Progress,
  StopSummary,
} from "./types";

function assertQuerySucceeded(error: { message: string } | null, label: string) {
  if (error) {
    throw new Error(`Unable to load ${label}: ${error.message}`);
  }
}

export async function loadFoundingDriverAdminDashboard() {
  const { supabase } = await requireFoundingDriverAdmin();

  const [profilesResult, enrollmentsResult, progressResult, contributionsResult] =
    await Promise.all([
      supabase.from("profiles").select("id, username, created_at").order("username"),
      supabase
        .from("founding_driver_enrollments")
        .select(
          "id, user_id, status, start_date, end_date, time_zone, qualified_at, permanent_founding_driver, payment_preference, payment_preference_note, payment_status, paid_at, created_at, updated_at",
        )
        .order("created_at", { ascending: false }),
      supabase
        .from("founding_driver_progress")
        .select(
          "enrollment_id, user_id, active_days, active_days_target, qualifying_stops, base_stop_target, bonus_stop_target, base_reward_eligible, bonus_reward_eligible, earned_reward_cents, next_milestone",
        ),
      supabase
        .from("founding_driver_stop_contributions")
        .select(
          "id, enrollment_id, user_id, stop_id, contribution_type, completed_fields, core_snapshot, review_status, review_note, submitted_at, reviewed_at",
        )
        .in("review_status", ["pending", "needs_clarification"])
        .order("submitted_at", { ascending: true }),
    ]);

  assertQuerySucceeded(profilesResult.error, "driver profiles");
  assertQuerySucceeded(enrollmentsResult.error, "program enrollments");
  assertQuerySucceeded(progressResult.error, "program progress");
  assertQuerySucceeded(contributionsResult.error, "contribution reviews");

  const profiles = (profilesResult.data ?? []) as Profile[];
  const enrollments = (enrollmentsResult.data ?? []) as Enrollment[];
  const progress = (progressResult.data ?? []) as Progress[];
  const contributions = (contributionsResult.data ?? []) as Contribution[];
  const stopIds = [...new Set(contributions.map((item) => item.stop_id))];

  let stops: StopSummary[] = [];
  if (stopIds.length > 0) {
    const stopsResult = await supabase
      .from("mfi_stops")
      .select("id, name, address")
      .in("id", stopIds);
    assertQuerySucceeded(stopsResult.error, "contribution stops");
    stops = (stopsResult.data ?? []) as StopSummary[];
  }

  const enrolledUserIds = new Set(enrollments.map((item) => item.user_id));

  return {
    profiles,
    enrollments,
    progress,
    contributions,
    stops,
    availableProfiles: profiles.filter((profile) => !enrolledUserIds.has(profile.id)),
  };
}

export const REVIEW_HISTORY_PAGE_SIZE = 10;

export function parseHistoryPage(value: string | string[] | undefined): number {
  if (typeof value !== "string" || !/^[1-9]\d*$/.test(value)) return 1;
  const page = Number(value);
  return Number.isSafeInteger(page) ? page : 1;
}

export async function loadFoundingDriverReviewHistory(requestedPage: number) {
  const { supabase } = await requireFoundingDriverAdmin();
  const statuses = ["counts", "does_not_count"];
  const countResult = await supabase
    .from("founding_driver_stop_contributions")
    .select("id", { count: "exact", head: true })
    .in("review_status", statuses);
  assertQuerySucceeded(countResult.error, "review history count");
  const total = countResult.count ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / REVIEW_HISTORY_PAGE_SIZE));
  const page = Math.min(Math.max(1, requestedPage), pageCount);
  const offset = (page - 1) * REVIEW_HISTORY_PAGE_SIZE;
  const result = await supabase
    .from("founding_driver_stop_contributions")
    .select("id, enrollment_id, user_id, stop_id, contribution_type, completed_fields, core_snapshot, review_status, review_note, submitted_at, reviewed_at")
    .in("review_status", statuses)
    .order("reviewed_at", { ascending: false, nullsFirst: false })
    .order("submitted_at", { ascending: false })
    .order("id", { ascending: false })
    .range(offset, offset + REVIEW_HISTORY_PAGE_SIZE - 1);
  assertQuerySucceeded(result.error, "review history");
  const contributions = (result.data ?? []) as Contribution[];
  let profiles: Profile[] = [];
  let stops: StopSummary[] = [];
  if (contributions.length) {
    const [profilesResult, stopsResult] = await Promise.all([
      supabase.from("profiles").select("id, username, created_at")
        .in("id", [...new Set(contributions.map((item) => item.user_id))]),
      supabase.from("mfi_stops").select("id, name, address")
        .in("id", [...new Set(contributions.map((item) => item.stop_id))]),
    ]);
    assertQuerySucceeded(profilesResult.error, "review history profiles");
    assertQuerySucceeded(stopsResult.error, "review history stops");
    profiles = (profilesResult.data ?? []) as Profile[];
    stops = (stopsResult.data ?? []) as StopSummary[];
  }
  return { contributions, profiles, stops, page, pageCount, total };
}
