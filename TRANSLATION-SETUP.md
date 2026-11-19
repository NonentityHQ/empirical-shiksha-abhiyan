# Website language support (offline / no API)

The website includes English and a curated Hindi translation dictionary. Hindi translations are stored in `src/locales/hi.ts`; they run entirely in the browser and do not call Google Translate, any other translation API, or a server endpoint. No translation API key, billing account, or `.env` setting is required.

## Available languages

- English: original website copy.
- Hindi: reviewed local translations for the current page content, including Home, About, Initiatives and initiative detail pages, Impact, Gallery, Success Stories, Our Stars and individual star pages, Contact, Reports, navigation, forms, and footer.

The About page's narrative, founder descriptions, key dates, pillar descriptions and FAQs have dedicated Hindi copy. Unknown or newly authored content (for example, a new text entered later into Sanity) is deliberately left in its original language until a reviewed Hindi translation is added. This avoids awkward or misleading translations.

## Add or correct a Hindi translation

1. Open `src/locales/hi.ts`.
2. Add the exact English source phrase as a key and its natural Hindi translation as the value in `HI`.
3. Keep organisation names, personal names, programme names and legal facts accurate. Do not translate names by guessing.
4. Run `npm run build` and check the phrase in both English and Hindi modes.

The language menu intentionally offers only English and Hindi. Other languages are not displayed because this bundle does not yet contain complete reviewed translations for them.
