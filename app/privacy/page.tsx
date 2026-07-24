import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how FreightIQ collects, uses, shares, retains, and protects information through the FreightIQ application and website.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | FreightIQ",
    description:
      "Learn how FreightIQ collects, uses, shares, retains, and protects information through the FreightIQ application and website.",
    url: "/privacy",
    images: [
      {
        url: "/freightiq-delivery-hero.png",
        alt: "A FreightIQ delivery truck approaching a receiving facility at sunrise",
      },
    ],
  },
};

const sectionLinks = [
  { href: "#information-we-collect", label: "Information we collect" },
  { href: "#how-we-use-information", label: "How we use information" },
  { href: "#shared-stop-intelligence", label: "Shared stop intelligence" },
  { href: "#when-information-is-shared", label: "When information is shared" },
  { href: "#service-providers", label: "Service providers" },
  { href: "#retention-and-deletion", label: "Retention and deletion" },
  { href: "#security", label: "Security" },
  { href: "#your-choices", label: "Your choices" },
  { href: "#childrens-privacy", label: "Children’s privacy" },
  { href: "#changes-to-this-policy", label: "Policy changes" },
  { href: "#contact-freightiq", label: "Contact FreightIQ" },
];

const useCases = [
  "Create, authenticate, and maintain accounts",
  "Provide and update driver profiles",
  "Display maps and return place-search results",
  "Store, organize, and display stop intelligence",
  "Associate contributions and votes with the appropriate accounts",
  "Process Early Access requests",
  "Respond to support questions and feedback",
  "Maintain, troubleshoot, and secure the service",
  "Investigate misuse and protect FreightIQ and its users",
  "Comply with applicable legal obligations",
];

const sharingCases = [
  "With other FreightIQ users when information is submitted as shared stop intelligence",
  "With service providers that help operate the application and website",
  "At your direction or with your consent",
  "When reasonably necessary to comply with law, respond to lawful requests, protect users, investigate misuse, or secure the service",
];

const serviceProviders = [
  {
    name: "Supabase",
    purpose: "authentication, database services, file storage, and server functions",
  },
  { name: "Mapbox", purpose: "place search and proximity results" },
  { name: "Apple Maps or Google Maps", purpose: "map display and interactions" },
  { name: "Resend", purpose: "Contact and Early Access notification emails" },
  { name: "Vercel", purpose: "public website hosting" },
];

const userChoices = [
  "Update your username and tractor type through your FreightIQ profile",
  "Disable foreground location through your device settings",
  "Clear locally cached stop information through the app",
];

function PolicySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-stone-300/80 pt-9 first:border-t-0 first:pt-0">
      <h2 className="text-2xl font-semibold tracking-[-0.035em] text-stone-950 sm:text-3xl">
        {title}
      </h2>
      <div className="mt-5 space-y-5 text-[0.975rem] leading-7 text-stone-700">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="relative flex-1 overflow-hidden bg-[#0a0d0f] text-white">
      <div className="absolute inset-0 sunrise-grid opacity-25" aria-hidden="true" />
      <div
        className="absolute left-[-12rem] top-[-14rem] h-[42rem] w-[42rem] rounded-full bg-orange-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute right-[-12rem] top-[24rem] h-[38rem] w-[38rem] rounded-full bg-amber-400/8 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative">
        <section className="mx-auto max-w-7xl px-5 pb-10 pt-14 sm:px-8 sm:pb-12 sm:pt-18 lg:pb-14 lg:pt-24">
          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)] lg:gap-16">
            <div className="max-w-4xl">
              <p className="eyebrow">Privacy Policy</p>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.04] tracking-[-0.05em] text-balance sm:text-5xl lg:text-6xl">
                FreightIQ{" "}
                <span className="sunrise-text block">Privacy Policy</span>
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-stone-300">
                This Privacy Policy explains how FreightIQ (“FreightIQ,” “we,” “us,” or “our”)
                handles information through the FreightIQ application and website.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
                Policy dates
              </p>
              <dl className="mt-5 grid grid-cols-2 gap-5">
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-stone-500">Effective</dt>
                  <dd className="mt-1.5 text-sm font-semibold text-stone-100">July 2026</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-stone-500">
                    Last updated
                  </dt>
                  <dd className="mt-1.5 text-sm font-semibold text-stone-100">July 2026</dd>
                </div>
              </dl>
            </div>
          </div>

          <section className="mt-12" aria-labelledby="privacy-at-a-glance">
            <div className="flex items-center gap-4">
              <h2
                id="privacy-at-a-glance"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300"
              >
                Privacy at a glance
              </h2>
              <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <article className="rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-5">
                <p className="text-sm font-semibold text-white">Information that powers the service</p>
                <p className="mt-2 text-sm leading-6 text-stone-400">
                  FreightIQ collects information needed to operate accounts, driver profiles, shared
                  stop intelligence, map features, Early Access requests, and support communications.
                </p>
              </article>
              <article className="rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-5">
                <p className="text-sm font-semibold text-white">Foreground location, not a history</p>
                <p className="mt-2 text-sm leading-6 text-stone-400">
                  FreightIQ uses foreground location to center the map and provide nearby search
                  results. FreightIQ does not intentionally maintain continuous device-location
                  history.
                </p>
              </article>
              <article className="rounded-[1.35rem] border border-orange-400/20 bg-orange-400/[0.07] p-5">
                <p className="text-sm font-semibold text-amber-100">Shared intel, not sold data</p>
                <p className="mt-2 text-sm leading-6 text-stone-300">
                  Stop intelligence is designed to be shared with other FreightIQ users. FreightIQ
                  does not sell personal information, share it with data brokers, or use it for
                  third-party behavioral advertising.
                </p>
              </article>
            </div>
          </section>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20 lg:pb-24">
          <div className="grid items-start gap-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-8">
            <aside className="rounded-[1.4rem] border border-white/10 bg-[#121618]/95 p-5 lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                On this page
              </p>
              <nav className="mt-4" aria-label="Privacy Policy sections">
                <ul className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
                  {sectionLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="block rounded-lg px-3 py-2 text-sm leading-5 text-stone-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <article className="rounded-[1.7rem] border border-stone-300/80 bg-[#f1eee8] px-6 py-8 text-[#171513] shadow-[0_30px_90px_rgba(0,0,0,0.3)] sm:px-9 sm:py-10 lg:px-12 lg:py-12">
              <div className="space-y-10">
                <PolicySection id="information-we-collect" title="Information we collect">
                  <div>
                    <h3 className="text-lg font-semibold text-stone-950">Account information</h3>
                    <p className="mt-2">
                      When you create or access a FreightIQ account, we process your email address,
                      authentication identifiers, account ID, and session information.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-stone-950">
                      Driver profile and contributions
                    </h3>
                    <p className="mt-2">
                      FreightIQ may collect your username, tractor type, contribution-related
                      profile information, and information you submit about delivery stops.
                    </p>
                    <p className="mt-3">
                      Stop intelligence may include business names and addresses, stop and
                      delivery-zone coordinates, delivery type, truck fit, backing requirements,
                      approach guidance, operational notes, business contact details, votes,
                      timestamps, and contributor identifiers.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-stone-950">
                      Location and map information
                    </h3>
                    <p className="mt-2">
                      FreightIQ may request foreground location access to center the map and show
                      your position while you use the app.
                    </p>
                    <p className="mt-3">
                      When you use map search, your search text and the current map-center
                      coordinates—which may reflect your location—are sent to Mapbox to provide
                      nearby results. Apple or Google may also process map interactions through
                      their mapping services.
                    </p>
                    <p className="mt-3">
                      FreightIQ does not intentionally maintain continuous device-location history.
                      Stop and delivery-zone coordinates that you deliberately create or update are
                      stored as shared stop intelligence.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-stone-950">Legacy stop photos</h3>
                    <p className="mt-2">
                      FreightIQ may retain and display a limited number of stop photos submitted
                      through an earlier product workflow. New photo uploads are not part of the
                      current FreightIQ app workflow, and the current app does not request camera or
                      photo-library access for new uploads.
                    </p>
                    <p className="mt-3">
                      Legacy photos may remain visible as part of shared stop intelligence until
                      they are deleted through the applicable stop-management or account-deletion
                      process.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-stone-950">
                      Website forms and communications
                    </h3>
                    <p className="mt-2">
                      When you request Early Access, FreightIQ may collect your name, email address,
                      mobile platform, city and state, driver type, and optional notes.
                    </p>
                    <p className="mt-3">
                      When you use the Contact form, FreightIQ processes your name, email address,
                      selected topic, and message. We also receive information you choose to send
                      directly by email.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-stone-950">
                      Information stored on your device
                    </h3>
                    <p className="mt-2">
                      FreightIQ stores certain information locally on your device, including
                      authentication state, onboarding status, profile-setup status, and cached stop
                      information. The app provides controls for clearing locally cached stops.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-stone-950">
                      Technical information
                    </h3>
                    <p className="mt-2">
                      FreightIQ’s infrastructure and service providers may automatically process
                      standard technical information needed to operate and protect their services,
                      such as IP addresses, device or browser information, request timestamps, and
                      diagnostic logs.
                    </p>
                  </div>
                </PolicySection>

                <PolicySection id="how-we-use-information" title="How we use information">
                  <p>FreightIQ uses information to:</p>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {useCases.map((useCase) => (
                      <li key={useCase} className="flex gap-3">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-700"
                          aria-hidden="true"
                        />
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </PolicySection>

                <PolicySection id="shared-stop-intelligence" title="Shared stop intelligence">
                  <p>
                    Stop intelligence is designed to help other drivers understand delivery
                    locations. Information submitted as stop intelligence may be visible to other
                    FreightIQ users.
                  </p>
                  <p>
                    A contributor’s username and relevant equipment context may appear with their
                    contributions. Account email addresses are not displayed as part of shared stop
                    intelligence.
                  </p>
                  <div className="rounded-xl border border-orange-300 bg-orange-50 px-4 py-3 text-stone-800">
                    Do not submit personal, confidential, or sensitive information that is not
                    necessary to describe the delivery stop.
                  </div>
                </PolicySection>

                <PolicySection id="when-information-is-shared" title="When information is shared">
                  <p>FreightIQ may share information:</p>
                  <ul className="space-y-3">
                    {sharingCases.map((sharingCase) => (
                      <li key={sharingCase} className="flex gap-3">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-700"
                          aria-hidden="true"
                        />
                        <span>{sharingCase}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="font-semibold text-stone-900">
                    FreightIQ does not sell personal information, share it with data brokers, or use
                    it for third-party behavioral advertising.
                  </p>
                </PolicySection>

                <PolicySection id="service-providers" title="Service providers">
                  <p>FreightIQ currently relies on:</p>
                  <dl className="grid gap-3">
                    {serviceProviders.map((provider) => (
                      <div
                        key={provider.name}
                        className="rounded-xl border border-stone-300 bg-white/45 px-4 py-3"
                      >
                        <dt className="font-semibold text-stone-950">{provider.name}</dt>
                        <dd className="mt-0.5 text-sm leading-6 text-stone-600">
                          {provider.purpose}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p>
                    These providers may process information as necessary to provide their services
                    and according to their applicable terms and privacy practices.
                  </p>
                </PolicySection>

                <PolicySection id="retention-and-deletion" title="Retention and account deletion">
                  <p>
                    FreightIQ retains information while an account is active and as reasonably
                    necessary to operate the service, respond to requests, maintain security, and
                    meet legal obligations.
                  </p>
                  <p>
                    When an account-deletion request is confirmed, FreightIQ deletes the account and
                    associated personal data, including the driver profile, user-linked reports and
                    votes, and legacy photo submissions associated with that user.
                  </p>
                  <p>
                    Factual stop information may remain only when it has been de-identified and can
                    no longer be connected to the deleted user.
                  </p>
                  <p>
                    Information required for legitimate legal, security, fraud-prevention, or
                    regulatory reasons may be retained only for those purposes.
                  </p>
                  <p>
                    Contact and Early Access submissions are retained only as long as reasonably
                    necessary to respond, administer access, maintain appropriate business records,
                    or satisfy legal obligations.
                  </p>
                  <p>
                    Some information may remain temporarily in routine service backups before being
                    removed through normal backup-retention cycles.
                  </p>
                  <p>
                    To request account deletion, visit the{" "}
                    <Link
                      href="/delete-account"
                      className="rounded-sm font-semibold text-orange-800 underline decoration-orange-700/30 underline-offset-4 transition-colors hover:text-orange-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-orange-700"
                    >
                      FreightIQ Delete Account page
                    </Link>
                    . FreightIQ may verify your identity before completing a privacy or deletion
                    request.
                  </p>
                </PolicySection>

                <PolicySection id="security" title="Security">
                  <p>
                    FreightIQ uses reasonable technical, administrative, and organizational measures
                    intended to protect personal information. These measures include authenticated
                    account access, access controls around stored data, and established
                    infrastructure providers.
                  </p>
                  <p>No electronic system or transmission method can be guaranteed completely secure.</p>
                </PolicySection>

                <PolicySection id="your-choices" title="Your choices and privacy requests">
                  <p>You may:</p>
                  <ul className="space-y-3">
                    {userChoices.map((choice) => (
                      <li key={choice} className="flex gap-3">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-700"
                          aria-hidden="true"
                        />
                        <span>{choice}</span>
                      </li>
                    ))}
                    <li className="flex gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-700"
                        aria-hidden="true"
                      />
                      <span>
                        Request deletion through the{" "}
                        <Link
                          href="/delete-account"
                          className="rounded-sm font-semibold text-orange-800 underline decoration-orange-700/30 underline-offset-4 transition-colors hover:text-orange-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-orange-700"
                        >
                          FreightIQ Delete Account page
                        </Link>
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-700"
                        aria-hidden="true"
                      />
                      <span>
                        Contact FreightIQ to ask questions or request access to, correction of, or
                        deletion of personal information
                      </span>
                    </li>
                  </ul>
                  <p>
                    FreightIQ will respond according to applicable law and may need to verify the
                    requester’s identity.
                  </p>
                </PolicySection>

                <PolicySection id="childrens-privacy" title="Children’s privacy">
                  <p>
                    FreightIQ is designed for delivery drivers and is not directed to children under
                    13. FreightIQ does not knowingly collect personal information from children
                    under 13.
                  </p>
                  <p>
                    If FreightIQ learns that personal information from a child under 13 was
                    collected, reasonable steps will be taken to delete it. A parent or guardian may
                    contact FreightIQ with a concern.
                  </p>
                </PolicySection>

                <PolicySection id="changes-to-this-policy" title="Changes to this policy">
                  <p>
                    FreightIQ may update this Privacy Policy as the product, data practices, or legal
                    requirements change. The revised policy will be posted on this page with an
                    updated effective date.
                  </p>
                  <p>
                    When a change materially affects how personal information is handled, FreightIQ
                    may provide additional notice through the app, website, or account email when
                    appropriate.
                  </p>
                </PolicySection>

                <PolicySection id="contact-freightiq" title="Contact FreightIQ">
                  <p>For privacy questions or requests, contact:</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <a
                      href="mailto:hello@freightiqapp.com"
                      className="rounded-xl border border-stone-300 bg-white/45 px-4 py-4 transition-colors hover:border-orange-300 hover:bg-orange-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-orange-700"
                    >
                      <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                        Email
                      </span>
                      <span className="mt-1.5 block font-semibold text-stone-950">
                        hello@freightiqapp.com
                      </span>
                    </a>
                    <a
                      href="https://freightiqapp.com"
                      className="rounded-xl border border-stone-300 bg-white/45 px-4 py-4 transition-colors hover:border-orange-300 hover:bg-orange-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-orange-700"
                    >
                      <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                        Website
                      </span>
                      <span className="mt-1.5 block font-semibold text-stone-950">
                        freightiqapp.com
                      </span>
                    </a>
                  </div>
                </PolicySection>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
