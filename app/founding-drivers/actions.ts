"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireFoundingDriver } from "@/lib/founding-drivers/auth";
import { createClient } from "@/lib/supabase/server";

export type ProfileImageActionResult = {
  ok: boolean;
  message: string;
};

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/founding-drivers/sign-in");
}

export async function confirmProfileImageUpload(): Promise<ProfileImageActionResult> {
  const { supabase, userId } = await requireFoundingDriver();
  const profileImagePath = `${userId}/profile`;

  const { data, error } = await supabase
    .from("profiles")
    .update({ profile_image_path: profileImagePath })
    .eq("id", userId)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    return { ok: false, message: "Your photo uploaded, but it could not be added to your profile." };
  }

  revalidatePath("/founding-drivers");
  return { ok: true, message: "Profile photo saved." };
}

export async function removeProfileImage(): Promise<ProfileImageActionResult> {
  const { supabase, userId } = await requireFoundingDriver();
  const profileImagePath = `${userId}/profile`;

  const { data, error } = await supabase
    .from("profiles")
    .update({ profile_image_path: null })
    .eq("id", userId)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    return { ok: false, message: "Your profile photo could not be removed." };
  }

  const { error: storageError } = await supabase.storage
    .from("profile-images")
    .remove([profileImagePath]);

  revalidatePath("/founding-drivers");

  if (storageError) {
    return {
      ok: true,
      message: "Photo removed from your profile. The private stored copy will be cleared later.",
    };
  }

  return { ok: true, message: "Profile photo removed." };
}
