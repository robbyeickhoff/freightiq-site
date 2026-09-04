"use client";

import { useActionState } from "react";
import { saveEmailPreference } from "./actions";

export default function EmailNotificationForm({ enabled }: { enabled: boolean }) {
  const [state, action, pending] = useActionState(saveEmailPreference, { ok: true, message: "" });
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-[#111518] p-5 sm:p-6" aria-labelledby="email-notifications-heading">
      <p className="eyebrow">Optional updates</p>
      <h2 id="email-notifications-heading" className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Email notifications</h2>
      <p className="mt-2 text-sm leading-6 text-stone-400">Use your FreightIQ account email to receive one grouped update when Robby reviews your contributions.</p>
      <form action={action} className="mt-5 grid gap-4">
        <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-stone-200">
          <input type="checkbox" name="enabled" value="yes" defaultChecked={enabled} className="mt-1 h-5 w-5 shrink-0 accent-amber-500" />
          Email me when contribution reviews are ready. This is off by default and you can change it anytime.
        </label>
        <button disabled={pending} className="min-h-11 w-fit rounded-full border border-amber-400/35 bg-amber-400/10 px-5 text-sm font-semibold text-amber-200 disabled:opacity-50">{pending ? "Saving…" : "Save email setting"}</button>
        {state.message ? <p role={state.ok ? "status" : "alert"} className={`text-sm ${state.ok ? "text-emerald-300" : "text-rose-300"}`}>{state.message}</p> : null}
      </form>
    </section>
  );
}
