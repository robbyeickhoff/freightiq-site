import { requireModerationAdmin } from "./auth";
import type { ModerationQueueItem } from "./types";

export async function loadModerationQueue() {
  const { supabase } = await requireModerationAdmin();
  const { data, error } = await supabase.rpc("get_moderation_queue");

  if (error) throw new Error(`Unable to load moderation queue: ${error.message}`);
  return (Array.isArray(data) ? data : []) as ModerationQueueItem[];
}
