# About Us page handoff

The About Us page is a Hindi-first, scroll-driven story. A missing `pillars` builder previously caused a module-level `ReferenceError`; the builder is now defined and cross-fades the four initiative scenes. About is lazy-loaded so a page-specific import failure cannot prevent Home from mounting.

## Main files

- `src/pages/About.tsx` — story scenes and copy.
- `src/pages/about/story.ts` — founder details, stats, pillar content, and the central `IMG` asset map.
- `src/pages/about/useCinema.ts` — desktop scroll choreography and lightweight reveal observer.
- `src/pages/about/film.css` — typography, responsive layout, founder framing, and photo brightness.

## Replacing temporary images later

All About page image paths are centralized in `src/pages/about/story.ts` under `IMG`. Replace those filenames with the client's final images when they arrive. The current page intentionally uses existing project assets only.

Founder portraits are referenced through `IMG.rahul` and `IMG.jayram`, so one path change updates their appearances throughout the page.

## Scroll behavior

Only the opening and four-pillar scenes use pinned scroll choreography on desktop. Other scenes follow normal page flow with a single `IntersectionObserver` reveal. Mobile and reduced-motion layouts use natural scrolling and display the four pillars as separate visual panels. The pinned animation uses a short scrub value to keep scroll response immediate. The page uses the project's self-hosted `Hind` and `Noto Serif Devanagari` fonts for native Hindi copy.

A project favicon is available at `public/favicon.svg` and `public/favicon.ico`.

## Founder details

Rahul's engineering, exam-preparation, and polytechnic teaching notes are presented in his section. The lower block of the handwritten notes is assigned to Jayram, as confirmed by the user, including AutoCAD/Revit, 3D-related skills, PCB, industry experience, and institutional-head experience.

Please confirm handwritten durations and role wording with the founders before final publication.
