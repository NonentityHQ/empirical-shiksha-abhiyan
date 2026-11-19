# Translation implementation notes

- Removed the Cloud Translation API endpoint and Vite development proxy.
- No translation API key, cloud account, billing setup or network access is required for Hindi.
- English and Hindi are the only exposed language choices.
- `src/locales/hi.ts` contains the reviewed local Hindi dictionary.
- The DOM translator handles text nodes and common user-facing attributes (`placeholder`, `aria-label`, `title`, `alt`), including form controls and React SPA route changes.
- Elements marked `.notranslate`, `[translate="no"]`, or `[data-translation-ignore]` stay unchanged.
- Unknown text is kept in its source language rather than translated by guesswork. Add reviewed entries to the Hindi dictionary when new static or CMS content is introduced.
