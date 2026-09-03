export const rewardMethods = {
  venmo: { label: "Venmo", field: "Venmo username", instruction: "Enter your Venmo username, including @.", placeholder: "@your-username", type: "text" },
  paypal: { label: "PayPal", field: "PayPal email", instruction: "Enter the email address associated with your PayPal account.", placeholder: "you@example.com", type: "email" },
  cash_app: { label: "Cash App", field: "Cash App $Cashtag", instruction: "Enter your $Cashtag, including $.", placeholder: "$YourCashtag", type: "text" },
  amazon_gift_card: { label: "Amazon Gift Card", field: "Gift card email", instruction: "Enter the email address where you’d like to receive your gift card.", placeholder: "you@example.com", type: "email" },
} as const;

export type RewardMethod = keyof typeof rewardMethods;
export function isRewardMethod(method: string): method is RewardMethod {
  return Object.hasOwn(rewardMethods, method);
}

export function rewardPreferenceError(method: string, details: string): string | null {
  if (!isRewardMethod(method)) return "Choose a reward payment method.";
  if (!details || details.length > 200) return "Enter your delivery details (200 characters or fewer).";
  if (method === "venmo" && !/^@[A-Za-z0-9_-]+$/.test(details)) return "Enter your Venmo username, starting with @, without spaces.";
  if (method === "cash_app" && !/^\$[A-Za-z0-9]+$/.test(details)) return "Enter your Cash App $Cashtag, starting with $, without spaces.";
  if ((method === "paypal" || method === "amazon_gift_card") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details)) return "Enter a valid email address.";
  return null;
}
