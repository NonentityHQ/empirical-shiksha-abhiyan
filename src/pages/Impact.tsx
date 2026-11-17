import { useState } from "react";
import { PageHero } from "../shared";

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

function RuleHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-5">
      <span className="h-[2px] w-8 rounded-full bg-[#D8501F]" />
      <h2 className="font-display font-extrabold text-[18px] text-[#1F2A44] text-center">{children}</h2>
      <span className="h-[2px] w-8 rounded-full bg-[#D8501F]" />
    </div>
  );
}

/** Blob frame: photo with thick colored outline offset behind */
function BlobPhoto({
  src,
  alt,
  outline,
  className = "",
}: {
  src: string;
  alt: string;
  outline: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="absolute inset-0 translate-x-1.5 translate-y-1.5"
        style={{
          background: outline,
          borderRadius: "40% 60% 55% 45% / 45% 40% 60% 55%",
        }}
      />
      <div
        className="relative overflow-hidden shadow-md"
        style={{ borderRadius: "40% 60% 55% 45% / 45% 40% 60% 55%" }}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover aspect-[4/3]" />
      </div>
    </div>
  );
}


const STORIES = [
  {
    quote: "एकलव्य बैच में आने के बाद मेरी पढ़ाई में आत्मविश्वास आया। संदेह पूछने में अब डर नहीं लगता।",
    name: "Priya S.",
    role: "Eklavya Batch Student",
    img: "images/group-banner.webp",
  },
  {
    quote: "रमेश्वर कुंड की साप्ताहिक सफाई ने हमें सिखाया कि बदलाव छोटी-छोटी आदतों से शुरू होता है।",
    name: "Amit K.",
    role: "Volunteer · Swachhata",
    img: "images/clean-group-1.webp",
  },
  {
    quote: "मोबाइल लत पर बातचीत के बाद मैंने स्क्रीन-टाइम कम किया। नींद और पढ़ाई दोनों सुधरी।",
    name: "Rohan M.",
    role: "Mental Health Session",
    img: "images/init-rally.webp",
  },
];

function StoriesCarousel() {
  const [i, setI] = useState(0);
  const s = STORIES[i];
  const prev = () => setI((x) => (x - 1 + STORIES.length) % STORIES.length);
  const next = () => setI((x) => (x + 1) % STORIES.length);
  return (
    <section className="lg:col-span-4">
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="h-[2px] w-6 rounded-full bg-[#D8501F]" />
        <h2 className="font-display font-extrabold text-[16px] sm:text-[17px] text-[#1F2A44]">Stories in Their Own Words</h2>
        <span className="h-[2px] w-6 rounded-full bg-[#D8501F]" />
      </div>
      <div className="relative">
        <button type="button" onClick={prev} className="absolute -left-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[#D8501F] text-white grid place-items-center shadow-md hover:brightness-110 transition" aria-label="Previous story">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button type="button" onClick={next} className="absolute -right-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[#D8501F] text-white grid place-items-center shadow-md hover:brightness-110 transition" aria-label="Next story">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
        </button>
        <div className="mx-5 bg-white rounded-[22px] shadow-md ring-1 ring-black/[0.04] p-5 relative min-h-[170px]">
          <div className="absolute top-3 right-4 text-[#D8501F] text-4xl font-display leading-none opacity-80">&ldquo;</div>
          <div className="flex gap-3 items-start pr-6">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200 shrink-0 ring-2 ring-[#FBE6C8]">
              <img src={s.img} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0 pt-1">
              <p className="font-display font-bold text-[14px] text-[#1F2A44] leading-snug">&ldquo;{s.quote}&rdquo;</p>
              <div className="mt-2 font-bold text-[13px] text-[#1F2A44]">{s.name}</div>
              <div className="text-[11px] text-slate-500">{s.role}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        {STORIES.map((_, idx) => (
          <button key={idx} type="button" onClick={() => setI(idx)} className={`w-2 h-2 rounded-full transition ${idx === i ? "bg-[#D8501F]" : "bg-slate-300"}`} aria-label={`Story ${idx + 1}`} />
        ))}
      </div>
    </section>
  );
}

export default function Impact() {
  return (
    <>
      {/* Hero — do not change */}
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
      />

      {/* Full-width content matching desktop design */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-5 pb-14 space-y-7 md:space-y-9">
        {/* ===== Stats bar ===== */}
        <section className="rounded-[22px] md:rounded-[28px] bg-[#2B459E] text-white overflow-hidden shadow-lg">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-white/20">
            {[
              { n: "1,000+", color: "#F4B93E", l1: "Students Consulted", icon: Icon.cap },
              { n: "80+", color: "#F4B93E", l1: "Education Beneficiaries", icon: Icon.book },
              { n: "60+", color: "#3A7D44", l1: "Volunteers Active", icon: Icon.leaf },
              { n: "25+", color: "#D8501F", l1: "Cleanup Drives", icon: Icon.bin },
            ].map((s) => (
              <div key={s.l1} className="flex items-center justify-center gap-3 py-5 px-3 sm:px-4">
                <div className="text-white/90 shrink-0">{s.icon}</div>
                <div>
                  <div className="font-display font-extrabold text-[22px] sm:text-[26px] leading-none" style={{ color: s.color }}>
                    {s.n}
                  </div>
                  <div className="mt-1 text-[11px] sm:text-[12px] leading-tight text-white/90 font-semibold">
                    {s.l1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Key Initiatives + Eklavya + Stories (desktop 3-col) ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          {/* Our Key Initiatives */}
          <section className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-[2px] w-6 rounded-full bg-[#D8501F]" />
              <h2 className="font-display font-extrabold text-[16px] sm:text-[17px] text-[#1F2A44]">Our Key Initiatives</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Education", bg: "#FBF3E4", icon: Icon.books, tc: "#2B459E" },
                { label: "Cleanliness", bg: "#FBE6C8", icon: Icon.broom, tc: "#D8501F" },
                { label: "Environment", bg: "#E4EED8", icon: Icon.seedling, tc: "#3A7D44" },
                { label: "Mental Health", bg: "#F6D6DE", icon: Icon.brain, tc: "#C2456B" },
              ].map((t) => (
                <div
                  key={t.label}
                  className="rounded-[18px] p-4 flex flex-col items-center justify-center min-h-[110px] shadow-sm"
                  style={{ background: t.bg }}
                >
                  {t.icon}
                  <div className="mt-2 font-display font-extrabold text-[13px] sm:text-[14px]" style={{ color: t.tc }}>
                    {t.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* The Eklavya Batch */}
          <section className="lg:col-span-5 relative rounded-[24px] overflow-hidden bg-[#FBF3E4] p-5 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center h-full">
              <div>
                <h2 className="font-display font-extrabold text-[20px] sm:text-[22px] text-[#1F2A44] leading-tight">The Eklavya Batch</h2>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                  Regular academic support for students from middle-class and economically disadvantaged families.
                </p>
                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-1.5 h-10 px-5 rounded-full border-2 border-[#2B459E] text-[#2B459E] font-bold text-[13px] bg-white hover:bg-[#2B459E] hover:text-white transition"
                >
                  Know More →
                </button>
              </div>
              <BlobPhoto src="images/group-banner.webp" alt="Eklavya Batch classroom" outline="#D8501F" />
            </div>
          </section>

          {/* Stories in Their Own Words */}
          <StoriesCarousel />
        </div>

        {/* ===== Three feature cards row ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Mental Well-being */}
          <section className="rounded-[22px] bg-[#2B459E] text-white overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 h-full">
              <div className="relative h-36 overflow-hidden">
                <img src="images/init-rally.webp" alt="Mental well-being session" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B459E] via-transparent to-transparent" />
              </div>
              <div className="p-5 -mt-6 relative">
                <div className="flex items-center gap-1.5 text-[#F4B93E] text-[12px] font-bold">
                  <span className="text-[#F4B93E]">{Icon.pulse}</span>
                  Mental Well-being
                </div>
                <h3 className="mt-1.5 font-display font-extrabold text-[20px] leading-tight">
                  Phones Down,<br />Conversations Up.
                </h3>
                <div className="mt-3 grid grid-cols-3 gap-1.5">
                  {[
                    { label: "Awareness", icon: Icon.phone },
                    { label: "Open Q&A", icon: Icon.chat },
                    { label: "Healthy Habits", icon: Icon.heart },
                  ].map((t) => (
                    <div key={t.label} className="rounded-xl bg-white/15 backdrop-blur-sm px-1.5 py-2 text-center">
                      <div className="flex justify-center text-white/90 mb-0.5">{t.icon}</div>
                      <div className="text-[10px] font-semibold leading-tight">{t.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Every Week at Rameshwar Kund */}
          <section className="relative rounded-[22px] overflow-hidden bg-[#E4EED8] p-5 sm:p-6 shadow-sm flex flex-col justify-between min-h-[280px]">
            <div>
              <h2 className="font-display font-extrabold text-[20px] sm:text-[22px] text-[#1F2A44] leading-tight">
                Every Week at<br />Rameshwar Kund
              </h2>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-1.5 h-10 px-5 rounded-full bg-[#D8501F] text-white font-bold text-[13px] shadow-md hover:brightness-110 transition"
              >
                See Cleanups →
              </button>
            </div>
            <div className="mt-4">
              <BlobPhoto src="images/clean-group-1.webp" alt="Rameshwar Kund cleanup" outline="#3A7D44" />
            </div>
          </section>

          {/* Community Action */}
          <section className="relative rounded-[22px] overflow-hidden min-h-[280px] shadow-lg">
            <img src="images/clean-group-2.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B2340]/95 via-[#1B2340]/55 to-[#1B2340]/20" />
            <div className="relative p-5 sm:p-6 flex flex-col justify-end h-full min-h-[280px]">
              <div className="flex items-center gap-1.5 text-[#3A7D44] text-[12px] font-bold">
                {Icon.recycle}
                Community Action
              </div>
              <h3 className="mt-1.5 font-display font-extrabold text-[22px] text-white leading-tight">
                Collect. Race.<br />Dispose.
              </h3>
              <button
                type="button"
              disabled
              className="mt-3 inline-flex items-center gap-2 h-10 px-4 rounded-full bg-white text-[#1F2A44] font-bold text-[13px] w-fit opacity-95 cursor-not-allowed"
            >
              <span className="w-6 h-6 rounded-full bg-[#D8501F] text-white grid place-items-center">
                <svg viewBox="0 0 24 24" className="w-3 h-3 ml-0.5" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              Watch Video
            </button>
            </div>
          </section>
        </div>

        {/* ===== Volunteers + Have an Idea (side by side) ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">
          <section className="lg:col-span-5 flex items-center gap-4 sm:gap-5">
            <div className="w-[140px] sm:w-[180px] shrink-0">
              <BlobPhoto src="images/team-gloves.webp" alt="Volunteers group" outline="#2B459E" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[#3A7D44] mb-1">
                {Icon.people}
              </div>
              <h2 className="font-display font-extrabold text-[20px] sm:text-[24px] text-[#1F2A44] leading-tight">
                <span className="text-[#3A7D44]">60+</span> Volunteers,
                <br />
                One Shared Idea.
              </h2>
            </div>
          </section>

          <section className="lg:col-span-7 rounded-[22px] bg-[#FBE6C8] p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="flex gap-3 items-start flex-1 min-w-0">
              <div className="shrink-0">{Icon.bulb}</div>
              <div className="min-w-0">
                <h2 className="font-display font-extrabold text-[20px] text-[#1F2A44]">Have an Idea?</h2>
                <p className="mt-1 text-[13px] sm:text-[14px] text-slate-600 leading-relaxed">
                  Tell us how we can make Khandwa cleaner, healthier and more aware.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="shrink-0 h-11 px-6 rounded-full bg-[#D8501F] text-white font-bold text-[14px] shadow-md hover:brightness-110 transition w-full sm:w-auto"
            >
              Share Your Idea →
            </button>
          </section>
        </div>
      </div>
    </>
  );
}
