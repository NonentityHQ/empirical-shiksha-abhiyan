# Runtime hotfix — 16 Nov 2026

- Fixed the module-level `ReferenceError: pillars is not defined` by adding the four-pillar GSAP cross-fade builder used by `useCinema.ts`.
- Reduced scrub smoothing from 0.7 to 0.45 for a more responsive scroll feel.
- Added a reduced-motion layout that exposes all four initiative panels in normal document flow.
- Lazy-loaded the About route so an About-only module failure does not block Home and the rest of the site from mounting.
- Added local SVG and ICO favicons to remove the missing favicon request.

Checks completed: all 29 TS/TSX files parse; `film.css` and `index.css` parse; all 20 image references in `story.ts` exist; ZIP integrity checked.

A full Vite production build could not be run in this environment because `npm ci` could not complete (npm registry request timed out), and the project dependencies are not installed here. Run `npm ci` and `npm run build` locally to complete the production build check.
