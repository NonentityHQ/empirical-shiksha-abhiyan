# SmoothUI integration notes

The seven requested animation components have been added locally under `src/components/smoothui/` and integrated into the existing React + Vite pages. The official SmoothUI registry is configured in `components.json` for future `shadcn` additions.

## Where they are used

- `scroll-image-reveal`: featured gallery image on the Home page.
- `magnetic-field`: primary Home actions and the Contact page volunteer action. It only runs on fine-pointer devices and respects reduced-motion preferences.
- `blur-out-up`: selected intro and story text on Home, About, Contact, Initiatives, and Success Stories.
- `bottom-up-letters`: selected headings on Home, Initiatives, and Success Stories.
- `kinetic-center-build`: rotating mission tagline on Home.
- `kinetic-type-scroll`: kinetic statement in the Home page About section.
- `faq-1`: category-based FAQ section on About, populated with the site's organisation/programme/community content.

## Install and verify locally

The workspace used to prepare this archive could not reach the npm registry, so dependencies could not be installed and the production build could not be run here. Run these commands in the project folder on a machine with npm registry access:

```bash
npm install
npm run build
```

`npm install` also refreshes the existing `package-lock.json` for the newly added `motion` and `lucide-react` dependencies. Use `npm run dev` to preview the site.
