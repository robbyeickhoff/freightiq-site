"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireFoundingDriverAdmin } from "@/lib/founding-drivers/auth";

const PATH = "/founding-drivers/admin/referrals";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function finish(message: string, error = false): never {
  revalidatePath(PATH);
  redirect(`${PATH}?${error ? "error" : "notice"}=${encodeURIComponent(message)}`);
}

export async function reviewReferralContribution(formData: FormData) {
  const { supabase } = await requireFoundingDriverAdmin();
  const id = text(formData, "contribution_id");
  const status = text(formData, "review_status");
  const note = text(formData, "review_note");
  if (!UUID.test(id) || !["pending","counts","needs_clarification","does_not_count"].includes(status) || note.length > 500) finish("Choose a valid review decision.", true);
  const { error } = await supabase.from("referral_stop_contributions").update({ review_status: status, review_note: note || null }).eq("id", id);
  if (error) finish("The referral contribution could not be reviewed.", true);
  finish("Referral contribution review saved.");
}

export async function qualifyReferral(formData: FormData) {
  const { supabase } = await requireFoundingDriverAdmin();
  const id = text(formData, "referral_id");
  if (!UUID.test(id)) finish("Choose a valid referral.", true);
  const { error } = await supabase.rpc("qualify_referral", { p_referral_id: id });
  if (error) finish("The referral is not ready to qualify.", true);
  finish("Referral qualified. Both $5 rewards are ready.");
}

export async function markRewardPaid(formData: FormData) {
  const { supabase } = await requireFoundingDriverAdmin();
  const id = text(formData, "reward_id");
  if (!UUID.test(id)) finish("Choose a valid reward.", true);
  const { error } = await supabase.rpc("mark_referral_reward_paid", { p_reward_id: id });
  if (error) finish("The reward could not be marked paid.", true);
  finish("Referral reward marked paid.");
}
