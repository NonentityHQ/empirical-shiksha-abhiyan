# No-redeploy publishing architecture

## What changes without a website redeploy

Sanity is the runtime content source. Once the frontend has been connected to the public read API, publishing text, images, marquee items, section order, initiative records, reports, volunteer profiles, hour entries, and milestone settings changes dataset content only. The already-deployed frontend fetches the published dataset; no Vercel/Railway build is triggered by a Sanity publish.

## Important distinction

- Content changes: no redeploy.
- Frontend code, layout, animation logic, new content component types, dependencies, or schema code changes: deploy/release required.
- Studio schema changes: redeploy the Studio (not the public website).

## Runtime requirements

1. Set `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET` as public frontend environment variables at build time. These identify the public dataset; they are not secrets.
2. Use published perspective only on the public website. Never expose `SANITY_API_TOKEN` or any write token in `VITE_*` variables.
3. Configure Sanity CORS for the local and production website origins.
4. Use Sanity CDN for public reads. Use short-lived caching/revalidation or Sanity listeners for freshness.
5. Keep Preview/Draft Mode restricted to authenticated editors. Never make draft content public.

## Drag and drop

Sanity Studio's array input already provides drag handles and reorder persistence for `sections`, `images`, `items`, `homeMarqueeImages`, `aboutMarqueeImages`, and `milestones`. This is real document ordering, not a visual mockup. The Presentation Tool provides an in-Studio website iframe. True click-on-page visual editing additionally requires the deployed frontend to render the matching Sanity content and enable Visual Editing/Content Source Maps; it cannot edit hard-coded React strings or images.
