# Empirical Shiksha CMS handoff

The Sanity Studio scaffold is in `sanity-studio/`.

**This is not yet a fully live CMS migration.** The supplied React/Vite site is still rendering hard-coded content. The Studio models and bulk-hours tool are prepared, but frontend page components need to be connected to the CMS before client edits appear on the public site. The upload script can import the 31 existing image files from `public/images/` into Sanity.

Start with `sanity-studio/README.md` for project setup and limitations.

Recommended implementation order:
1. Configure Sanity project and Studio.
2. Create all page singleton docs and populate content from the current website.
3. Wire Home/About first, including every image and marquee.
4. Wire all remaining pages.
5. Replace `stars-data.ts` with volunteer and hour-ledger queries.
6. Add Visual Editing overlays and validate in Presentation.
7. Only then hand the dashboard to the client.
