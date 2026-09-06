import Image from "next/image";
import Link from "next/link";

const productLinks = [
  { href: "/demos", label: "Demo Videos" },
  { href: "/demo", label: "How It Works" },
  { href: "/real-example", label: "Real Example" },
  { href: "/founding-drivers-program", label: "Founding Drivers" },
  { href: "/why", label: "Why FreightIQ" },
  { href: "/#about", label: "About" },
  { href: "/early-access", label: "Request Early Access" },
];

const supportLinks = [
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/community-guidelines", label: "Community Guidelines" },
  { href: "/delete-account", label: "Delete Account" },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/profile.php?id=61593729710264",
    label: "FreightIQ on Facebook",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
        <path d="M13.5 21v-8h2.75l.41-3H13.5V8.09c0-.87.24-1.46 1.58-1.46h1.69V3.95a22.6 22.6 0 0 0-2.46-.13c-2.43 0-4.1 1.49-4.1 4.22V10H7.46v3h2.75v8h3.29Z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/freightiqapp/",
    label: "FreightIQ on Instagram",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.4" cy="6.6" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    href: "https://x.com/FreightIQapp",
    label: "FreightIQ on X",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
        <path d="M18.9 3H22l-6.77 7.74L23.2 21h-6.24l-4.89-6.39L6.48 21H3.36l7.26-8.3L3 3h6.4l4.42 5.84L18.9 3Zm-1.1 16h1.72L8.47 4.9H6.63L17.8 19Z" />
      </svg>
    ),
  },
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
            <div className="mt-6 flex items-center gap-3" aria-label="FreightIQ social media">
              {socialLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-stone-300 transition-colors hover:border-amber-400/60 hover:bg-amber-400/10 hover:text-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">
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
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">
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

        <div className="flex flex-col gap-3 pt-7 text-xs text-stone-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} FreightIQ. All rights reserved.</p>
          <p>Built around the realities of local delivery.</p>
        </div>
      </div>
    </footer>
  );
}
