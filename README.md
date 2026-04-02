# Checkit Content Explorer

A production-leaning content explorer built for the Checkit frontend assessment using **Next.js App Router**, **TypeScript**, **Tailwind CSS**, **server-side data fetching**, **Vitest**, and the **DummyJSON Products API**.

## Why DummyJSON

DummyJSON was chosen because it gives the assessment everything the brief rewards without adding setup risk:

- stable public API
- built-in imagery
- server-friendly pagination
- searchable product data
- category filtering without API keys

## Product Decisions

### Why pagination over infinite scroll

Pagination keeps the experience predictable, accessible, and easy to share. It also made the URL contract straightforward and reduced implementation risk for a time-boxed assessment.

### Why URL-driven filters

Search and category selection are encoded in the URL so the page can be refreshed, bookmarked, shared, and tested without losing state.

Supported params:

- `page`
- `q`
- `category`

Example:

```text
/?page=2&q=phone&category=smartphones
```

## Stack

- Next.js 16 App Router
- React 19
- TypeScript strict mode
- Tailwind CSS v4
- Vitest + React Testing Library
- pnpm

## Local Setup

PowerShell blocks `pnpm.ps1` on this machine, so the commands below use `cmd /c pnpm ...`.

```bash
cp .env.example .env.local
cmd /c pnpm install
cmd /c pnpm dev
```

Open `http://localhost:3000`.

## Available Commands

```bash
cmd /c pnpm dev
cmd /c pnpm lint
cmd /c pnpm typecheck
cmd /c pnpm test
cmd /c pnpm build
```

## Architecture

```text
src/
  app/
    page.tsx
    loading.tsx
    error.tsx
    products/[id]/page.tsx
  components/products/
  lib/api/
  lib/utils/
  hooks/
  types/
```

Key choices:

- API integration is isolated in `src/lib/api/products.ts`
- shared domain types live in `src/types`
- search parsing and URL generation live in `src/lib/utils/query-params.ts`
- server components own product fetching
- the filter controls are the only client-heavy layer on the listing page

## Performance Notes

Implemented optimizations:

1. `next/image` is used for catalog and detail imagery to optimize loading behavior.
2. `next/font` loads Sora and IBM Plex Mono without layout-shifting external font requests.
3. Product list and detail fetches use `revalidate` caching, while categories use longer-lived cache behavior.
4. The interactive filter controls are dynamically imported so the server-rendered listing ships less client code up front.

## Async UX

- route-level `loading.tsx` with skeleton layouts
- route-level `error.tsx` boundaries for catalog and detail pages
- explicit empty state with a clear-filters action

## Tests

Meaningful UI tests included:

- debounced search sync in `ExplorerControls`
- category changes reset pagination
- product card renders metadata and a safe fallback image

Run with:

```bash
cmd /c pnpm test
```

## Trade-offs

- When both `q` and `category` are active, the app fetches the selected category dataset and filters it in-process to preserve the combined experience cleanly.
- The design intentionally avoids a marketing-style hero so the first viewport stays focused on browsing and filtering.
- Cloudflare deployment was the intended hosting target, but final deployment requires account credentials that are not available inside this workspace.

## Cloudflare Deployment Notes

Target deployment path:

- OpenNext adapter for Cloudflare Workers
- Wrangler-managed deployment

If Cloudflare credentials are unavailable, the app remains fully compatible with a Vercel deployment as a fallback delivery path.

## What I Would Improve With More Time

- add a lightweight accessibility audit report and fix log
- add visual regression or page-level route tests
- add category chips or saved views for faster repeated browsing
