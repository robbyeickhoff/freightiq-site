export type EnrollmentStatus =
  | "pending"
  | "active"
  | "qualified"
  | "completed"
  | "withdrawn";

export type ReviewStatus =
  | "pending"
  | "counts"
  | "needs_clarification"
  | "does_not_count";

export type PaymentPreference = "venmo" | "amazon_gift_card" | "other";
export type PaymentStatus = "not_earned" | "earned" | "paid";

export type Profile = {
  id: string;
  username: string;
  created_at: string;
};

export type Enrollment = {
  id: string;
  user_id: string;
  status: EnrollmentStatus;
  start_date: string | null;
  end_date: string | null;
  time_zone: string;
  qualified_at: string | null;
  permanent_founding_driver: boolean;
  payment_preference: PaymentPreference | null;
  payment_preference_note: string | null;
  payment_status: PaymentStatus;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Progress = {
  enrollment_id: string;
  user_id: string;
  active_days: number;
  active_days_target: number;
  qualifying_stops: number;
  base_stop_target: number;
  bonus_stop_target: number;
  base_reward_eligible: boolean;
  bonus_reward_eligible: boolean;
  earned_reward_cents: number;
  next_milestone: string;
};

export type Contribution = {
  id: string;
  enrollment_id: string;
  user_id: string;
  stop_id: string;
  contribution_type: "new_stop" | "completed_existing_stop";
  completed_fields: string[];
  core_snapshot: Record<string, unknown>;
  review_status: ReviewStatus;
  review_note: string | null;
  submitted_at: string;
  reviewed_at: string | null;
};

export type StopSummary = {
  id: string;
  name: string;
  address: string | null;
};
