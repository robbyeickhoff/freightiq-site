import type { SupabaseClient } from "@supabase/supabase-js";

import type { StopSummary } from "./types";
import { executeGuardedRead } from "./read-protocol";

const STOP_SUMMARY_BATCH_SIZE = 100;

export async function loadStopSummaries(
  supabase: SupabaseClient,
  stopIds: string[],
): Promise<StopSummary[]> {
  const uniqueStopIds = [...new Set(stopIds)];
  const batches: string[][] = [];
  for (let index = 0; index < uniqueStopIds.length; index += STOP_SUMMARY_BATCH_SIZE) {
    batches.push(uniqueStopIds.slice(index, index + STOP_SUMMARY_BATCH_SIZE));
  }

  const results: StopSummary[] = [];
  for (const batch of batches) {
    const data = await executeGuardedRead<StopSummary[]>(supabase, "stop_summaries", {
      p_stop_ids: batch,
    });
    results.push(...data);
  }
  return results;
}
