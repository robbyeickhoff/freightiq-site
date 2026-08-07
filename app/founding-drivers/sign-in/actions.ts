"use server";

import { redirect } from "next/navigation";
import {
  foundingDriverAccessStatuses,
  type FoundingDriverAccessStatus,
} from "@/lib/founding-drivers/auth";
import { createClient } from "@/lib/supabase/server";

export type SignInState = { message: string };

export async function signIn(
  _previousState: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const emailValue = formData.get("email");
  const passwordValue = formData.get("password");
  const email = typeof emailValue === "string" ? emailValue.trim() : "";
  const password = typeof passwordValue === "string" ? passwordValue : "";

  if (!email || email.length > 254 || !password || password.length > 1024) {
    return { message: "Enter your FreightIQ email and password." };
  }

  const supabase = await createClient();
  const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

  if (signInError) {
    return { message: "The email or password was not accepted." };
  }

  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;

  if (claimsError || typeof userId !== "string") {
    await supabase.auth.signOut();
    return { message: "The email or password was not accepted." };
  }

  const [{ data: isAdmin, error: adminError }, { data: enrollment, error: enrollmentError }] =
    await Promise.all([
      supabase.rpc("is_founding_driver_admin"),
      supabase
        .from("founding_driver_enrollments")
        .select("status")
        .eq("user_id", userId)
        .maybeSingle(),
    ]);

  if (adminError || enrollmentError) {
    await supabase.auth.signOut();
    return { message: "Founding Driver access could not be verified. Please try again." };
  }

  if (isAdmin) {
    redirect("/founding-drivers/admin");
  }

  if (
    enrollment &&
    foundingDriverAccessStatuses.includes(enrollment.status as FoundingDriverAccessStatus)
  ) {
    redirect("/founding-drivers");
  }

  await supabase.auth.signOut();
  return {
    message: "This FreightIQ account is not enrolled in the Founding Drivers Program.",
  };
}
