"use client";

import { useActionState, useState } from "react";
import type { PaymentPreference } from "@/lib/founding-drivers/types";
import { isRewardMethod, rewardMethods } from "@/lib/founding-drivers/reward-preferences";
import { saveRewardPreference } from "./actions";

export default function RewardPreferenceForm({ method, details }: {
  method: PaymentPreference | null;
  details: string | null;
}) {
  const [selected, setSelected] = useState(method && isRewardMethod(method) ? method : "");
  const [deliveryDetails, setDeliveryDetails] = useState(details ?? "");
  const [result, action, pending] = useActionState(saveRewardPreference, { ok: false, message: "" });
  const choice = isRewardMethod(selected) ? rewardMethods[selected] : null;
  return (
    <section aria-labelledby="reward-preference-heading" className="rounded-[2rem] border border-white/10 bg-[#111518] p-6 sm:p-8">
      <h2 id="reward-preference-heading" className="text-2xl font-semibold">Reward preference</h2>
      <p className="mt-2 text-sm text-stone-400">Choose how you’d like to receive your reward. This is optional, and you can update it anytime. Robby can see your saved preference.</p>
      {method === "other" ? <p className="mt-3 text-sm text-amber-200">Your previously arranged method is still saved. Choose one of the options below if you’d like to replace it.</p> : null}
      <form action={action} className="mt-5 grid max-w-xl gap-4">
        <fieldset disabled={pending} className="grid gap-4 disabled:opacity-60">
          <label className="grid gap-2 text-sm font-semibold text-stone-300">
            Payment method
            <select name="payment_preference" required value={selected} onChange={(event) => { setSelected(event.target.value); setDeliveryDetails(""); }} className="min-h-11 rounded-xl border border-white/15 bg-[#0e1215] px-3 text-base text-white">
              <option value="" disabled>Choose a method</option>
              {Object.entries(rewardMethods).map(([value, option]) => <option key={value} value={value}>{option.label}</option>)}
            </select>
          </label>
          {choice ? (
            <label className="grid gap-2 text-sm font-semibold text-stone-300">
              {choice.field}
              <span id="reward-details-help" className="font-normal text-stone-400">{choice.instruction}</span>
              <input name="payment_preference_note" type={choice.type} required maxLength={200} value={deliveryDetails} onChange={(event) => setDeliveryDetails(event.target.value)} placeholder={choice.placeholder} aria-describedby="reward-details-help" autoCapitalize="none" autoCorrect="off" spellCheck={false} className="min-h-11 w-full min-w-0 rounded-xl border border-white/15 bg-[#0e1215] px-3 text-base text-white" />
            </label>
          ) : null}
        </fieldset>
        {result.message ? <p role={result.ok ? "status" : "alert"} className={result.ok ? "text-sm text-emerald-200" : "text-sm text-red-200"}>{result.message}</p> : null}
        <button disabled={pending || !choice} className="sunrise-button min-h-11 justify-self-start rounded-full px-5 text-sm font-semibold text-[#120b06] disabled:opacity-50">{pending ? "Saving…" : "Save preference"}</button>
      </form>
    </section>
  );
}
