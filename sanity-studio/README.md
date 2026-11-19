# Empirical Shiksha — Sanity CMS

This folder contains a Sanity Studio scaffold designed around the supplied Empirical Shiksha React/Vite website.

## Included
- A separate Sanity Studio with page-by-page navigation for Home, About, Initiatives, Impact, Gallery, Success Stories, Our Stars, Contact and Reports.
- Website-wide settings for logo, contact information, social links, footer copy and independent Home/About marquee image lists.
- Reusable page sections with editable headings, rich text, images, videos, cards, stats, FAQs, galleries and visibility/reordering controls.
- Initiatives and report documents.
- Student/volunteer records, drive records, an auditable hours ledger and editable milestone thresholds/badges.
- A Bulk Student Hours tool with search, select-all, previewed totals, chunked writes and idempotent entry IDs.
- Sanity Presentation Tool configuration for an in-Studio website preview.

## Setup
1. Create a project at https://www.sanity.io/manage.
2. Copy `.env.example` to `.env` and set `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`, and `SANITY_STUDIO_PREVIEW_URL`.
3. Add the frontend origins in Sanity project API settings (CORS), including `http://localhost:5173` and your deployed website origin.
4. Create a Sanity API token with Editor permissions and add `SANITY_API_TOKEN` to `.env`. This token is for local migration scripts only; never put it in the public Vite app.
5. From this folder run:
   ```bash
   npm install
   npm run seed
   npm run upload:images
   npm run dev
   ```
6. Open the Studio URL printed by the CLI and sign in with the Sanity account that should manage the site.

## First-time documents
The Studio navigation opens fixed singleton IDs:
- `page-home`, `page-about`, `page-initiatives`, `page-impact`, `page-gallery`, `page-success`, `page-stars`, `page-contact`, `page-reports`
- `site-settings`
- `milestone-settings`

The seed script creates these singleton documents automatically; open them from the navigation to edit. Fill the page's hero and sections. For page sections, use descriptive names such as "Home — Hero photos" or "About — Founders" so a non-technical editor can identify them.

## Important integration status
The Studio, schemas, seed script, media uploader and bulk-hours tool are prepared, but the supplied website is currently hard-coded in React components (`src/pages/*.tsx`, `src/data.ts`, `src/stars-data.ts`). A CMS cannot change those existing hard-coded values until the frontend is switched to query Sanity. The `integration/` folder contains starter public-read client and GROQ query examples. The page components still need to be connected to those queries and their visual fields need Content Source Maps / Visual Editing integration. Do not assume that uploading an image into Sanity alone changes the live website before that integration is completed.

## Student hour calculation
The source of truth is `volunteerHourEntry` documents, not a manually editable total field. The Bulk Student Hours tool creates one immutable ledger entry per selected volunteer and links all entries to one drive. The public Our Stars page should calculate each volunteer's total as the sum of their ledger entries, then derive rank, progress and milestone state from that total.

Do not manually overwrite a student's total hours. If an entry is wrong, create an adjustment entry with a negative or positive number and a reason so the audit trail remains intact.

## Security notes
- No write token is placed in the public website.
- Studio mutations run through the authenticated Sanity Studio client.
- Public website reads should use published content only.
- Give the client a dedicated Sanity user account with the minimum role needed. Keep project owner access with the organisation/technical owner.
- Enable MFA on the Sanity account used by the organisation.
- The bulk tool is designed for one drive at a time. Test with dummy volunteer records before entering real student data.

## Next frontend work
1. Replace the static arrays and inline page copy with CMS query results.
2. Connect all page image fields, including every About image, Home/other marquee images, initiative galleries and profile photos.
3. Add `@sanity/visual-editing` overlays in preview mode and resolve each page document to the correct website route.
4. Replace static Our Stars calculations with GROQ projections over `volunteerHourEntry` and `milestoneSettings`.
5. Add a controlled publish workflow and verify every route on desktop and mobile before launch.
