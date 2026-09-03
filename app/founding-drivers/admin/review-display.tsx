const statusLabels: Record<string, string> = {
  pending: "Pending",
  active: "Active",
  qualified: "Qualified",
  completed: "Completed",
  withdrawn: "Withdrawn",
  counts: "Counts",
  needs_clarification: "Needs clarification",
  does_not_count: "Does not count",
  not_earned: "Not earned",
  earned: "Earned",
  paid: "Paid",
  venmo: "Venmo",
  paypal: "PayPal",
  cash_app: "Cash App",
  amazon_gift_card: "Amazon gift card",
  other: "Other",
};

export function formatDate(value: string | null, includeTime = false) {
  if (!value) return "—";
  const date = includeTime ? new Date(value) : new Date(`${value}T12:00:00Z`);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...(includeTime
      ? { hour: "numeric", minute: "2-digit", timeZone: "America/Denver" }
      : { timeZone: "UTC" }),
  }).format(date);
}

function statusClass(status: string) {
  if (["active", "counts", "earned", "paid", "qualified"].includes(status)) {
    return "border-emerald-400/25 bg-emerald-400/10 text-emerald-200";
  }
  if (["pending", "needs_clarification"].includes(status)) {
    return "border-amber-400/25 bg-amber-400/10 text-amber-200";
  }
  return "border-white/10 bg-white/5 text-stone-300";
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClass(status)}`}
    >
      {statusLabels[status] ?? status}
    </span>
  );
}

