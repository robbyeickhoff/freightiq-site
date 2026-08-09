import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const foundingDriverAccessStatuses = ["active", "qualified", "completed"] as const;

export type FoundingDriverAccessStatus = (typeof foundingDriverAccessStatuses)[number];

export const getFoundingDriverLandingContext = cache(async () => {
  const supabase = await createClient();
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;

  if (claimsError || typeof userId !== "string") {
    return null;
  }

  const [
    { data: isAdmin, error: adminError },
    { data: isModerator, error: moderatorError },
    { data: enrollment, error: enrollmentError },
  ] = await Promise.all([
    supabase.rpc("is_founding_driver_admin"),
    supabase.rpc("is_moderation_admin"),
    supabase
      .from("founding_driver_enrollments")
      .select("status")
      .eq("user_id", userId)
      .maybeSingle(),
  ]);

  if (adminError || moderatorError || enrollmentError) {
    return null;
  }
  if (isAdmin === true) {
    return { destination: "/founding-drivers/admin" as const };
  }
  if (isModerator === true) {
    return { destination: "/founding-drivers/admin/moderation" as const };
  }
  if (
    enrollment &&
    foundingDriverAccessStatuses.includes(enrollment.status as FoundingDriverAccessStatus)
  ) {
    return { destination: "/founding-drivers" as const };
  }

  return null;
});

export const getFoundingDriverContext = cache(async () => {
  const supabase = await createClient();
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;

  if (claimsError || typeof userId !== "string") {
    return null;
  }

  const { data: enrollment, error: enrollmentError } = await supabase
    .from("founding_driver_enrollments")
    .select("id, status")
    .eq("user_id", userId)
    .maybeSingle();

  if (
    enrollmentError ||
    !enrollment ||
    !foundingDriverAccessStatuses.includes(enrollment.status as FoundingDriverAccessStatus)
  ) {
    return null;
  }

  return {
    supabase,
    userId,
    enrollmentId: enrollment.id as string,
    status: enrollment.status as FoundingDriverAccessStatus,
  };
});

export async function requireFoundingDriver() {
  const context = await getFoundingDriverContext();

  if (!context) {
    throw new Error("Founding Driver access required.");
  }

  return context;
}

export const getFoundingDriverAdminContext = cache(async () => {
  const supabase = await createClient();
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;

  if (claimsError || typeof userId !== "string") {
    return null;
  }

  const { data: isAdmin, error: adminError } = await supabase.rpc("is_founding_driver_admin");

  if (adminError || isAdmin !== true) {
    return null;
  }

  return { supabase, userId };
});

export async function requireFoundingDriverAdmin() {
  const context = await getFoundingDriverAdminContext();

  if (!context) {
    throw new Error("Founding Driver admin access required.");
  }

  return context;
}
