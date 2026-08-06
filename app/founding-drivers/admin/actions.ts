"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireFoundingDriverAdmin } from "@/lib/founding-drivers/auth";
import type {
  EnrollmentStatus,
  PaymentPreference,
  PaymentStatus,
  ReviewStatus,
} from "@/lib/founding-drivers/types";

const ADMIN_PATH = "/founding-drivers/admin";
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const enrollmentStatuses: EnrollmentStatus[] = [
  "pending",
  "active",
  "qualified",
  "completed",
  "withdrawn",
];
const reviewStatuses: ReviewStatus[] = [
  "pending",
  "counts",
  "needs_clarification",
  "does_not_count",
];
const paymentPreferences: PaymentPreference[] = ["venmo", "amazon_gift_card", "other"];
const paymentStatuses: PaymentStatus[] = ["not_earned", "earned", "paid"];

function value(formData: FormData, name: string) {
  const entry = formData.get(name);
  return typeof entry === "string" ? entry.trim() : "";
}

function validUuid(candidate: string) {
  return UUID_PATTERN.test(candidate);
}

function parseDate(candidate: string) {
  if (!DATE_PATTERN.test(candidate)) return null;
  const date = new Date(`${candidate}T00:00:00Z`);
  return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== candidate
    ? null
    : date;
}

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result.toISOString().slice(0, 10);
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

function finish(message: string, kind: "notice" | "error" = "notice"): never {
  revalidatePath(ADMIN_PATH);
  redirect(`${ADMIN_PATH}?${kind}=${encodeURIComponent(message)}`);
}

export async function signOut() {
  const { supabase } = await requireFoundingDriverAdmin();
  await supabase.auth.signOut();
  redirect("/founding-drivers/sign-in");
}

export async function enrollDriver(formData: FormData) {
  const { supabase } = await requireFoundingDriverAdmin();
  const userId = value(formData, "user_id");
  const startDateValue = value(formData, "start_date");
  const confirmed = value(formData, "confirm_onboarding") === "yes";
  const startDate = parseDate(startDateValue);

  if (!validUuid(userId) || !startDate || !confirmed) {
    finish("Choose a driver and a valid program start date.", "error");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, username")
    .eq("id", userId)
    .maybeSingle();

  if (profileError || !profile) {
    finish("That FreightIQ profile could not be found.", "error");
  }

  const { error } = await supabase.from("founding_driver_enrollments").insert({
    user_id: userId,
    status: "active",
    start_date: startDateValue,
    end_date: addDays(startDate, 29),
    time_zone: "America/Denver",
    updated_at: new Date().toISOString(),
  });

  if (error) {
    finish("The driver could not be enrolled. Confirm the account is not already enrolled.", "error");
  }

  finish(`${profile.username} is enrolled and the 30-day clock is active.`);
}

export async function reviewContribution(formData: FormData) {
  const { supabase } = await requireFoundingDriverAdmin();
  const contributionId = value(formData, "contribution_id");
  const reviewStatus = value(formData, "review_status") as ReviewStatus;
  const reviewNote = value(formData, "review_note");

  if (!validUuid(contributionId) || !reviewStatuses.includes(reviewStatus)) {
    finish("Choose a valid review decision.", "error");
  }
  if (reviewNote.length > 500) {
    finish("Review notes must be 500 characters or fewer.", "error");
  }

  const { data, error } = await supabase
    .from("founding_driver_stop_contributions")
    .update({ review_status: reviewStatus, review_note: reviewNote || null })
    .eq("id", contributionId)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    finish("That contribution could not be updated.", "error");
  }

  finish("Contribution review saved.");
}

export async function extendProgram(formData: FormData) {
  const { supabase } = await requireFoundingDriverAdmin();
  const enrollmentId = value(formData, "enrollment_id");
  const endDateValue = value(formData, "end_date");
  const endDate = parseDate(endDateValue);

  if (!validUuid(enrollmentId) || !endDate) {
    finish("Enter a valid extended end date.", "error");
  }

  const { data: enrollment, error: loadError } = await supabase
    .from("founding_driver_enrollments")
    .select("start_date")
    .eq("id", enrollmentId)
    .maybeSingle();

  if (loadError || !enrollment?.start_date || endDateValue < enrollment.start_date) {
    finish("The new end date cannot be before the program start date.", "error");
  }

  const { data, error } = await supabase
    .from("founding_driver_enrollments")
    .update({ end_date: endDateValue, updated_at: new Date().toISOString() })
    .eq("id", enrollmentId)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    finish("The program dates could not be updated.", "error");
  }

  finish("Program end date updated.");
}

export async function updateProgramStatus(formData: FormData) {
  const { supabase } = await requireFoundingDriverAdmin();
  const enrollmentId = value(formData, "enrollment_id");
  const status = value(formData, "status") as EnrollmentStatus;

  if (!validUuid(enrollmentId) || !enrollmentStatuses.includes(status)) {
    finish("Choose a valid program status.", "error");
  }

  const { data: enrollment, error: loadError } = await supabase
    .from("founding_driver_enrollments")
    .select("permanent_founding_driver")
    .eq("id", enrollmentId)
    .maybeSingle();

  if (loadError || !enrollment) {
    finish("That enrollment could not be found.", "error");
  }
  if (status === "qualified" && !enrollment.permanent_founding_driver) {
    finish("Confirm qualification before changing the program status to Qualified.", "error");
  }

  const { data, error } = await supabase
    .from("founding_driver_enrollments")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", enrollmentId)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    finish("The program status could not be updated.", "error");
  }

  finish("Program status updated.");
}

export async function confirmQualification(formData: FormData) {
  const { supabase } = await requireFoundingDriverAdmin();
  const enrollmentId = value(formData, "enrollment_id");

  if (!validUuid(enrollmentId)) {
    finish("That enrollment is not valid.", "error");
  }

  const [{ data: progress, error: progressError }, { data: enrollment, error: enrollmentError }] =
    await Promise.all([
      supabase
        .from("founding_driver_progress")
        .select("base_reward_eligible")
        .eq("enrollment_id", enrollmentId)
        .maybeSingle(),
      supabase
        .from("founding_driver_enrollments")
        .select("status, payment_status")
        .eq("id", enrollmentId)
        .maybeSingle(),
    ]);

  if (progressError || enrollmentError || !progress || !enrollment) {
    finish("Qualification progress could not be verified.", "error");
  }
  if (!progress.base_reward_eligible) {
    finish("This driver has not yet reached both qualification thresholds.", "error");
  }
  if (enrollment.status === "pending" || enrollment.status === "withdrawn") {
    finish("Only an active or completed participant can be qualified.", "error");
  }

  const { data, error } = await supabase
    .from("founding_driver_enrollments")
    .update({
      qualified_at: new Date().toISOString(),
      permanent_founding_driver: true,
      payment_status: enrollment.payment_status === "not_earned" ? "earned" : enrollment.payment_status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", enrollmentId)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    finish("Qualification could not be confirmed.", "error");
  }

  finish("Qualification confirmed. Activity remains open while the program status is Active.");
}

export async function updateReward(formData: FormData) {
  const { supabase } = await requireFoundingDriverAdmin();
  const enrollmentId = value(formData, "enrollment_id");
  const preferenceValue = value(formData, "payment_preference");
  const preference = preferenceValue ? (preferenceValue as PaymentPreference) : null;
  const preferenceNote = value(formData, "payment_preference_note");
  const paymentStatus = value(formData, "payment_status") as PaymentStatus;

  if (
    !validUuid(enrollmentId) ||
    (preference !== null && !paymentPreferences.includes(preference)) ||
    !paymentStatuses.includes(paymentStatus)
  ) {
    finish("Choose valid reward details.", "error");
  }
  if (preferenceNote.length > 200) {
    finish("Payment notes must be 200 characters or fewer.", "error");
  }

  const [{ data: progress, error: progressError }, { data: enrollment, error: enrollmentError }] =
    await Promise.all([
      supabase
        .from("founding_driver_progress")
        .select("earned_reward_cents")
        .eq("enrollment_id", enrollmentId)
        .maybeSingle(),
      supabase
        .from("founding_driver_enrollments")
        .select("status, end_date, permanent_founding_driver")
        .eq("id", enrollmentId)
        .maybeSingle(),
    ]);

  if (progressError || enrollmentError || !progress || !enrollment) {
    finish("Reward eligibility could not be verified.", "error");
  }
  if (paymentStatus !== "not_earned" && progress.earned_reward_cents <= 0) {
    finish("A reward cannot be recorded before the driver is eligible.", "error");
  }
  if (paymentStatus === "paid" && (!preference || !enrollment.permanent_founding_driver)) {
    finish("Confirm qualification and choose a payment method before recording payment.", "error");
  }
  if (
    paymentStatus === "paid" &&
    enrollment.status === "active" &&
    enrollment.end_date &&
    denverToday() <= enrollment.end_date
  ) {
    finish("Close the active program window before recording final reward delivery.", "error");
  }

  const { data, error } = await supabase
    .from("founding_driver_enrollments")
    .update({
      payment_preference: preference,
      payment_preference_note: preferenceNote || null,
      payment_status: paymentStatus,
      paid_at: paymentStatus === "paid" ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", enrollmentId)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    finish("Reward details could not be updated.", "error");
  }

  finish("Reward details updated.");
}
