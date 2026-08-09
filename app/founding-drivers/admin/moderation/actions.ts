"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireModerationAdmin } from "@/lib/moderation/auth";
import type { ModerationOutcome } from "@/lib/moderation/types";

const MODERATION_PATH = "/founding-drivers/admin/moderation";
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const outcomes: ModerationOutcome[] = [
  "dismissed",
  "content_corrected",
  "content_removed",
  "contributor_warned",
  "contributor_restricted",
];

function value(formData: FormData, name: string) {
  const entry = formData.get(name);
  return typeof entry === "string" ? entry.trim() : "";
}

function finish(message: string, kind: "notice" | "error" = "notice"): never {
  revalidatePath(MODERATION_PATH);
  redirect(`${MODERATION_PATH}?${kind}=${encodeURIComponent(message)}`);
}

export async function resolveReport(formData: FormData) {
  const { supabase } = await requireModerationAdmin();
  const reportId = value(formData, "content_report_id");
  const outcome = value(formData, "outcome") as ModerationOutcome;
  const reviewNotes = value(formData, "review_notes");

  if (!UUID_PATTERN.test(reportId) || !outcomes.includes(outcome)) {
    finish("Choose a valid moderation outcome.", "error");
  }
  if (reviewNotes.length > 2000) {
    finish("Review notes must be 2,000 characters or fewer.", "error");
  }

  const { error } = await supabase.rpc("resolve_content_report", {
    p_content_report_id: reportId,
    p_outcome: outcome,
    p_review_notes: reviewNotes || null,
  });

  if (error) finish("The moderation decision could not be saved.", "error");
  finish("Moderation decision saved.");
}
