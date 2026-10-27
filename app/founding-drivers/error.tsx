"use client";

// Server errors are deliberately not displayed: they can contain internal details.
// Retry is always a user action, never a loop after a shared-read refusal.
export default function FoundingDriverLoadError({ retry }: { retry: () => void }) {
  return (
    <section className="mx-auto max-w-xl space-y-4 px-6 py-12" role="alert">
      <h1 className="text-2xl font-semibold">Could not refresh this page</h1>
      <p>Stop information may be temporarily unavailable. Please wait a moment, then try again.</p>
      <button className="min-h-11 rounded-full border px-5" onClick={retry}>
        Try again
      </button>
    </section>
  );
}
