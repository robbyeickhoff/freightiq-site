import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getFoundingDriverLandingContext } from "@/lib/founding-drivers/auth";
import SignInForm from "./SignInForm";

export const metadata: Metadata = {
  title: "Founding Drivers Sign In",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function FoundingDriverAdminSignInPage() {
  const access = await getFoundingDriverLandingContext();
  if (access) redirect(access.destination);

  return (
    <main className="relative flex min-h-[72vh] items-center overflow-hidden bg-[#090c0f] px-5 py-16 text-white sm:px-8">
      <div className="sunrise-grid absolute inset-0 opacity-25" aria-hidden="true" />
      <section className="relative mx-auto w-full max-w-md rounded-[2rem] border border-white/10 bg-[#111518]/95 p-7 shadow-[0_30px_100px_rgba(0,0,0,0.38)] sm:p-9">
        <p className="eyebrow">Members only</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">
          Founding Drivers
        </h1>
        <p className="mt-4 text-sm leading-7 text-stone-400">
          Use the same email address and password you use to sign in to the FreightIQ app. Access is
          limited to approved Founding Drivers.
        </p>
        <SignInForm />
        <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-6 text-stone-500">
          Need to change your password? Use Account Recovery in the FreightIQ mobile app, then
          return here with the new password.
        </p>
      </section>
    </main>
  );
}
