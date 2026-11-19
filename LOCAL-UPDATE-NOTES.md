# Empirical Shiksha — local update notes

Changes in this build:
- Jayram Malakar is labeled as Co-Founder (सह-संस्थापक एवं संस्थान प्रमुख) in the About story and contact founders section.
- About page no longer blocks Google Translate. Its Hindi text remains authored as-is for Hindi; the page can be translated through the site's existing language selector for other configured languages.
- Contact hero's shaped photo now uses a different existing group photo (`clean-group-1.webp`).
- The uploaded screenshot's group photo has been cropped into `public/images/contact-hero-bg.webp` and is used as the Contact page's top background image.
- Reduced several dark image overlays in the About documentary so photos show through more clearly while keeping text contrast.

Local run:
1. Extract the ZIP.
2. Open `empirical-cms-build` in a terminal.
3. Run `npm install`
4. Run `npm run dev`

Notes:
- Google Translate is machine translation; wording can vary by language. Review important public-facing translations before launch.
- No Sanity credentials or API token are included. Add those yourself only when configuring Sanity.
