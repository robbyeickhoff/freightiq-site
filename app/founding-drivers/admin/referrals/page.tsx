import Link from "next/link";
import { redirect } from "next/navigation";
import { getFoundingDriverAdminContext } from "@/lib/founding-drivers/auth";
import { markRewardPaid, qualifyReferral, reviewReferralContribution } from "./actions";

export const dynamic = "force-dynamic";

type Progress = { referral_id:string;referrer_username:string;referred_username:string|null;status:string;start_date:string|null;end_date:string|null;active_days:number;qualifying_stops:number;qualification_ready:boolean };
type Contribution = { id:string;referral_id:string;stop_id:string;review_status:string;review_note:string|null;submitted_at:string };
type Reward = { id:string;referral_id:string;reward_role:string;payment_status:string;amount_cents:number };

export default async function ReferralAdminPage({ searchParams }:{ searchParams:Promise<{notice?:string;error?:string}> }) {
  const admin = await getFoundingDriverAdminContext();
  if (!admin) redirect("/founding-drivers/sign-in");
  const [{notice,error}, progressResult, contributionsResult, rewardsResult] = await Promise.all([
    searchParams,
    admin.supabase.rpc("get_referral_progress"),
    admin.supabase.from("referral_stop_contributions").select("id,referral_id,stop_id,review_status,review_note,submitted_at").order("submitted_at"),
    admin.supabase.from("referral_rewards").select("id,referral_id,reward_role,payment_status,amount_cents"),
  ]);
  const progress=(progressResult.data??[]) as Progress[];
  const contributions=(contributionsResult.data??[]) as Contribution[];
  const rewards=(rewardsResult.data??[]) as Reward[];

  return <main className="min-h-screen bg-[#090c0f] px-5 py-10 text-white sm:px-8">
    <div className="mx-auto max-w-6xl">
      <Link href="/founding-drivers/admin" className="text-sm font-semibold text-amber-200">← Founding Driver Admin</Link>
      <p className="eyebrow mt-8">Private program operations</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Referral Program</h1>
      <p className="mt-4 text-stone-400">Review 5–5 progress, qualify referrals, and record each $5 payment.</p>
      {notice ? <p className="mt-6 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-4 text-sm">{notice}</p>:null}
      {error ? <p className="mt-6 rounded-2xl border border-rose-400/25 bg-rose-400/10 p-4 text-sm">{error}</p>:null}

      <div className="mt-8 grid gap-5">
        {progress.length ? progress.map((item)=>{
          const itemContributions=contributions.filter((c)=>c.referral_id===item.referral_id);
          const itemRewards=rewards.filter((r)=>r.referral_id===item.referral_id);
          return <article key={item.referral_id} className="rounded-[1.75rem] border border-white/10 bg-[#14191d] p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><h2 className="text-xl font-semibold">{item.referrer_username} → {item.referred_username??"New driver"}</h2><p className="mt-1 text-sm text-stone-500">{item.start_date??"Waiting for verification"} – {item.end_date??"—"}</p></div>
              <span className="rounded-full border border-amber-300/25 px-3 py-1 text-xs font-semibold text-amber-200">{item.status}</span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-black/20 p-4"><p className="text-xs uppercase text-stone-500">Active days</p><p className="mt-2 text-2xl font-semibold">{item.active_days} / 5</p></div><div className="rounded-2xl bg-black/20 p-4"><p className="text-xs uppercase text-stone-500">Qualifying stops</p><p className="mt-2 text-2xl font-semibold">{item.qualifying_stops} / 5</p></div></div>
            {itemContributions.map((c)=><form key={c.id} action={reviewReferralContribution} className="mt-4 grid gap-3 rounded-2xl border border-white/10 p-4 sm:grid-cols-[1fr_12rem_1fr_auto] sm:items-end"><input type="hidden" name="contribution_id" value={c.id}/><p className="text-sm text-stone-300">Stop {c.stop_id}</p><select name="review_status" defaultValue={c.review_status} className="min-h-11 rounded-xl bg-[#0e1215] px-3"><option value="pending">Pending</option><option value="counts">Counts</option><option value="needs_clarification">Needs clarification</option><option value="does_not_count">Does not count</option></select><input name="review_note" defaultValue={c.review_note??""} placeholder="Optional note" className="min-h-11 rounded-xl bg-[#0e1215] px-3"/><button className="min-h-11 rounded-full border border-white/20 px-4">Save</button></form>)}
            {item.status==="active" ? <form action={qualifyReferral} className="mt-5"><input type="hidden" name="referral_id" value={item.referral_id}/><button disabled={!item.qualification_ready} className="sunrise-button min-h-11 rounded-full px-5 font-semibold text-[#120b06] disabled:opacity-40">Confirm qualification</button></form>:null}
            {itemRewards.length ? <div className="mt-5 grid gap-3 sm:grid-cols-2">{itemRewards.map((reward)=><div key={reward.id} className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-4"><p className="font-semibold capitalize">{reward.reward_role} · $5</p><p className="mt-1 text-sm text-stone-400">{reward.payment_status}</p>{reward.payment_status==="earned"?<form action={markRewardPaid} className="mt-3"><input type="hidden" name="reward_id" value={reward.id}/><button className="rounded-full border border-emerald-300/30 px-4 py-2 text-sm">Mark paid</button></form>:null}</div>)}</div>:null}
          </article>;
        }):<p className="rounded-2xl border border-white/10 p-6 text-stone-400">No referrals yet.</p>}
      </div>
    </div>
  </main>;
}
