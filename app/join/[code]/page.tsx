import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type PageProps = { params: Promise<{ code: string }> };

export const metadata: Metadata = {
  title: "Join FreightIQ",
  description: "Join FreightIQ through a driver referral.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ReferralJoinPage({ params }: PageProps) {
  const { code: rawCode } = await params;
  const code = rawCode.trim().toUpperCase();
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("resolve_referral_code", { p_code: code }).maybeSingle();

  if (error || !data) notFound();
  const referral = data as { referrer_username: string };

  const appUrl = `mfi://create-account?referral_code=${encodeURIComponent(code)}`;

  return (
    <main className="relative flex flex-1 items-center overflow-hidden bg-[#090c0f] px-5 py-16 text-white">
      <div className="sunrise-grid absolute inset-0 opacity-20" aria-hidden="true" />
      <div className="absolute left-1/2 top-[-18rem] h-[38rem] w-[48rem] -translate-x-1/2 rounded-full bg-orange-500/15 blur-3xl" aria-hidden="true" />
      <section className="relative mx-auto w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[#0e1316]/95 p-7 shadow-2xl sm:p-12">
        <p className="eyebrow">Driver referral</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">{referral.referrer_username} invited you to FreightIQ.</h1>
        <p className="mt-6 text-lg leading-8 text-stone-300">Create a new FreightIQ account with this referral. Complete 5 active days and 5 qualifying stops within 30 days, and you each earn $5.</p>

        <div className="mt-8 rounded-2xl border border-amber-300/25 bg-amber-300/[0.07] p-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-400">Your referral code</p>
          <p className="mt-2 font-mono text-4xl font-semibold tracking-[0.18em] text-amber-200">{code}</p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <a href={appUrl} className="sunrise-button inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-[#120b06]">Open FreightIQ</a>
          <Link href="/early-access" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:border-amber-300/60">Get FreightIQ</Link>
        </div>
        <p className="mt-6 text-sm leading-6 text-stone-500">If FreightIQ is not installed yet, keep this code. Enter it in the optional Referral Code field when you create your account.</p>
      </section>
    </main>
  );
}
