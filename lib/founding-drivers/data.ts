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
