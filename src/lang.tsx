import { useEffect, useState, type ReactNode } from "react";

const LANGUAGE_KEY = "empirical-language";
import { SUPPORTED_CODES } from "./locales";
const SUPPORTED_LANGUAGES = SUPPORTED_CODES;

/** Read the language preference saved by the site itself (no third-party cookies). */
export function readLang(): string {
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem(LANGUAGE_KEY) || "en";
    return SUPPORTED_LANGUAGES.has(saved) ? saved : "en";
  } catch {
    return "en";
  }
}

export function useLang(): string {
  const [language, setLanguage] = useState(readLang);
  useEffect(() => {
    const sync = () => {
      const next = readLang();
      setLanguage(next);
      document.documentElement.lang = next;
    };
    sync();
    window.addEventListener("langchange", sync);
    window.addEventListener("pageshow", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("langchange", sync);
      window.removeEventListener("pageshow", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return language;
}

/** English and curated Hindi strings are authored locally; no remote translation service is required. */
export function Bi({ en, hi }: { en: ReactNode; hi: ReactNode }) {
  const language = useLang();
  return language === "hi"
    ? <span key="hi" className="notranslate" translate="no">{hi}</span>
    : <span key="en" translate="yes">{en}</span>;
}

export function OnlyHi({ children }: { children: ReactNode }) {
  return useLang() === "hi" ? <>{children}</> : null;
}
