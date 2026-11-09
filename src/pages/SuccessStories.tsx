import { useEffect, useMemo, useRef, useState } from "react";
import { AIcon } from "../icons";
import BottomUpLetters from "../components/smoothui/bottom-up-letters";
import BlurOutUp from "../components/smoothui/blur-out-up";

const REEL = [
  { tag: "Shiksha", img: "images/shiksha.jpg", icon: "book" },
  { tag: "Paryavaran", img: "images/paryavaran.jpg", icon: "leaf" },
  { tag: "Swachhata", img: "images/swachhata.jpg", icon: "broom" },
  { tag: "Mental Health", img: "images/swasthya.jpg", icon: "heart" },
  { tag: "Our Volunteers", img: "images/volunteers.jpg", icon: "users" },
  { tag: "Rally", img: "images/real-rally.jpg", icon: "users" },
];

const REVIEWS = [
  { name: "Riya Patidar", role: "Student", img: "", quote: "Eklavya Batch ne meri padhai ko ek nayi direction di. Ab mujhe apne goals par confidence hai.", back: ["Eklavya Batch", "+32% in Academics", "Became More Confident"] },
  { name: "Rahul Geete", role: "Volunteer", img: "images/rahul.jpg", quote: "Swachhata drives mein hissa lekar mujhe samajh aaya ki chhote efforts bhi badlaav la sakte hain.", back: ["Swachhata Drives", "Weekly Kund Cleanups", "Inspired Many Peers"] },
  { name: "Aman Verma", role: "Student", img: "", quote: "Isse mere padhne aur sochne ka tareeka badal gaya. Discipline aur khud par vishwas dono mile.", back: ["Eklavya Batch", "Better Study Habits", "Self-Belief Grew"] },
  { name: "Jayram Malakar", role: "Volunteer", img: "images/jay.jpg", quote: "Jab students ke chehre par confidence dikhta hai, tab lagta hai ki hamari mehnat safal hui.", back: ["Community Action", "Students Mentored", "Real Change"] },
];

const MORE = [
  { tag: "Shiksha", title: "A New Beginning with Education", img: "images/shiksha.jpg" },
  { tag: "Paryavaran", title: "Turning a Vacant Space into a Green Corner", img: "images/real-plant.jpg" },
  { tag: "Swachhata", title: "Cleanliness That Brought Change", img: "images/real-kund.jpg" },
  { tag: "Mental Health", title: "Learning to Handle Stress", img: "images/swasthya.jpg" },
];

const STEPS = [["Idea Started", "book"], ["Students Joined", "users"], ["Community Participated", "leaf"], ["Real Change", "heart"], ["Stories Continue…", "users"]];

/* Film reel: photos scroll continuously; arrows nudge it; hover pauses. */
function FilmReel() {
  const track = useRef<HTMLDivElement>(null);
  const pos = useRef(0);
  const boost = useRef(0);
  const paused = useRef(false);
  useEffect(() => {
    let raf = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tick = () => {
      const el = track.current;
      if (el) {
        const half = el.scrollWidth / 2;
        const step = (paused.current || reduce ? 0 : 0.6) + boost.current * 0.12;
        boost.current *= 0.88;
        if (Math.abs(boost.current) < 0.5) boost.current = 0;
        pos.current = (((pos.current + step) % half) + half) % half;
        el.style.transform = `translateX(${-pos.current}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const holes = "repeating-linear-gradient(90deg,#fff 0 14px,transparent 14px 28px)";
  return (
    <section className="relative mx-auto mt-10 max-w-[1320px] px-3 sm:px-7">
      <div className="relative rounded-[22px] bg-gradient-to-b from-[#0d3a8f] to-[#0a2a6b] py-3 shadow-[0_22px_40px_-22px_rgba(13,47,122,.7)]" onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}>
        <div className="mx-4 h-2.5 rounded-sm opacity-90" style={{ background: holes, backgroundSize: "28px 100%" }} />
        <div className="relative my-3 overflow-hidden">
          <div ref={track} className="flex w-max gap-4 px-4 will-change-transform">
            {[...REEL, ...REEL].map((r, i) => (
              <figure key={i} className="relative h-[170px] w-[240px] shrink-0 overflow-hidden rounded-xl ring-4 ring-[#0a2a6b] sm:h-[190px] sm:w-[280px]">
                <img src={r.img} alt={r.tag} className="h-full w-full object-cover" draggable={false} />
                <figcaption className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold text-[#0d2f7a] shadow"><AIcon n={r.icon} s={14} />{r.tag}</figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="mx-4 h-2.5 rounded-sm opacity-90" style={{ background: holes, backgroundSize: "28px 100%" }} />
        {([-1, 1] as const).map((d) => (
          <button key={d} aria-label={d < 0 ? "Previous" : "Next"} onClick={() => (boost.current = d * 420)} className={`press absolute top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-xl font-bold text-[#0d2f7a] shadow-lg ${d < 0 ? "left-2" : "right-2"}`}>{d < 0 ? "‹" : "›"}</button>
        ))}
      </div>
    </section>
  );
}

function ReviewCard({ r }: { r: (typeof REVIEWS)[number] }) {
  const isStudent = r.role === "Student";
  const roleTone = isStudent
    ? "bg-[#edf4ff] text-[#1f5fd1]"
    : "bg-[#eef8ed] text-[#368a42]";
  const avatarTone = isStudent
    ? "from-[#1f5fd1] to-[#5b91e8]"
    : "from-[#29945a] to-[#78b96b]";

  return (
    <article className="group relative flex min-h-[276px] flex-col overflow-hidden rounded-[24px] border border-[#dfe8f5] bg-white p-5 shadow-[0_14px_34px_-26px_rgba(13,47,122,.48)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-[#f3c18e] hover:shadow-[0_24px_44px_-26px_rgba(13,47,122,.35)] sm:p-6">
      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1769dc] via-[#65a5e8] to-[#f2850f]" aria-hidden="true" />
      <span className="pointer-events-none absolute -right-5 -top-8 h-28 w-28 rounded-full border-[12px] border-[#eef4fc] opacity-80 transition-transform duration-700 group-hover:scale-110" aria-hidden="true" />

      <div className="relative z-10 flex items-center gap-3">
        {r.img ? (
          <img src={r.img} alt={`${r.name}`} loading="lazy" className="h-12 w-12 rounded-full border-2 border-white object-cover object-top shadow-sm ring-1 ring-slate-200" />
        ) : (
          <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br ${avatarTone} font-display text-sm font-extrabold text-white shadow-sm`}>
            {r.name.split(" ").map((word) => word[0]).join("")}
          </span>
        )}
        <div className="min-w-0">
          <b className="block truncate font-display text-[16px] font-extrabold text-[#0d2f7a] sm:text-[17px]">{r.name}</b>
          <span className={`mt-1 inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[.08em] ${roleTone}`}>{r.role}</span>
        </div>
        <span className="ml-auto select-none font-display text-[54px] font-extrabold leading-none text-[#f2850f]/25" aria-hidden="true">“</span>
      </div>

      <p className="relative z-10 mt-5 flex-1 pr-1 text-[14px] leading-[1.75] text-slate-700 sm:text-[15px]">
        “{r.quote}”
      </p>

      <div className="relative z-10 mt-5 border-t border-slate-100 pt-4">
        <div className="mb-2.5 text-[10px] font-extrabold uppercase tracking-[.16em] text-slate-400">Impact experienced</div>
        <ul className="flex flex-wrap gap-2">
          {r.back.map((label, index) => (
            <li key={label} className="inline-flex items-center gap-1.5 rounded-full border border-[#e4ecf8] bg-[#f5f8fd] px-2.5 py-1.5 text-[10px] font-bold leading-tight text-[#294b84] sm:text-[11px]">
              <span className="shrink-0 text-[#f2850f]"><AIcon n={["book", "users", "heart"][index]} s={13} /></span>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function SuccessStories({ go }: { go: (p: "contact") => void }) {
  const [filter, setFilter] = useState("All Reviews");
  const [start, setStart] = useState(0);
  const list = useMemo(() => REVIEWS.filter((r) => filter === "All Reviews" || r.role + "s" === filter), [filter]);
  const shown = list.length <= 3 ? list : [0, 1, 2].map((k) => list[(start + k) % list.length]);
  const paging = list.length > 3;

  return (
    <div className="overflow-hidden bg-gradient-to-b from-[#f4f8ff] to-white">
      {/* Hero */}
      <section className="relative mx-auto grid max-w-[1320px] items-center gap-8 px-5 pb-6 pt-8 sm:px-8 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[.16em] text-[#0d2f7a]">OUR SUCCESS STORIES <span className="h-[3px] w-6 rounded bg-[#f2850f]" /></div>
          <h1 className="mt-3 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-[#0d2f7a] sm:text-6xl"><BottomUpLetters delay={80} stagger={30}>Real People,</BottomUpLetters><br />Real <span className="text-[#f2850f]">Change</span></h1>
          <p className="mt-5 max-w-md text-[16px] leading-7 text-slate-700">Inspiring stories of students, volunteers, and communities whose efforts are creating a positive change around us.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => document.getElementById("featured-story")?.scrollIntoView({ behavior: "smooth" })} className="press inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff9a18] to-[#f2611c] px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-orange-200">▶ Watch Stories</button>
            <button onClick={() => go("contact")} className="press rounded-full border border-[#1769dc]/40 bg-white px-6 py-3 text-sm font-extrabold text-[#0d2f7a]">⇪ Share Your Story</button>
          </div>
        </div>
        <div className="relative mx-auto h-[330px] w-full max-w-[640px] sm:h-[380px]">
          <svg width="0" height="0" className="absolute" aria-hidden><defs><clipPath id="ss-blob" clipPathUnits="objectBoundingBox"><path d="M0.1,0.3 C0.16,0.07 0.5,0.01 0.72,0.04 C0.92,0.08 1,0.3 0.96,0.52 C0.92,0.78 0.72,0.97 0.46,0.98 C0.22,1 0.04,0.86 0.02,0.62 C0,0.48 0.04,0.4 0.1,0.3 Z" /></clipPath></defs></svg>
          <div className="absolute inset-y-0 left-0 w-[66%]"><div className="absolute inset-0 bg-white" style={{ clipPath: "url(#ss-blob)", transform: "scale(1.025)" }} /><img src="images/volunteers.jpg" alt="Volunteers and students together" className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: "url(#ss-blob)" }} /></div>
          {[["images/swasthya.jpg", "right-0 top-0 -rotate-3"], ["images/real-plant.jpg", "right-2 top-[34%] rotate-2"], ["images/swachhata.jpg", "right-8 bottom-0 -rotate-2"]].map(([s, c]) => (
            <img key={s} src={s} alt="" className={`absolute h-[30%] w-[38%] rounded-xl border-4 border-white object-cover shadow-xl ${c}`} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-4 sm:px-7">
        <div className="grid grid-cols-2 gap-y-3 rounded-[22px] border border-white bg-white p-4 shadow-[0_15px_36px_-18px_rgba(18,48,122,.35)] sm:grid-cols-4">
          {[["500+", "Students Benefited", "book"], ["50+", "Volunteers Inspired", "users"], ["25+", "Community Stories", "leaf"], ["4", "Focus Initiatives", "heart"]].map(([v, l, ic], i) => (
            <div key={l} className={`flex items-center justify-center gap-3 px-3 ${i ? "sm:border-l sm:border-slate-200" : ""}`}><span className="text-[#1769dc]"><AIcon n={ic} s={34} /></span><span><b className="block font-display text-2xl font-extrabold text-[#0d2f7a]">{v}</b><span className="text-xs font-semibold text-slate-600">{l}</span></span></div>
          ))}
        </div>
      </section>

      <FilmReel />

      {/* Featured story */}
      <section id="featured-story" className="mx-auto mt-12 grid max-w-[1320px] items-center gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr_.9fr]">
        <a href="https://www.youtube.com/@empiricalinstituteabhiyan" target="_blank" rel="noreferrer" className="group relative block h-[260px] overflow-hidden rounded-[26px] border-4 border-white shadow-xl ring-2 ring-[#f2850f]/70">
          <img src="images/shiksha.jpg" alt="Eklavya Batch classroom" className="h-full w-full object-cover" />
          <span className="absolute inset-0 grid place-items-center"><span className="grid h-16 w-16 place-items-center rounded-full bg-[#0d2f7a]/85 text-2xl text-white ring-4 ring-white/80 transition group-hover:scale-110">▶</span></span>
        </a>
        <div>
          <span className="rounded-md bg-[#f2850f] px-2.5 py-1 text-[11px] font-extrabold text-white">FEATURED STORY</span>
          <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight text-[#0d2f7a]">From Struggle to <span className="text-[#f2850f]">Self-Confidence</span></h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-700"><BlurOutUp triggerOnView stagger={18}>Through our Eklavya Batch, I not only improved my studies but also learned discipline and belief in myself.</BlurOutUp></p>
          <p className="mt-2 text-sm font-extrabold text-[#0d2f7a]">— Aman Verma <span className="block text-xs font-semibold text-slate-500">Eklavya Batch Student</span></p>
        </div>
        <blockquote className="border-slate-200 lg:border-l lg:pl-8"><span className="font-display text-6xl leading-none text-[#1769dc]">“</span><p className="-mt-3 font-display text-2xl font-bold italic leading-snug text-[#0d2f7a]">This initiative changed the way I look at learning and my future.</p></blockquote>
      </section>

      {/* Reviews: quote and outcome details stay visible together */}
      <section className="mx-auto mt-12 max-w-[1320px] px-5 sm:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-3xl font-extrabold text-[#0d2f7a]">What Our Students & Volunteers Say<span className="mt-1 block h-[3px] w-14 rounded bg-[#f2850f]" /></h2>
          <div className="flex gap-2">{["All Reviews", "Students", "Volunteers"].map((f) => <button key={f} onClick={() => { setFilter(f); setStart(0); }} className={`press rounded-full px-4 py-2 text-xs font-extrabold ring-1 ${filter === f ? "bg-[#0d2f7a] text-white ring-transparent" : "bg-white text-[#0d2f7a] ring-slate-200"}`}>{f}</button>)}</div>
        </div>
        <div className="relative mt-6">
          <div className="grid gap-5 md:grid-cols-3" key={filter + start}>{shown.map((r) => <ReviewCard key={r.name} r={r} />)}</div>
          {paging && (<>
            <button aria-label="Previous review" onClick={() => setStart((start + list.length - 1) % list.length)} className="press absolute -left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-xl text-[#0d2f7a] shadow-lg md:grid">‹</button>
            <button aria-label="Next review" onClick={() => setStart((start + 1) % list.length)} className="press absolute -right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-xl text-[#0d2f7a] shadow-lg md:grid">›</button>
            <div className="mt-4 flex justify-center gap-2 md:hidden"><button onClick={() => setStart((start + list.length - 1) % list.length)} className="rounded-full bg-white px-4 py-2 text-sm font-bold shadow">‹ Prev</button><button onClick={() => setStart((start + 1) % list.length)} className="rounded-full bg-white px-4 py-2 text-sm font-bold shadow">Next ›</button></div>
          </>)}
        </div>
      </section>

      {/* More stories */}
      <section className="mx-auto mt-12 max-w-[1320px] px-5 sm:px-8">
        <h2 className="font-display text-3xl font-extrabold text-[#0d2f7a]">More Stories from Our Community<span className="mt-1 block h-[3px] w-14 rounded bg-[#f2850f]" /></h2>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {MORE.map((m) => (
            <article key={m.title} className="overflow-hidden rounded-2xl bg-white shadow-[0_12px_26px_-18px_rgba(13,47,122,.5)] ring-1 ring-slate-200/70">
              <div className="relative h-32"><img src={m.img} alt="" className="h-full w-full object-cover" loading="lazy" /><span className="absolute bottom-2 left-2 rounded-full bg-white/95 px-2.5 py-0.5 text-[11px] font-extrabold text-[#0d2f7a]">{m.tag}</span></div>
              <div className="flex items-center justify-between gap-2 p-3"><b className="font-display text-[14px] leading-tight text-[#0d2f7a]">{m.title}</b><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full ring-1 ring-slate-300 text-[#0d2f7a]">→</span></div>
            </article>
          ))}
        </div>
      </section>

      {/* Impact journey */}
      <section className="mx-auto mt-10 max-w-[1320px] px-5 sm:px-8">
        <div className="flex flex-col items-center gap-6 lg:flex-row">
          <h2 className="font-display text-3xl font-extrabold leading-none text-[#0d2f7a]">Our <span className="block text-[#f2850f]">Impact</span>Journey</h2>
          <ol className="grid w-full flex-1 grid-cols-2 gap-5 sm:grid-cols-5">
            {STEPS.map(([l, ic]) => <li key={l} className="flex flex-col items-center text-center"><span className="grid h-14 w-14 place-items-center rounded-full border-2 border-dashed border-[#1769dc]/50 bg-white text-[#1769dc] shadow"><AIcon n={ic} s={26} /></span><span className="mt-2 text-xs font-bold text-[#0d2f7a]">{l}</span></li>)}
          </ol>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-[1320px] px-5 pb-12 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-4 rounded-[22px] bg-gradient-to-r from-[#0a2a6b] to-[#1769dc] p-6 text-white shadow-xl sm:flex-row sm:px-10">
          <div><h2 className="font-display text-2xl font-extrabold">Do You Have a Story to Share?</h2><p className="mt-1 max-w-xl text-sm text-white/85">Be it a learning journey, a community change, or a moment of personal growth — your story can inspire many more.</p></div>
          <button onClick={() => go("contact")} className="press shrink-0 rounded-full bg-gradient-to-r from-[#ff9a18] to-[#f2611c] px-7 py-3 text-sm font-extrabold shadow-lg">Share Your Story →</button>
        </div>
      </section>
    </div>
  );
}
