# ims-getdateable

Website for **Get Dateable** (brand: `dateable()af`) — a resource platform for
women who date women. Free Dateability assessment, podcast, and a
community/coaching program. Owners: Dr. Sarah Kyle & Rachel.

An Ignite Market Solutions client site. Scaffolded from the tokenized Grove
template; diverging for the dating/coaching/podcast vertical.

## Stack

- Next.js (App Router) + React + Tailwind v4
- Sanity headless CMS (client edits content, no developer needed)
- Vercel hosting
- Themeable via the shared palette + font token system (see the `ims-ops`
  repo's `TEMPLATES.md`)

## Local dev

```bash
nvm use 22        # Node 14 breaks Next 16 + the Sanity CLI
npm install
npm run dev
```

## Status

Provisioning. Next steps (see `ims-ops/RUNBOOK.md`):
1. Create the Get Dateable Sanity project; wire `.env.local` + the projectId
   fallback in `src/sanity/env.ts`.
2. Rework the content model for the vertical (podcast hub, assessment funnel,
   program offer, origin story, blog).
3. Migrate Webflow blog content.
4. Art-direct the brand palette + fonts.
5. Deploy to Vercel + point getdateable.com.
6. Invite owners to their Studio.
