import { Bi, readLang, useLang } from "./lang";
import { LANGUAGES } from "./locales";
import { setTranslationLanguage, startTranslationObserver } from "./translation";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  CalendarDays,
  Check,
  Cookie,
  FileText,
  HeartPulse,
  House,
  Images,
  Info,
  Layers,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Star,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

export type Page = "home" | "about" | "initiatives" | "initiative-detail" | "impact" | "gallery" | "success" | "stars" | "star-detail" | "contact" | "reports";
export const NAV: { id: Page; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "initiatives", label: "Initiatives" },
  { id: "impact", label: "Impact" },
  { id: "stars", label: "Our Stars" },
  { id: "gallery", label: "Gallery" },
  { id: "success", label: "Success Stories" },
  { id: "contact", label: "Contact Us" },
];
const NAV_HI: Record<string, string> = { home: "मुख्य पृष्ठ", about: "हमारे बारे में", initiatives: "हमारी पहलें", impact: "हमारा प्रभाव", stars: "हमारे सितारे", gallery: "गैलरी", success: "सफलता की कहानियाँ", contact: "संपर्क करें" };

export const PHONE = "7400845669";
export const EMAIL = "empiricalshikshaabhiyan@gmail.com";

export const AREAS = [
  { key: "shiksha", hi: "शिक्षा", name: "Shiksha", en: "Education", color: "#2B459E", tint: "#FBF3E4", img: "images/group-banner.webp" },
  { key: "swachhata", hi: "स्वच्छता", name: "Swachhata", en: "Cleanliness", color: "#D8501F", tint: "#FBE6C8", img: "images/clean-group-1.webp" },
  { key: "paryavaran", hi: "पर्यावरण", name: "Paryavaran", en: "Environment", color: "#3A7D44", tint: "#E4EED8", img: "images/init-environment.webp" },
  { key: "swasthya", hi: "मानसिक स्वास्थ्य", name: "Mansik Swasthya", en: "Mental Health", color: "#2B459E", tint: "#FBF3E4", img: "images/init-rally.webp" },
] as const;

/* -------- Official symbol mark; the organisation name is rendered as live text beside it. -------- */
export function Emblem({ size = 56 }: { size?: number }) {
  return <img src="images/empirical-mark.png" alt="" aria-hidden="true" width={Math.round(size * 1.62)} height={size} className="block object-contain" style={{ width: Math.round(size * 1.62), height: size }} loading="eager" />;
}

export function Logo({ size = 56 }: { size?: number; light?: boolean }) {
  return (
    <div className="flex shrink-0 items-center">
      <span className="grid shrink-0 place-items-center rounded-xl bg-white px-1 shadow-sm ring-1 ring-black/10" style={{ height: size, width: Math.round(size * 1.62) }}>
        <Emblem size={size - 6} />
      </span>
    </div>
  );
}

function BrandName({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`min-w-0 text-left leading-tight ${compact ? "max-w-[145px]" : "max-w-[220px]"}`}>
      <span className={`notranslate block font-extrabold tracking-tight text-[#24458E] ${compact ? "text-[13px] sm:text-[15px]" : "text-[15px] sm:text-[18px]"}`} translate="no">इंपीरिकल शिक्षा</span>
      <span className="notranslate mt-0.5 block font-bold text-[#E87912] text-[11px] sm:text-[12px]" translate="no">अभियान समिति</span>
    </span>
  );
}

/* -------- Decorative signature elements drawn from the logo -------- */
export function SunArc({ className = "", color = "#EE9B13" }: { className?: string; color?: string }) {
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

export function Swoosh(_props: { className?: string; color?: string }) {
  return null; // decorative underline removed site-wide
}

export function Eyebrow({ children, color = "#D8501F" }: { children: ReactNode; color?: string }) {
  return (
    <div className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[.2em]" style={{ color }}>
      <span className="w-6 h-[3px] rounded-full" style={{ background: color }} />
      {children}
    </div>
  );
}

export function SectionHead({ eyebrow, title, sub, center = false, light = false }: { eyebrow: ReactNode; title: ReactNode; sub?: ReactNode; center?: boolean; light?: boolean }) {
  return (
    <div className={center ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      <Eyebrow color={light ? "#F5C77A" : "#D8501F"}>{eyebrow}</Eyebrow>
      <h2 className={`mt-2 text-[32px] md:text-[42px] leading-[1.08] tracking-tight font-extrabold ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      <Swoosh className={`h-2.5 w-28 mt-2.5 ${center ? "mx-auto" : ""}`} color={light ? "#F5C77A" : "#EE9B13"} />
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
        <path d="M6 44 Q19 36 32 46 Q45 36 58 44 V50 Q45 42 32 52 Q19 42 6 50Z" fill="#fff" stroke="#2B459E" strokeWidth="3" strokeLinejoin="round" />
        <path d="M32 46 V30" stroke="#D8501F" strokeWidth="3" />
        <path d="M14 22 L32 14 L50 22 L32 30Z" fill="#2B459E" />
        <path d="M44 25 V34" stroke="#EE9B13" strokeWidth="3" strokeLinecap="round" />
        <circle cx="44" cy="36" r="2.5" fill="#EE9B13" />
      </svg>
    );
  if (k === "swachhata")
    return (
      <svg viewBox="0 0 64 64" style={s} aria-hidden>
        <path d="M40 6 L28 38" stroke="#D8501F" strokeWidth="4" strokeLinecap="round" />
        <path d="M20 36 L36 42 L30 58 Q18 56 12 50Z" fill="#D8501F" />
        <path d="M18 44 L30 48 M16 50 L27 54" stroke="#fff" strokeWidth="2" />
        <circle cx="48" cy="44" r="4" fill="#2B459E" />
        <circle cx="54" cy="34" r="2.5" fill="#2B459E" />
        <path d="M46 20 l2 -6 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2z" fill="#EE9B13" />
      </svg>
    );
  if (k === "paryavaran")
    return (
      <svg viewBox="0 0 64 64" style={s} aria-hidden>
        <path d="M32 58 V30" stroke="#D8501F" strokeWidth="4" strokeLinecap="round" />
        <path d="M32 34 Q14 34 12 16 Q30 14 32 34Z" fill="#3A7D44" />
        <path d="M32 28 Q50 28 52 10 Q34 8 32 28Z" fill="#3A7D44" />
        <path d="M20 22 L30 31 M44 16 L34 26" stroke="#fff" strokeWidth="1.8" />
        <path d="M14 58 Q32 50 50 58" stroke="#D8501F" strokeWidth="4" fill="none" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg viewBox="0 0 64 64" style={s} aria-hidden>
      <path d="M32 54 C10 40 6 28 12 20 C18 12 28 14 32 22 C36 14 46 12 52 20 C58 28 54 40 32 54Z" fill="#D8501F" />
      <path d="M14 34 H24 L28 26 L34 42 L38 32 H50" stroke="#fff" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

/* -------- Curved arch image frame (signature image treatment) -------- */
export function ArchImage({ src, alt, className = "", ring = "#EE9B13" }: { src: string; alt: string; className?: string; ring?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-2 rounded-t-[999px] rounded-b-[36px] border-[3px] border-dashed" style={{ borderColor: ring }} />
      <img src={src} alt={alt} className="relative w-full h-full object-cover rounded-t-[999px] rounded-b-[32px] shadow-xl" />
    </div>
  );
}

const LANGS = LANGUAGES;

function setLanguage(code: string) {
  try { window.localStorage.setItem("empirical-language", code); } catch { /* storage may be blocked */ }
  document.documentElement.lang = code;
  setTranslationLanguage(code);
  window.dispatchEvent(new Event("langchange"));
}

export function Navbar({ page, go, onPickArea, flat = false, activeColor, scrolled: _s = true, visible = true }: { page: Page; go: (p: Page) => void; onPickArea?: (key: string) => void; flat?: boolean; activeColor?: string; scrolled?: boolean; visible?: boolean }) {
  const [sub, setSub] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [lang, setLang] = useState<string>(() => readLang());
  useEffect(() => {
    const initial = readLang();
    document.documentElement.lang = initial;
    startTranslationObserver(initial);
    const syncLanguage = () => {
      const next = readLang();
      setLang(next);
      setTranslationLanguage(next);
    };
    window.addEventListener("langchange", syncLanguage);
    return () => {
      window.removeEventListener("langchange", syncLanguage);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => { if (!(e.target as HTMLElement).closest("[data-lang-menu]")) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);
  const active = LANGS.find((l) => l.code === lang) ?? LANGS[0];
  const links = NAV.filter((n) => n.id !== "contact");
  return (
    <header aria-hidden={!visible} className={`fixed inset-x-0 top-0 z-[70] ${flat ? "px-0 pt-0 bg-white shadow-[0_6px_20px_-12px_rgba(31,42,68,.4)]" : "px-3 sm:px-5 pt-2 bg-transparent"} pb-0 backdrop-blur-none transition-all duration-300 ease-out ${visible ? "translate-y-0 opacity-100" : "-translate-y-[115%] opacity-0 pointer-events-none"}`}>
      <div className={`${flat ? "max-w-[1320px] px-4 sm:px-7 lg:px-[4.5%] h-[68px]" : "max-w-7xl bg-white rounded-[22px] shadow-[0_10px_30px_-14px_rgba(31,42,68,.35)] ring-1 ring-[#F6EAD3] pl-3 sm:pl-4 pr-2 h-[68px]"} mx-auto flex items-center justify-between gap-3`}>
        <button onClick={() => go("home")} aria-label="Empirical Shiksha Abhiyan Samiti – Home" className="flex shrink-0 items-center gap-2.5 sm:gap-3"><Logo size={flat ? 54 : 48} /><BrandName compact /></button>
        <nav className="hidden xl:flex items-center gap-1">
          {links.map((n) => {
            const on = page === n.id || (n.id === "initiatives" && page === "initiative-detail") || (n.id === "stars" && page === "star-detail");
            const cls = `press px-3 h-10 rounded-full ${flat ? "text-[15px]" : "text-[14px]"} font-semibold whitespace-nowrap transition ${on ? "text-white shadow-md " + (flat && activeColor ? "" : "bg-azure shadow-blue-200") : flat ? "text-navy hover:bg-[#FBF3E4]" : "bg-[#FBF3E4] text-navy ring-1 ring-[#F6EAD3] hover:ring-azure/40"}`;
            if (n.id !== "initiatives" || !onPickArea) return <button key={n.id} onClick={() => go(n.id)} className={cls} style={on && flat && activeColor ? { background: activeColor } : undefined}><Bi en={n.label} hi={NAV_HI[n.id] || n.label} /></button>;
            return (
              <div key={n.id} className="relative" onMouseEnter={() => setSub(true)} onMouseLeave={() => setSub(false)}>
                <button onClick={() => { setSub(false); go(n.id); }} className={cls} style={on && flat && activeColor ? { background: activeColor } : undefined} aria-haspopup="true" aria-expanded={sub}><Bi en={n.label} hi={NAV_HI[n.id] || n.label} /> <span className="text-[10px] opacity-80">▾</span></button>
                {sub && (
                  <div className="absolute left-0 top-full z-50 pt-2"><div className="w-56 rounded-2xl bg-white p-2 shadow-xl ring-1 ring-black/5">
                    {AREAS.map((a) => <button key={a.key} onClick={() => { setSub(false); onPickArea(a.key); }} className="block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-navy hover:bg-[#FBF3E4]"><Bi en={a.en} hi={a.hi} /></button>)}
                  </div></div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <div className="relative" data-lang-menu>
            <button onClick={() => setOpen(!open)} aria-label="Change language" className="flex items-center gap-1.5 px-3 h-10 rounded-full bg-[#FBF3E4] ring-1 ring-[#F6EAD3] text-azure font-semibold text-sm hover:ring-azure/40 hover:bg-white transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></svg>
              <span className="hidden sm:inline">{active.label}</span>
              <span className="text-[10px] opacity-70">▾</span>
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl ring-1 ring-black/5 p-2 z-50">
                <div className="px-3 pt-1 pb-2 text-[11px] font-bold uppercase tracking-[.18em] text-slate-400"><Bi en="Choose language" hi="भाषा चुनें" /></div>
                <div className="grid grid-cols-2 gap-1">
                  {LANGS.map((l) => (
                    <button key={l.code} onClick={() => { setLang(l.code); setOpen(false); setLanguage(l.code); }}
                      className={`text-left px-3 py-2 rounded-xl text-sm leading-tight ${l.code === lang ? "bg-blue-50 text-azure font-bold" : "text-navy hover:bg-slate-50"}`}>
                      <span className="notranslate block" translate="no">{l.label}</span>
                      <span className="notranslate block text-[10px] text-slate-400 font-normal" translate="no">{l.en}</span>
                    </button>
                  ))}
                </div>
                
              </div>
            )}
          </div>
          <button onClick={() => go("contact")}
            className={`hidden sm:inline-flex items-center gap-2 pl-1.5 pr-4 h-11 rounded-full bg-[#EE9B13] text-white font-bold text-sm shadow-lg shadow-orange-200 hover:brightness-105 transition ${page === "contact" ? "ring-2 ring-offset-2 ring-[#D8501F]" : ""}`}>
            <span className="w-8 h-8 rounded-full bg-white/20 grid place-items-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" /></svg>
            </span>
            <Bi en="Contact Us" hi="संपर्क करें" />
          </button>
          <button className="press xl:hidden w-10 h-10 grid place-items-center rounded-full bg-[#FBF3E4] ring-1 ring-[#F6EAD3] text-navy" onClick={() => setMenu(!menu)} aria-label="Menu">☰</button>
        </div>
      </div>
      {menu && (
        <div className="lg:hidden max-w-7xl mx-auto mt-2 bg-white rounded-[22px] shadow-lg ring-1 ring-[#F6EAD3] p-3 grid sm:grid-cols-2 gap-1.5">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => { go(n.id); setMenu(false); }}
              className={`text-left px-4 h-11 rounded-full font-semibold ${page === n.id ? "bg-azure text-white" : n.id === "contact" ? "bg-orange-50 text-flame" : "bg-[#FBF3E4] text-navy"}`}>
              <Bi en={n.label} hi={NAV_HI[n.id] || n.label} />
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

export function Socials({ className = "mt-6" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
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
  );
}

const FOOTER_LINK_ICONS: Record<string, LucideIcon> = {
  home: House,
  about: Info,
  initiatives: Layers,
  impact: BarChart3,
  stars: Users,
  gallery: Images,
  success: Star,
  contact: Mail,
};

const FOOTER_INITIATIVES: { hi: string; en: string; sub: string; Icon: LucideIcon; tone: string }[] = [
  { hi: "शिक्षा", en: "Education", sub: "Learning for all", Icon: BookOpen, tone: "blue" },
  { hi: "स्वास्थ्य", en: "Health", sub: "Well-being", Icon: HeartPulse, tone: "rose" },
  { hi: "पर्यावरण", en: "Environment", sub: "A greener Khandwa", Icon: Leaf, tone: "green" },
  { hi: "सामाजिक जागरूकता", en: "Social Awareness", sub: "Stronger communities", Icon: UsersRound, tone: "violet" },
];

function FooterLandscape() {
  return (
    <svg className="emp-footer-landscape" viewBox="0 0 2048 190" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="footerHill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3B9A63" />
          <stop offset="1" stopColor="#14563F" />
        </linearGradient>
        <linearGradient id="footerCream" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF7E8" />
          <stop offset="1" stopColor="#F8EBD5" />
        </linearGradient>
        <linearGradient id="footerGold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#E6B84F" />
          <stop offset=".5" stopColor="#FFF0BA" />
          <stop offset="1" stopColor="#DDA641" />
        </linearGradient>
      </defs>
      {/* distant landscape silhouettes */}
      <g fill="#174B6D" opacity=".78">
        <path d="M0 155V139h34v-15h15v-16h18v-25h8l8-22 8 22h8v25h18v16h18v15h34v16z" />
        <path d="M80 63v-19l10-7 10 7v19M72 63V47h36v16" />
        <path d="M372 153c18-14 36-15 54-1 13-18 34-19 50-3 17-16 39-15 54 4h28v15H340v-15z" />
        <path d="M405 151v-30l20-18 20 18v30h-11v-19h-18v19zM488 151v-27l18-14 18 14v27h-10v-17h-16v17z" />
        <path d="M1743 150c14-20 33-22 47-2 13-14 32-13 44 2h28v15h-136v-15z" />
      </g>
      {/* left tree */}
      <g fill="#0B5874" opacity=".8">
        <path d="M93 143c-3-24 0-39 5-55-16 4-27-4-28-19 14 1 23 7 29 18-2-19 4-35 17-48 12 19 15 34 10 51 9-12 21-17 34-15-4 17-15 26-33 26 7 15 9 29 8 42z" />
        <path d="M121 111h8v48h-8z" />
      </g>
      {/* right moon and people */}
      <circle cx="1836" cy="65" r="29" fill="#FFE2A0" opacity=".95" />
      <g fill="#082D49" stroke="#082D49" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="1705" cy="95" r="5" /><path d="M1704 102l-3 20 10 10m-8-30-9 14m11 6-3 17m7-17 8 16" fill="none" />
        <circle cx="1740" cy="88" r="5" /><path d="M1740 95l-2 20 11 10m-9-30-8 14m8 6-2 17m7-17 8 15" fill="none" />
        <circle cx="1775" cy="80" r="5" /><path d="M1775 87l-2 20 11 10m-9-30-8 14m8 6-2 17m7-17 8 15" fill="none" />
      </g>
      {/* right tree */}
      <g fill="#07546A" opacity=".88">
        <path d="M1930 141c-5-19-2-35 7-49-17 1-28-8-27-23 17 1 27 7 33 20 1-18 10-32 25-42 9 18 9 34 1 49 13-10 26-12 39-6-8 16-21 23-39 20 4 12 5 23 3 34z" />
        <path d="M1959 106h8v53h-8z" />
      </g>
      {/* layered green hills */}
      <path d="M0 118C138 105 176 147 312 137c136-10 184-49 331-32 128 15 194 42 328 27 141-16 207-49 359-34 150 15 221 36 344 16 141-22 238-40 374-15v91H0z" fill="#0A314C" opacity=".95" />
      <path d="M0 127C155 94 246 146 369 133c122-13 183-29 289-17 128 15 196 47 339 29 145-18 200-49 350-32 126 14 223 38 346 21 133-18 239-52 355-20v76H0z" fill="url(#footerHill)" />
      <path d="M0 127C155 94 246 146 369 133c122-13 183-29 289-17 128 15 196 47 339 29 145-18 200-49 350-32 126 14 223 38 346 21 133-18 239-52 355-20" fill="none" stroke="url(#footerGold)" strokeWidth="5" />
      {/* cream cut edge: two independent smooth layers create the sliding paper edge */}
      <path d="M0 145C128 133 204 171 330 159c132-13 182-36 307-23 126 13 194 45 325 29 131-16 206-26 318-13 131 15 218 27 338 9 145-21 269-25 430 5v24H0z" fill="#FFEECF" />
      <path d="M0 153C145 145 207 179 346 169c126-9 203-29 316-17 134 15 208 38 333 26 135-13 205-21 324-9 155 16 239 27 365 5 146-26 256-20 364 1v15H0z" fill="url(#footerCream)" />
      <path d="M0 145C128 133 204 171 330 159c132-13 182-36 307-23 126 13 194 45 325 29 131-16 206-26 318-13 131 15 218 27 338 9 145-21 269-25 430 5" fill="none" stroke="#E8C77D" strokeWidth="3" />
    </svg>
  );
}

const FOOTER_EMAIL_PLACEHOLDER: Record<string, string> = {
  en: "Enter your email address",
  hi: "अपना ईमेल दर्ज करें",
  gu: "તમારું ઇમેઇલ દાખલ કરો",
  mr: "तुमचा ईमेल पत्ता टाका",
  bn: "আপনার ইমেল ঠিকানা লিখুন",
  te: "మీ ఇమెయిల్ చిరునామాను నమోదు చేయండి",
  kn: "ನಿಮ್ಮ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ",
  ta: "உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடவும்",
  pa: "ਆਪਣਾ ਈਮੇਲ ਪਤਾ ਦਰਜ ਕਰੋ",
  or: "ଆପଣଙ୍କ ଇମେଲ୍ ଠିକଣା ଦିଅନ୍ତୁ",
  ml: "നിങ്ങളുടെ ഇമെയിൽ വിലാസം നൽകുക",
  ur: "اپنا ای میل پتہ درج کریں",
};

const FOOTER_HI_NAV: Partial<Record<Page, string>> = {
  home: "मुखपृष्ठ",
  about: "परिचय",
  initiatives: "हमारी पहलें",
  impact: "प्रभाव",
  stars: "हमारे सितारे",
  gallery: "चित्र दीर्घा",
  success: "सफलता की कहानियाँ",
  contact: "संपर्क करें",
};

export function Footer({ go }: { go: (p: Page) => void; variant?: string }) {
  const [emailInput, setEmailInput] = useState("");
  const language = useLang();
  const isHindi = language === "hi";
  const handleUpdatesSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = emailInput.trim();
    if (!email) return;
    const subject = encodeURIComponent("Email updates subscription request");
    const body = encodeURIComponent(`Please contact me with Empirical Shiksha Abhiyan updates.\nMy email address: ${email}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setEmailInput("");
  };
  const policyMail = (topic: string) => `mailto:${EMAIL}?subject=${encodeURIComponent(`${topic} request`)}`;

  return (
    <footer className="emp-footer relative mt-0 overflow-hidden text-white">
      <div className="emp-footer-top relative">
        <div className="emp-footer-ocean" aria-hidden="true" />
        <div className="emp-footer-wave emp-footer-wave-one" aria-hidden="true">
          <svg viewBox="0 0 2048 150" preserveAspectRatio="none"><path d="M0 0H2048V34C1890 75 1790 14 1625 28c-164 14-213 62-395 47C1048 62 1000-5 830 8 670 20 620 70 440 48 260 26 180 74 0 37Z" fill="#087C95" fillOpacity=".42"/><path d="M0 0H2048V12c-190 53-292 1-440 20-151 20-211 69-376 54C1055 70 1004 10 840 20 681 30 611 76 451 62 286 47 156 77 0 52Z" fill="#0B5874" fillOpacity=".7"/></svg>
        </div>
        <div className="emp-footer-wave emp-footer-wave-two" aria-hidden="true">
          <svg viewBox="0 0 2048 150" preserveAspectRatio="none"><path d="M0 0H2048V8c-171 46-285 12-422 34-157 24-228 74-395 58-170-16-222-88-385-75-152 12-220 66-380 50C300 59 170 77 0 46Z" fill="#10A4B5" fillOpacity=".18"/></svg>
        </div>

        <div className="emp-footer-content relative z-10 mx-auto w-[92%] max-w-[1880px]">
          <div className="emp-footer-grid grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-[1.42fr_.78fr_1.08fr_1fr_1.08fr] lg:gap-0">
            {/* Brand */}
            <section className="emp-footer-brand min-w-0 lg:pr-8">
              <div className="emp-footer-brand-lockup flex items-center gap-4">
                <div className="emp-footer-mark shrink-0">
                  <img src="images/empirical-mark.png" alt="Empirical Shiksha Abhiyan logo" />
                </div>
                <div className="emp-footer-brand-copy min-w-0">
                  <h3 className="emp-footer-brand-title notranslate font-display font-extrabold leading-[1.12] text-white" translate="no">इंपीरिकल शिक्षा</h3>
                  <div className="emp-footer-brand-tagline notranslate mt-1 font-bold text-[#FFAD25]" translate="no">अभियान समिति</div>
                </div>
              </div>
              <p className="emp-footer-description mt-5 max-w-[500px] text-white/85">
                <Bi en="Working with rural and underserved communities through education, health, environment and social awareness." hi="शिक्षा, स्वास्थ्य, पर्यावरण और सामाजिक जागरूकता के माध्यम से ग्रामीण एवं वंचित समुदायों के साथ सकारात्मक बदलाव की पहल।" />
              </p>
              <Socials className="footer-socials mt-7" />
            </section>

            {/* Quick links */}
            <section className="emp-footer-column min-w-0 lg:border-l lg:border-white/15 lg:px-7">
              <h4 className="emp-footer-heading font-display font-extrabold text-white"><Bi en="Quick Links" hi="त्वरित लिंक" /></h4>
              <span className="emp-footer-underline mt-2.5 block" />
              <ul className="emp-footer-quick-list mt-3 space-y-1.5">
                {NAV.map((item) => {
                  const Icon = FOOTER_LINK_ICONS[item.id] || ArrowUpRight;
                  return (
                    <li key={item.id}>
                      <button onClick={() => go(item.id)} className="emp-footer-quicklink group flex w-full items-center gap-3 text-left text-white/90 transition hover:text-[#FFB52E]">
                        <span className="emp-footer-quickicon grid shrink-0 place-items-center"><Icon size={18} strokeWidth={2.1} /></span>
                        <span className="min-w-0 flex-1"><Bi en={item.label} hi={FOOTER_HI_NAV[item.id] || item.label} /></span>
                        <ArrowUpRight size={16} className="shrink-0 text-[#FFAC22] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Initiatives */}
            <section className="emp-footer-column min-w-0 lg:border-l lg:border-white/15 lg:px-7">
              <h4 className="emp-footer-heading font-display font-extrabold text-white"><Bi en="Our Initiatives" hi="हमारी पहलें" /></h4>
              <span className="emp-footer-underline mt-2.5 block" />
              <div className="emp-footer-initiative-grid mt-4 grid grid-cols-2 gap-2.5">
                {FOOTER_INITIATIVES.map(({ hi, en, sub, Icon, tone }) => (
                  <button key={en} onClick={() => go("initiatives")} className={`emp-footer-initiative emp-footer-initiative-${tone} group flex min-w-0 flex-col items-center justify-center text-center`} aria-label={`${en} initiatives`}>
                    <span className="emp-footer-initiative-icon grid place-items-center transition-transform group-hover:-translate-y-1"><Icon size={32} strokeWidth={2.2} /></span>
                    <span className="mt-2 text-[17px] font-extrabold leading-tight text-white"><Bi en={en} hi={hi} /></span>
                    <span className="mt-0.5 text-[12px] leading-tight text-white/75"><Bi en={sub} hi={tone === "blue" ? "सभी के लिए शिक्षा" : tone === "rose" ? "स्वस्थ जीवन" : tone === "green" ? "हरित पर्यावरण" : "सशक्त समुदाय"} /></span>
                  </button>
                ))}
              </div>
            </section>

            {/* Contact */}
            <section className="emp-footer-column min-w-0 lg:border-l lg:border-white/15 lg:px-7">
              <h4 className="emp-footer-heading font-display font-extrabold text-white"><Bi en="Contact Us" hi="संपर्क करें" /></h4>
              <span className="emp-footer-underline mt-2.5 block" />
              <ul className="emp-footer-contact mt-4 space-y-2.5">
                <li className="flex min-w-0 items-center gap-3.5">
                  <span className="emp-footer-contact-icon"><Phone size={22} /></span>
                  <a href={`tel:+91${PHONE}`} className="min-w-0 break-words text-white/95 hover:text-[#FFB52E]">+91 {PHONE}</a>
                </li>
                <li className="flex min-w-0 items-center gap-3.5">
                  <span className="emp-footer-contact-icon"><Mail size={22} /></span>
                  <a href={`mailto:${EMAIL}`} className="min-w-0 break-all text-white/95 hover:text-[#FFB52E]">{EMAIL}</a>
                </li>
                <li className="flex min-w-0 items-start gap-3.5">
                  <span className="emp-footer-contact-icon mt-0.5"><MapPin size={23} /></span>
                  <span className="min-w-0 text-white/95"><Bi en={<>Khandwa, Madhya Pradesh,<br />India</>} hi={<>खंडवा, मध्य प्रदेश,<br />भारत</>} /></span>
                </li>
              </ul>
              <div className="emp-footer-contact-divider my-4" />
              <div className="flex items-center gap-3.5 text-[#FFB52E]">
                <span className="emp-footer-contact-icon"><CalendarDays size={22} /></span>
                <span className="text-[14px] font-bold leading-snug"><Bi en="Registered 13 July 2026" hi="पंजीकरण: 13 जुलाई 2026" /></span>
              </div>
            </section>

            {/* Stay connected */}
            <section className="emp-footer-column min-w-0 lg:border-l lg:border-white/15 lg:pl-7">
              <h4 className="emp-footer-heading font-display font-extrabold text-white"><Bi en="Stay Connected" hi="जुड़े रहें" /></h4>
              <span className="emp-footer-underline mt-2.5 block" />
              <p className="emp-footer-connect-copy mt-4 text-white/85"><Bi en="Get updates on our work, programmes and upcoming activities." hi="हमारे कार्यों, कार्यक्रमों और आगामी गतिविधियों की जानकारी पाएं।" /></p>
              <form className="emp-footer-subscribe mt-4 flex items-center" onSubmit={handleUpdatesSubmit}>
                <label className="sr-only" htmlFor="footer-updates-email">Your email address</label>
                <Mail size={22} className="ml-4 shrink-0 text-[#526174]" />
                <input id="footer-updates-email" type="email" required value={emailInput} onChange={(event) => setEmailInput(event.target.value)} placeholder={FOOTER_EMAIL_PLACEHOLDER[language] ?? FOOTER_EMAIL_PLACEHOLDER.en} className="min-w-0 flex-1 bg-transparent px-3 text-[15px] text-[#1F2A44] outline-none placeholder:text-[#657286]" />
                <button type="submit" aria-label={isHindi ? "ईमेल अपडेट अनुरोध भेजें" : "Send email update request"} className="emp-footer-send grid h-[54px] w-[62px] shrink-0 place-items-center"><Send size={23} /></button>
              </form>
              <div className="emp-footer-update-points mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-[12px] text-white/80">
                {[
                  { en: "Programme updates", hi: "कार्यक्रम अपडेट" },
                  { en: "New initiatives", hi: "नई पहलें" },
                  { en: "Success stories", hi: "सफलता की कहानियाँ" },
                ].map((label) => (
                  <span key={label.en} className="inline-flex items-center gap-1.5"><Check size={14} className="shrink-0 text-[#18BD83]" strokeWidth={3} /><Bi en={label.en} hi={label.hi} /></span>
                ))}
              </div>
            </section>
          </div>
        </div>

        <FooterLandscape />
        <div className="emp-footer-signature" aria-label="Empirical Shiksha Abhiyan Samiti">
          <svg viewBox="0 0 110 52" className="emp-footer-signature-book" aria-hidden="true">
            <path d="M55 40c-12-11-28-12-45-7V8c17-5 33-2 45 9 12-11 28-14 45-9v25c-17-5-33-4-45 7Z" fill="#FFF1C7" stroke="#D99520" strokeWidth="3" strokeLinejoin="round" />
            <path d="M55 17v23M14 15c14-3 27 0 36 8M96 15c-14-3-27 0-36 8" fill="none" stroke="#284A83" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M10 6l7 2M100 6l-7 2" stroke="#FFB32C" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <div className="emp-footer-signature-pill">
            <span className="emp-footer-leaf" aria-hidden="true">❧</span>
            <span className="notranslate" translate="no">इंपीरिकल शिक्षा अभियान समिति</span>
            <span className="emp-footer-leaf emp-footer-leaf-right" aria-hidden="true">❧</span>
          </div>
        </div>
      </div>

      {/* warm paper legal strip below the layered landscape cut */}
      <div className="emp-footer-legal relative z-20">
        <div className="mx-auto flex w-[92%] max-w-[1880px] flex-col items-center justify-between gap-3 py-3 sm:flex-row">
          <p className="text-center text-[14px] font-semibold text-[#172D4E] sm:text-left"><Bi en="© 2026 Empirical Shiksha Abhiyan Samiti. All rights reserved." hi="© 2026 इंपीरिकल शिक्षा अभियान समिति। सर्वाधिकार सुरक्षित।" /></p>
          <nav aria-label="Legal links" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[14px] font-semibold text-[#172D4E] sm:gap-x-6">
            <a className="emp-footer-legal-link" href={policyMail("Privacy Policy")}><ShieldCheck size={19} /><Bi en="Privacy Policy" hi="गोपनीयता नीति" /></a>
            <span className="hidden h-6 w-px bg-[#8B8A80] sm:block" aria-hidden="true" />
            <a className="emp-footer-legal-link" href={policyMail("Terms and Conditions")}><FileText size={19} /><Bi en="Terms &amp; Conditions" hi="नियम एवं शर्तें" /></a>
            <span className="hidden h-6 w-px bg-[#8B8A80] sm:block" aria-hidden="true" />
            <a className="emp-footer-legal-link" href={policyMail("Cookie Policy")}><Cookie size={19} /><Bi en="Cookie Policy" hi="कुकी नीति" /></a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

const HERO_BG_SLIDES = [
  "images/clean-group-1.webp",
  "images/group-banner.webp",
  "images/init-environment.webp",
  "images/init-rally.webp",
  "images/team-gloves.webp",
  "images/clean-group-2.webp",
];

const HERO_BOX_SLIDES = [
  { src: "images/clean-group-1.webp", label: "Kund Cleanup Drive" },
  { src: "images/init-environment.webp", label: "Harit Khandwa Drive" },
  { src: "images/group-banner.webp", label: "Team & Volunteers" },
  { src: "images/init-rally.webp", label: "Cleanliness Rally" },
  { src: "images/team-gloves.webp", label: "Together for Change" },
  { src: "images/clean-group-2.webp", label: "Community Cleaning" },
];

export function PageHero({
  eyebrow,
  title,
  sub,
  img,
  bg = "images/group-banner.webp",
  actions,
}: {
  eyebrow: string;
  title: ReactNode;
  sub: string;
  img?: string;
  bg?: string;
  /** Optional button row under the description (used by Impact). */
  actions?: ReactNode;
}) {
  const [bgIdx, setBgIdx] = useState(0);
  const [boxIdx, setBoxIdx] = useState(0);

  // Background swaps every 2.5s (like Initiatives)
  useEffect(() => {
    const t = setInterval(() => setBgIdx((i) => (i + 1) % HERO_BG_SLIDES.length), 2500);
    return () => clearInterval(t);
  }, []);

  // Box images swap every 2.5s (like About)
  useEffect(() => {
    const t = setInterval(() => setBoxIdx((i) => (i + 1) % HERO_BOX_SLIDES.length), 2500);
    return () => clearInterval(t);
  }, []);

  const boxSlides = img
    ? [{ src: img, label: "" }, ...HERO_BOX_SLIDES.filter((s) => s.src !== img)]
    : HERO_BOX_SLIDES;

  return (
    <section className="relative overflow-hidden min-h-[320px] sm:min-h-[380px] md:min-h-[420px]">
      {/* Full-bleed auto-swapping hero background */}
      <div className="absolute inset-0" aria-hidden>
        {HERO_BG_SLIDES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
            style={{ opacity: i === bgIdx ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-white/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/15 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 pt-12 pb-14 md:pt-16 md:pb-20 grid md:grid-cols-2 gap-8 items-center">
        <div className="rise">
          <p className="text-flame font-bold text-base hero-text-p">{eyebrow}</p>
          <h1 className="mt-4 font-display font-extrabold text-ink text-[36px] sm:text-[46px] lg:text-[52px] leading-[1.08] tracking-tight hero-text-h">{title}</h1>
          <Swoosh className="h-3 w-40 mt-3" />
          <p className="mt-6 text-[16px] sm:text-lg text-slate-800 max-w-lg leading-relaxed hero-text-p">{sub}</p>
          {actions ? <div className="mt-7 flex flex-wrap items-center gap-3">{actions}</div> : null}
        </div>

        {/* About-style rounded box with auto-swapping photos */}
        <div className="relative mx-auto w-full max-w-[420px] aspect-[5/4] hidden md:block">
          <div className="absolute inset-0 rounded-[40%] bg-gradient-to-br from-[#F6EAD3]/50 to-[#F8D7A3]/30 blur-2xl" />
          <div className="absolute inset-0 rounded-[28px] overflow-hidden shadow-xl ring-4 ring-white bg-slate-100">
            {boxSlides.map((s, i) => (
              <div
                key={s.src + i}
                className="absolute inset-0 transition-all duration-700 ease-in-out"
                style={{
                  opacity: i === boxIdx % boxSlides.length ? 1 : 0,
                  transform: i === boxIdx % boxSlides.length ? "scale(1)" : "scale(1.06)",
                  zIndex: i === boxIdx % boxSlides.length ? 2 : 1,
                }}
              >
                <img src={s.src} alt={s.label || ""} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                {s.label ? (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/95 text-[12px] font-bold text-ink shadow whitespace-nowrap">
                    {s.label}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          {/* dots */}
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {boxSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setBoxIdx(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === boxIdx % boxSlides.length ? "w-6 bg-[#D8501F]" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
