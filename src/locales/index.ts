import { translateToHindi } from "./hi";
import { translateToMarathi } from "./mr";

/** Add a language here (plus its dictionary file) and it appears in the menu automatically. */
export const LANGUAGES: { code: string; label: string; en: string }[] = [
  { code: "en", label: "English", en: "English" },
  { code: "hi", label: "हिन्दी", en: "Hindi" },
  { code: "mr", label: "मराठी", en: "Marathi" },
];

export const SUPPORTED_CODES = new Set(LANGUAGES.map((l) => l.code));

const TRANSLATORS: Record<string, (s: string) => string | null> = {
  hi: translateToHindi,
  mr: translateToMarathi,
};

export function translateFor(code: string, source: string): string | null {
  const fn = TRANSLATORS[code];
  return fn ? fn(source) : null;
}
