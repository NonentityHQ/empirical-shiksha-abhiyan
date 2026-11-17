import { Bi } from "../lang";
import { AIcon } from "../icons";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AREAS, AreaIcon, Eyebrow, SectionHead, SunArc, Swoosh, type Page } from "../shared";
import { MEDIA, INSTAGRAM_REELS, YOUTUBE_VIDEOS, YT_CHANNEL, IG_PROFILE, IG_HANDLE } from "../data";
import { AboutHills, Books, CardWave, CellDoodle, CloudDoodle, Diya, HeartShape, HeroHills, Leaf, LeafBranch, Pin, RayDashes, Skyline, SoftClouds, Sprout } from "../decor";

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now(), dur = 1600;
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref} className="notranslate" translate="no">{v.toLocaleString("en-IN")}{suffix}</span>;
}

/** Fixed circular frames with a gentle crossfade between real project photos. */
function SwapPhoto({ images, alt, className = "" }: { images: string[]; alt: string; className?: string }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (images.length < 2) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % images.length), 3200);
    return () => window.clearInterval(timer);
  }, [images.length]);
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={index === active ? alt : ""}
          aria-hidden={index !== active}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out"
          style={{ opacity: index === active ? 1 : 0 }}
        />
      ))}
    </div>
  );
}

export const STATS = [
  { to: 1000, suffix: "+", label: "Students Consulted", note: "on phone addiction & mental well-being", color: "#2B459E", k: "swasthya" },
  { to: 80, suffix: "+", label: "Eklavya Batch Students", note: "from middle-class & low-income families", color: "#D8501F", k: "shiksha" },
  { to: 60, suffix: "+", label: "Volunteers", note: "giving their time every week", color: "#3A7D44", k: "paryavaran" },
  { to: 25, suffix: "+", label: "Cleanup Visits & Drives", note: "across kunds, stadium & fair grounds", color: "#D8501F", k: "swachhata" },
];

const AREA_COPY: Record<string, string> = {
  shiksha: "The Eklavya Batch gives free, regular academic support to students who need it most.",
  swachhata: "Weekly cleaning at Rameshwar Kund and drives at public places across Khandwa.",
  paryavaran: "Caring for the kunds, green spaces and shared places that belong to all of us.",
  swasthya: "Phone-addiction and mental well-being awareness sessions for students.",
};


const HERO_AREAS = [
  { hi: "शिक्षा", en: "Education", bg: "#FBF3E4", bd: "#F6EAD3", fg: "#2B459E",
    icon: <><path d="M3 5.5C5.5 4.5 8.5 4.5 12 6.5c3.5-2 6.5-2 9-1V19c-2.5-1-5.5-1-9 1-3.5-2-6.5-2-9-1Z" fill="#2B459E" fillOpacity=".15" stroke="#2B459E" strokeWidth="1.8" strokeLinejoin="round" /><path d="M12 6.5V20" stroke="#2B459E" strokeWidth="1.8" /></> },
  { hi: "स्वच्छता", en: "Cleanliness", bg: "#E4EED8", bd: "#E4EED8", fg: "#3A7D44",
    icon: <><path d="M20 3 12 11.5" stroke="#EE9B13" strokeWidth="2" strokeLinecap="round" /><path d="M11.5 11 4.5 15l2.8 5.8 6.4-4.6Z" fill="#3A7D44" /><path d="M7 17.5l3.5-2.3M8.5 19.5l3.3-2.4" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" /></> },
  { hi: "पर्यावरण", en: "Environment", bg: "#FBE6C8", bd: "#F8D7A3", fg: "#D8501F",
    icon: <><path d="M4.5 19.5C4.5 10.5 10 5 20 4c0 10-5.5 15.5-15.5 15.5Z" fill="#3A7D44" /><path d="M5 19 14.5 9.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></> },
  { hi: "मानसिक स्वास्थ्य", en: "Mental Health", bg: "#FBF3E4", bd: "#EBDCBC", fg: "#2B459E",
    icon: <><path d="M12 20.5C5 16 2.5 12.2 3.5 8.6 4.4 5.4 8.6 4.3 12 7.6c3.4-3.3 7.6-2.2 8.5 1 1 3.6-1.5 7.4-8.5 11.9Z" fill="#2B459E" /><path d="M5 12h3.5l1.5-2.5 2 5 1.5-2.5H19" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></> },
];

const WORK_SLIDES = [
  { label: "Cleanliness Drive", icon: "broom", color: "#2E9E45", img: "images/clean-group-1.webp" },
  { label: "Education Activity", icon: "cap", color: "#2B459E", img: "images/group-banner.webp" },
  { label: "Plantation Drive", icon: "sprout", color: "#2E9E45", img: "images/real-plant.webp" },
  { label: "Community Outreach", icon: "users", color: "#2B459E", img: "images/init-rally.webp" },
  { label: "Awareness Rally", icon: "heart", color: "#2E9E45", img: "images/real-group.webp" },
  { label: "Kund Cleanup", icon: "recycle", color: "#F5A524", img: "images/real-kund.webp" },
] as const;

/* 3D cover-flow: the centre photo is big and flat, the neighbours tilt and shrink away. */
function PhotoStrip({ go }: { go: (p: Page) => void }) {
  const n = WORK_SLIDES.length;
  const [cur, setCur] = useState(2);
  const [hover, setHover] = useState(false);
  const drag = useRef<number | null>(null);
  const next = () => setCur((c) => (c + 1) % n);
  const prev = () => setCur((c) => (c - 1 + n) % n);

  useEffect(() => {
    if (hover || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(next, 1600);
    return () => window.clearInterval(t);
  }, [hover, n]);

  return (
    <div className="relative overflow-x-clip">
      <div className="pointer-events-none absolute inset-x-0 -top-12 -bottom-14" aria-hidden>
        <SoftClouds className="block w-full h-full" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5">
        {/* heading row */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <span className="text-[#2E9E45]"><AIcon n="images" s={46} /></span>
          <div>
            <h2 className="font-display text-[30px] font-extrabold leading-none text-[#14213D] sm:text-[38px]">
              Our <span className="text-[#2E9E45]">Work</span> in Action
            </h2>
            <svg viewBox="0 0 220 10" preserveAspectRatio="none" className="mt-1 h-2.5 w-[200px]" aria-hidden><path d="M2 7C50 1 130 1 218 6" stroke="#F26A1B" strokeWidth="3.5" fill="none" strokeLinecap="round" /></svg>
          </div>
          <p className="hidden border-l-2 border-slate-300 pl-5 text-[15px] text-[#25324F] md:block"><Bi en="Real moments from our initiatives, drives and community activities." hi="हमारी पहलों, अभियानों और सामुदायिक गतिविधियों के असली पल।" /></p>
          <div className="ml-auto flex gap-3">
            <button onClick={prev} aria-label="Previous photo" className="cf-arrow"><AIcon n="back" s={20} /></button>
            <button onClick={next} aria-label="Next photo" className="cf-arrow"><AIcon n="arrow" s={20} /></button>
          </div>
        </div>

        {/* stage */}
        <div className="cf-stage relative mt-6 h-[250px] sm:h-[320px] lg:h-[350px]" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
          onPointerDown={(e) => { drag.current = e.clientX; }}
          onPointerUp={(e) => { if (drag.current !== null) { const dx = e.clientX - drag.current; if (Math.abs(dx) > 50) (dx < 0 ? next : prev)(); } drag.current = null; }}>
          {WORK_SLIDES.map((s, i) => {
            let d = i - cur;
            if (d > n / 2) d -= n;
            if (d < -n / 2) d += n;
            const a = Math.abs(d);
            const vis = a <= 2;
            return (
              <button key={s.label} onClick={() => (d === 0 ? go("gallery") : setCur(i))} tabIndex={vis ? 0 : -1} aria-label={s.label}
                className="cf-card" data-active={d === 0 ? "1" : undefined}
                style={{
                  transform: `translateX(calc(-50% + ${d} * var(--cf-step))) translateZ(${-a * 90}px) rotateY(${d * -14}deg) rotate(${d * 2.5}deg) scale(${a === 0 ? 1 : a === 1 ? 0.8 : 0.64})`,
                  zIndex: 10 - a, opacity: vis ? 1 : 0, pointerEvents: vis ? "auto" : "none",
                }}>
                <img src={s.img} alt={s.label} loading="lazy" draggable={false} />
                <span className="cf-label"><span style={{ color: s.color }}><AIcon n={s.icon} s={18} /></span>{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* dots */}
        <div className="mt-4 flex justify-center gap-2">
          <div className="flex gap-2 rounded-full bg-white/70 px-3 py-1.5">
            {WORK_SLIDES.map((s, i) => (
              <button key={s.label} onClick={() => setCur(i)} aria-label={`Show ${s.label}`} className={`h-2.5 rounded-full transition-all ${i === cur ? "w-10 bg-[#2E9E45]" : "w-10 bg-slate-300 hover:bg-slate-400"}`} style={i === cur ? undefined : { width: 22 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Social Impact: Instagram Reels + YouTube ---------- */
function SocialImpact() {
  const igTrackRef = useRef<HTMLDivElement>(null);
  const ytTrackRef = useRef<HTMLDivElement>(null);
  const igX = useRef(0);
  const ytX = useRef(0);
  const [igPaused, setIgPaused] = useState(false);
  const [ytPaused, setYtPaused] = useState(false);

  // Instagram auto-scroll
  useEffect(() => {
    const track = igTrackRef.current;
    if (!track) return;
    let raf = 0;
    const speed = 0.45;
    const tick = () => {
      if (!igPaused) {
        igX.current -= speed;
        const half = track.scrollWidth / 2;
        if (Math.abs(igX.current) >= half) igX.current = 0;
        track.style.transform = `translate3d(${igX.current}px,0,0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [igPaused]);

  // YouTube auto-scroll
  useEffect(() => {
    const track = ytTrackRef.current;
    if (!track) return;
    let raf = 0;
    const speed = 0.4;
    const tick = () => {
      if (!ytPaused) {
        ytX.current -= speed;
        const half = track.scrollWidth / 2;
        if (Math.abs(ytX.current) >= half) ytX.current = 0;
        track.style.transform = `translate3d(${ytX.current}px,0,0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ytPaused]);

  const stepIg = (dir: 1 | -1) => {
    const track = igTrackRef.current;
    if (!track) return;
    const card = track.querySelector("a");
    const step = (card ? card.getBoundingClientRect().width : 160) + 16;
    igX.current -= dir * step;
    const half = track.scrollWidth / 2;
    if (igX.current > 0) igX.current = -(half - step);
    if (Math.abs(igX.current) >= half) igX.current = 0;
    track.style.transform = `translate3d(${igX.current}px,0,0)`;
  };

  const stepYt = (dir: 1 | -1) => {
    const track = ytTrackRef.current;
    if (!track) return;
    const card = track.querySelector("a");
    const step = (card ? card.getBoundingClientRect().width : 280) + 16;
    ytX.current -= dir * step;
    const half = track.scrollWidth / 2;
    if (ytX.current > 0) ytX.current = -(half - step);
    if (Math.abs(ytX.current) >= half) ytX.current = 0;
    track.style.transform = `translate3d(${ytX.current}px,0,0)`;
  };

  const reels = [...INSTAGRAM_REELS, ...INSTAGRAM_REELS];
  const videos = [...YOUTUBE_VIDEOS, ...YOUTUBE_VIDEOS];

  return (
    <section className="relative overflow-hidden py-14 md:py-20 bg-[#FFFBF1]">
      <div className="pointer-events-none absolute -left-24 top-10 w-72 h-72 rounded-full bg-[#F6EAD3]/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-20 w-80 h-80 rounded-full bg-[#F8D7A3]/30 blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 -top-8 w-56 h-56 rounded-full bg-[#EBDCBC]/25 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-5">
        {/* Section header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EE9B13] text-white text-[11px] font-bold uppercase tracking-[0.16em] shadow-sm">
            <span className="w-4 h-px bg-white/70" />
            Our Social Impact
            <span className="w-4 h-px bg-white/70" />
          </div>
          <h2 className="mt-3 md:mt-4 font-display font-extrabold text-[28px] sm:text-[34px] md:text-[42px] leading-[1.1] tracking-tight text-ink">
            Follow Our Journey{" "}
            <span className="text-royal">Online</span>
          </h2>
          <p className="mt-2.5 md:mt-3 text-[15px] md:text-[17px] text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Real stories, ground activities, and impact from our work — watch, follow, and be a part of the change.
          </p>
        </div>

        {/* ===== INSTAGRAM REELS BLOCK ===== */}
        <div className="relative rounded-[22px] md:rounded-[28px] overflow-hidden shadow-[0_20px_60px_-20px_rgba(31,42,68,0.35)] ring-1 ring-black/5">
          <div className="flex flex-col lg:flex-row min-h-[300px]">
            {/* Left promo — bigger logo + title */}
            <div className="relative lg:w-[300px] xl:w-[320px] shrink-0 bg-[#1F2A44] text-white p-7 sm:p-8 flex flex-col justify-center gap-5">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] grid place-items-center shadow-lg shrink-0">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-9 sm:h-9 text-white" fill="currentColor" aria-hidden>
                    <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-3.2 1.7-4.8 4.9-4.9 1.3-.1 1.7-.1 4.9-.1zM12 0C8.7 0 8.3 0 7 .1 2.7.3.3 2.7.1 7 0 8.3 0 8.7 0 12s0 3.7.1 5c.2 4.3 2.6 6.7 6.9 6.9 1.3.1 1.7.1 5 .1s3.7 0 5-.1c4.3-.2 6.7-2.6 6.9-6.9.1-1.3.1-1.7.1-5s0-3.7-.1-5C23.7 2.7 21.3.3 17 .1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.5a1.4 1.4 0 1 1-2.9 0 1.4 1.4 0 0 1 2.9 0z" />
                  </svg>
                </div>
                <div className="font-display font-extrabold text-[22px] sm:text-[26px] leading-tight tracking-tight">
                  Instagram{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#7A4A8E]">
                    Reels
                  </span>
                </div>
              </div>
              <p className="text-[14px] sm:text-[15px] text-white/80 leading-relaxed">
                Short stories, field updates and real moments from our initiatives.
              </p>
              <div>
                <a
                  href={IG_PROFILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 h-11 rounded-full bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white text-[14px] font-bold shadow-md hover:opacity-95 transition"
                >
                  Follow Us on Instagram
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                    <path d="M7 17L17 7M17 7H9M17 7v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <div className="mt-3 text-[13px] text-white/55 font-medium">{IG_HANDLE}</div>
              </div>
            </div>

            {/* Reels strip */}
            <div
              className="relative flex-1 bg-[#2B459E] overflow-hidden py-5 sm:py-6"
              onMouseEnter={() => setIgPaused(true)}
              onMouseLeave={() => setIgPaused(false)}
            >
              <div className="absolute inset-y-0 left-0 w-8 sm:w-12 bg-gradient-to-r from-[#2B459E] to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-8 sm:w-12 bg-gradient-to-l from-[#1F2A44] to-transparent z-10 pointer-events-none" />
              <div className="overflow-hidden px-2">
                <div ref={igTrackRef} className="flex gap-3 sm:gap-4 w-max will-change-transform">
                  {reels.map((reel, i) => (
                    <a
                      key={`${reel.id}-${i}`}
                      href={reel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative w-[140px] sm:w-[160px] md:w-[172px] shrink-0 rounded-2xl overflow-hidden shadow-lg ring-1 ring-white/10 hover:ring-white/30 transition"
                    >
                      <div className="aspect-[9/14] relative">
                        <img src={reel.img} alt={reel.title} className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-[1.04]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/20" />
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/45 backdrop-blur-sm text-white text-[11px] font-semibold">
                          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                          {reel.views}
                        </div>
                        <div className="absolute bottom-0 inset-x-0 p-2.5">
                          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold text-white mb-1.5" style={{ background: reel.badgeColor }}>
                            {reel.tag}
                          </span>
                          <div className="text-white text-[12px] sm:text-[13px] font-bold leading-tight drop-shadow">{reel.title}</div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              {/* Clickable arrows */}
              <button
                type="button"
                onClick={() => stepIg(-1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur grid place-items-center text-white transition shadow"
                aria-label="Previous reels"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button
                type="button"
                onClick={() => stepIg(1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur grid place-items-center text-white transition shadow"
                aria-label="Next reels"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* ===== YOUTUBE VIDEOS BLOCK (with auto-scroll) ===== */}
        <div className="mt-6 md:mt-8 relative rounded-[22px] md:rounded-[28px] bg-white border border-[#FBF3E4] shadow-[0_12px_40px_-16px_rgba(31,42,68,0.12)] overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[280px]">
            {/* Left promo — bigger logo + title */}
            <div className="relative lg:w-[300px] xl:w-[320px] shrink-0 p-7 sm:p-8 flex flex-col justify-center gap-5 border-b lg:border-b-0 lg:border-r border-[#FBF3E4] bg-[#FFFBF1]">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#ff0000] grid place-items-center shadow-lg shrink-0">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-9 sm:h-9 text-white" fill="currentColor" aria-hidden>
                    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.8 15.5v-7l6.3 3.5-6.3 3.5z" />
                  </svg>
                </div>
                <div className="font-display font-extrabold text-[22px] sm:text-[26px] leading-tight tracking-tight text-ink">
                  YouTube <span className="text-[#ff0000]">Videos</span>
                </div>
              </div>
              <p className="text-[14px] sm:text-[15px] text-slate-600 leading-relaxed">
                Detailed stories, event highlights, awareness sessions and the larger impact of our work.
              </p>
              <div>
                <a
                  href={YT_CHANNEL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 h-11 rounded-full bg-[#ff0000] text-white text-[14px] font-bold shadow-md hover:bg-[#D8501F] transition"
                >
                  Subscribe on YouTube
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                    <path d="M7 17L17 7M17 7H9M17 7v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <div className="mt-3 text-[13px] text-slate-400 font-medium">@Empirical Shiksha Abhiyan</div>
              </div>
            </div>

            {/* Video cards — horizontal auto-scroll */}
            <div
              className="relative flex-1 overflow-hidden py-5 sm:py-6 bg-white"
              onMouseEnter={() => setYtPaused(true)}
              onMouseLeave={() => setYtPaused(false)}
            >
              <div className="absolute inset-y-0 left-0 w-8 sm:w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-8 sm:w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              <div className="overflow-hidden px-2">
                <div ref={ytTrackRef} className="flex gap-4 w-max will-change-transform">
                  {videos.map((v, i) => (
                    <a
                      key={`${v.id}-${i}`}
                      href={`https://www.youtube.com/watch?v=${v.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block w-[260px] sm:w-[280px] shrink-0 rounded-2xl overflow-hidden bg-[#FFFBF1] ring-1 ring-[#FBF3E4] hover:ring-[#F6EAD3] hover:shadow-md transition"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={`https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`}
                          alt={v.title}
                          className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-[1.03]"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = v.img;
                          }}
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
                        <div className="absolute inset-0 grid place-items-center">
                          <div className="w-12 h-12 rounded-full bg-[#ff0000] shadow-lg grid place-items-center group-hover:scale-110 transition">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white ml-0.5" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                          </div>
                        </div>
                        <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-white text-[11px] font-semibold tabular-nums">
                          {v.duration}
                        </span>
                      </div>
                      <div className="p-3 sm:p-3.5">
                        <div className="text-[13px] sm:text-[14px] font-bold text-ink leading-snug line-clamp-2 group-hover:text-royal transition">
                          {v.title}
                        </div>
                        <div className="mt-1.5 text-[11px] sm:text-[12px] text-slate-500">
                          Empirical Shiksha Abhiyan · {v.views} views · {v.age}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              {/* Clickable arrows */}
              <button
                type="button"
                onClick={() => stepYt(-1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-slate-200 hover:bg-slate-50 shadow grid place-items-center text-slate-600 transition"
                aria-label="Previous videos"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button
                type="button"
                onClick={() => stepYt(1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-slate-200 hover:bg-slate-50 shadow grid place-items-center text-slate-600 transition"
                aria-label="Next videos"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTAs */}
        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={YT_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full border-2 border-[#ff0000] text-[#D8501F] font-bold text-sm hover:bg-[#FBE6C8] transition"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.8 15.5v-7l6.3 3.5-6.3 3.5z" /></svg>
            View All Videos on YouTube
            <span className="opacity-70">↗</span>
          </a>
          <a
            href={IG_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full border-2 border-[#7A4A8E] text-[#7A4A8E] font-bold text-sm hover:bg-[#EFE3F0] transition"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-3.2 1.7-4.8 4.9-4.9 1.3-.1 1.7-.1 4.9-.1zM12 0C8.7 0 8.3 0 7 .1 2.7.3.3 2.7.1 7 0 8.3 0 8.7 0 12s0 3.7.1 5c.2 4.3 2.6 6.7 6.9 6.9 1.3.1 1.7.1 5 .1s3.7 0 5-.1c4.3-.2 6.7-2.6 6.9-6.9.1-1.3.1-1.7.1-5s0-3.7-.1-5C23.7 2.7 21.3.3 17 .1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.5a1.4 1.4 0 1 1-2.9 0 1.4 1.4 0 0 1 2.9 0z" /></svg>
            View All Reels on Instagram
            <span className="opacity-70">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Our Journey: 3 milestone cards on one rising path + impact strip ---------- */
const JOURNEY = [
  { when: "2021", color: "#2E9E45", from: "#2E9E45", to: "#F5A524", pct: 20, ring: "Initiation", title: "Education work begins", img: "images/shiksha.webp", lift: "md:mt-24",
    bg: "linear-gradient(180deg,#FFFFFF 0%,#F1F9E8 100%)", ys: 90, ye: 32,
    text: "After the lockdown, our founders began teaching a small group of students in Khandwa, laying the foundation of the Eklavya Batch.",
    stats: [["users", "10", "Students"], ["book", "1", "Learning Group"]] },
  { when: "2 Oct 2024", color: "#F5A524", from: "#F5A524", to: "#2E9E45", pct: 60, ring: "Expansion", title: "Education + Cleanliness", img: "images/swachhata.webp", lift: "md:mt-10",
    bg: "linear-gradient(180deg,#FFFFFF 0%,#FFEFD2 100%)", ys: 88, ye: 40,
    text: "On Gandhi Jayanti, we expanded our mission by combining education with cleanliness drives across Khandwa, starting at Rameshwar Kund.",
    stats: [["recycle", "12", "Drives"], ["users", "150+", "Volunteers"], ["trash", "420 kg", "Waste Collected"]] },
  { when: "13 Jul 2026", color: "#1F9D3A", from: "#2E9E45", to: "#12852F", pct: 100, ring: "Formalized", title: "Official registration", img: "images/real-group.webp", lift: "md:mt-0",
    bg: "linear-gradient(180deg,#FFFFFF 0%,#DDF2D8 100%)", ys: 80, ye: 20,
    text: "Empirical Shiksha Abhiyan Samiti was officially registered, giving our work a formal identity and strengthening our commitment to education and community.",
    stats: [["shield", "Registered", "NGO"], ["users", "1,000+", "Students Reached"], ["sprout", "4", "Focus Areas"]] },
] as const;

const IMPACT_STRIP = [["cap", "1,000+", "Students Reached"], ["sprout", "120", "Trees Planted"], ["recycle", "420 kg", "Waste Collected"], ["users", "80+", "Active Volunteers"], ["calendar", "25+", "Drives & Events"]] as const;

const PHOTO_H = 200; // px, photo height of every journey card

function JourneyRing({ pct, color, label, style, className = "" }: { pct: number; color: string; label: string; style?: React.CSSProperties; className?: string }) {
  return (
    <span className={`j-ring grid h-[92px] w-[92px] place-items-center rounded-full bg-white p-[6px] ${className}`} style={style}>
      <span className="grid h-full w-full place-items-center rounded-full" style={{ background: `conic-gradient(${color} ${pct}%, #E4EBD9 0)` }}>
        <span className="grid h-[70px] w-[70px] place-items-center rounded-full bg-white text-center leading-none">
          <b className="font-display text-[24px] font-extrabold text-[#14213D]">{pct}%</b>
          <span className="-mt-3 text-[11px] font-semibold text-[#3B4763]">{label}</span>
        </span>
      </span>
    </span>
  );
}

function JourneySection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const pathRef = useRef<SVGPathElement>(null);
  const [geo, setGeo] = useState<{ w: number; h: number; pts: { x: number; y: number }[] } | null>(null);
  const [dot, setDot] = useState<{ x: number; y: number } | null>(null);
  const [shown, setShown] = useState(false);

  // Measure where each ring really sits, so the line passes through the exact centre of every ring at any screen size.
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const measure = () => {
      if (window.innerWidth < 768) { setGeo(null); return; }
      const pts = cardRefs.current.map((el) => (el ? { x: el.offsetLeft + el.offsetWidth / 2, y: el.offsetTop + PHOTO_H } : { x: 0, y: 0 }));
      setGeo({ w: wrap.offsetWidth, h: wrap.offsetHeight, pts });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  // smooth Catmull-Rom curve through: left edge -> ring 1 -> ring 2 -> ring 3 -> right edge (rising)
  let d = "", arrow = "";
  if (geo) {
    const [p1, p2, p3] = geo.pts;
    const P = [{ x: -12, y: p1.y + 56 }, p1, p2, p3, { x: geo.w + 6, y: p3.y - 60 }];
    d = `M${P[0].x} ${P[0].y}`;
    let last = P[0], c2last = P[0];
    for (let i = 0; i < P.length - 1; i++) {
      const p0 = P[i - 1] ?? P[i], pa = P[i], pb = P[i + 1], pc = P[i + 2] ?? P[i + 1];
      const c1 = { x: pa.x + (pb.x - p0.x) / 6, y: pa.y + (pb.y - p0.y) / 6 };
      const c2 = { x: pb.x - (pc.x - pa.x) / 6, y: pb.y - (pc.y - pa.y) / 6 };
      d += ` C${c1.x.toFixed(1)} ${c1.y.toFixed(1)} ${c2.x.toFixed(1)} ${c2.y.toFixed(1)} ${pb.x.toFixed(1)} ${pb.y.toFixed(1)}`;
      last = pb; c2last = c2;
    }
    const th = Math.atan2(last.y - c2last.y, last.x - c2last.x), L = 20, sp = 0.55;
    const f = (a: number) => `${(last.x - Math.cos(th + a) * L).toFixed(1)} ${(last.y - Math.sin(th + a) * L).toFixed(1)}`;
    arrow = `M${f(sp)} L${last.x.toFixed(1)} ${last.y.toFixed(1)} L${f(-sp)}`;
  }

  // little dot on the line, half way between ring 2 and ring 3
  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path || !geo) { setDot(null); return; }
    const target = (geo.pts[1].x + geo.pts[2].x) / 2, total = path.getTotalLength();
    let lo = 0, hi = total;
    for (let i = 0; i < 24; i++) { const mid = (lo + hi) / 2; if (path.getPointAtLength(mid).x < target) lo = mid; else hi = mid; }
    const q = path.getPointAtLength(lo);
    setDot({ x: q.x, y: q.y });
  }, [d]);

  return (
    <section className="journey relative overflow-hidden pb-24 pt-14 md:pt-20">
      <LeafBranch className="pointer-events-none absolute -left-6 -top-3 w-40 rotate-[-8deg] md:w-56" />
      <LeafBranch className="pointer-events-none absolute -right-8 -top-5 w-40 -scale-x-100 rotate-[-8deg] md:w-56" />

      <div className="relative mx-auto max-w-7xl px-5">
        <div className="text-center">
          <span className="j-pill inline-flex items-center gap-2 border-2 border-[#2E9E45] bg-white px-5 py-1.5 font-display text-[17px] font-extrabold text-[#17603A]"><AIcon n="sprout" s={20} />Our Journey</span>
          <h2 className="mt-4 font-display text-[34px] font-extrabold leading-tight text-[#14213D] sm:text-[46px] md:text-[56px]">
            From one batch to <span className="relative inline-block -rotate-1 font-hand text-[#F26A1B]">a movement
              <svg viewBox="0 0 200 12" preserveAspectRatio="none" className="absolute -bottom-1.5 left-0 h-3 w-full" aria-hidden><path d="M2 8C50 2 130 2 198 7" stroke="#F26A1B" strokeWidth="3.5" fill="none" strokeLinecap="round" /></svg>
            </span>
          </h2>
          <p className="mt-3 text-[17px] text-[#25324F] md:text-[19px]">A short history — and the impact we’ve created so far.</p>
        </div>

        <div ref={wrapRef} data-no-motion className="relative mt-14 grid items-start gap-12 md:grid-cols-3 md:gap-7">
          {JOURNEY.map((j, i) => (
            <article key={j.when} ref={(el) => { cardRefs.current[i] = el; }} className={`relative ${j.lift}`}>
              <span className="j-pill absolute -top-4 left-5 z-30 inline-flex items-center gap-2 border-2 bg-white px-4 py-1.5 font-display text-[19px] font-extrabold text-[#14213D]" style={{ borderColor: j.color }}>
                <span style={{ color: j.color }}><AIcon n="calendar" s={20} /></span><span className="notranslate" translate="no">{j.when}</span>
              </span>

              <div className="j-card" style={{ background: j.bg }}>
                <div className="j-photo" style={{ height: PHOTO_H }}><img src={j.img} alt={j.title} className="h-full w-full object-cover" loading="lazy" /></div>
                <div className="px-5 pb-5 pt-[56px]">
                  <h3 className="font-display text-[25px] font-extrabold leading-tight text-[#14213D]">{j.title}</h3>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-[#2A3652]">{j.text}</p>
                  <div className={`j-stats mt-4 grid gap-2 p-3 ${j.stats.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                    {j.stats.map(([ic, v, l]) => (
                      <div key={l} className="flex flex-col items-center text-center">
                        <span style={{ color: j.color }}><AIcon n={ic} s={24} /></span>
                        <b className="font-display text-[18px] font-extrabold leading-tight text-[#14213D]">{v}</b>
                        <span className="text-[12px] font-semibold leading-tight text-[#3B4763]">{l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* mobile: ring sits on the photo edge inside the card */}
              <JourneyRing pct={j.pct} color={j.color} label={j.ring} className="absolute left-1/2 z-20 -translate-x-1/2 md:hidden" style={{ top: PHOTO_H - 46 }} />
            </article>
          ))}

          {/* desktop: ONE continuous line + rings, drawn from measured positions */}
          {geo && (
            <>
              <svg width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} className="pointer-events-none absolute left-0 top-0 z-10 hidden overflow-visible md:block" aria-hidden>
                <defs>
                  <linearGradient id="journey-line" gradientUnits="userSpaceOnUse" x1="0" x2={geo.w} y1="0" y2="0">
                    <stop offset="0" stopColor="#2E9E45" /><stop offset=".5" stopColor="#F5A524" /><stop offset=".75" stopColor="#8CC63F" /><stop offset="1" stopColor="#16A34A" />
                  </linearGradient>
                </defs>
                <path d={d} fill="none" stroke="url(#journey-line)" strokeOpacity=".22" strokeWidth="18" strokeLinecap="round" />
                <path ref={pathRef} d={d} pathLength={1} fill="none" stroke="url(#journey-line)" strokeWidth="6" strokeLinecap="round" strokeDasharray="1" strokeDashoffset={shown ? 0 : 1} style={{ transition: "stroke-dashoffset 2.2s cubic-bezier(.4,.1,.2,1)" }} />
                <g style={{ opacity: shown ? 1 : 0, transition: "opacity .6s ease 2s" }}>
                  <path d={arrow} fill="none" stroke="#16A34A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                  {dot && <circle cx={dot.x} cy={dot.y} r="8" fill="#16A34A" stroke="#fff" strokeWidth="3" />}
                </g>
              </svg>
              {JOURNEY.map((j, i) => (
                <JourneyRing key={j.pct} pct={j.pct} color={j.color} label={j.ring} className="pop-icon absolute z-20" style={{ left: geo.pts[i].x, top: geo.pts[i].y, translate: "-50% -50%", animationDelay: `${0.5 + i * 0.5}s` }} />
              ))}
            </>
          )}
        </div>

        {/* impact strip */}
        <div className="j-strip relative mt-12 flex flex-col items-stretch gap-4 bg-white p-3 lg:flex-row lg:items-center">
          <div className="j-btn inline-flex shrink-0 items-center justify-center gap-2 px-8 py-4 font-display text-[21px] font-extrabold text-white"><AIcon n="sprout" s={28} />Our Impact So Far</div>
          <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
            {IMPACT_STRIP.map(([ic, v, l], i) => (
              <div key={l} className={`flex items-center justify-center gap-3 px-2 ${i ? "lg:border-l lg:border-slate-200" : ""}`}>
                <span className={i === 3 ? "text-[#F5A524]" : "text-[#2E9E45]"}><AIcon n={ic} s={38} /></span>
                <span><b className="block font-display text-[26px] font-extrabold leading-none text-[#14213D]">{v}</b><span className="mt-1 block text-[13.5px] font-semibold text-[#3B4763]">{l}</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* green landscape at the foot of the section */}
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 h-[84px] w-full" aria-hidden>
        <circle cx="720" cy="120" r="70" fill="#FFD27A" opacity=".55" />
        <path d="M0 80C200 40 380 96 600 74S1000 40 1200 70 1380 70 1440 56V120H0Z" fill="#BFE3B0" />
        <path d="M0 100C240 70 420 112 700 92S1100 70 1440 96V120H0Z" fill="#59B35A" />
        {Array.from({ length: 28 }).map((_, i) => <circle key={i} cx={i * 54 + 20} cy={102 + (i % 3) * 3} r={9 + (i % 4) * 2} fill={i % 2 ? "#2E9E45" : "#3DB354"} />)}
      </svg>
    </section>
  );
}

export default function Home({ go }: { go: (p: Page) => void }) {
  return (
    <>
      {/* HERO — clean light design matching reference */}
      <section className="hero-warm relative overflow-hidden">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <HeroHills className="absolute inset-x-0 bottom-0 w-full h-[120px] sm:h-[170px] lg:h-[220px]" />
            <LeafBranch className="sway-a absolute -right-4 -top-2 w-[96px] sm:w-[140px] -scale-y-100 rotate-[6deg]" />
            <LeafBranch className="absolute -right-10 top-[38%] w-[86px] sm:w-[120px] -rotate-[68deg]" />
            <Sprout className="grow-a absolute right-[27%] bottom-[14px] sm:bottom-[22px] w-[42px] sm:w-[62px] lg:w-[78px]" />
            <Books className="float-b absolute right-[1%] bottom-[8px] sm:bottom-[14px] w-[96px] sm:w-[130px] lg:w-[172px]" />
            {[
              { l: "12%", t: "26%", d: "0s", s: 10 }, { l: "22%", t: "62%", d: "1.2s", s: 7 },
              { l: "44%", t: "18%", d: "2.1s", s: 8 }, { l: "62%", t: "70%", d: ".6s", s: 6 },
              { l: "84%", t: "44%", d: "1.7s", s: 9 },
            ].map((k, idx) => (
              <span key={idx} className="twinkle absolute rounded-full bg-[#EE9B13]"
                style={{ left: k.l, top: k.t, width: k.s, height: k.s, animationDelay: k.d, boxShadow: "0 0 10px rgba(238,155,19,.9)" }} />
            ))}
            <span className="float-a absolute right-[16%] top-[10%] text-[#2B459E]/70 text-xl">✦</span>
          </div>
        <div className="relative z-10 max-w-7xl mx-auto px-5 pt-2 lg:pt-4 pb-10 sm:pb-12 grid grid-cols-1 min-[640px]:grid-cols-2 lg:grid-cols-12 gap-7 min-[640px]:gap-4 lg:gap-8 items-start">
          <div className="lg:col-span-6 rise">
            <div className="text-[15px] font-semibold text-navy/80"><Bi en="Education • Cleanliness • Environment • Mental Health" hi="शिक्षा • स्वच्छता • पर्यावरण • मानसिक स्वास्थ्य" /></div>
            <h1 className="relative mt-2 font-extrabold tracking-tight">
              <span
                className="relative inline-block text-[54px] min-[640px]:text-[clamp(2rem,5.1vw,3.875rem)] lg:text-[62px] xl:text-[80px] leading-[0.95] text-navy notranslate rise"
                translate="no"
                style={{ animationDelay: "0.15s" }}
              >
                <Bi en="Empirical" hi="एम्पिरिकल" />
              </span>
              <span className="inline-flex items-end gap-1 notranslate" translate="no">
                <span className="text-[48px] min-[640px]:text-[clamp(1.8rem,4.5vw,3.5rem)] lg:text-[64px] xl:text-[72px] leading-[1.2] text-[#D8501F]"><Bi en={<span className="text-[0.8em]">Shiksha Abhiyan</span>} hi="शिक्षा अभियान" /></span>
                <svg viewBox="0 0 48 48" className="w-10 min-[640px]:w-9 lg:w-12 xl:w-14 mb-3 lg:mb-4 shrink-0" aria-hidden>
                  <path d="M6 42 C 18 38, 30 28, 38 12" fill="none" stroke="#D8501F" strokeWidth="5" strokeLinecap="round" />
                  <path d="M27 13 L39 9 L41 22" fill="none" stroke="#D8501F" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <svg viewBox="0 0 120 70" className="hidden min-[420px]:block absolute right-0 lg:right-4 top-1 w-14 min-[640px]:w-20 lg:w-28 xl:w-32" aria-hidden>
                <path d="M6 62 C 22 66, 30 46, 18 44 C 8 43, 12 58, 30 56 C 50 54, 62 40, 78 30" fill="none" stroke="#2B459E" strokeWidth="2" strokeDasharray="4 5" strokeLinecap="round" opacity=".7" />
                <path d="M82 28 L114 6 L98 40 L92 30 Z" fill="#fff" stroke="#1F2A44" strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M92 30 L114 6" stroke="#1F2A44" strokeWidth="2" />
              </svg>
            </h1>
            <p className="mt-4 text-[17px] sm:text-lg leading-relaxed text-navy/80 max-w-xl">
              Our aim is to build a better society for every child, every family and every community in Khandwa — through education, cleanliness, environment and health awareness.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 max-w-xl">
              {HERO_AREAS.map((h) => (
                <button key={h.hi} onClick={() => go("initiatives")}
                  className="press group relative flex items-center gap-2.5 sm:gap-3 h-[60px] px-3 sm:px-4 rounded-xl ring-1 overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md"
                  style={{ background: h.bg, ["--tw-ring-color" as string]: h.bd }}>
                  <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" aria-hidden>{h.icon}</svg>
                  <span className="flex-1 text-left leading-tight min-w-0">
                    <span className="block font-display font-bold text-[16px] sm:text-[17px] text-navy"><Bi en={h.en} hi={h.hi} /></span>
                    <span className="block text-[11px] text-slate-500 truncate"><Bi en={<span className="notranslate" translate="no">{h.hi}</span>} hi={h.en} /></span>
                  </span>
                  <span className="font-bold transition group-hover:translate-x-0.5" style={{ color: h.fg }}>→</span>
                  <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100" style={{ animation: "sheen 1.1s ease-out" }} />
                </button>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
              <button onClick={() => go("initiatives")} className="press group relative overflow-hidden h-12 px-6 inline-flex items-center gap-2 rounded-full bg-navy text-white font-bold shadow-lg shadow-blue-900/20 hover:bg-azure transition">
                Explore Our Work <span className="transition group-hover:translate-x-1">→</span>
                <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent" style={{ animation: "sheen 4.5s ease-in-out 0.8s infinite" }} />
              </button>
              <button onClick={() => go("impact")} className="press group inline-flex items-center gap-3 font-bold text-navy">
                <span className="w-12 h-12 rounded-full bg-white ring-2 ring-navy grid place-items-center text-navy group-hover:bg-navy group-hover:text-white transition">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 transition group-hover:scale-125"><path d="M7 4.5v15l12-7.5z" /></svg>
                </span>
                See Our Impact
              </button>
            </div>
          </div>

          {/* Collage: large circle with orange arc + cluster of overlapping circles */}
          <div className="lg:col-span-6 w-full">
            <div className="relative mx-auto w-full max-w-[600px] aspect-[58/52]">
              <RayDashes className="absolute left-[2%] -top-[1%] w-[11%]" />
              {/* orange arc hugging the big circle */}
              <svg viewBox="0 0 100 100" className="absolute aspect-square" style={{ left: "-3%", top: 0, width: "76%" }} aria-hidden>
                <defs>
                  <linearGradient id="heroArc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#EE9B13" />
                    <stop offset="1" stopColor="#D8501F" />
                  </linearGradient>
                </defs>
                <path className="arc-run" d="M95 50 A45 45 0 1 0 31 90.8" fill="none" stroke="url(#heroArc)" strokeWidth="3" strokeLinecap="round" />
              </svg>
              {/* big round photo */}
              <div className="absolute aspect-square rounded-full overflow-hidden border-[5px] sm:border-[7px] border-white bg-white shadow-[0_18px_36px_-14px_rgba(31,42,68,.45)]"
                style={{ left: 0, top: "4%", width: "70%", zIndex: 1 }}>
                <SwapPhoto images={["images/group-banner.webp", "images/clean-group-2.webp", "images/real-group.webp"]} alt="Students learning together" />
              </div>
              {/* overlapping circle cluster on the right */}
              <div className="absolute aspect-square rounded-full overflow-hidden border-[5px] sm:border-[7px] border-white bg-white shadow-[0_16px_32px_-14px_rgba(31,42,68,.45)]"
                style={{ left: "64%", top: 0, width: "16%", zIndex: 4 }}>
                <SwapPhoto images={["images/init-rally.webp", "images/init-rally.webp", "images/real-rally.webp"]} alt="Well-being awareness session" />
              </div>
              <div className="absolute aspect-square rounded-full overflow-hidden border-[5px] sm:border-[7px] border-white bg-white shadow-[0_16px_32px_-14px_rgba(31,42,68,.45)]"
                style={{ left: "74%", top: "6%", width: "25%", zIndex: 3 }}>
                <SwapPhoto images={["images/team-gloves.webp", "images/clean-group-1.webp", "images/real-group.webp"]} alt="Volunteers of Empirical Shiksha Abhiyan" />
              </div>
              <div className="absolute aspect-square rounded-full overflow-hidden border-[5px] sm:border-[7px] border-white bg-white shadow-[0_16px_32px_-14px_rgba(31,42,68,.45)]"
                style={{ left: "62%", top: "34%", width: "24%", zIndex: 5 }}>
                <SwapPhoto images={["images/clean-group-1.webp", "images/real-kund.webp", "images/real-kund-2.webp"]} alt="Cleanliness drive at a kund" />
              </div>
              <div className="absolute aspect-square rounded-full overflow-hidden border-[5px] sm:border-[7px] border-white bg-white shadow-[0_16px_32px_-14px_rgba(31,42,68,.45)]"
                style={{ left: "74%", top: "57%", width: "25%", zIndex: 4 }}>
                <SwapPhoto images={["images/init-environment.webp", "images/real-plant.webp", "images/paryavaran.webp"]} alt="Planting saplings in Khandwa" />
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Photo strip */}
        <PhotoStrip go={go} />
        <div className="h-14" />
      </section>

      {/* COUNTERS */}
      <section className="max-w-7xl mx-auto px-5 -mt-4 relative z-10">
        <div className="pointer-events-none absolute -left-6 top-[8%] w-16 h-28 rounded-full bg-[radial-gradient(closest-side,rgba(244,185,62,.75),rgba(244,185,62,0))]" aria-hidden />
        <div className="pointer-events-none absolute -left-6 top-[54%] w-14 h-24 rounded-full bg-[radial-gradient(closest-side,rgba(238,155,19,.65),rgba(238,155,19,0))]" aria-hidden />
        <div className="card-pop relative bg-white/90 backdrop-blur-[2px] rounded-[28px] shadow-[0_20px_50px_-20px_rgba(31,42,68,.25)] ring-1 ring-blue-100 grid sm:grid-cols-2 lg:grid-cols-4 overflow-hidden">
          <CardWave className="pointer-events-none absolute right-0 bottom-0 w-[58%] h-[46%]" />
          <div className="pointer-events-none absolute left-[38%] -bottom-3 w-28 h-10 rounded-full bg-orange-200/70 blur-lg" aria-hidden />
          {STATS.map((s, i) => (
            <div key={s.label} className={`relative p-6 xl:p-7 border-orange-100 ${i < 3 ? "border-b" : ""} ${i < 2 ? "sm:border-b" : "sm:border-b-0"} ${i % 2 === 0 ? "sm:border-r" : ""} ${i < 3 ? "lg:border-r" : ""} lg:border-b-0`}>
              <CellDoodle i={i} />
              <div className="flex items-start justify-between gap-3">
                <div className="font-display font-extrabold text-[40px] xl:text-[46px] leading-none tracking-tight tabular-nums" style={{ color: s.color }}>
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <span className="shrink-0 mt-1"><AreaIcon k={s.k} size={32} /></span>
              </div>
              <div className="mt-3 font-bold text-ink text-lg leading-tight">{s.label}</div>
              <div className="text-sm leading-snug text-slate-500">{s.note}</div>
              <div className="mt-4 h-1.5 w-14 rounded-full" style={{ background: s.color }} />
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fbfdff_0%,#f3f8ff_58%,#e9f2fd_100%)]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-x-0 bottom-0 h-[250px] sm:h-[270px] lg:h-[290px]"
            style={{ WebkitMaskImage: "linear-gradient(to bottom, #000 82%, transparent 100%)", maskImage: "linear-gradient(to bottom, #000 82%, transparent 100%)" }}>
            <AboutHills className="absolute inset-x-0 bottom-[64px] w-full h-[170px] sm:h-[190px]" />
            <Skyline className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[440px] sm:w-[540px]" />
          </div>
          <LeafBranch className="absolute -right-8 bottom-[34px] w-[110px] sm:w-[160px] rotate-[8deg]" />
          <LeafBranch className="absolute -right-3 bottom-[10px] w-[78px] sm:w-[110px] -scale-x-100 rotate-[-12deg]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-5 pt-16 pb-36 md:pt-20 md:pb-40 grid md:grid-cols-2 gap-10 md:gap-10 lg:gap-14 items-center">
          <div>
            <Eyebrow>About Us</Eyebrow>
            <h2 className="mt-3 text-[32px] md:text-[42px] leading-[1.1] tracking-tight font-extrabold text-ink">
              Learning today, for a <span className="text-flame">stronger tomorrow.</span>
            </h2>
            <Swoosh className="h-2.5 w-28 mt-2.5" />
            <p className="mt-4 text-[17px] leading-relaxed text-slate-600 max-w-xl">
              We are a community-driven initiative in Khandwa working where education, cleanliness, environment and health meet. Founded by Rahul Geete and Jayram Malakar and powered by <span className="notranslate" translate="no"><Counter to={60} suffix="+" /></span> volunteers, we learn together and serve together.
            </p>
            <div className="relative mt-7 inline-block">
              <button onClick={() => go("about")} className="press inline-flex items-center gap-2 h-12 px-6 rounded-full bg-royal text-white font-bold hover:bg-flame transition">
                Know More About Us <span>→</span>
              </button>
              <HeartShape className="pointer-events-none absolute left-full top-1 ml-5 w-6" />
            </div>
            <div className="relative mt-8 grid gap-4 border-t border-orange-200/70 pt-6">
              <CloudDoodle className="pointer-events-none absolute right-4 -top-7 w-14" />
              {[
                { t: "Our Vision", d: "An educated, healthy and clean Khandwa.", c: "#3A7D44", tint: "#E4EED8",
                  ic: <><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="1.4" fill="currentColor" /></> },
                { t: "Our Mission", d: "Empower students, care for our environment, serve the community.", c: "#D8501F", tint: "#FBE6C8",
                  ic: <path d="M2 12h4l2.5-6 3.5 12 2.5-6H22" stroke="currentColor" strokeWidth="1.9" fill="none" strokeLinecap="round" strokeLinejoin="round" /> },
                { t: "Our Values", d: "Education. Service. Community. Integrity.", c: "#2B459E", tint: "#FBF3E4",
                  ic: <><circle cx="9" cy="9" r="3.2" stroke="currentColor" strokeWidth="1.8" /><circle cx="17" cy="10.5" r="2.4" stroke="currentColor" strokeWidth="1.8" /><path d="M3.5 19c.6-3 2.7-4.6 5.5-4.6S14 16 14.6 19M15 15c2.4 0 4 1.4 4.5 4" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" /></> },
              ].map((v) => (
                <div key={v.t} className="flex items-start gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-full grid place-items-center mt-0.5" style={{ background: v.tint, color: v.c }}>
                    <svg viewBox="0 0 24 24" width="20" height="20">{v.ic}</svg>
                  </div>
                  <div>
                    <div className="font-bold text-ink leading-tight">{v.t}</div>
                    <p className="mt-0.5 text-sm leading-snug text-slate-500">{v.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full">
            <div className="relative mx-auto md:ml-auto md:mr-0 w-full max-w-[520px] aspect-[10/9]">
              <div className="pointer-events-none absolute inset-0 z-[5]" aria-hidden>
                <Leaf fill="dg-leafBlue" className="absolute left-[4%] top-[1%] w-[8%] rotate-[24deg]" />
                <Diya className="absolute left-[28%] top-[3%] w-[8%]" />
                <RayDashes className="absolute left-[45%] top-[1%] w-[9%]" />
                <CloudDoodle className="absolute left-[12%] top-[16%] w-[15%]" />
                <Leaf fill="dg-leafBlue" className="absolute right-0 -top-[8%] w-[6%] rotate-[30deg]" />
                <Leaf fill="dg-leafTeal" className="absolute right-[4%] top-[45%] w-[6%] -rotate-[40deg]" />
                <Pin className="absolute right-[14%] top-[40%] w-[4.5%]" />
                <Leaf className="absolute left-[7%] -bottom-[12%] w-[10%] -rotate-[35deg]" />
              </div>
              {/* big round photo */}
              <div className="absolute left-0 bottom-0 w-[68%] aspect-square rounded-full bg-white p-[7px] shadow-xl ring-1 ring-orange-200/80 z-0">
                <SwapPhoto images={["images/init-environment.webp", "images/real-plant.webp", "images/paryavaran.webp"]} alt="Volunteers planting saplings in Khandwa" className="rounded-full" />
              </div>
              {/* top-right photo, overlapping the circle */}
              <div className="float-a absolute right-0 top-0 w-[46%] aspect-[4/3] rotate-[4deg] rounded-[18px] overflow-hidden ring-[6px] ring-white shadow-xl z-10">
                <img src="images/group-banner.webp" alt="Eklavya Batch class" className="w-full h-full object-cover" />
              </div>
              {/* bottom-right photo, overlapping the circle */}
              <div className="float-b absolute right-0 bottom-[2%] w-[43%] aspect-[4/3] -rotate-[3deg] rounded-[18px] overflow-hidden ring-[6px] ring-white shadow-xl z-20">
                <img src="images/clean-group-1.webp" alt="Cleanliness drive" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INITIATIVES */}
      <section className="max-w-7xl mx-auto px-5 pt-16 pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHead eyebrow="Our Four Pillars" title={<>Four areas. <span className="text-flame">One community.</span></>} sub="Every activity we run belongs to one of four areas — each one grows out of the same idea: education that turns into service." />
          <button onClick={() => go("initiatives")} className="text-royal font-bold hover:text-flame shrink-0">All initiatives →</button>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {AREAS.map((a) => (
            <button key={a.key} onClick={() => go("initiatives")}
              className="card-pop group text-left rounded-[24px] p-6 relative overflow-hidden flex flex-col ring-1 ring-black/[.04] transition"
              style={{ background: a.tint }}>
              <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full border-[14px] opacity-15" style={{ borderColor: a.color }} />
              <div className="w-16 h-16 rounded-t-full rounded-b-2xl bg-white grid place-items-center shadow-sm"><AreaIcon k={a.key} size={40} /></div>
              <div className="mt-5 font-display text-[28px] leading-none font-extrabold" style={{ color: a.color }}>{a.hi}</div>
              <div className="mt-1.5 font-bold text-ink">{a.name} · {a.en}</div>
              <p className="mt-2.5 text-slate-600 text-[15px] leading-relaxed flex-1">{AREA_COPY[a.key]}</p>
              <div className="mt-5 font-bold text-sm" style={{ color: a.color }}>Learn more <span className="inline-block transition group-hover:translate-x-1">→</span></div>
            </button>
          ))}
        </div>
      </section>

      <JourneySection />

      {/* FEATURED GALLERY — redesigned to match provided design */}
      <section className="relative overflow-hidden bg-[#FFF1C9] py-14 md:py-20">
        {/* Soft organic background shapes */}
        <div className="pointer-events-none absolute -left-20 top-10 w-64 h-64 rounded-full bg-[#FBF3E4]/60 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 w-72 h-72 rounded-full bg-[#F6EAD3]/50 blur-3xl" />
        <div className="pointer-events-none absolute right-1/4 -top-10 w-48 h-48 rounded-full bg-[#E4EED8]/40 blur-2xl" />

        {/* Decorative leaves */}
        <LeafBranch className="pointer-events-none absolute -left-6 top-4 w-28 md:w-40 opacity-75 rotate-[-12deg]" />
        <Leaf className="pointer-events-none absolute right-6 top-12 w-12 md:w-14 opacity-60 rotate-[25deg]" />
        <Leaf className="pointer-events-none absolute left-6 bottom-4 w-10 md:w-12 opacity-50 -rotate-12" />
        <LeafBranch className="pointer-events-none absolute -right-6 bottom-2 w-28 md:w-36 opacity-70 rotate-[150deg] scale-x-[-1]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-5">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8 md:mb-12">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EE9B13] text-white text-[11px] font-bold uppercase tracking-[0.14em] shadow-sm">
                <span className="text-[13px] leading-none">✦</span>
                Featured Gallery
              </div>
              <h2 className="mt-3 md:mt-4 font-display font-extrabold text-[28px] sm:text-[32px] md:text-[42px] leading-[1.1] tracking-tight text-ink">
                Moments from{" "}
                <span className="text-flame">the ground</span>
              </h2>
              <p className="mt-2 md:mt-3 text-[15px] md:text-[17px] text-slate-600 leading-relaxed">
                Real people. Real impact. Stories from the field.
              </p>
            </div>
            <button
              onClick={() => go("gallery")}
              className="shrink-0 self-start sm:mt-2 px-5 h-10 md:h-11 inline-flex items-center rounded-full bg-[#FBF3E4] text-royal font-bold text-sm hover:bg-royal hover:text-white transition shadow-sm border border-[#F6EAD3]"
            >
              View All Gallery →
            </button>
          </div>

          {/* Main content: large image + 2x2 circles */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-7 lg:gap-10 items-start">
            {/* Large featured image */}
            <button
              onClick={() => go("gallery")}
              className="group relative w-full aspect-[4/3] sm:aspect-[5/3.5] rounded-[20px] md:rounded-[28px] overflow-hidden shadow-lg ring-1 ring-black/5"
            >
              <img
                src="images/clean-group-1.webp"
                alt="Cleaning drive at Rameshwar Kund"
                className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-5 md:left-5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/95 text-ink text-[12px] sm:text-[13px] font-bold shadow-md backdrop-blur-sm">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-flame shrink-0" fill="currentColor" aria-hidden>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  Rameshwar Kund
                </span>
              </div>
            </button>

            {/* 2×2 circular cards */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 place-items-center">
              {[
                {
                  img: "images/group-banner.webp",
                  label: "Education",
                  color: "#3A7D44",
                  bg: "#E4EED8",
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden>
                      <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.1C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1z" />
                    </svg>
                  ),
                },
                {
                  img: "images/init-environment.webp",
                  label: "Environment",
                  color: "#3A7D44",
                  bg: "#E4EED8",
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden>
                      <path d="M17 8C8 10 5.9 16.17 3.82 21.4l1.89.7.6-1.4c.4.1.8.1 1.2.1 1.5 0 2.9-.4 4-1.1 1.7 1.1 3.9 1.5 6.1 1.1 1.1-.2 2.1-.6 3-1.2.3.4.6.7 1 1l1.5-1.3c-1.1-1.3-1.9-2.9-2.2-4.6-.4-2.1.1-4.2 1.2-5.9-1.1-1.1-2.4-1.9-3.9-2.4z" />
                    </svg>
                  ),
                },
                {
                  img: "images/init-rally.webp",
                  label: "Awareness",
                  color: "#2B459E",
                  bg: "#FBF3E4",
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden>
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
                    </svg>
                  ),
                },
                {
                  img: "images/clean-group-2.webp",
                  label: "Clog Run",
                  color: "#2B459E",
                  bg: "#FBF3E4",
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden>
                      <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => go("gallery")}
                  className="group flex flex-col items-center text-center w-full max-w-[160px] sm:max-w-[180px] md:max-w-[200px]"
                >
                  <div className="relative w-full aspect-square rounded-full overflow-hidden shadow-md ring-[3px] sm:ring-4 ring-white transition duration-300 group-hover:shadow-lg group-hover:scale-[1.03]">
                    <SwapPhoto
                      images={[item.img, "images/real-group.webp", "images/clean-group-2.webp", "images/real-rally.webp"]}
                      alt={item.label}
                    />
                  </div>
                  <div
                    className="mt-2.5 sm:mt-3 inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-bold"
                    style={{ background: item.bg, color: item.color }}
                  >
                    {item.icon}
                    {item.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL IMPACT — Instagram Reels + YouTube */}
      <SocialImpact />

      {/* CLOSING BAND — redesigned to match provided design */}
      <section
        className="relative overflow-hidden py-12 md:py-20"
        style={{ backgroundImage: "url(/images/group-banner.webp)", backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "#FFFBF1" }}
      >

        <div className="relative max-w-3xl mx-auto px-4 sm:px-5">
          <div className="relative rounded-[22px] md:rounded-[28px] bg-white border-[1.5px] border-[#FFF1C9] shadow-[0_8px_40px_-12px_rgba(238,155,19,0.18)] px-5 py-8 sm:px-8 sm:py-10 md:px-12 md:py-12 text-center">
            {/* JOIN HANDS pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D8501F] text-white text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.12em] shadow-sm">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" aria-hidden>
                <path d="M11 8.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5V11h1.5c.8 0 1.5.7 1.5 1.5S16.3 14 15.5 14H14v1.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5V14H9.5c-.8 0-1.5-.7-1.5-1.5S8.7 11 9.5 11H11V8.5z" opacity=".3"/>
                <path d="M7.5 11.5c-1.1 0-2 .9-2 2v1c0 1.1.9 2 2 2h.5v.5c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5V15h1c1.1 0 2-.9 2-2v-1c0-1.1-.9-2-2-2h-1.5V9.5c0-1.4-1.1-2.5-2.5-2.5S9.5 8.1 9.5 9.5v2H7.5zm9 0c-1.1 0-2 .9-2 2v1c0 1.1.9 2 2 2h.5v.5c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5V15h1c1.1 0 2-.9 2-2v-1c0-1.1-.9-2-2-2h-1.5V9.5c0-1.4-1.1-2.5-2.5-2.5S14.5 8.1 14.5 9.5v2H16.5z" />
              </svg>
              Join Hands
            </div>

            <h2 className="mt-4 sm:mt-5 font-display font-extrabold text-[24px] sm:text-[28px] md:text-[36px] leading-tight tracking-tight text-ink">
              Have an idea for Khandwa?
            </h2>
            <p className="mt-2.5 sm:mt-3 text-[14px] sm:text-[15px] md:text-[16px] text-slate-600 leading-relaxed max-w-lg mx-auto">
              Students and community members can share ideas for education, cleanliness, environment or mental health — or simply join the next drive.
            </p>

            {/* Action buttons */}
            <div className="mt-6 sm:mt-7 flex flex-col xs:flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              <button
                onClick={() => go("initiatives")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full border-2 border-[#D8501F] text-[#D8501F] font-bold text-sm hover:bg-[#FBE6C8] transition"
              >
                <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M9 18h6M10 21h4M12 3a5 5 0 0 1 3.5 8.5c-.7.7-1.1 1.5-1.3 2.5h-4.4c-.2-1-.6-1.8-1.3-2.5A5 5 0 0 1 12 3z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Share an Idea
              </button>
              <button
                onClick={() => go("contact")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-[#D8501F] text-white font-bold text-sm hover:bg-[#D8501F] transition shadow-sm"
              >
                <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="currentColor" aria-hidden>
                  <circle cx="9" cy="8" r="2.4"/>
                  <circle cx="15" cy="8.5" r="2"/>
                  <path d="M3.5 18c.5-2.6 2.4-4 5.5-4s5 1.4 5.5 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                  <path d="M14 14.5c1.8 0 3.2 1 3.8 3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                  <path d="M17.2 5.5c1.2-.3 2.2.4 2 1.4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                Volunteer With Us
              </button>
            </div>

            {/* Area pills */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2">
              {[
                { label: "Education", color: "#2B459E", bg: "#FBF3E4", icon: (
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.1C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1z"/></svg>
                )},
                { label: "Cleanliness", color: "#D8501F", bg: "#FBE6C8", icon: (
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor"><path d="M15.5 4.5 12 16l-1.5 4.5-1.5-4.5L5.5 4.5 12 7z"/><path d="M8 17h8l-1 3H9z"/></svg>
                )},
                { label: "Environment", color: "#3A7D44", bg: "#E4EED8", icon: (
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor"><path d="M17 8C8 10 5.9 16.17 3.82 21.4l1.89.7.6-1.4c.4.1.8.1 1.2.1 1.5 0 2.9-.4 4-1.1 1.7 1.1 3.9 1.5 6.1 1.1 1.1-.2 2.1-.6 3-1.2.3.4.6.7 1 1l1.5-1.3c-1.1-1.3-1.9-2.9-2.2-4.6-.4-2.1.1-4.2 1.2-5.9-1.1-1.1-2.4-1.9-3.9-2.4z"/></svg>
                )},
                { label: "Mental Health", color: "#2B459E", bg: "#FBF3E4", icon: (
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 2.4 1.2 4.5 3 5.7V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.3c1.8-1.2 3-3.3 3-5.7a7 7 0 0 0-7-7zm-1 16h2v1h-2v-1zm0-2h2v1h-2v-1z"/></svg>
                )},
              ].map((a) => (
                <span
                  key={a.label}
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-[12px] font-bold"
                  style={{ background: a.bg, color: a.color }}
                >
                  {a.icon}
                  {a.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
