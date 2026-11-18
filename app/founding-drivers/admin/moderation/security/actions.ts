"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireModerationAdmin } from "@/lib/moderation/auth";

const path = "/founding-drivers/admin/moderation/security";
export async function actOnSecurityCase(form: FormData) {
  const { supabase } = await requireModerationAdmin();
  const id = String(form.get("case_id") ?? "");
  const versionText = String(form.get("version") ?? "");
  const secondsText = String(form.get("seconds") ?? "");
  const reason = String(form.get("reason") ?? "");
  if (!/^[0-9a-f-]{36}$/.test(id) || !/^\d{1,9}$/.test(versionText) ||
      !["0", "900", "3600", "86400"].includes(secondsText) ||
      !["suspicious_collection", "review_complete", "mistake"].includes(reason)) {
    redirect(`${path}?result=invalid`);
  }
  let code: string | undefined;
  try {
    const { error } = await supabase.rpc("act_security_read_case_v1", {
      p_case: id, p_version: Number(versionText), p_seconds: Number(secondsText), p_reason: reason,
    });
    code = error?.code;
    if (error && !code) code = "unknown";
  } catch { code = "unavailable"; }
  revalidatePath(path);
  redirect(`${path}?case=${encodeURIComponent(id)}&result=${code ? (code === "PT409" ? "stale" : "failed") : "saved"}`);
}
