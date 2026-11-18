## Production release safeguards

This is the separate `robbyeickhoff/freightiq-site` repository; its production branch is `main`.
The parent mobile repository uses `clean-main`. Do not mix their publishing procedures.

The private security review page is intentional website functionality. It requires a verified
session and moderator authorization in both the page and server action. Do not remove it because
the website also has public pages. Security emails depend on the moderation `security_case` link.

Every `npm run build` runs security/access regression tests and checks that the built private
security route, privacy policy, and training route are present. A failed check blocks the build.
Do not bypass these checks with a custom `next build` deployment command.

Release only reviewed, committed source from this repository. Never publish uncommitted files
from a temporary directory: that caused approved security functionality to disappear in later
Git-based releases. Keep unrelated dirty files out of commits. When restoring an older deployment,
reconcile its source into Git before the next release; a successful deployment is not evidence
that all prior functionality survived.

Before publishing: run `npm ci`, `npm run build`, focused lint, and review the exact staged diff.
After publishing: confirm the production deployment commit and run
`node scripts/check-live-security.mjs https://freightiqapp.com`.
Check authorized moderator access separately in a signed-in browser. Never exercise pause/restore
on a real account merely to smoke-test a release. Preserve training files unless explicitly in scope.

The website does not deploy database migrations. Verify live bot settings separately; do not
alter quotas, retention, grants, or notification recipients during website releases.

### November 18, 2026 security restoration

Restores the previously approved private security page/actions, moderation email-link routing,
and October 5 privacy disclosures into Git. Training source is unchanged from `668c69b`.
The unrelated local referral-page edit and `design-qa.md` are excluded from this release.
Next.js/eslint-config-next are pinned to 16.4.6; nanoid and source-map-js lock entries are patched.
Production dependency audit has zero findings; the full audit still reports development-tool
findings, which are not represented as resolved by this release.

Pre-release verification: eight behavioral/access/disclosure tests, production build and route
manifest checks, TypeScript, focused ESLint, and local HTTP smoke checks passed. Tests replace
external boundaries; they do not send emails or alter real security cases.

Read-only production checks on `finjqunyuyfxiesumuxk` confirmed both read guards, detection, and
mail enabled; fresh worker; healthy recording/backlog/retention; confirmed recipient
`hello@freightiqapp.com`; all 22 reviewed legacy reader functions and direct table/column reads
on five protected tables denied to both anon and authenticated roles. Guard internals cannot
be executed directly by those roles. An actual unauthorized case-list call was denied with
`42501: Moderator access required`. No thresholds, database records, permissions, or schedules
were changed. These checks verify the existing controls, not immunity to every scraping strategy.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
