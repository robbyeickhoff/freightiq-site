export default function DeleteAccountPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-4xl font-bold">Delete Your FreightIQ Account</h1>

        <p className="text-slate-300">FreightIQ users can request account deletion at any time.</p>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">How to Request Deletion</h2>

          <p className="text-slate-300">
            Send an email to hello@freightiqapp.com from the email address associated with your
            FreightIQ account.
          </p>

          <p className="text-slate-300">
            Include the subject line:
            <strong> Delete My FreightIQ Account</strong>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">What Will Be Deleted</h2>

          <p className="text-slate-300">
            We will delete your account information and associated profile data from FreightIQ
            systems.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Processing Time</h2>

          <p className="text-slate-300">
            Account deletion requests are typically processed within 30 days.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Contact</h2>

          <p className="text-slate-300">hello@freightiqapp.com</p>
        </section>

        <p className="pt-6 text-sm text-slate-500">Last updated: May 2026</p>
      </div>
    </main>
  );
}
