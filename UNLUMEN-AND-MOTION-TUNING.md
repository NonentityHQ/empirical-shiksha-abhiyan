# Unlumen UI additions and motion timing update

## Components added

- `src/components/unlumen-ui/motion-faqs-accordion.tsx` — Motion-powered single-open accordion, using the documented `items`, `gap`, and `className` API. Integrated into the About page FAQ using the organisation's existing copy.
- `src/components/unlumen-ui/hover-expand.tsx` — image-backed vertical hover/tap expansion, using the documented `items`, `collapsedHeight`, `expandedHeight`, and `className` API. Integrated into Home > Four Pillars, replacing the static four-card grid with the organisation's actual imagery and copy.
- `components.json` now includes the `@unlumen-ui` registry alongside `@smoothui`.

## Slower text and reveal timing

- `BlurOutUp`: 0.86s word transition and a normalized 40ms+ word stagger, even when a page passes a smaller stagger override.
- `BottomUpLetters`: 0.66s character transition and a normalized 56ms+ character stagger.
- `KineticCenterBuild`: 470ms between word builds, longer phrase dwell and 0.62s blur/focus transitions.
- `KineticTypeScroll`: 0.56s spring response for scroll-linked text.
- Existing SmoothUI FAQ, About hero text, section reveals and site-wide reveal transitions have also been slowed slightly.

All new components respect `prefers-reduced-motion`. They use the project's already-installed `motion` and `lucide-react` dependencies; no new runtime package is required.

## Verification

The source was syntax-checked locally. This workspace could not reach the npm registry (DNS resolution failed), so the original registry CLI commands could not be executed here and a full `vite build` could not be run in this environment. The components are locally editable implementations following the published Unlumen API and behaviour documentation.

The published registry install commands are:

```bash
npx shadcn@latest add @unlumen-ui/motion-faqs-accordion
npx shadcn@latest add @unlumen-ui/hover-expand
```

Those commands could not be executed from this workspace because DNS resolution for the registry was unavailable. Their editable local equivalents are already included above, so no CLI install is needed to use the integrated site components.

Run locally:

```bash
npm install
npm run build
```
