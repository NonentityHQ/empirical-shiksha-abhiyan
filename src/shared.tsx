import { useEffect, useState, type ReactNode } from "react";
import { LeafBranch, RayDashes } from "./decor";

export type Page = "home" | "about" | "initiatives" | "impact" | "gallery" | "contact";
export const NAV: { id: Page; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "initiatives", label: "Initiatives" },
  { id: "impact", label: "Impact" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact Us" },
];

export const PHONE = "7400845669";
export const EMAIL = "empiricalshikshaabhiyan@gmail.com";

export const AREAS = [
  { key: "shiksha", hi: "शिक्षा", name: "Shiksha", en: "Education", color: "#1f5fd1", tint: "#e8f0fe", img: "images/shiksha.jpg" },
  { key: "swachhata", hi: "स्वच्छता", name: "Swachhata", en: "Cleanliness", color: "#f2611c", tint: "#fff0e3", img: "images/swachhata.jpg" },
  { key: "paryavaran", hi: "पर्यावरण", name: "Paryavaran", en: "Environment", color: "#3f9a3a", tint: "#e9f5e6", img: "images/paryavaran.jpg" },
  { key: "swasthya", hi: "मानसिक स्वास्थ्य", name: "Mansik Swasthya", en: "Mental Health", color: "#d62828", tint: "#fbe7e7", img: "images/swasthya.jpg" },
] as const;

/* -------- Logo: uses official file at /logo.png, falls back to a stand-in emblem -------- */
export function Emblem({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      {Array.from({ length: 9 }).map((_, i) => {
        const a = Math.PI + (i * Math.PI) / 8;
        const x = 50 + Math.cos(a) * 40, y = 46 + Math.sin(a) * 40;
        const x2 = 50 + Math.cos(a) * 47, y2 = 46 + Math.sin(a) * 47;
        return <line key={i} x1={x} y1={y} x2={x2} y2={y2} stroke="#f39a1e" strokeWidth="4" strokeLinecap="round" />;
      })}
      <path d="M14 44 A36 36 0 0 1 86 44" fill="none" stroke="#f39a1e" strokeWidth="3" />
      <ellipse cx="34" cy="34" rx="7" ry="4" transform="rotate(-35 34 34)" fill="#3f9a3a" />
      <ellipse cx="66" cy="34" rx="7" ry="4" transform="rotate(35 66 34)" fill="#3f9a3a" />
      <ellipse cx="50" cy="24" rx="4" ry="7" fill="#3f9a3a" />
      <circle cx="50" cy="42" r="6" fill="#f39a1e" />
      <path d="M32 46 Q50 56 68 46 L52 74 L48 74 Z" fill="#e8621a" />
      <path d="M18 72 Q34 64 50 74 Q66 64 82 72 L82 78 Q66 72 50 80 Q34 72 18 78 Z" fill="#fff" stroke="#1f3c9a" strokeWidth="2.5" />
      <path d="M20 88 Q50 98 80 88" fill="none" stroke="#e8621a" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ size = 56, light = false }: { size?: number; light?: boolean }) {
  const [ok, setOk] = useState(true);
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-full bg-white shadow-sm ring-1 ring-black/5 grid place-items-center overflow-hidden" style={{ width: size, height: size }}>
        {ok ? (
          <img src="logo.png" alt="Empirical Shiksha Abhiyan logo" className="w-full h-full object-contain" onError={() => setOk(false)} />
        ) : (
          <Emblem size={size - 6} />
        )}
      </div>
      <div className="leading-none notranslate" translate="no">
        <div className={`font-display font-extrabold text-[21px] tracking-tight ${light ? "text-white" : "text-royal"}`}>इंपीरिकल</div>
        <div className="font-display font-bold text-[14px] text-flame -mt-1">शिक्षा अभियान</div>
        <div className={`text-[11px] font-semibold ${light ? "text-sky-200" : "text-sky"}`}>शिक्षा से सेवा</div>
      </div>
    </div>
  );
}

/* -------- Decorative signature elements drawn from the logo -------- */
export function SunArc({ className = "", color = "#f39a1e" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 400 110" className={className} aria-hidden>
      {Array.from({ length: 13 }).map((_, i) => {
        const a = Math.PI + (i * Math.PI) / 12;
        const cx = 200, cy = 200;
        const p = (r: number, d = 0) => [cx + Math.cos(a + d) * r, cy + Math.sin(a + d) * r];
        const [x1, y1] = p(150, -0.05), [x2, y2] = p(150, 0.05), [x3, y3] = p(185);
        return <polygon key={i} points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} fill={color} />;
      })}
      <path d="M58 200 A142 142 0 0 1 342 200" fill="none" stroke={color} strokeWidth="6" />
    </svg>
  );
}

export function Swoosh({ className = "", color = "#f2611c" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 300 20" className={className} preserveAspectRatio="none" aria-hidden>
      <path d="M2 4 Q150 26 298 4 Q150 16 2 4Z" fill={color} />
    </svg>
  );
}

export function Eyebrow({ children, color = "#f2611c" }: { children: ReactNode; color?: string }) {
  return (
    <div className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[.2em]" style={{ color }}>
      <span className="w-6 h-[3px] rounded-full" style={{ background: color }} />
      {children}
    </div>
  );
}

export function SectionHead({ eyebrow, title, sub, center = false, light = false }: { eyebrow: string; title: ReactNode; sub?: string; center?: boolean; light?: boolean }) {
  return (
    <div className={center ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      <Eyebrow color={light ? "#ffc069" : "#f2611c"}>{eyebrow}</Eyebrow>
      <h2 className={`mt-2 text-[32px] md:text-[42px] leading-[1.08] tracking-tight font-extrabold ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      <Swoosh className={`h-2.5 w-28 mt-2.5 ${center ? "mx-auto" : ""}`} color={light ? "#ffc069" : "#f39a1e"} />
      {sub && <p className={`mt-4 text-[17px] leading-relaxed ${light ? "text-white/80" : "text-slate-600"}`}>{sub}</p>}
    </div>
  );
}

/* -------- Area icons in the logo's illustrative style -------- */
export function AreaIcon({ k, size = 56 }: { k: string; size?: number }) {
  const s = { width: size, height: size };
  if (k === "shiksha")
    return (
      <svg viewBox="0 0 64 64" style={s} aria-hidden>
        <path d="M6 44 Q19 36 32 46 Q45 36 58 44 V50 Q45 42 32 52 Q19 42 6 50Z" fill="#fff" stroke="#1f3c9a" strokeWidth="3" strokeLinejoin="round" />
        <path d="M32 46 V30" stroke="#7a3e1b" strokeWidth="3" />
        <path d="M14 22 L32 14 L50 22 L32 30Z" fill="#1f3c9a" />
        <path d="M44 25 V34" stroke="#f39a1e" strokeWidth="3" strokeLinecap="round" />
        <circle cx="44" cy="36" r="2.5" fill="#f39a1e" />
      </svg>
    );
  if (k === "swachhata")
    return (
      <svg viewBox="0 0 64 64" style={s} aria-hidden>
        <path d="M40 6 L28 38" stroke="#7a3e1b" strokeWidth="4" strokeLinecap="round" />
        <path d="M20 36 L36 42 L30 58 Q18 56 12 50Z" fill="#e8621a" />
        <path d="M18 44 L30 48 M16 50 L27 54" stroke="#fff" strokeWidth="2" />
        <circle cx="48" cy="44" r="4" fill="#1e88e5" />
        <circle cx="54" cy="34" r="2.5" fill="#1e88e5" />
        <path d="M46 20 l2 -6 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2z" fill="#f39a1e" />
      </svg>
    );
  if (k === "paryavaran")
    return (
      <svg viewBox="0 0 64 64" style={s} aria-hidden>
        <path d="M32 58 V30" stroke="#7a3e1b" strokeWidth="4" strokeLinecap="round" />
        <path d="M32 34 Q14 34 12 16 Q30 14 32 34Z" fill="#3f9a3a" />
        <path d="M32 28 Q50 28 52 10 Q34 8 32 28Z" fill="#5cb54f" />
        <path d="M20 22 L30 31 M44 16 L34 26" stroke="#fff" strokeWidth="1.8" />
        <path d="M14 58 Q32 50 50 58" stroke="#e8621a" strokeWidth="4" fill="none" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg viewBox="0 0 64 64" style={s} aria-hidden>
      <path d="M32 54 C10 40 6 28 12 20 C18 12 28 14 32 22 C36 14 46 12 52 20 C58 28 54 40 32 54Z" fill="#d62828" />
      <path d="M14 34 H24 L28 26 L34 42 L38 32 H50" stroke="#fff" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

/* -------- Curved arch image frame (signature image treatment) -------- */
export function ArchImage({ src, alt, className = "", ring = "#f39a1e" }: { src: string; alt: string; className?: string; ring?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-2 rounded-t-[999px] rounded-b-[36px] border-[3px] border-dashed" style={{ borderColor: ring }} />
      <img src={src} alt={alt} className="relative w-full h-full object-cover rounded-t-[999px] rounded-b-[32px] shadow-xl" />
    </div>
  );
}

const LANGS: { code: string; label: string; en: string }[] = [
  { code: "en", label: "English", en: "English" },
  { code: "hi", label: "हिन्दी", en: "Hindi" },
  { code: "gu", label: "ગુજરાતી", en: "Gujarati" },
  { code: "mr", label: "मराठी", en: "Marathi" },
  { code: "bn", label: "বাংলা", en: "Bengali" },
  { code: "te", label: "తెలుగు", en: "Telugu" },
  { code: "kn", label: "ಕನ್ನಡ", en: "Kannada" },
  { code: "ta", label: "தமிழ்", en: "Tamil" },
  { code: "pa", label: "ਪੰਜਾਬੀ", en: "Punjabi" },
  { code: "or", label: "ଓଡ଼ିଆ", en: "Odia" },
  { code: "ml", label: "മലയാളം", en: "Malayalam" },
  { code: "ur", label: "اردو", en: "Urdu" },
];

function currentLang(): string {
  const m = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]+\/([^;]+)/);
  return m ? decodeURIComponent(m[1]) : "en";
}

function setLanguage(code: string) {
  const host = window.location.hostname;
  const domains = ["", host, "." + host, "." + host.split(".").slice(-2).join(".")];
  const expire = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  domains.forEach((d) => {
    const dom = d ? `;domain=${d}` : "";
    document.cookie = `googtrans=;path=/${dom};${expire}`;
    if (code !== "en") document.cookie = `googtrans=/en/${code};path=/${dom}`;
  });
  // Prefer switching live via the Google widget; fall back to reload.
  const sel = document.querySelector<HTMLSelectElement>("select.goog-te-combo");
  if (sel && code !== "en") {
    sel.value = code;
    sel.dispatchEvent(new Event("change"));
  } else {
    window.location.reload();
  }
}

let gtLoaded = false;
function loadGoogleTranslate() {
  if (gtLoaded || typeof window === "undefined") return;
  gtLoaded = true;
  (window as unknown as { googleTranslateElementInit: () => void }).googleTranslateElementInit = () => {
    const g = (window as unknown as { google?: { translate?: { TranslateElement: new (o: object, id: string) => unknown } } }).google;
    if (g?.translate) {
      new g.translate.TranslateElement(
        { pageLanguage: "en", includedLanguages: LANGS.map((l) => l.code).join(","), autoDisplay: false },
        "google_translate_element"
      );
    }
  };
  const sc = document.createElement("script");
  sc.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  sc.async = true;
  document.body.appendChild(sc);
}

export function Navbar({ page, go, scrolled = true }: { page: Page; go: (p: Page) => void; scrolled?: boolean }) {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [lang, setLang] = useState<string>(() => (typeof document !== "undefined" ? currentLang() : "en"));
  useEffect(() => { loadGoogleTranslate(); }, []);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => { if (!(e.target as HTMLElement).closest("[data-lang-menu]")) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);
  const active = LANGS.find((l) => l.code === lang) ?? LANGS[0];
  const links = NAV.filter((n) => n.id !== "contact");
  return (
    <header className={`sticky top-0 z-50 px-3 sm:px-5 pt-3 pb-2 transition-colors duration-300 ${scrolled ? `backdrop-blur-md ${page === "home" ? "bg-[#f6f1ec]/70" : "bg-paper/85"}` : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto bg-white rounded-[22px] shadow-[0_10px_30px_-14px_rgba(18,48,122,.35)] ring-1 ring-[#e3ebf7] pl-3 sm:pl-4 pr-2 h-[68px] flex items-center justify-between gap-3">
        <button onClick={() => go("home")} className="shrink-0"><Logo size={52} /></button>
        <nav className="hidden xl:flex items-center gap-1.5">
          {links.map((n) => (
            <button key={n.id} onClick={() => go(n.id)}
              className={`press px-4 h-10 rounded-full text-[14px] font-semibold whitespace-nowrap transition ${page === n.id ? "bg-azure text-white shadow-md shadow-blue-200" : "bg-[#f3f6fb] text-navy ring-1 ring-[#e3ebf7] hover:bg-white hover:text-azure hover:ring-azure/40"}`}>
              {n.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div id="google_translate_element" className="hidden" aria-hidden />
          <div className="relative notranslate" data-lang-menu translate="no">
            <button onClick={() => setOpen(!open)} aria-label="Change language" className="flex items-center gap-1.5 px-3 h-10 rounded-full bg-[#f3f6fb] ring-1 ring-[#e3ebf7] text-azure font-semibold text-sm hover:ring-azure/40 hover:bg-white transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></svg>
              <span className="hidden sm:inline">{active.label}</span>
              <span className="text-[10px] opacity-70">▾</span>
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl ring-1 ring-black/5 p-2 z-50">
                <div className="px-3 pt-1 pb-2 text-[11px] font-bold uppercase tracking-[.18em] text-slate-400">Choose language</div>
                <div className="grid grid-cols-2 gap-1">
                  {LANGS.map((l) => (
                    <button key={l.code} onClick={() => { setLang(l.code); setOpen(false); setLanguage(l.code); }}
                      className={`text-left px-3 py-2 rounded-xl text-sm leading-tight ${l.code === lang ? "bg-blue-50 text-azure font-bold" : "text-navy hover:bg-slate-50"}`}>
                      <span className="block">{l.label}</span>
                      <span className="block text-[10px] text-slate-400 font-normal">{l.en}</span>
                    </button>
                  ))}
                </div>
                <div className="px-3 pt-2 pb-1 text-[10px] text-slate-400">Automatic translation by Google</div>
              </div>
            )}
          </div>
          <button onClick={() => go("contact")}
            className={`hidden sm:inline-flex items-center gap-2 pl-1.5 pr-4 h-11 rounded-full bg-gradient-to-r from-[#ff9a2e] to-[#f2611c] text-white font-bold text-sm shadow-lg shadow-orange-200 hover:brightness-105 transition ${page === "contact" ? "ring-2 ring-offset-2 ring-[#f2541a]" : ""}`}>
            <span className="w-8 h-8 rounded-full bg-white/20 grid place-items-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" /></svg>
            </span>
            Contact Us
          </button>
          <button className="press xl:hidden w-10 h-10 grid place-items-center rounded-full bg-[#f3f6fb] ring-1 ring-[#e3ebf7] text-navy" onClick={() => setMenu(!menu)} aria-label="Menu">☰</button>
        </div>
      </div>
      {menu && (
        <div className="xl:hidden max-w-7xl mx-auto mt-2 bg-white rounded-[22px] shadow-lg ring-1 ring-[#e3ebf7] p-3 grid sm:grid-cols-2 gap-1.5">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => { go(n.id); setMenu(false); }}
              className={`text-left px-4 h-11 rounded-full font-semibold ${page === n.id ? "bg-azure text-white" : n.id === "contact" ? "bg-orange-50 text-flame" : "bg-[#f3f6fb] text-navy"}`}>
              {n.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

export function Footer({ go }: { go: (p: Page) => void }) {
  return (
    <footer className="relative bg-[#0b1f4d] text-white mt-0 overflow-hidden">
      {/* Wavy top edge */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[99%] leading-none pointer-events-none" aria-hidden>
        <svg viewBox="0 0 1440 80" className="w-full h-12 md:h-16 block" preserveAspectRatio="none">
          <path d="M0 80 C240 20 480 0 720 30 C960 60 1200 10 1440 40 L1440 80 Z" fill="#0b1f4d" />
        </svg>
      </div>

<svg className="absolute bottom-10 left-0 w-44 sm:w-56 text-[#1d3d8f] opacity-40 pointer-events-none" viewBox="0 0 200 90" fill="currentColor" aria-hidden><path d="M0 90V72h28V60h12V48h10V34h8l6-18 6 18h8v14h10v12h12v12h28v20z" /><path d="M64 16V4l12 4z" /></svg>
      <svg className="absolute bottom-10 right-0 w-44 sm:w-56 text-[#1d3d8f] opacity-40 pointer-events-none -scale-x-100" viewBox="0 0 200 90" fill="currentColor" aria-hidden><path d="M0 90V72h28V60h12V48h10V34h8l6-18 6 18h8v14h10v12h12v12h28v20z" /><path d="M64 16V4l12 4z" /></svg>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-5 pt-12 sm:pt-16 pb-8 sm:pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white grid place-items-center shadow-md shrink-0 overflow-hidden">
                <Emblem size={44} />
              </div>
              <div className="leading-tight pt-0.5">
                <div className="font-display font-extrabold text-[15px] sm:text-[17px] text-white tracking-tight">इंपीरिकल शिक्षा अभियान समिति</div>
                <div className="mt-1 flex items-center gap-2 text-[11px] sm:text-[12px] text-[#f0b429] font-semibold">
                  <span className="w-5 sm:w-6 h-px bg-[#f0b429]/70" />
                  शिक्षा से सेवा
                  <span className="w-5 sm:w-6 h-px bg-[#f0b429]/70" />
                </div>
              </div>
            </div>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-2.5">
              <a href="https://www.youtube.com/@empiricalinstituteabhiyan" target="_blank" rel="noopener noreferrer" title="YouTube" className="w-9 h-9 rounded-full bg-[#ff0000] grid place-items-center hover:opacity-90 transition" aria-label="YouTube">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.8 15.5v-7l6.3 3.5-6.3 3.5z"/></svg>
              </a>
              <a href="#" title="Facebook" className="w-9 h-9 rounded-full bg-[#1877f2] grid place-items-center hover:opacity-90 transition" aria-label="Facebook">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/></svg>
              </a>
              <a href="https://www.instagram.com/empirical_institute/" target="_blank" rel="noopener noreferrer" title="Instagram" className="w-9 h-9 rounded-full bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] grid place-items-center hover:opacity-90 transition" aria-label="Instagram">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-3.2 1.7-4.8 4.9-4.9 1.3-.1 1.7-.1 4.9-.1zM12 0C8.7 0 8.3 0 7 .1 2.7.3.3 2.7.1 7 0 8.3 0 8.7 0 12s0 3.7.1 5c.2 4.3 2.6 6.7 6.9 6.9 1.3.1 1.7.1 5 .1s3.7 0 5-.1c4.3-.2 6.7-2.6 6.9-6.9.1-1.3.1-1.7.1-5s0-3.7-.1-5C23.7 2.7 21.3.3 17 .1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.5a1.4 1.4 0 1 1-2.9 0 1.4 1.4 0 0 1 2.9 0z"/></svg>
              </a>
              <a href={`https://wa.me/91${PHONE}`} target="_blank" rel="noopener noreferrer" title="WhatsApp" className="w-9 h-9 rounded-full bg-[#25d366] grid place-items-center hover:opacity-90 transition" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.1-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.5-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.5-.8-2-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.9 1.5.6 2.1.7 2.9.6.4-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1 0-.1-.2-.2-.5-.3z"/><path d="M12 2a10 10 0 0 0-8.7 14.9L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.2.8.9-3.1-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-[#f0b429] text-[17px] font-display">Quick Links</h4>
            <div className="mt-1.5 w-8 h-0.5 bg-[#f0b429] rounded-full" />
            <ul className="mt-4 space-y-2.5 text-[14px] text-white/80">
              {NAV.map((n) => (
                <li key={n.id}>
                  <button onClick={() => go(n.id)} className="hover:text-[#f0b429] transition inline-flex items-center gap-1.5">
                    {n.label} <span className="text-[#f0b429]/80">→</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-[#f0b429] text-[17px] font-display">Contact</h4>
            <div className="mt-1.5 w-8 h-0.5 bg-[#f0b429] rounded-full" />
            <ul className="mt-4 space-y-3.5 text-[14px] text-white/85">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 w-5 h-5 rounded-full border border-[#f0b429]/60 grid place-items-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 text-[#f0b429]" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"/></svg>
                </span>
                <a href={`tel:${PHONE}`} className="hover:text-white">+91 {PHONE}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 w-5 h-5 rounded-full border border-[#f0b429]/60 grid place-items-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 text-[#f0b429]" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </span>
                <a href={`mailto:${EMAIL}`} className="hover:text-white break-all">{EMAIL}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 w-5 h-5 rounded-full border border-[#f0b429]/60 grid place-items-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 text-[#f0b429]" fill="currentColor"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.3 7 13 7 13s7-7.7 7-13c0-3.9-3.1-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
                </span>
                <span>Khandwa, Madhya Pradesh,<br />India</span>
              </li>
            </ul>
          </div>

          {/* Founders */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-[#f0b429] text-[17px] font-display">Founders</h4>
            <div className="mt-1.5 w-8 h-0.5 bg-[#f0b429] rounded-full" />
            <ul className="mt-4 space-y-2.5 text-[14px] text-white/90">
              {["Rahul Geete", "Jayram Malakar"].map((f) => (
                <li key={f}>
                  <button onClick={() => go("about")} className="hover:text-[#f0b429] transition">
                    {f}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center gap-2 text-[13px] text-[#f0b429]">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
              </svg>
              Registered 13 July 2026
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 py-5 text-center">
          <div className="flex items-center justify-center gap-3 text-[#f0b429] font-display text-[15px] font-semibold">
            <span className="w-12 h-px bg-[#f0b429]/50" />
            शिक्षा से सेवा
            <span className="w-12 h-px bg-[#f0b429]/50" />
          </div>
          <p className="mt-2 text-[13px] text-white/50">© 2026 Empirical Shiksha Abhiyan Samiti</p>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  sub,
  img,
  bg = "images/hero-landscape.png",
}: {
  eyebrow: string;
  title: ReactNode;
  sub: string;
  img?: string;
  bg?: string;
}) {
  return (
    <section className="relative overflow-hidden min-h-[320px] sm:min-h-[380px] md:min-h-[420px]">
      {/* Full-bleed hero background */}
      <div className="absolute inset-0" aria-hidden>
        <img src={bg} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
      </div>
      <div className="relative max-w-7xl mx-auto px-5 pt-12 pb-14 md:pt-16 md:pb-20 grid md:grid-cols-2 gap-8 items-center">
        <div className="rise">
          <p className="text-flame font-bold text-base">{eyebrow}</p>
          <h1 className="mt-4 font-display font-extrabold text-ink text-[36px] sm:text-[46px] lg:text-[52px] leading-[1.08] tracking-tight">{title}</h1>
          <Swoosh className="h-3 w-40 mt-3" />
          <p className="mt-6 text-[16px] sm:text-lg text-slate-700 max-w-lg leading-relaxed">{sub}</p>
        </div>
        {img ? (
          <div className="relative mx-auto w-full max-w-[340px] md:max-w-[420px] hidden md:block">
            <div className="absolute inset-[6%] rounded-full bg-white/40" aria-hidden />
            <RayDashes className="absolute -top-10 left-2 w-28 h-24 opacity-80" color="#ff9a2e" />
            <LeafBranch className="absolute -top-8 -right-2 w-32 opacity-90" />
            <div className="relative aspect-square bg-white/90 p-2.5 shadow-2xl rounded-full overflow-hidden ring-4 ring-white/80">
              <img src={img} alt="" className="w-full h-full object-cover rounded-full" />
            </div>
          </div>
        ) : (
          <div className="hidden md:block" />
        )}
      </div>
    </section>
  );
}
