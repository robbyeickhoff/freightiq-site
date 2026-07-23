import Image from "next/image";
import Link from "next/link";

const productLinks = [
  { href: "/demo", label: "How It Works" },
  { href: "/real-example", label: "Real Example" },
  { href: "/#about", label: "About" },
  { href: "/early-access", label: "Request Early Access" },
];

const supportLinks = [
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/delete-account", label: "Delete Account" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#07090b] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-18">
        <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.4fr_0.7fr_0.7fr]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
              aria-label="FreightIQ home"
            >
              <Image
                src="/freightiq-sunrise-icon.png"
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 rounded-xl"
              />
              <span className="text-2xl font-semibold tracking-[-0.045em]">FreightIQ</span>
            </Link>
            <p className="mt-5 max-w-md text-base leading-7 text-stone-300">
              Real driver intel for better deliveries.
            </p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-amber-400">
              Confidence Delivered.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
              Product
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-stone-300">
              {productLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-md transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
              Support
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-stone-300">
              {supportLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-md transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} FreightIQ. All rights reserved.</p>
          <p>Built around the realities of local delivery.</p>
        </div>
      </div>
    </footer>
  );
}
