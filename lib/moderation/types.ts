export type ModerationOutcome =
  | "dismissed"
  | "content_corrected"
  | "content_removed"
  | "contributor_warned"
  | "contributor_restricted";

export type ModerationQueueItem = {
  id: string;
  subject_type: "report" | "stop";
  report_id: string | null;
  stop_id: string | null;
  reporter_user_id: string;
  reporter_username: string | null;
  subject_owner_user_id: string | null;
  contributor_username: string | null;
  reason: string;
  details: string | null;
  status: "open" | "reviewing" | "resolved";
  created_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
  review_notes: string | null;
  outcome: ModerationOutcome | null;
  subject: Record<string, unknown> | null;
  prior_subject_report_count: number;
  prior_contributor_report_count: number;
};
