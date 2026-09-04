"use client";

import { useEffect, useState } from "react";

export function StatusMessage({ kind, message }: { kind: "notice" | "error"; message: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete("notice");
    url.searchParams.delete("error");
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
    const timer = window.setTimeout(() => setVisible(false), 5000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;
  const isError = kind === "error";
  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-sm ${
        isError
          ? "border-rose-400/25 bg-rose-400/10 text-rose-100"
          : "border-emerald-400/25 bg-emerald-400/10 text-emerald-100"
      }`}
      role={isError ? "alert" : "status"}
    >
      <span>{message}</span>
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="shrink-0 text-lg leading-none"
        aria-label="Dismiss message"
      >
        ×
      </button>
    </div>
  );
}
