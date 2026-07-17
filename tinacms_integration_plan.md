# TinaCMS Cloud Integration Plan — Bryson Travel

> [!IMPORTANT]
> **All implementation work should be done on a new branch** (e.g., `feature/tinacms-cloud`). This document is a planning artifact only — no code changes are made here.

---

## Current State Assessment

### ✅ What's Already Set Up
| Item | Status | Notes |
|------|--------|-------|
| `tinacms` + `@tinacms/cli` installed | ✅ Done | v2.4.1 / v1.6.14 |
| `tina/config.ts` exists | ✅ Done | Defines schema for `destination` collection |
| `NEXT_PUBLIC_TINA_CLIENT_ID` in `.env.local` | ✅ Done | Linked to a tina.io project |
| `content/destinations/*.md` files | ✅ Done | 5 destination files with correct frontmatter |
| Dev script uses `tinacms dev -c "next dev"` | ✅ Done | Correct local development command |
| Build script uses `tinacms build && next build` | ✅ Done | Correct production build pipeline |
| `/admin` rewrite in `next.config.ts` | ✅ Done | Routes `/admin` → `/admin/index.html` |
| `/admin` page loads locally | ✅ Done | But shows "Local Mode" warning |

### ❌ What's Missing / Broken
| Problem | Impact |
|---------|--------|
| `TINA_TOKEN` is **not set** in `.env.local` | Admin can't authenticate with Tina Cloud |
| Destinations page reads from **hardcoded `src/data/destinations.ts`** | Content changes in Tina CMS have zero effect on what's shown on the website |
| Destination detail `[slug]/page.tsx` also uses the hardcoded data file | Same problem — no Tina data connection |
| The `perk` field exists in the Tina schema + `.md` files but is **not rendered** anywhere | Content exists but is unused |
| The `body` (rich-text) field in the schema is **not rendered** on the detail page | Rich text content from Tina is ignored |
| The `content/destinations/*.md` files are out of sync with `src/data/destinations.ts` | Two sources of truth — the `.md` files have a `perk` field missing from the data file |
| `TINA_TOKEN` + `NEXT_PUBLIC_TINA_CLIENT_ID` are **not set in Vercel** environment variables | Production deployment can't connect to Tina Cloud |

---

## The Core Problem (Explained Simply)

TinaCMS has two modes:
1. **Local Mode** (what you have now): Tina reads/writes directly to local `.md` files on disk. The `/admin` panel works but is labelled "Local Mode". Your website still doesn't use these `.md` files — it reads from the hardcoded TypeScript file.
2. **Cloud Mode**: Tina reads/writes content through the Tina Cloud API (backed by GitHub). Your website fetches content via Tina's GraphQL client. Changes made in `/admin` push to GitHub → trigger a Vercel rebuild → site updates automatically.

**The gap**: Even if you fixed the token and switched to Cloud Mode, the website pages still wouldn't show Tina content because `destinations/page.tsx` and `[slug]/page.tsx` import from `src/data/destinations.ts` (hardcoded), not from Tina's GraphQL client.

---

## What Needs To Happen (Step-by-Step Plan)

### Phase 1 — Tina Cloud Credentials (Prerequisites, 10 min)
These are configuration steps you do manually in two dashboards.

**Step 1.1 — Get your `TINA_TOKEN` from tina.io**
1. Go to [https://app.tina.io](https://app.tina.io) and log in.
2. Find the project named "bryson_travel" (it's the one linked to client ID `d8be1524-2dad-461c-be62-21af75ce429f`).
3. Navigate to **Project Settings → Tokens**.
4. Copy the **Content Token** (this is your `TINA_TOKEN`).

**Step 1.2 — Connect your GitHub repo in Tina Cloud**
1. Still in tina.io, go to **Project Settings → GitHub**.
2. If not already connected, authorize GitHub and select the `bryson_travel` repository.
3. Set the **branch** to `main` (or whatever your production branch is).

**Step 1.3 — Add tokens to `.env.local` (local dev)**
In your local `.env.local`:
```env
NEXT_PUBLIC_TINA_CLIENT_ID=d8be1524-2dad-461c-be62-21af75ce429f
TINA_TOKEN=<paste token from step 1.1>
```

**Step 1.4 — Add tokens to Vercel environment variables (production)**
1. Go to [https://vercel.com](https://vercel.com), open your `bryson_travel` project.
2. Go to **Settings → Environment Variables**.
3. Add two variables for **Production** environment:
   - `NEXT_PUBLIC_TINA_CLIENT_ID` = `d8be1524-2dad-461c-be62-21af75ce429f`
   - `TINA_TOKEN` = `<your token>`

---

### Phase 2 — Wire the Destinations Page to Tina Data (Code Changes)

This is where the website actually starts consuming Tina-managed content instead of the hardcoded file.

**Step 2.1 — Create a Tina GraphQL query helper**

Create a new file `src/lib/tina.ts` that exports a server-side function to fetch destinations from Tina's generated client. The `tina/__generated__` folder already contains a typed client from running `tinacms dev`.

**Step 2.2 — Convert `destinations/page.tsx` to a Server Component**

Currently it's a basic Server Component that renders `<DestinationsContent />`. That component needs to receive data as props fetched from Tina (instead of importing the hardcoded array). The page becomes:
```
page.tsx (Server Component)
  → calls Tina GraphQL client to get all destinations
  → passes list to <DestinationsContent destinations={data} />
```

**Step 2.3 — Convert `[slug]/page.tsx` to a Server Component**

Currently it's a `'use client'` component that uses `useParams()` + the hardcoded `DESTINATIONS` array. This needs to become:
```
[slug]/page.tsx (Server Component)
  → receives { params: { slug } }
  → calls Tina GraphQL client with that slug
  → renders the destination data (including perk + body fields)
```

> [!NOTE]
> The interactive parts (scroll lock, back button) can be moved to a thin client wrapper component so the page itself stays a Server Component for SSG/SSR data fetching.

**Step 2.4 — Add `generateStaticParams()` for static generation**

Add a `generateStaticParams` export to `[slug]/page.tsx` that queries Tina for all destination slugs. This tells Next.js which routes to pre-render at build time.

**Step 2.5 — Update `DestinationsContent` component to accept props**

Currently `DestinationsContent` likely imports `DESTINATIONS` directly. It needs to accept destinations as a prop.

**Step 2.6 — Optionally delete `src/data/destinations.ts`**

Once all pages are reading from Tina, the hardcoded file is dead weight. Remove it and its imports.

---

### Phase 3 — Sync Content to Tina Cloud (One-time action)

The `.md` files in `content/destinations/` exist locally and in Git, but Tina Cloud needs to index them. Once GitHub is connected (Step 1.2), Tina will automatically index the content on its next sync. No additional action needed unless Tina shows "0 documents" in the admin — in that case, trigger a manual sync from the tina.io dashboard.

---

### Phase 4 — Validate the End-to-End Flow

1. Run `npm run dev` locally → visit `/admin` → should show **Cloud Mode** (not Local Mode).
2. Edit a destination in `/admin` → verify the `.md` file in `content/destinations/` updates locally (Tina writes to the file via the local GraphQL server in dev mode).
3. Push branch to GitHub → Vercel auto-deploys → verify destination content appears on the live site from Tina.
4. Edit a destination in the **production `/admin`** on the live site → verify it creates a PR or commits to the connected branch in GitHub → verify Vercel redeploys.

---

## Files That Will Change During Implementation

| File | Change Type | Description |
|------|------------|-------------|
| `.env.local` | Edit | Add `TINA_TOKEN` |
| `src/lib/tina.ts` | **New file** | Tina client query helpers |
| `src/app/destinations/page.tsx` | Edit | Fetch from Tina, pass as props |
| `src/app/destinations/[slug]/page.tsx` | Edit | Server component + Tina fetch + `generateStaticParams` |
| `src/components/organisms/DestinationsContent/DestinationsContent.tsx` | Edit | Accept `destinations` prop instead of importing hardcoded array |
| `src/data/destinations.ts` | Delete (or deprecate) | No longer needed once Tina is the source of truth |

---

## Files That Will NOT Change

- `tina/config.ts` — Schema is already correct for the destinations collection
- `content/destinations/*.md` — Already exist with correct frontmatter matching the schema
- `next.config.ts` — `/admin` rewrite is already in place
- `package.json` — build/dev scripts are already correct
- Vercel project config — only environment variables need to be added

---

## Key Decisions / Open Questions

> [!WARNING]
> **Branch deployment consideration**: Tina Cloud connects to a specific GitHub branch. If you're adding `TINA_TOKEN` + working on a `feature/tinacms-cloud` branch, the `/admin` will show Local Mode until the PR is merged to the connected branch (typically `main`) OR you configure Tina to also index the feature branch.

1. **Should the `/admin` route be password-protected?** Currently it's open to anyone who visits `/admin`. TinaCMS Cloud requires login with a tina.io account, so it's not completely open — but you may want to verify who has access to the tina.io project.
2. **Blog / Travel Ideas**: The `travel-ideas` page is currently a placeholder. Once Tina is wired up, a second collection (e.g., `posts`) could be added to `tina/config.ts` to manage blog content. This is a future phase.
3. **Image hosting**: The Tina config uses `tina.media` pointing to `public/assets`. This means uploaded images in the CMS land in your repo. For a production client workflow, Cloudinary or another media provider is worth considering.

---

## Summary Checklist for Implementation

```
[ ] Phase 1: Credentials
    [ ] 1.1 Get TINA_TOKEN from tina.io dashboard
    [ ] 1.2 Connect GitHub repo in Tina Cloud settings
    [ ] 1.3 Add TINA_TOKEN to .env.local
    [ ] 1.4 Add both tokens to Vercel environment variables

[ ] Phase 2: Code changes (on new branch)
    [ ] 2.1 Create src/lib/tina.ts with query helpers
    [ ] 2.2 Update destinations/page.tsx → Server Component with Tina fetch
    [ ] 2.3 Update [slug]/page.tsx → Server Component + generateStaticParams
    [ ] 2.4 Update DestinationsContent to accept destinations prop
    [ ] 2.5 Remove/deprecate src/data/destinations.ts

[ ] Phase 3: Content sync
    [ ] 3.1 Verify Tina Cloud indexes the .md files after GitHub connection

[ ] Phase 4: Validation
    [ ] 4.1 /admin shows Cloud Mode locally
    [ ] 4.2 Edit in /admin updates .md file
    [ ] 4.3 Production admin edit → GitHub commit → Vercel rebuild
```
