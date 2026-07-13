import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">FreightIQ</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
              FreightIQ helps drivers capture, share, and retain real-world delivery intel. The goal
              is simple: make deliveries easier today while preserving the knowledge that would
              otherwise disappear when routes change.
            </p>
          </div>
          <div className="md:text-right">
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-400 md:justify-end">
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/delete-account" className="hover:text-white">
                Delete Account
              </Link>
              <Link href="/contact" className="hover:text-white">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
