This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Latest Updates (2026-10-12)

- Added client authentication API endpoint at `app/api/v1/auth/client-login/route.ts`.
	- Validates `firstName`, `lastName`, and `recordId`.
	- Verifies login details against HubSpot contact records.
	- Returns structured API errors for invalid input, auth failures, and provider errors.

- Added client profile API endpoint at `app/api/v1/clients/[recordId]/route.ts`.
	- Fetches a client profile by record ID.
	- Returns `404` when no matching client is found.

- Added HubSpot integration layer under `lib/api/hubspot/`.
	- `client.ts` initializes and caches a HubSpot client using `HS_ACCESS_TOKEN`.
	- `contacts.ts` implements:
		- login lookup by record ID + name checks,
		- normalized name matching to handle CRM formatting differences,
		- consultant name resolution from HubSpot owner IDs,
		- defensive handling for missing owner scopes.

- Updated login flow in `components/login/ClientLoginPage.tsx`.
	- Converted to client-side form submission.
	- Calls `/api/v1/auth/client-login`.
	- Shows loading and error states.
	- Redirects successful logins to `/dashboard?contactId=...`.

- Updated dashboard data loading in `components/dashboard/ClientDashboard.tsx`.
	- Reads `contactId` from search params.
	- Fetches client profile from `/api/v1/clients/:contactId`.
	- Passes live profile data to header, mobile nav, and client snapshot components.

- Replaced hardcoded profile data with dynamic data:
	- `components/dashboard/header/DashboardHeader.tsx`
	- `components/dashboard/header/MobileNav.tsx`
	- `components/dashboard/sidebar/SidebarPanels.tsx`

- Improved timeline interaction in `components/dashboard/overview/CaseProgressTimeline.tsx`.
	- Added hover/focus stage previews.
	- Kept stage selection click behavior for smaller screens while preventing desktop click-select behavior.

- Dependency/config updates:
	- Added `@hubspot/api-client` to `package.json`.
	- Removed `cacheComponents` and `partialPrefetching` from `next.config.ts`.

- Note: This update set is currently in local working changes (not yet pushed as new commits).

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
