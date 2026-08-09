import { cache } from "react";

import { createClient } from "@/lib/supabase/server";

export const getModerationAdminContext = cache(async () => {
  const supabase = await createClient();
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;

  if (claimsError || typeof userId !== "string") return null;

  const { data: isAdmin, error } = await supabase.rpc("is_moderation_admin");
  if (error || isAdmin !== true) return null;

  return { supabase, userId };
});

export async function requireModerationAdmin() {
  const context = await getModerationAdminContext();
  if (!context) throw new Error("Moderation access required.");
  return context;
}
