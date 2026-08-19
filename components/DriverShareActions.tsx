"use client";

import { useState } from "react";

const driverUrl = "https://freightiqapp.com/driver";
const textMessage =
  "I’m helping test a driver-built app called FreightIQ. It helps drivers see delivery locations, truck fit, backing requirements, and real stop information before arriving. Take a quick look: https://freightiqapp.com/driver";

export function DriverShareActions() {
  const [shareStatus, setShareStatus] = useState<
    "idle" | "copied" | "manual"
  >("idle");

  async function copyDriverLink() {
    try {
      await navigator.clipboard.writeText(driverUrl);
      setShareStatus("copied");
      window.setTimeout(() => setShareStatus("idle"), 2400);
    } catch {
      setShareStatus("manual");
    }
  }

  async function shareFreightIQ() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "FreightIQ — Know Before You Arrive",
          text: "See how FreightIQ helps drivers understand commercial delivery stops before arriving.",
          url: driverUrl,
        });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    await copyDriverLink();
  }

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <a
          href={`sms:?&body=${encodeURIComponent(textMessage)}`}
          className="sunrise-button inline-flex min-h-13 items-center justify-center rounded-full px-6 py-3.5 text-center text-base font-semibold text-[#120b06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
        >
          Text This to a Driver
        </a>
        <button
          type="button"
          onClick={shareFreightIQ}
          className="inline-flex min-h-13 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] px-6 py-3.5 text-base font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400"
        >
          {shareStatus === "copied" ? "Link Copied" : "Share FreightIQ"}
        </button>
      </div>

      {shareStatus === "manual" ? (
        <div
          role="status"
          className="rounded-2xl border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-left text-sm text-amber-50"
        >
          <p className="font-semibold">Sharing is unavailable in this browser.</p>
          <p className="mt-1 text-amber-100/80">
            Press and hold this link to copy it:
          </p>
          <a
            href={driverUrl}
            className="mt-2 block break-all font-semibold text-white underline decoration-amber-400 underline-offset-4"
          >
            {driverUrl}
          </a>
        </div>
      ) : null}
    </div>
  );
}
