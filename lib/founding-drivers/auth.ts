import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const getFoundingDriverAdminContext = cache(async () => {
  const supabase = await createClient();
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;

  if (claimsError || typeof userId !== "string") {
    return null;
  }

  const { data: isAdmin, error: adminError } = await supabase.rpc(
    "is_founding_driver_admin",
  );

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
