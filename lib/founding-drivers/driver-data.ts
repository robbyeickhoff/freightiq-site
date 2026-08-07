import { requireFoundingDriver } from "./auth";
import type {
  DriverContribution,
  DriverProfile,
  DriverProgress,
  LeaderboardEntry,
  StopSummary,
} from "./types";

function assertQuerySucceeded(error: { message: string } | null, label: string) {
  if (error) {
    throw new Error(`Unable to load ${label}: ${error.message}`);
  }
}

type RawLeaderboardEntry = Omit<LeaderboardEntry, "has_profile_image">;

export async function loadFoundingDriverDashboard() {
  const { supabase, userId } = await requireFoundingDriver();

  const [profileResult, progressResult, contributionsResult, leaderboardResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, username, created_at, profile_image_path")
      .eq("id", userId)
      .maybeSingle(),
    supabase
      .from("founding_driver_progress")
      .select(
        "enrollment_id, user_id, status, start_date, end_date, time_zone, active_days, active_days_target, active_days_remaining, qualifying_stops, base_stop_target, base_stops_remaining, bonus_stop_target, bonus_stops_remaining, base_reward_eligible, bonus_reward_eligible, earned_reward_cents, next_milestone, qualified_at, permanent_founding_driver, payment_status, paid_at",
      )
      .eq("user_id", userId)
      .maybeSingle(),
    supabase
      .from("founding_driver_stop_contributions")
      .select("id, stop_id, review_status, review_note, submitted_at, reviewed_at")
      .eq("user_id", userId)
      .order("submitted_at", { ascending: false }),
    supabase.rpc("get_founding_driver_leaderboard"),
  ]);

  assertQuerySucceeded(profileResult.error, "your FreightIQ profile");
  assertQuerySucceeded(progressResult.error, "your Founding Driver progress");
  assertQuerySucceeded(contributionsResult.error, "your contribution reviews");
  assertQuerySucceeded(leaderboardResult.error, "the Founding Driver leaderboard");

  if (!profileResult.data || !progressResult.data) {
    throw new Error("Your Founding Driver enrollment is missing required profile or progress data.");
  }

  const contributions = (contributionsResult.data ?? []) as DriverContribution[];
  const leaderboard = (leaderboardResult.data ?? []) as RawLeaderboardEntry[];
  const stopIds = [...new Set(contributions.map((item) => item.stop_id))];
  const leaderboardUsernames = [...new Set(leaderboard.map((item) => item.username))];

  const [stopsResult, leaderboardProfilesResult] = await Promise.all([
    stopIds.length
      ? supabase.from("mfi_stops").select("id, name, address").in("id", stopIds)
      : Promise.resolve({ data: [] as StopSummary[], error: null }),
    leaderboardUsernames.length
      ? supabase
          .from("profiles")
          .select("username, profile_image_path")
          .in("username", leaderboardUsernames)
      : Promise.resolve({ data: [] as { username: string; profile_image_path: string | null }[], error: null }),
  ]);

  assertQuerySucceeded(stopsResult.error, "your contribution stops");
  assertQuerySucceeded(leaderboardProfilesResult.error, "Founding Driver profile images");

  const usernamesWithImages = new Set(
    (leaderboardProfilesResult.data ?? [])
      .filter((profile) => Boolean(profile.profile_image_path))
      .map((profile) => profile.username),
  );

  return {
    profile: profileResult.data as DriverProfile,
    progress: progressResult.data as DriverProgress,
    contributions,
    stops: (stopsResult.data ?? []) as StopSummary[],
    leaderboard: leaderboard.map((entry) => ({
      ...entry,
      has_profile_image: usernamesWithImages.has(entry.username),
    })) as LeaderboardEntry[],
  };
}
