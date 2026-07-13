import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-6 py-4">
        <Link href="/" className="shrink-0 text-lg font-bold transition-colors hover:text-slate-600">
          FreightIQ
        </Link>

        <nav aria-label="Primary navigation" className="flex flex-wrap items-center gap-3 text-xs font-semibold sm:gap-6 sm:text-sm">
          <Link href="/demo" className="transition-colors hover:text-slate-500">
            How It Works
          </Link>
          <Link href="/real-example" className="transition-colors hover:text-slate-500">
            Real Example
          </Link>
          <Link href="/early-access" className="transition-colors hover:text-slate-500">
            Early Access
          </Link>
          <Link href="/contact" className="transition-colors hover:text-slate-500">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
