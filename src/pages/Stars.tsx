import { useEffect, useMemo, useRef, useState } from "react";
import { AIcon } from "../icons";
import type { Page } from "../shared";
import { CountUp } from "../ui";
import { Bi } from "../lang";
import { MILESTONES, STARS, hoursOf, pctOf, ranked, type Cat, type Star } from "../stars-data";

const TEAL = "#1A7F78";
const DEEP = "#17605C";
const CHILLI = "#D8501F";
const INK = "#1F2A44";

export const Script = ({ children, className = "", line = true }: { children: string; className?: string; line?: boolean }) => (
  <span className={`relative inline-block -rotate-2 font-hand font-bold ${className}`} style={{ color: CHILLI }}>
    {children}
    
  </span>
);

export function Avatar({ s, size = 64, ring = false }: { s: Star; size?: number; ring?: boolean }) {
  return (
    <span className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full font-display font-extrabold ${ring ? "ring-2 ring-[#1F2A44]" : ""}`} style={{ width: size, height: size, background: s.tint, color: s.color, fontSize: size * 0.36 }}>
      {s.photo ? <img src={s.photo} alt={s.name} className="h-full w-full object-cover object-top" loading="lazy" /> : s.initials}
    </span>
  );
}

export function Ring({ pct, size = 84, stroke = 10, color = "#3A7D44", children }: { pct: number; size?: number; stroke?: number; color?: string; children?: React.ReactNode }) {
  const [on, setOn] = useState(false);
  const holder = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = holder.current;
    if (!el || typeof IntersectionObserver === "undefined") { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  return (
    <span ref={holder} className="relative inline-grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E9DCC0" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={on ? c * (1 - pct / 100) : c} style={{ transition: "stroke-dashoffset 1.3s cubic-bezier(.2,.8,.2,1)" }} />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-center leading-tight">{children}</span>
    </span>
  );
}

export const Medal = ({ n }: { n: number }) => (
  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-[#1F2A44] font-display text-[13px] font-extrabold text-[#1F2A44]" style={{ background: n === 1 ? "#F4B93E" : n === 2 ? "#D5D9E2" : n === 3 ? "#E9A36A" : "#FFFDF7" }}>{n}</span>
);

export function Leaderboard({ list, openStar, current, title = "Leaderboard", sub = "Top 5", bars = true }: { list: Star[]; openStar: (slug: string) => void; current?: string; title?: string; sub?: string; bars?: boolean }) {
  return (
    <section className="card-print p-5">
      <h3 className="flex items-center gap-2 font-display text-[22px] font-extrabold" style={{ color: INK }}><span className="text-[#EE9B13]"><AIcon n="trophy" s={26} duo /></span>{title}<span className="ml-1 text-[14px] font-semibold text-slate-500">({sub})</span></h3>
      <ol className="mt-3 divide-y-2 divide-dashed divide-[#E9DCC0]">
        {list.slice(0, 5).map((s, i) => (
          <li key={s.slug}>
            <button onClick={() => openStar(s.slug)} className={`flex w-full items-center gap-3 py-2.5 text-left transition hover:bg-[#FBF3E4] ${current === s.slug ? "bg-[#FBF3E4]" : ""}`}>
              <Medal n={i + 1} />
              <Avatar s={s} size={38} />
              <span className="min-w-0 flex-1">
                <b className="block truncate font-display text-[15.5px] font-extrabold leading-tight" style={{ color: INK }}>{s.name}</b>
                {bars && <span className="mt-1 block h-2 overflow-hidden rounded-full border border-[#1F2A44]/60 bg-[#F6EAD3]"><span className="fill-grow block h-full rounded-full bg-[#3A7D44]" style={{ width: pctOf(s) + "%" }} /></span>}
              </span>
              <span className="text-right text-[14px] font-bold" style={{ color: INK }}><CountUp value={String(hoursOf(s))} /> hrs{bars && <span className="block text-[12.5px] font-semibold text-slate-500"><CountUp value={pctOf(s) + "%"} /></span>}</span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Skyline() {
  const trees = Array.from({ length: 34 }, (_, i) => ({ x: i * 36 + (i % 3) * 7, h: 34 + ((i * 17) % 26), c: i % 2 ? "#2f9a8f" : "#3fae9d" }));
  return (
    <svg viewBox="0 0 1200 170" preserveAspectRatio="xMidYMax slice" className="block h-[130px] w-full sm:h-[170px]" aria-hidden>
      <rect width="1200" height="170" fill="#D9F0EE" />
      <circle cx="600" cy="92" r="46" fill="#fbd98a" opacity=".85" />
      <path d="M0 120C150 84 280 112 420 96S700 70 860 100 1100 90 1200 108V170H0z" fill="#a9d9d3" />
      <path d="M0 140C200 112 360 142 540 126S860 108 1020 132 1150 130 1200 126V170H0z" fill="#8ccbc4" />
      <g fill="#2c8a86"><rect x="160" y="66" width="46" height="26" rx="4" /><path d="M164 92h38l-6 62h-26z" opacity=".9" /><rect x="176" y="56" width="14" height="10" /></g>
      <g fill="#2c8a86"><path d="M1000 154v-40h60v40z" /><path d="M1008 114l22-46 22 46z" /><path d="M1022 68l8-26 8 26z" /><rect x="1029" y="34" width="2" height="10" /></g>
      {trees.map((t, i) => (<g key={i} transform={`translate(${t.x} ${170 - t.h})`}><rect x="9" y={t.h - 12} width="3" height="12" fill="#27736c" /><circle cx="10.5" cy={t.h - 18} r="11" fill={t.c} /><circle cx="5" cy={t.h - 12} r="7" fill={t.c} /><circle cx="16" cy={t.h - 12} r="7" fill={t.c} /></g>))}
    </svg>
  );
}

export function NominateBanner({ go, title = "Changemaker", text = "Know a student who is consistently working for a cleaner, greener and better Khandwa? Nominate them and inspire others!" }: { go: (p: Page) => void; title?: string; text?: string }) {
  return (
    <div data-reveal-me className="relative flex flex-col items-center gap-5 overflow-hidden rounded-[14px] border-2 border-[#1F2A44] px-6 py-7 text-white shadow-[5px_5px_0_0_#1F2A44] sm:flex-row sm:px-10" style={{ background: DEEP }}>
      <svg viewBox="0 0 200 180" className="float-slow -my-4 h-[150px] w-[170px] shrink-0" aria-hidden>
        <path d="M40 120c-20-10-26-40-14-62M160 120c20-10 26-40 14-62" stroke="#f0c14b" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M100 18l22 46 50 7-36 35 9 50-45-24-45 24 9-50-36-35 50-7z" fill="#f5b82e" stroke="#fde08a" strokeWidth="3" strokeLinejoin="round" />
        <rect x="62" y="140" width="76" height="14" rx="4" fill="#d99a12" /><rect x="50" y="154" width="100" height="14" rx="4" fill="#f0b429" />
      </svg>
      <div className="text-center sm:text-left"><h2 className="font-display text-[32px] font-extrabold leading-tight">Nominate a<br /><Script className="text-[40px]" line={false}>{title}</Script></h2></div>
      <span className="hidden h-20 w-px bg-white/35 sm:block" />
      <p className="max-w-[360px] flex-1 text-center text-[16.5px] leading-[1.5] sm:text-left">{text}</p>
      <button onClick={() => go("contact")} className="press btn-solid inline-flex shrink-0 items-center gap-2 rounded-full px-7 py-3.5 text-[16px] font-bold shadow-lg">Nominate Now <AIcon n="arrow" s={18} /></button>
    </div>
  );
}

const CATS: [string, string][] = [["All Stars", "grid"], ["Environment", "leaf"], ["Education", "cap"], ["Mental Health", "heart"], ["Community", "users"]];

export default function Stars({ go, openStar }: { go: (p: Page) => void; openStar: (slug: string) => void }) {
  const list = useMemo(() => ranked(), []);
  const top = list[0];
  const [cat, setCat] = useState("All Stars");
  const [q, setQ] = useState("");
  const wrap = "mx-auto max-w-[1180px] px-4 sm:px-7";
  const count = (c: string) => (c === "All Stars" ? STARS.length : STARS.filter((s) => s.cat === (c as Cat)).length);
  const visible = list.filter((s) => (cat === "All Stars" || s.cat === cat) && (!q.trim() || (s.name + " " + s.role).toLowerCase().includes(q.trim().toLowerCase())));
  const cards = cat === "All Stars" && !q.trim() ? visible.filter((s) => s.slug !== top.slug) : visible;
  const total = list.reduce((a, s) => a + hoursOf(s), 0);
  const avgTarget = Math.round(list.reduce((a, s) => a + s.target, 0) / list.length);
  const avgPct = Math.round(list.reduce((a, s) => a + pctOf(s), 0) / list.length);
  const avgStreak = (list.reduce((a, s) => a + s.streak, 0) / list.length).toFixed(1);
  const stats: [string, string, string, string][] = [
    [String(list.length), "Active Stars", "users", "#3A7D44"],
    [total.toLocaleString("en-IN") + " hrs", "Total Contribution", "sprout", "#3A7D44"],
    [avgTarget + " hrs", "Avg. Yearly Target", "target", "#EE9B13"],
    [avgPct + "%", "Avg. Completion", "chart", "#3A7D44"],
    [avgStreak + " Months", "Avg. Streak", "flame", "#D8501F"],
  ];

  return (
    <div className="overflow-hidden" style={{ background: "#FBEBD0" }}>
      {/* ===== Hero ===== */}
      <section data-parallax className="relative">
        <svg viewBox="0 0 30 36" className="float-med absolute -left-3 top-40 hidden h-28 w-20 rotate-[25deg] lg:block" data-scroll-y="40" data-scroll-rot="12" aria-hidden><path d="M2 34C0 16 10 4 28 2c2 18-8 32-26 32z" fill="#58a844" /></svg>
        <div className={`${wrap} grid items-center gap-8 pb-28 pt-4 lg:grid-cols-[1fr_1.05fr]`}>
          <div className="relative z-10">
            <span className="hero-in hero-in-1 inline-flex items-center gap-2 rounded-md border-2 border-[#1F2A44] bg-[#FFFDF7] px-4 py-1.5 text-[15px] font-bold" style={{ color: CHILLI }}><AIcon n="star" s={18} />Our Stars</span>
            <h1 className="hero-in hero-in-2 mt-5 font-display text-[48px] font-extrabold leading-[1.02] tracking-tight sm:text-[58px]" style={{ color: DEEP }}><Bi en={<>The<br />Changemakers<br />of <Script line={false} className="text-[58px] sm:text-[70px]">Khandwa</Script></>} hi={<><Script line={false} className="text-[58px] sm:text-[70px]">खंडवा</Script> के<br />बदलाव लाने वाले</>} /></h1>
            <p className="hero-in hero-in-3 mt-7 max-w-[430px] text-[18px] leading-[1.55]" style={{ color: INK }}>Students, volunteers and community members who turn ideas into real impact on the ground.</p>
            <div className="hero-in hero-in-4 mt-7 flex flex-wrap gap-3">
              <button onClick={() => go("contact")} className="press inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-bold text-white shadow-lg" style={{ background: DEEP }}><AIcon n="users" s={20} />Join as a Volunteer <AIcon n="arrow" s={18} /></button>
              <button onClick={() => go("contact")} className="press inline-flex items-center gap-2 rounded-full bg-[#FFFDF7] px-6 py-3.5 text-[15px] font-bold shadow-lg" style={{ color: DEEP }}>Nominate a Star <AIcon n="star" s={18} /></button>
            </div>
          </div>
          <div className="relative mx-auto h-[330px] w-full max-w-[620px] sm:h-[400px]">
            <img src="images/about-khandwa-bg.webp" alt="Khandwa riverside at sunrise" data-depth="16" className="float-slow absolute left-0 top-[6%] h-[41%] w-[31%] -rotate-[6deg] rounded-2xl border-[5px] border-white object-cover shadow-xl" />
            <img src="images/real-group.webp" alt="Volunteers with the Empirical Shiksha Abhiyan banner" data-depth="28" className="absolute left-[34%] top-0 h-[43%] w-[32%] rotate-[2deg] rounded-2xl border-[5px] border-white object-cover shadow-xl" />
            <img src="images/swachhata.webp" alt="Kund cleanup" data-depth="20" className="float-med absolute right-0 top-[6%] h-[41%] w-[31%] rotate-[6deg] rounded-2xl border-[5px] border-white object-cover shadow-xl" />
            <img src="images/volunteers.webp" alt="Our volunteers" data-depth="10" className="absolute bottom-0 left-[3%] h-[48%] w-[94%] rounded-[26px] border-[5px] border-white object-cover object-[center_30%] shadow-2xl" />
          </div>
        </div>
        <div className={`${wrap} relative z-10 -mt-20`}>
          <div data-reveal-me data-tilt-me data-tilt-max="1.2" className="card-print grid grid-cols-2 gap-y-5 p-5 sm:grid-cols-3 sm:p-6 lg:grid-cols-5">
            {stats.map(([v, l, ic, c], i) => (
              <div key={l} className={`flex items-center justify-center gap-3 px-2 ${i ? "lg:border-l-2 lg:border-dashed lg:border-[#E9DCC0]" : ""}`}>
                <span style={{ color: c }}><AIcon n={ic} s={44} duo /></span>
                <span><b className="block font-display text-[28px] font-extrabold leading-none" style={{ color: INK }}><CountUp value={v} /></b><span className="mt-1 block text-[14px] font-semibold leading-tight text-slate-600">{l}</span></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Featured + leaderboard ===== */}
      <section className={`${wrap} mt-10 grid items-stretch gap-6 lg:grid-cols-[1.35fr_1fr]`}>
        <article onClick={() => openStar(top.slug)} className="card-print group relative grid cursor-pointer overflow-hidden sm:grid-cols-[250px_1fr]" role="link" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && openStar(top.slug)} aria-label={`Open ${top.name}'s profile`}>
          <div className="relative min-h-[320px] overflow-hidden sm:min-h-[420px]" style={{ background: top.tint }}>
            <svg viewBox="0 0 300 300" className="absolute -left-6 bottom-0 h-[280px] w-[280px]" aria-hidden><path d="M60 250C20 190 40 90 120 50c60-30 130-10 140 50-40-10-80 10-90 50 20 20 10 70-40 90-40 14-60 14-70 10z" fill={top.color} opacity=".85" /></svg>
            <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-md border-2 border-[#1F2A44] bg-[#D8501F] px-3 py-1 text-[13px] font-bold text-white"><AIcon n="star" s={15} />Top Contributor</span>
            {top.photo ? <img src={top.photo} alt={top.name} className="absolute inset-x-0 bottom-0 z-[1] h-full w-full object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.02]" /> : <span className="absolute inset-0 grid place-items-center"><Avatar s={top} size={150} /></span>}
          </div>
          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-2"><h2 className="font-display text-[34px] font-extrabold leading-none" style={{ color: INK }}>{top.name}</h2><span className="text-[#EE9B13]"><AIcon n="crown" s={34} duo /></span></div>
            <div className="mt-2 flex items-center gap-2 text-[16px] font-bold" style={{ color: top.color }}><AIcon n={top.roleIcon} s={20} />{top.role}</div>
            <p className="mt-3 flex gap-2 text-[16.5px] leading-[1.5]" style={{ color: INK }}><span className="font-display text-4xl font-extrabold leading-none" style={{ color: CHILLI }}>“</span>{top.quote}”</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="card-soft px-3 py-2 text-[13.5px] font-semibold text-slate-600"><span className="mr-1.5 inline-block align-middle text-[#EE9B13]"><AIcon n="clock" s={18} /></span><b className="text-[18px]" style={{ color: INK }}><CountUp value={String(hoursOf(top))} /> hrs</b> Contributed</div>
              <div className="card-soft px-3 py-2 text-[13.5px] font-semibold text-slate-600"><span className="mr-1.5 inline-block align-middle text-[#EE9B13]"><AIcon n="target" s={18} /></span><b className="text-[18px]" style={{ color: INK }}><CountUp value={String(top.target)} /> hrs</b> Yearly Target</div>
              <Ring pct={pctOf(top)} size={74} stroke={9}><b className="font-display text-[17px] leading-none" style={{ color: INK }}><CountUp value={pctOf(top) + "%"} /><span className="block text-[10px] font-semibold text-slate-500">Completed</span></b></Ring>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-[13.5px] font-bold">
              <span className="inline-flex items-center gap-1.5 rounded-md border-2 border-[#1F2A44] bg-[#FBE6C8] px-3 py-1.5"><span className="text-[#D8501F]"><AIcon n="flame" s={17} duo /></span><CountUp value={String(top.streak)} /> Month Streak</span>
              <span className="inline-flex items-center gap-1.5 rounded-md border-2 border-[#1F2A44] bg-[#FFF1C9] px-3 py-1.5"><span className="text-[#EE9B13]"><AIcon n="trophy" s={17} /></span>Longest Streak <CountUp value={String(top.longest)} /> Months</span>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t-2 border-dashed border-[#E9DCC0] pt-3 text-[13.5px] font-bold" style={{ color: INK }}>
              <span className="mr-1 text-slate-600">Key Achievements</span>
              {top.achievements.map((a) => <span key={a.name} className="inline-flex items-center gap-1.5 rounded-md bg-[#F6EAD3] px-2.5 py-1"><span style={{ color: top.color }}><AIcon n={a.icon} s={16} /></span>{a.name}</span>)}
            </div>
          </div>
        </article>
        <Leaderboard list={list} openStar={openStar} />
      </section>

      {/* ===== Filters ===== */}
      <section id="all-stars" className={`${wrap} mt-10 scroll-mt-28`}>
        <div className="card-soft flex flex-col gap-3 p-2.5 lg:flex-row lg:items-center">
          <div className="flex flex-1 flex-wrap gap-1.5">
            {CATS.map(([l, ic]) => (
              <button key={l} onClick={() => setCat(l)} className={`press inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[14.5px] font-bold transition ${cat === l ? "bg-[#17605C] text-white" : "text-[#1F2A44] hover:bg-[#F6EAD3]"}`}>
                <AIcon n={ic} s={18} />{l} <span className={cat === l ? "text-white/80" : "text-slate-500"}>({count(l)})</span>
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 rounded-lg border-2 border-[#1F2A44] bg-white px-3 py-2 lg:w-[260px]">
            <span className="text-slate-500"><AIcon n="search" s={18} /></span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a star…" className="w-full bg-transparent text-[15px] outline-none placeholder:text-slate-400" aria-label="Search a star" />
          </label>
        </div>

        <div key={cat + q} className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((s) => {
            const r = list.findIndex((x) => x.slug === s.slug) + 1;
            return (
              <article key={s.slug} onClick={() => openStar(s.slug)} onKeyDown={(e) => e.key === "Enter" && openStar(s.slug)} role="link" tabIndex={0} className="card-print group cursor-pointer overflow-hidden" aria-label={`Open ${s.name}'s profile`}>
                <div className="relative grid h-[116px] place-items-center border-b-2 border-[#1F2A44]" style={{ background: s.tint }}>
                  <span className="absolute left-2.5 top-2.5 grid h-8 min-w-8 place-items-center rounded-md border-2 border-[#1F2A44] bg-[#FFFDF7] px-1.5 font-display text-[14px] font-extrabold" style={{ color: INK }}>#{r}</span>
                  <span className="transition duration-300 group-hover:scale-110"><Avatar s={s} size={78} ring /></span>
                </div>
                <div className="p-4">
                  <h3 className="text-center font-display text-[21px] font-extrabold leading-tight" style={{ color: INK }}>{s.name}</h3>
                  <p className="mt-1 flex items-center justify-center gap-1.5 text-[14px] font-bold" style={{ color: s.color }}><AIcon n={s.roleIcon} s={17} />{s.role}</p>
                  <div className="mt-3 flex items-center justify-between text-[13px] font-semibold text-slate-600"><span><b className="text-[15px]" style={{ color: INK }}><CountUp value={String(hoursOf(s))} /> hrs</b> Completed</span><span><b className="text-[15px]" style={{ color: INK }}><CountUp value={String(s.target)} /> hrs</b> Target</span></div>
                  <div className="mt-2 flex items-center gap-2"><span className="h-2.5 flex-1 overflow-hidden rounded-full border-[1.5px] border-[#1F2A44] bg-[#F6EAD3]"><span className="fill-grow block h-full bg-[#3A7D44]" style={{ width: pctOf(s) + "%" }} /></span><b className="text-[13.5px]" style={{ color: INK }}><CountUp value={pctOf(s) + "%"} /></b></div>
                  <div className="mt-3 flex justify-center"><span className="inline-flex items-center gap-1.5 rounded-md bg-[#FBE6C8] px-3 py-1 text-[13.5px] font-bold" style={{ color: INK }}><span className="text-[#D8501F]"><AIcon n="flame" s={16} duo /></span><CountUp value={String(s.streak)} /> Month Streak</span></div>
                  <div className="mt-3 flex items-center justify-between border-t-2 border-dashed border-[#E9DCC0] pt-3">
                    <span className="flex gap-1.5">{s.achievements.map((a) => <span key={a.name} title={a.name} className="grid h-8 w-8 place-items-center rounded-md bg-[#F6EAD3]" style={{ color: s.color }}><AIcon n={a.icon} s={17} /></span>)}</span>
                    <span className="grid h-9 w-9 place-items-center rounded-md border-2 border-[#1F2A44] bg-[#FFFDF7] transition group-hover:bg-[#EE9B13]" style={{ color: INK }}><AIcon n="arrow" s={16} /></span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        {!cards.length && <p className="card-soft mt-6 p-5 text-[15px] font-semibold text-slate-600">No stars match this filter yet. Know someone? Nominate them below.</p>}
      </section>

      {/* ===== Milestones ===== */}
      <section className={`${wrap} mt-10`}>
        <div data-reveal-me className="card-print grid items-center gap-5 p-5 lg:grid-cols-[230px_1fr]">
          <div className="flex items-center gap-3"><svg viewBox="0 0 80 60" className="h-14 w-16 shrink-0" aria-hidden><path d="M2 58L28 18l14 20 12-14 24 34z" fill="#3A7D44" /><path d="M28 18l-6 9 6-3 5 3z" fill="#fff" opacity=".8" /><path d="M54 24V6l12 5-12 5" fill="#D8501F" stroke="#1F2A44" strokeWidth="1.5" /></svg><h2 className="font-display text-[24px] font-extrabold leading-tight" style={{ color: INK }}>Contribution<br />Milestones</h2></div>
          <ol className="relative grid grid-cols-2 gap-4 sm:grid-cols-5">
            <span className="absolute left-[8%] right-[8%] top-[22px] hidden border-t-2 border-dashed border-[#1F2A44]/40 sm:block" aria-hidden />
            {MILESTONES.map((m) => (
              <li key={m.hrs} className="relative flex flex-col items-center text-center">
                <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-[#1F2A44] bg-[#FFFDF7]" style={{ color: m.color }}><AIcon n={m.icon} s={22} duo /></span>
                <b className="mt-1.5 font-display text-[20px] font-extrabold leading-none" style={{ color: INK }}>{m.hrs} hrs</b>
                <span className="mt-1 text-[13.5px] font-semibold leading-tight text-slate-600">{m.name}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${wrap} mt-8`}><NominateBanner go={go} /></section>
      <div className="mt-10"><Skyline /></div>
    </div>
  );
}
