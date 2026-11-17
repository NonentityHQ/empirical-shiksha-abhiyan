import { useEffect, useMemo, useRef, useState } from "react";
import { AIcon } from "../icons";
import { CountUp } from "../ui";

const REEL = [
  { tag: "Shiksha", img: "images/shiksha.webp", icon: "book" },
  { tag: "Paryavaran", img: "images/paryavaran.webp", icon: "leaf" },
  { tag: "Swachhata", img: "images/swachhata.webp", icon: "broom" },
  { tag: "Mental Health", img: "images/swasthya.webp", icon: "heart" },
  { tag: "Our Volunteers", img: "images/volunteers.webp", icon: "users" },
  { tag: "Rally", img: "images/real-rally.webp", icon: "users" },
];

const REVIEWS = [
  { name: "Riya Patidar", role: "Student", img: "", quote: "Eklavya Batch ne meri padhai ko ek nayi direction di. Ab mujhe apne goals par confidence hai.", back: ["Eklavya Batch", "+32% in Academics", "Became More Confident"] },
  { name: "Rahul Geete", role: "Volunteer", img: "images/rahul.webp", quote: "Swachhata drives mein hissa lekar mujhe samajh aaya ki chhote efforts bhi badlaav la sakte hain.", back: ["Swachhata Drives", "Weekly Kund Cleanups", "Inspired Many Peers"] },
  { name: "Aman Verma", role: "Student", img: "", quote: "Isse mere padhne aur sochne ka tareeka badal gaya. Discipline aur khud par vishwas dono mile.", back: ["Eklavya Batch", "Better Study Habits", "Self-Belief Grew"] },
  { name: "Jayram Malakar", role: "Volunteer", img: "images/jay.webp", quote: "Jab students ke chehre par confidence dikhta hai, tab lagta hai ki hamari mehnat safal hui.", back: ["Community Action", "Students Mentored", "Real Change"] },
];

const MORE = [
  { tag: "Shiksha", ic: "book", c: "#2B459E", title: "A New Beginning with Education", img: "images/shiksha.webp" },
  { tag: "Paryavaran", ic: "leaf", c: "#3A7D44", title: "Turning a Vacant Space into a Green Corner", img: "images/real-plant.webp" },
  { tag: "Swachhata", ic: "broom", c: "#D8501F", title: "Cleanliness That Brought Change", img: "images/real-kund.webp" },
  { tag: "Mental Health", ic: "brain", c: "#1F2A44", title: "Learning to Handle Stress", img: "images/swasthya.webp" },
];

const STEPS = [["Idea Started", "target", "#2B459E"], ["Students Joined", "users", "#1A7F78"], ["Community Participated", "leaf", "#3A7D44"], ["Real Change", "heart", "#C0392B"], ["Stories Continue…", "target", "#EE9B13"]];

/* Film reel: curved strip, photos scroll continuously along the wave; arrows nudge it; hover pauses. */
function FilmReel() {
  const box = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const pos = useRef(0);
  const boost = useRef(0);
  const paused = useRef(false);
  const [dot, setDot] = useState(0);
  useEffect(() => {
    let raf = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tick = () => {
      const el = track.current, b = box.current;
      if (el && b) {
        const half = el.scrollWidth / 2;
        const step = (paused.current || reduce ? 0 : 0.6) + boost.current * 0.12;
        boost.current *= 0.88;
        if (Math.abs(boost.current) < 0.5) boost.current = 0;
        pos.current = (((pos.current + step) % half) + half) % half;
        el.style.transform = `translateX(${-pos.current}px)`;
        const W = b.clientWidth;
        Array.from(el.children).forEach((c) => {
          const f = c as HTMLElement;
          const cx = f.offsetLeft - pos.current + f.offsetWidth / 2;
          const u = cx / W;                               // 0..1 across the strip
          const y = Math.sin(u * Math.PI * 2 - 0.6) * 16; // wave
          const r = Math.cos(u * Math.PI * 2 - 0.6) * 4;
          f.style.transform = `translateY(${y}px) rotate(${r}deg)`;
        });
        setDot(Math.floor((pos.current / half) * 3) % 3);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  // wave centre line must match the JS wave above (viewBox 1000 x 300)
  const wave = (dy: number) => { let d = ""; for (let i = 0; i <= 50; i++) { const u = i / 50; d += `${i ? "L" : "M"}${(u * 1000).toFixed(1)},${(150 + dy + Math.sin(u * Math.PI * 2 - 0.6) * 16).toFixed(1)} `; } return d; };
  return (
    <section data-no-motion className="relative mx-auto mt-10 max-w-[1320px] px-3 sm:px-7">
      <div ref={box} className="relative h-[300px] sm:h-[310px] [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]" onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}>
        <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="absolute inset-0 h-full w-full drop-shadow-[0_14px_30px_rgba(43,69,158,.55)]" aria-hidden>
          <path d={wave(0)} fill="none" stroke="#2B459E" strokeWidth="236" strokeLinecap="butt" vectorEffect="non-scaling-stroke" />
          <path d={wave(0)} fill="none" stroke="#2B459E" strokeOpacity=".45" strokeWidth="228" vectorEffect="non-scaling-stroke" />
          <path d={wave(-100)} fill="none" stroke="#fff" strokeWidth="11" strokeDasharray="14 15" vectorEffect="non-scaling-stroke" />
          <path d={wave(100)} fill="none" stroke="#fff" strokeWidth="11" strokeDasharray="14 15" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="absolute inset-x-0 top-1/2 h-[170px] -translate-y-1/2 overflow-hidden">
          <div ref={track} className="flex h-full w-max items-center gap-4 will-change-transform">
            {[...REEL, ...REEL].map((r, i) => (
              <figure key={i} className="relative h-[150px] w-[210px] shrink-0 overflow-hidden rounded-xl border-[3px] border-white/90 shadow-lg sm:h-[160px] sm:w-[240px]">
                <img src={r.img} alt={r.tag} className="h-full w-full object-cover" draggable={false} />
                <figcaption className="absolute bottom-2.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold text-[#1F2A44] shadow"><AIcon n={r.icon} s={14} />{r.tag}</figcaption>
              </figure>
            ))}
          </div>
        </div>
        {([-1, 1] as const).map((d) => (
          <button key={d} aria-label={d < 0 ? "Previous" : "Next"} onClick={() => (boost.current = d * 420)} className={`press absolute top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-2xl font-bold text-[#1F2A44] shadow-lg ${d < 0 ? "left-1 sm:left-3" : "right-1 sm:right-3"}`}>{d < 0 ? "‹" : "›"}</button>
        ))}
      </div>
      <div className="-mt-1 flex justify-center gap-2" aria-hidden>{[0, 1, 2].map((i) => <span key={i} className={`h-2.5 w-2.5 rounded-full ${dot === i ? "bg-[#EE9B13]" : "bg-[#EBDCBC]"}`} />)}</div>
    </section>
  );
}

function FlipCard({ r }: { r: (typeof REVIEWS)[number] }) {
  const [flip, setFlip] = useState(false);
  return (
    <div className="flip-scene h-[250px] cursor-pointer" onClick={() => setFlip(!flip)} onKeyDown={(e) => e.key === "Enter" && setFlip(!flip)} tabIndex={0} role="button" aria-label={`Review by ${r.name}. Tap to flip.`}>
      <div className={`flip-card ${flip ? "is-flipped" : ""}`}>
        <article className="flip-face flip-front overflow-hidden rounded-[22px] bg-white p-5 shadow-[0_14px_30px_-18px_rgba(31,42,68,.5)] ring-1 ring-slate-200/70">
          <div className="flex items-center gap-3">
            {r.img ? <img src={r.img} alt="" className="h-14 w-14 rounded-full object-cover object-top ring-2 ring-sky-100" /> : <span className="grid h-14 w-14 place-items-center rounded-full bg-[#2B459E] font-display text-lg font-extrabold text-white">{r.name.split(" ").map((w) => w[0]).join("")}</span>}
            <div><b className="block font-display text-lg text-[#1F2A44]">{r.name}</b><span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-0.5 text-[11px] font-bold text-[#2B459E]"><AIcon n={r.role === "Student" ? "cap" : "users"} s={12} />{r.role}</span></div>
            <span className="ml-auto font-display text-5xl leading-none text-[#2B459E]/35">”</span>
          </div>
          <div className="mt-3 text-[#F4B93E]" aria-label="5 stars">★★★★★</div>
          <p className="mt-2 text-[14px] italic leading-6 text-slate-700">“{r.quote}”</p>
          <svg viewBox="0 0 400 60" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-12 w-full" aria-hidden><path d="M0 30C80 6 140 54 220 32S340 8 400 28V60H0z" fill="#2B459E" fillOpacity=".16" /><path d="M0 40C90 18 150 58 230 40S350 22 400 38V60H0z" fill="#2B459E" fillOpacity=".12" /></svg>
          <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white text-[#EE9B13] shadow ring-1 ring-orange-200"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 11a8 8 0 0 0-14-4M4 4v4h4M4 13a8 8 0 0 0 14 4M20 20v-4h-4" /></svg></span>
        </article>
        <article className="flip-face flip-back rounded-[22px] bg-[#2B459E] p-5 text-white shadow-[0_14px_30px_-14px_rgba(31,42,68,.8)]">
          <b className="font-display text-sm text-orange-300">{r.name} · {r.role}</b>
          <ul className="mt-4 space-y-3">
            {r.back.map((b, i) => <li key={b} className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-3 text-sm font-bold"><span className="text-orange-300"><AIcon n={["book", "chart", "target"][i]} s={22} /></span>{b}</li>)}
          </ul>
        </article>
      </div>
    </div>
  );
}

export default function SuccessStories({ go }: { go: (p: "contact") => void }) {
  const [filter, setFilter] = useState("All Reviews");
  const [start, setStart] = useState(0);
  const list = useMemo(() => REVIEWS.filter((r) => filter === "All Reviews" || r.role + "s" === filter), [filter]);
  const shown = list.length <= 3 ? list : [0, 1, 2].map((k) => list[(start + k) % list.length]);
  const paging = list.length > 3;

  return (
    <div className="overflow-hidden bg-[#FBF3E4]">
      {/* Hero */}
      <section data-parallax className="relative mx-auto grid max-w-[1320px] items-center gap-8 px-5 pb-6 pt-8 sm:px-8 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <div className="hero-in hero-in-1 inline-flex items-center gap-2 text-[14px] font-extrabold tracking-[.14em] text-[#1F2A44]">OUR SUCCESS STORIES <span className="h-[3px] w-6 rounded bg-[#EE9B13]" /></div>
          <h1 className="hero-in hero-in-2 mt-4 font-display text-[54px] font-extrabold leading-[1.02] tracking-tight text-[#1F2A44] sm:text-[68px] xl:text-[76px]">Real People,<br />Real <span className="relative inline-block -rotate-2 font-hand font-bold text-[#D8501F]">Change</span></h1>
          <p className="mt-6 max-w-[470px] text-[18px] leading-[1.6] text-slate-700">Inspiring stories of students, volunteers, and communities whose efforts are creating a positive change around us.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => document.getElementById("featured-story")?.scrollIntoView({ behavior: "smooth" })} className="press inline-flex items-center gap-2 rounded-full bg-[#EE9B13] btn-solid px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-orange-200">▶ Watch Stories</button>
            <button onClick={() => go("contact")} className="press rounded-full border border-[#2B459E]/40 bg-white px-6 py-3 text-sm font-extrabold text-[#1F2A44]">⇪ Share Your Story</button>
          </div>
        </div>
        <div className="relative mx-auto h-[330px] w-full max-w-[640px] sm:h-[380px]">
          <svg viewBox="0 0 40 40" className="absolute left-[38%] top-0 h-12 w-12 text-[#EE9B13]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden><path d="M6 20 14 18M20 4 20 12M32 8 28 15" /></svg>
          <svg viewBox="0 0 30 36" className="absolute -right-2 top-4 h-14 w-12 rotate-12" aria-hidden><path d="M2 34C0 16 10 4 28 2c2 18-8 32-26 32z" fill="#3A7D44" /></svg>
          <svg viewBox="0 0 30 36" className="absolute left-[-2%] bottom-6 h-10 w-8 -rotate-45" aria-hidden><path d="M2 34C0 16 10 4 28 2c2 18-8 32-26 32z" fill="#3A7D44" /></svg>
          <svg width="0" height="0" className="absolute" aria-hidden><defs><clipPath id="ss-blob" clipPathUnits="objectBoundingBox"><path d="M0.1,0.3 C0.16,0.07 0.5,0.01 0.72,0.04 C0.92,0.08 1,0.3 0.96,0.52 C0.92,0.78 0.72,0.97 0.46,0.98 C0.22,1 0.04,0.86 0.02,0.62 C0,0.48 0.04,0.4 0.1,0.3 Z" /></clipPath></defs></svg>
          <div data-depth="12" className="absolute inset-y-0 left-0 w-[66%]"><div className="absolute inset-0 bg-white" style={{ clipPath: "url(#ss-blob)", transform: "scale(1.025)" }} /><img src="images/volunteers.webp" alt="Volunteers and students together" className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: "url(#ss-blob)" }} /></div>
          {[["images/swasthya.webp", "right-0 top-0 -rotate-3"], ["images/real-plant.webp", "right-2 top-[34%] rotate-2"], ["images/swachhata.webp", "right-8 bottom-0 -rotate-2"]].map(([s, c]) => (
            <img key={s} data-depth={String(14 + (s.length % 3) * 8)} src={s} alt="" className={`absolute h-[30%] w-[38%] rounded-xl border-4 border-white object-cover shadow-xl ${c}`} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-4 sm:px-7">
        <div data-reveal-me data-tilt-me data-tilt-max="1.4" className="grid grid-cols-2 gap-y-3 rounded-[22px] border border-white bg-white p-4 shadow-[0_15px_36px_-18px_rgba(31,42,68,.35)] sm:grid-cols-4">
          {[["500+", "Students Benefited", "cap", "#2B459E"], ["50+", "Volunteers Inspired", "users", "#EE9B13"], ["25+", "Community Stories", "leaf", "#1A7F78"], ["4", "Focus Initiatives", "target", "#EE9B13"]].map(([v, l, ic, col], i) => (
            <div key={l} className={`flex items-center justify-center gap-3 px-3 ${i ? "sm:border-l sm:border-slate-200" : ""}`}><span style={{ color: col }}><AIcon n={ic} s={50} duo /></span><span><b className="block font-display text-[32px] font-extrabold leading-none text-[#1F2A44]"><CountUp value={v} /></b><span className="mt-1 block text-[14.5px] font-semibold text-slate-600">{l}</span></span></div>
          ))}
        </div>
      </section>

      <FilmReel />

      {/* Featured story */}
      <section id="featured-story" className="mx-auto mt-12 grid max-w-[1320px] items-center gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr_.9fr]">
        <a href="https://www.youtube.com/@empiricalinstituteabhiyan" target="_blank" rel="noreferrer" className="group relative block h-[260px] overflow-hidden rounded-[26px] border-4 border-white shadow-xl ring-2 ring-[#EE9B13]/70">
          <img src="images/shiksha.webp" alt="Eklavya Batch classroom" className="h-full w-full object-cover" />
          <span className="absolute inset-0 grid place-items-center"><span className="grid h-16 w-16 place-items-center rounded-full bg-[#1F2A44]/85 text-2xl text-white ring-4 ring-white/80 transition group-hover:scale-110">▶</span></span>
        </a>
        <div>
          <span className="rounded-md bg-[#EE9B13] px-2.5 py-1 text-[11px] font-extrabold text-white">FEATURED STORY</span>
          <h2 className="mt-3 font-display text-[40px] font-extrabold leading-[1.08] text-[#1F2A44] xl:text-[46px]">From Struggle to <span className="whitespace-nowrap text-[#EE9B13]">Self-Confidence</span></h2>
          <p className="mt-3 max-w-md text-[16px] leading-[1.6] text-slate-700">Through our Eklavya Batch, I not only improved my studies but also learned discipline and belief in myself.</p>
          <p className="mt-2 text-sm font-extrabold text-[#1F2A44]">— Aman Verma <span className="block text-xs font-semibold text-slate-500">Eklavya Batch Student</span></p>
        </div>
        <blockquote className="border-slate-200 lg:border-l lg:pl-8"><span className="font-display text-7xl font-extrabold leading-none text-[#2B459E]">“</span><p className="-mt-4 font-display text-[28px] font-bold italic leading-snug text-[#1F2A44]">This initiative changed the way I look at learning and my future.</p><svg viewBox="0 0 160 10" className="mt-2 w-40" aria-hidden><path d="M2 7C40 1 90 1 158 5" stroke="#2B459E" strokeWidth="3" fill="none" strokeLinecap="round" /></svg></blockquote>
      </section>

      {/* Reviews with flip cards */}
      <section className="mx-auto mt-12 max-w-[1320px] px-5 sm:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-[34px] font-extrabold text-[#1F2A44]">What Our Students & Volunteers Say<span className="mt-1 block h-[3px] w-14 rounded bg-[#EE9B13]" /></h2>
          <div className="flex gap-2">{["All Reviews", "Students", "Volunteers"].map((f) => <button key={f} onClick={() => { setFilter(f); setStart(0); }} className={`press rounded-full px-4 py-2 text-xs font-extrabold ring-1 ${filter === f ? "bg-[#1F2A44] text-white ring-transparent" : "bg-white text-[#1F2A44] ring-slate-200"}`}>{f}</button>)}</div>
        </div>
        <div className="relative mt-6">
          <div className="grid gap-5 md:grid-cols-3" key={filter + start}>{shown.map((r) => <FlipCard key={r.name} r={r} />)}</div>
          {paging && (<>
            <button aria-label="Previous review" onClick={() => setStart((start + list.length - 1) % list.length)} className="press absolute -left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-xl text-[#1F2A44] shadow-lg md:grid">‹</button>
            <button aria-label="Next review" onClick={() => setStart((start + 1) % list.length)} className="press absolute -right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-xl text-[#1F2A44] shadow-lg md:grid">›</button>
            <div className="mt-4 flex justify-center gap-2 md:hidden"><button onClick={() => setStart((start + list.length - 1) % list.length)} className="rounded-full bg-white px-4 py-2 text-sm font-bold shadow">‹ Prev</button><button onClick={() => setStart((start + 1) % list.length)} className="rounded-full bg-white px-4 py-2 text-sm font-bold shadow">Next ›</button></div>
          </>)}
        </div>
      </section>

      {/* More stories */}
      <section className="mx-auto mt-12 max-w-[1320px] px-5 sm:px-8">
        <div className="flex items-end justify-between"><h2 className="font-display text-[34px] font-extrabold text-[#1F2A44]">More Stories from Our Community<span className="mt-1 block h-[3px] w-14 rounded bg-[#EE9B13]" /></h2><button onClick={() => (window.location.hash = "#/gallery")} className="press hidden rounded-full bg-white px-4 py-2 text-xs font-extrabold text-[#1F2A44] shadow ring-1 ring-slate-200 sm:inline-flex">View All Stories →</button></div>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {MORE.map((m) => (
            <article key={m.title} className="overflow-hidden rounded-2xl bg-white shadow-[0_12px_26px_-18px_rgba(31,42,68,.5)] ring-1 ring-slate-200/70">
              <div className="relative h-32"><img src={m.img} alt="" className="h-full w-full object-cover" loading="lazy" /><span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-0.5 text-[11px] font-extrabold" style={{ color: m.c }}><AIcon n={m.ic} s={12} />{m.tag}</span></div>
              <div className="flex items-center justify-between gap-2 p-3"><b className="font-display text-[14px] leading-tight text-[#1F2A44]">{m.title}</b><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full ring-1 ring-slate-300 text-[#1F2A44]">→</span></div>
            </article>
          ))}
        </div>
      </section>

      {/* Impact journey */}
      <section className="mx-auto mt-10 max-w-[1320px] px-5 sm:px-8">
        <div className="flex flex-col items-center gap-6 lg:flex-row">
          <h2 className="font-display text-3xl font-extrabold leading-none text-[#1F2A44]">Our <span className="block text-[#EE9B13]">Impact</span>Journey</h2>
          <ol className="relative grid w-full flex-1 grid-cols-2 gap-5 sm:grid-cols-5"><span className="absolute left-[8%] right-[8%] top-7 hidden border-t-2 border-dashed border-[#2B459E]/40 sm:block" aria-hidden />
            {STEPS.map(([l, ic, c]) => <li key={l} className="relative flex flex-col items-center text-center"><span className="grid h-14 w-14 place-items-center rounded-full border-2 bg-white shadow" style={{ color: c, borderColor: c }}><AIcon n={ic} s={26} /></span><span className="mt-2 text-xs font-bold text-[#1F2A44]">{l}</span></li>)}
          </ol>
        </div>
      </section>

      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="mx-auto mt-2 h-12 w-full max-w-[1320px]" aria-hidden><path d="M0 60V40C120 10 220 46 360 26S560 8 700 30 960 50 1200 18V60z" fill="#E4EED8" /><path d="M0 60V50C160 28 300 56 480 40S800 24 1200 44V60z" fill="#7FB069" /></svg>
      <section className="mx-auto max-w-[1320px] px-5 pb-12 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-4 rounded-[22px] bg-[#1F2A44] p-6 text-white shadow-xl sm:flex-row sm:px-10">
          <svg viewBox="0 0 80 64" className="hidden h-16 w-20 shrink-0 sm:block" aria-hidden><path d="M8 26h14l32-16v44L22 38H8z" fill="#EE9B13" /><rect x="4" y="26" width="8" height="12" rx="2" fill="#EE9B13" /><path d="M24 40l4 16h8l-4-14" fill="#EE9B13" /><path d="M62 22c6 4 6 16 0 20M68 16c10 8 10 24 0 32" stroke="#F4B93E" strokeWidth="3" fill="none" strokeLinecap="round" /></svg><div className="flex-1"><h2 className="font-display text-2xl font-extrabold">Do You Have a Story to Share?</h2><p className="mt-1 max-w-xl text-sm text-white/85">Be it a learning journey, a community change, or a moment of personal growth — your story can inspire many more.</p></div>
          <button onClick={() => go("contact")} className="press shrink-0 rounded-full bg-[#EE9B13] btn-solid px-7 py-3 text-sm font-extrabold shadow-lg">Share Your Story →</button>
        </div>
      </section>
    </div>
  );
}
