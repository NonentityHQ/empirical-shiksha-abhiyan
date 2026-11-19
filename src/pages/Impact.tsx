import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { CountUp } from "../ui";
import { PageHero, type Page } from "../shared";
import { Bi, useLang } from "../lang";
import { YOUTUBE_VIDEOS } from "../data";
import { useBeforeAfter, type BAItem } from "../cms";

/* ---- small inline icons used only on this page ---- */
const Icon = {
  cap: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 10 L12 5 L21 10 L12 15 Z" />
      <path d="M7 12v4c0 1.5 2.2 3 5 3s5-1.5 5-3v-4" />
      <path d="M21 10v6" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 19.5V6.5c0-.8.5-1.5 1.2-1.8L12 2l6.8 2.7c.7.3 1.2 1 1.2 1.8v13" />
      <path d="M4 19.5 12 16l8 3.5" />
      <path d="M12 2v14" />
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22V11" />
      <path d="M12 11c-5 0-8-4-8-8 5 0 8 4 8 8z" />
      <path d="M12 11c5 0 8-4 8-8-5 0-8 4-8 8z" />
    </svg>
  ),
  bin: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 7h16" />
      <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      <path d="M6 7l1 13h10l1-13" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  ),
  books: (
    <svg viewBox="0 0 64 64" className="w-14 h-14" aria-hidden>
      <rect x="8" y="18" width="18" height="34" rx="2" fill="#2B459E" />
      <rect x="28" y="12" width="16" height="40" rx="2" fill="#2B459E" />
      <rect x="46" y="20" width="12" height="32" rx="2" fill="#F4B93E" />
      <path d="M11 24h12M11 30h12M31 18h10M31 24h10" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  broom: (
    <svg viewBox="0 0 64 64" className="w-14 h-14" aria-hidden>
      <path d="M38 8 L24 40" stroke="#D8501F" strokeWidth="4" strokeLinecap="round" />
      <path d="M16 38 L34 46 L28 58 Q14 54 10 46 Z" fill="#D8501F" />
      <path d="M18 46 L28 50M16 50 L26 54" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="44" cy="18" r="3" fill="#F4B93E" />
      <circle cx="50" cy="28" r="2.2" fill="#F4B93E" />
      <path d="M48 12l1.5-4 1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5z" fill="#F4B93E" />
    </svg>
  ),
  seedling: (
    <svg viewBox="0 0 64 64" className="w-14 h-14" aria-hidden>
      <path d="M32 58 V30" stroke="#D8501F" strokeWidth="4" strokeLinecap="round" />
      <path d="M32 34 Q14 34 12 16 Q30 14 32 34Z" fill="#3A7D44" />
      <path d="M32 28 Q50 28 52 10 Q34 8 32 28Z" fill="#3A7D44" />
      <path d="M14 58 Q32 50 50 58" stroke="#D8501F" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </svg>
  ),
  brain: (
    <svg viewBox="0 0 64 64" className="w-14 h-14" aria-hidden>
      <path d="M32 12c-8 0-14 5-14 12 0 2-.5 4-2 5-3 2-4 5-4 8 0 6 5 11 12 11h4v6h8v-6h2c8 0 14-6 14-13 0-4-2-7-5-9 1-2 2-4 2-7 0-7-6-12-15-12z" fill="#C2456B" />
      <path d="M28 28c0-4 2-7 6-7M36 36c3 0 5-2 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21.4l8.8-8.7a5 5 0 0 0 0-7.1z" />
    </svg>
  ),
  pulse: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 12h4l2-5 3 10 2-5h5" />
    </svg>
  ),
  recycle: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 19H4.5a1.5 1.5 0 0 1-1.3-2.3L7 10" />
      <path d="M7 10V6.5L10.5 8" />
      <path d="M17 5h2.5a1.5 1.5 0 0 1 1.3 2.3L17 14" />
      <path d="M17 14v3.5L13.5 16" />
      <path d="M9.5 20.5 12 22l2.5-1.5" />
    </svg>
  ),
  people: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="9" cy="8" r="3" />
      <circle cx="16" cy="9" r="2.5" />
      <path d="M3 19c0-3 2.5-5 6-5s6 2 6 5" />
      <path d="M15 19c0-2 1.5-3.5 4-3.5s3.5 1.5 3.5 3.5" />
    </svg>
  ),
  bulb: (
    <svg viewBox="0 0 72 72" className="w-16 h-16" aria-hidden>
      <rect x="18" y="48" width="36" height="16" rx="3" fill="#EE9B13" />
      <rect x="22" y="44" width="28" height="6" rx="2" fill="#F4B93E" />
      <path d="M36 8c-9 0-16 7-16 16 0 6 3 11 8 14v6h16v-6c5-3 8-8 8-14 0-9-7-16-16-16z" fill="#F4B93E" />
      <path d="M30 28h12M33 22h6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

/* ------------------------------------------------------------------ */
const ytThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const ytUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

const PlayBadge = ({ size = "lg" }: { size?: "lg" | "sm" }) => (
  <span className={`grid place-items-center rounded-full bg-white/95 text-[#D8501F] shadow-xl ring-4 ring-white/40 transition group-hover:scale-110 ${size === "lg" ? "w-16 h-16" : "w-12 h-12"}`}>
    <svg viewBox="0 0 24 24" className={size === "lg" ? "w-7 h-7 ml-1" : "w-5 h-5 ml-0.5"} fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
  </span>
);

const DurationChip = ({ children }: { children: ReactNode }) => (
  <span className="absolute left-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-black/65 px-2.5 py-1 text-[11px] font-bold text-white">
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden><path d="M4 7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2.6l4-2.4v9.6l-4-2.4V17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" /></svg>
    {children}
  </span>
);

function LeafOrnament({ flip = false }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 48 20" className={`w-10 h-5 text-[#3A7D44] ${flip ? "-scale-x-100" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <path d="M2 10h26" />
      <path d="M28 10c4-6 10-8 18-7-1 8-7 12-18 7z" fill="currentColor" fillOpacity=".18" />
    </svg>
  );
}

function SectionTitle({ children, sub }: { children: ReactNode; sub?: ReactNode }) {
  return (
    <div className="text-center mb-6">
      <div className="flex items-center justify-center gap-3">
        <LeafOrnament />
        <h2 className="font-display font-extrabold text-[24px] sm:text-[28px] text-[#1F2A44]">{children}</h2>
        <LeafOrnament flip />
      </div>
      {sub ? <p className="mt-1.5 text-[13px] sm:text-[14px] text-slate-600">{sub}</p> : null}
    </div>
  );
}

/* ================= BEFORE / AFTER (content comes from Sanity) ================= */
function BeforeAfterSlider({ item }: { item: BAItem }) {
  const lang = useLang();
  const [pos, setPos] = useState(item.start);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  useEffect(() => setPos(item.start), [item.id, item.start]);

  const move = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r || !r.width) return;
    setPos(Math.min(97, Math.max(3, ((clientX - r.left) / r.width) * 100)));
  };
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    move(e.clientX);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => { if (dragging.current) move(e.clientX); };
  const onUp = () => { dragging.current = false; };
  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const step = e.shiftKey ? 15 : 5;
    if (e.key === "ArrowLeft") { e.preventDefault(); setPos((p) => Math.max(3, p - step)); }
    else if (e.key === "ArrowRight") { e.preventDefault(); setPos((p) => Math.min(97, p + step)); }
    else if (e.key === "Home") { e.preventDefault(); setPos(3); }
    else if (e.key === "End") { e.preventDefault(); setPos(97); }
  };

  const beforeLabel = item.beforeLabel || (lang === "hi" ? "पहले" : "Before");
  const afterLabel = item.afterLabel || (lang === "hi" ? "बाद में" : "After");

  return (
    <div
      ref={box}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-[20px] bg-slate-300 ring-4 ring-white/90 shadow-2xl cursor-ew-resize select-none"
      style={{ touchAction: "pan-y" }}
    >
      {/* AFTER sits underneath, BEFORE is revealed from the left up to the handle */}
      <img src={item.after.src} alt={item.after.alt} draggable={false} className="absolute inset-0 h-full w-full object-cover" />
      <img src={item.before.src} alt={item.before.alt} draggable={false} className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />

      <span className={`pointer-events-none absolute left-3 bottom-3 rounded-full bg-black/65 px-3.5 py-1.5 text-[12px] font-bold text-white transition-opacity ${pos < 16 ? "opacity-0" : "opacity-100"}`}>{beforeLabel}</span>
      <span className={`pointer-events-none absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-[#3A7D44] px-3.5 py-1.5 text-[12px] font-bold text-white shadow transition-opacity ${pos > 84 ? "opacity-0" : "opacity-100"}`}>
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12l5 5 9-10" /></svg>
        {afterLabel}
      </span>

      <div className="pointer-events-none absolute inset-y-0 w-[3px] -ml-[1.5px] bg-white" style={{ left: `${pos}%`, boxShadow: "0 0 12px rgba(0,0,0,.35)" }} />
      <button
        type="button"
        role="slider"
        aria-label={lang === "hi" ? "पहले और बाद की तस्वीर की तुलना" : "Compare before and after"}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={onKey}
        className="absolute top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#0B4A4F] shadow-xl ring-4 ring-white/50 focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#EE9B13]"
        style={{ left: `${pos}%` }}
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M9 7l-5 5 5 5M15 7l5 5-5 5" /></svg>
      </button>
    </div>
  );
}

function BeforeAfterBand() {
  const lang = useLang();
  const { items } = useBeforeAfter();
  const [idx, setIdx] = useState(0);
  useEffect(() => { if (idx >= items.length) setIdx(0); }, [items.length, idx]);
  if (!items.length) return null;

  const item = items[Math.min(idx, items.length - 1)];
  const many = items.length > 1;
  const t = (en?: string, hi?: string) => (lang === "hi" && hi ? hi : en);
  const go = (d: number) => setIdx((i) => (i + d + items.length) % items.length);

  return (
    <section aria-label={lang === "hi" ? "पहले और बाद" : "Before and after"} className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0B4A4F] via-[#0D5659] to-[#093B42] text-white shadow-xl">
      {/* soft temple silhouette */}
      <svg viewBox="0 0 200 140" className="pointer-events-none absolute -left-4 bottom-0 w-[300px] text-white opacity-[.07]" fill="currentColor" aria-hidden>
        <path d="M100 6c-4 0-6 3-6 6v6c-18 4-34 20-36 38H42v10H30v8h140v-8h-12V56h-16c-2-18-18-34-36-38v-6c0-3-2-6-6-6zM30 80h140v12H30zm-8 12h156v10H22zm-8 10h172v12H14zm-8 12h188v10H6z" />
      </svg>

      <div className="relative grid gap-6 lg:gap-10 p-5 sm:p-8 lg:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center">
        <div>
          <div className="flex items-center gap-2 text-[#F4B93E] font-bold text-[15px] sm:text-[17px]">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>
            <span>{t(item.kicker, item.kickerHi)}</span>
          </div>
          <h2 className="mt-2 font-display font-extrabold text-[34px] sm:text-[44px] lg:text-[48px] leading-[1.05] text-[#FFC83D]">{t(item.title, item.titleHi)}</h2>
          {item.description || item.descriptionHi ? (
            <p className="mt-3 max-w-md text-[14px] sm:text-[15px] leading-relaxed text-white/85">{t(item.description, item.descriptionHi)}</p>
          ) : null}
          {item.date ? <p className="mt-2 text-[12px] font-semibold uppercase tracking-wider text-white/60">{item.date}</p> : null}

          {many && (
            <div className="mt-6 flex items-center gap-3">
              <button type="button" onClick={() => go(-1)} className="grid h-10 w-10 place-items-center rounded-full bg-white/15 hover:bg-white/25 transition" aria-label={lang === "hi" ? "पिछला" : "Previous"}>
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <div className="flex items-center gap-2" role="tablist">
                {items.map((it, i) => (
                  <button key={it.id} type="button" role="tab" aria-selected={i === idx} aria-label={t(it.title, it.titleHi)} onClick={() => setIdx(i)} className={`h-2.5 rounded-full transition-all ${i === idx ? "w-7 bg-[#FFC83D]" : "w-2.5 bg-white/40 hover:bg-white/70"}`} />
                ))}
              </div>
              <button type="button" onClick={() => go(1)} className="grid h-10 w-10 place-items-center rounded-full bg-white/15 hover:bg-white/25 transition" aria-label={lang === "hi" ? "अगला" : "Next"}>
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M9 18l6-6-6-6" /></svg>
              </button>
              <span className="text-[12px] font-semibold text-white/60 tabular-nums">{idx + 1} / {items.length}</span>
            </div>
          )}
          <p className="mt-5 text-[12px] text-white/55"><Bi en="Drag the handle to compare." hi="तुलना के लिए बीच के हैंडल को खींचिए।" /></p>
        </div>

        <BeforeAfterSlider key={item.id} item={item} />
      </div>
    </section>
  );
}

/* ================= STORY CARD (quote) ================= */
const STORIES = [
  { quote: "Joining the Eklavya Batch gave me confidence in my studies. I am no longer afraid to ask questions.", name: "Priya S.", role: "Eklavya Batch Student", img: "images/group-banner.webp" },
  { quote: "The weekly clean-up at Rameshwar Kund taught us that change begins with small, consistent habits.", name: "Amit K.", role: "Volunteer · Swachhata", img: "images/clean-group-1.webp" },
  { quote: "After a conversation about phone dependency, I reduced my screen time. Both my sleep and studies improved.", name: "Rohan M.", role: "Mental Health Session", img: "images/init-rally.webp" },
];

function StoryCard() {
  const [i, setI] = useState(0);
  const s = STORIES[i];
  return (
    <section className="relative rounded-[24px] bg-white p-5 sm:p-6 shadow-lg ring-1 ring-black/[0.05] flex flex-col h-full">
      <span className="font-display text-[56px] leading-[.6] text-[#D8501F]" aria-hidden>&ldquo;</span>
      <p className="mt-2 font-display font-bold text-[16px] sm:text-[17px] leading-snug text-[#1F2A44] flex-1">{s.quote}</p>
      <div className="mt-4 flex items-center gap-3">
        <img src={s.img} alt="" className="h-12 w-12 rounded-full object-cover ring-2 ring-[#FBE6C8]" />
        <div className="min-w-0">
          <div className="font-bold text-[14px] text-[#1F2A44]">{s.name}</div>
          <div className="text-[12px] text-slate-500">{s.role}</div>
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-1.5">
        {STORIES.map((_, idx) => (
          <button key={idx} type="button" onClick={() => setI(idx)} className={`h-2 rounded-full transition-all ${idx === i ? "w-6 bg-[#D8501F]" : "w-2 bg-slate-300"}`} aria-label={`Story ${idx + 1}`} />
        ))}
      </div>
    </section>
  );
}

/* ================= VOICES FROM THE GROUND ================= */
function VoicesCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };
  const many = YOUTUBE_VIDEOS.length > 3;
  const arrow = `absolute top-[38%] z-10 hidden ${many ? "sm:grid" : "sm:grid lg:hidden"} h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-[#1F2A44] shadow-lg ring-1 ring-black/5 hover:bg-flame hover:text-white transition`;
  return (
    <section>
      <SectionTitle sub={<Bi en="Real stories from students, volunteers and community members." hi="विद्यार्थियों, स्वयंसेवकों और समुदाय के लोगों की असली कहानियाँ।" />}>
        <Bi en="Voices from the Ground" hi="ज़मीन से आवाज़ें" />
      </SectionTitle>
      <div className="relative">
        <button type="button" onClick={() => scroll(-1)} className={`${arrow} left-1`} aria-label="Previous videos">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button type="button" onClick={() => scroll(1)} className={`${arrow} right-1`} aria-label="Next videos">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M9 18l6-6-6-6" /></svg>
        </button>
        <div ref={track} className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {YOUTUBE_VIDEOS.map((v) => (
            <a key={v.id} href={ytUrl(v.videoId)} target="_blank" rel="noopener noreferrer" className={`group snap-start shrink-0 w-[78%] sm:w-[calc(50%-8px)] ${many ? "lg:w-[calc(25%-12px)]" : "lg:w-[calc(33.333%-11px)]"} overflow-hidden rounded-[20px] bg-white shadow-md ring-1 ring-black/[0.05] hover:shadow-xl transition`}>
              <div className="relative aspect-video overflow-hidden bg-slate-200">
                <img src={ytThumb(v.videoId)} onError={(e) => { e.currentTarget.src = v.img; }} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 grid place-items-center bg-black/15"><PlayBadge size="sm" /></div>
                <DurationChip>{v.duration}</DurationChip>
              </div>
              <div className="p-3.5">
                <div className="font-bold text-[14px] leading-snug text-[#1F2A44] line-clamp-1">{v.subtitle}</div>
                <div className="mt-0.5 text-[12px] text-slate-500 line-clamp-1">{v.title}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= PAGE ================= */
export default function Impact({ go }: { go: (p: Page) => void }) {
  const link = (page: Page) => (e: React.MouseEvent) => { e.preventDefault(); go(page); };
  const feature = YOUTUBE_VIDEOS[0];

  return (
    <>
      {/* Hero — same hero as before; only two buttons added under the text */}
      <PageHero
        eyebrow="Our Impact"
        title={
          <>
            The work, <span className="text-flame">as it happens</span>
          </>
        }
        sub="Real numbers from real activities — no invented figures. Where stories are still being collected, we say so."
        img="images/clean-group-2.webp"
        bg="images/group-banner.webp"
        actions={
          <>
            <a href="#/initiatives" onClick={link("initiatives")} className="inline-flex h-12 items-center gap-2 rounded-full bg-[#0B4A4F] px-6 text-[14px] font-bold text-white shadow-md hover:brightness-110 transition">
              <Bi en="Explore Our Work" hi="हमारा काम देखें" /> <span aria-hidden>→</span>
            </a>
            <a href="#/reports" onClick={link("reports")} className="inline-flex h-12 items-center gap-2 rounded-full border-2 border-[#0B4A4F]/70 bg-white/80 px-5 text-[14px] font-bold text-[#0B4A4F] hover:bg-white transition">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 4v11M7 11l5 5 5-5M5 20h14" /></svg>
              <Bi en="Download Impact Report" hi="प्रभाव रिपोर्ट डाउनलोड करें" />
            </a>
          </>
        }
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-5 pb-14 space-y-10 md:space-y-14">
        {/* ===== Stats bar ===== */}
        <section className="relative z-10 -mt-6 md:-mt-10 rounded-[24px] bg-white/95 shadow-xl ring-1 ring-black/[0.05]">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-200/80">
            {[
              { n: "1,000+", color: "#2B459E", en: "Students Consulted", hi: "परामर्श पाने वाले विद्यार्थी", icon: Icon.cap },
              { n: "80+", color: "#D8501F", en: "Education Beneficiaries", hi: "शिक्षा लाभार्थी", icon: Icon.book },
              { n: "60+", color: "#3A7D44", en: "Volunteers Active", hi: "सक्रिय स्वयंसेवक", icon: Icon.people },
              { n: "25+", color: "#EE9B13", en: "Cleanups Conducted", hi: "सफ़ाई अभियान", icon: Icon.leaf },
            ].map((s) => (
              <div key={s.en} className="flex items-center justify-center gap-3 sm:gap-4 px-3 py-5 sm:py-6">
                <div className="shrink-0 scale-125" style={{ color: s.color }}>{s.icon}</div>
                <div>
                  <div className="font-display font-extrabold text-[24px] sm:text-[30px] leading-none text-[#1F2A44]"><CountUp value={s.n} /></div>
                  <div className="mt-1 text-[12px] sm:text-[13px] font-semibold leading-tight text-slate-600"><Bi en={s.en} hi={s.hi} /></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Our Key Initiatives ===== */}
        <section>
          <SectionTitle sub={<Bi en="Focused efforts for a cleaner, healthier and more aware Khandwa." hi="एक स्वच्छ, स्वस्थ और अधिक जागरूक खंडवा के लिए केंद्रित प्रयास।" />}>
            <Bi en="Our Key Initiatives" hi="हमारी प्रमुख पहलें" />
          </SectionTitle>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {[
              { en: "Education", hi: "शिक्षा", subEn: "Learning for All", subHi: "सबके लिए शिक्षा", grad: "from-[#E3EEFB] to-[#F7FAFF]", tc: "#2B459E", icon: Icon.books },
              { en: "Cleanliness", hi: "स्वच्छता", subEn: "Cleaner, Healthier Spaces", subHi: "स्वच्छ, स्वस्थ स्थान", grad: "from-[#FDE7C8] to-[#FFF6E8]", tc: "#D8501F", icon: Icon.broom },
              { en: "Environment", hi: "पर्यावरण", subEn: "A Greener Khandwa", subHi: "हरा-भरा खंडवा", grad: "from-[#DDEFD3] to-[#F3FAEE]", tc: "#3A7D44", icon: Icon.seedling },
              { en: "Mental Health", hi: "मानसिक स्वास्थ्य", subEn: "Awareness & Support", subHi: "जागरूकता और सहयोग", grad: "from-[#F8D5DF] to-[#FEF0F4]", tc: "#C2456B", icon: Icon.brain },
            ].map((t) => (
              <a key={t.en} href="#/initiatives" onClick={link("initiatives")} className={`group relative flex min-h-[132px] flex-col justify-between rounded-[22px] bg-gradient-to-br ${t.grad} p-4 sm:p-5 shadow-md ring-1 ring-black/[0.04] transition hover:-translate-y-1 hover:shadow-xl`}>
                <div>{t.icon}</div>
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <div className="font-display font-extrabold text-[17px] sm:text-[20px] leading-tight" style={{ color: t.tc }}><Bi en={t.en} hi={t.hi} /></div>
                    <div className="mt-0.5 text-[12px] sm:text-[13px] text-slate-600"><Bi en={t.subEn} hi={t.subHi} /></div>
                  </div>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white shadow transition group-hover:translate-x-0.5" style={{ color: t.tc }} aria-hidden>
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ===== Video + Eklavya Batch + quote ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-stretch">
          <a href={ytUrl(feature.videoId)} target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden rounded-[24px] shadow-lg lg:col-span-5 min-h-[240px]">
            <img src={ytThumb(feature.videoId)} onError={(e) => { e.currentTarget.src = feature.img; }} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
            <div className="absolute inset-0 grid place-items-center"><PlayBadge /></div>
            <DurationChip>{feature.duration}</DurationChip>
          </a>

          <section className="lg:col-span-4 flex flex-col justify-center">
            <div className="flex items-center gap-2.5">
              <span className="text-[#D8501F]" aria-hidden>
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10 L12 5 L21 10 L12 15 Z" /><path d="M7 12v4c0 1.5 2.2 3 5 3s5-1.5 5-3v-4" /></svg>
              </span>
              <h2 className="font-display font-extrabold text-[24px] sm:text-[28px] text-[#1F2A44] leading-tight"><Bi en="The Eklavya Batch" hi="एकलव्य बैच" /></h2>
            </div>
            <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-slate-600">
              <Bi en="Regular academic support for students from middle-class and economically disadvantaged families." hi="मध्यमवर्गीय और आर्थिक रूप से कमज़ोर परिवारों के विद्यार्थियों के लिए नियमित शैक्षणिक सहायता।" />
            </p>
            <a href="#/initiatives" onClick={link("initiatives")} className="mt-5 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-[#0B4A4F] px-6 text-[14px] font-bold text-white shadow-md hover:brightness-110 transition">
              <Bi en="Know More" hi="और जानें" /> <span aria-hidden>→</span>
            </a>
          </section>

          <div className="lg:col-span-3"><StoryCard /></div>
        </div>

        {/* ===== BEFORE / AFTER (editable in Sanity → "Before & After") ===== */}
        <BeforeAfterBand />

        {/* ===== Voices from the Ground ===== */}
        <VoicesCarousel />

        {/* ===== Be a Part of the Change ===== */}
        <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#FDEBCB] via-[#FFF4E2] to-[#FFFAF2] shadow-md ring-1 ring-black/[0.04]">
          <div className="grid items-center gap-0 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
            <div className="relative h-[220px] md:h-full md:min-h-[290px]">
              <img src="images/real-group.webp" alt="Empirical Shiksha volunteers together" className="absolute inset-0 h-full w-full object-cover" style={{ WebkitMaskImage: "linear-gradient(to right, #000 70%, transparent)", maskImage: "linear-gradient(to right, #000 70%, transparent)" }} />
            </div>
            <div className="p-6 sm:p-9">
              <h2 className="font-display font-extrabold text-[28px] sm:text-[36px] leading-tight text-[#1F2A44]">
                <Bi en="Be a Part of " hi="बदलाव का " /><span className="text-flame"><Bi en="the Change" hi="हिस्सा बनिए" /></span>
              </h2>
              <p className="mt-3 max-w-lg text-[14px] sm:text-[15px] leading-relaxed text-slate-600">
                <Bi en="Join our efforts to make Khandwa cleaner, healthier and more aware through education and community action." hi="शिक्षा और सामुदायिक प्रयासों के ज़रिए खंडवा को स्वच्छ, स्वस्थ और अधिक जागरूक बनाने की हमारी मुहिम से जुड़िए।" />
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#/contact" onClick={link("contact")} className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#F28A1B] to-[#D8501F] px-6 text-[14px] font-bold text-white shadow-lg hover:brightness-110 transition">
                  <span className="text-[#FFE3A3]" aria-hidden>{Icon.bulb && <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" /></svg>}</span>
                  <Bi en="Share Your Idea" hi="अपना विचार साझा करें" /> <span aria-hidden>→</span>
                </a>
                <a href="#/contact" onClick={link("contact")} className="inline-flex h-12 items-center gap-2 rounded-full border-2 border-[#0B4A4F] bg-white px-6 text-[14px] font-bold text-[#0B4A4F] hover:bg-[#0B4A4F] hover:text-white transition">
                  <span aria-hidden>{Icon.people}</span>
                  <Bi en="Become a Volunteer" hi="स्वयंसेवक बनिए" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
