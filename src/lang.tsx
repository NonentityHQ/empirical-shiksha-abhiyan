import { useEffect, useState, type ReactNode } from "react";

/* Reads the language chosen in the navbar (Google Translate cookie). */
export function readLang(): string {
  if (typeof document === "undefined") return "en";
  const m = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]+\/([^;]+)/);
  return m ? decodeURIComponent(m[1]) : "en";
}

export function useLang(): string {
  const [l, setL] = useState(readLang);
  useEffect(() => {
    const f = () => setL(readLang());
    window.addEventListener("langchange", f);
    return () => window.removeEventListener("langchange", f);
  }, []);
  return l;
}

/* Bilingual text that follows the selected language:
   Hindi selected -> the real Hindi wording (kept out of Google Translate so it stays exact);
   every other language -> the English wording, which Google Translate converts as usual. */
export function Bi({ en, hi }: { en: ReactNode; hi: ReactNode }) {
  const l = useLang();
  return l === "hi" ? <span key="hi" className="notranslate" translate="no">{hi}</span> : <span key="en">{en}</span>;
}

/* Only rendered when Hindi is selected. */
export function OnlyHi({ children }: { children: ReactNode }) {
  return useLang() === "hi" ? <>{children}</> : null;
}
