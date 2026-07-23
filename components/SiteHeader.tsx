"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navigation = [
  { href: "/demo", label: "How It Works" },
  { href: "/real-example", label: "Real Example" },
  { href: "/#about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="relative z-50 border-b border-white/10 bg-[#080b0d] text-white">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href="/"
          onClick={closeMenu}
          className="group inline-flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
          aria-label="FreightIQ home"
        >
          <Image
            src="/freightiq-sunrise-icon.png"
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 rounded-xl"
            priority
          />
          <span className="text-xl font-semibold tracking-[-0.04em] text-white transition-colors group-hover:text-amber-100">
            FreightIQ
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <nav aria-label="Primary navigation">
            <ul className="flex items-center gap-7 text-sm font-medium text-stone-300">
              {navigation.map((item) => (
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
          </nav>

          <Link
            href="/early-access"
            className="sunrise-button rounded-full px-5 py-3 text-sm font-semibold text-[#120b06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
          >
            Request Early Access
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-amber-400/50 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400 lg:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="relative block h-5 w-5">
            <span
              className={`absolute left-0 top-1 block h-0.5 w-5 rounded-full bg-current transition-transform ${
                isMenuOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-2.5 block h-0.5 w-5 rounded-full bg-current transition-opacity ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-4 block h-0.5 w-5 rounded-full bg-current transition-transform ${
                isMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`border-t border-white/10 bg-[#0b0f12] lg:hidden ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <nav aria-label="Mobile navigation" className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
          <ul className="grid gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="flex min-h-12 items-center rounded-xl px-4 text-base font-medium text-stone-200 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/early-access"
            onClick={closeMenu}
            className="sunrise-button mt-4 flex min-h-12 items-center justify-center rounded-full px-5 text-base font-semibold text-[#120b06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
          >
            Request Early Access
          </Link>
        </nav>
      </div>
    </header>
  );
}
