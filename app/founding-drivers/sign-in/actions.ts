"use server";

import { redirect } from "next/navigation";
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
  const { data: isAdmin, error: adminError } = await supabase.rpc(
    "is_founding_driver_admin",
  );

  if (claimsError || typeof claimsData?.claims?.sub !== "string" || adminError || !isAdmin) {
    await supabase.auth.signOut();
    return {
      message: "This FreightIQ account does not have Founding Driver admin access.",
    };
  }

  redirect("/founding-drivers/admin");
}
