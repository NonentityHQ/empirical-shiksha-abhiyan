import { useEffect, useState } from "react";
import { PageHero } from "../shared";
import { LeafBranch } from "../decor";

type AreaKey = "shiksha" | "swachhata" | "paryavaran" | "swasthya";

/* ---- Simple flat icons for the numbered circle (match design) ---- */
function SectionIcon({ k }: { k: AreaKey }) {
  const common = { fill: "none", stroke: "white", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (k === "shiksha")
    return (
      <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden>
        <path d="M3 19 V7 c0-1 .6-1.5 1.4-1.8 L12 3 l7.6 2.2c.8.3 1.4.8 1.4 1.8 v12" {...common} />
        <path d="M3 19 L12 15.5 21 19" {...common} />
        <path d="M12 3.2 V15.5" {...common} />
      </svg>
    );
  if (k === "swachhata")
    return (
      <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden>
        <path d="M14 3 L9 14" {...common} />
        <path d="M6 13 L12 16 L10 21 L5 18 Z" {...common} />
        <path d="M7.5 15.5 L9.5 17.2 M8.5 17 L10.5 18.5" {...common} />
      </svg>
    );
  if (k === "paryavaran")
    return (
      <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden>
        <path d="M12 22v-9" {...common} />
        <path d="M12 13c-4 0-7-3-7-7 4 0 7 3 7 7z" {...common} />
        <path d="M12 13c4 0 7-3 7-7-4 0-7 3-7 7z" {...common} />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden>
      <path d="M3 12h4l2-5 3 10 2-5h5" {...common} />
      <path d="M12 21c-4-3-7-6-7-9a3.5 3.5 0 0 1 7-2 3.5 3.5 0 0 1 7 2c0 3-3 6-7 9z" {...common} />
    </svg>
  );
}

/* ---- Faint line-art decorations (left side of each band) ---- */
function SideDecor({ k, color }: { k: AreaKey; color: string }) {
  return (
    <svg viewBox="0 0 120 520" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {k === "shiksha" && (
        <>
          {/* open book */}
          <path d="M20 70 L55 55 L90 70 L55 90 Z" />
          <path d="M55 90 V55" />
          {/* lightbulb */}
          <circle cx="55" cy="160" r="18" />
          <path d="M48 178 v12 M62 178 v12 M45 198 h20" />
          <path d="M55 142 v-8" />
          {/* school building */}
          <path d="M30 280 h50 v40 H30 z" />
          <path d="M30 280 L55 255 L80 280" />
          <path d="M48 300 v20 M62 300 v20" />
          <path d="M55 255 v-12" />
        </>
      )}
      {k === "swachhata" && (
        <>
          {/* broom */}
          <path d="M70 40 L45 130" />
          <path d="M35 125 L55 135 L48 160 L28 148 Z" />
          {/* bin */}
          <path d="M35 210 h50 l-6 70 H41 z" />
          <path d="M30 210 h60" />
          <path d="M50 225 v40 M60 225 v40" />
          {/* leaves */}
          <path d="M40 340 c-12 0-20-16-12-28 8 4 16 12 12 28z" />
          <path d="M55 360 c12 0 20-16 12-28 -8 4-16 12-12 28z" />
          <path d="M48 332 v40" />
        </>
      )}
      {k === "paryavaran" && (
        <>
          {/* tree */}
          <path d="M55 40 c-22 0-30-28-14-40 6 18 14 28 14 40 0-12 8-22 14-40 16 12 8 40-14 40z" />
          <path d="M55 40 v55" />
          <path d="M40 100 h30" />
          {/* leaf cluster */}
          <path d="M30 180 c-14 0-22-18-10-32 10 6 18 16 10 32z" />
          <path d="M50 200 c14 0 22-18 10-32 -10 6-18 16-10 32z" />
          <path d="M40 168 v40" />
          {/* sprout */}
          <path d="M55 280 v50" />
          <path d="M55 300 c-18-4-24-22-12-34" />
          <path d="M55 310 c18-4 24-22 12-34" />
        </>
      )}
      {k === "swasthya" && (
        <>
          {/* heart */}
          <path d="M55 90 C35 70 20 78 25 98 C30 118 55 135 55 135 C55 135 80 118 85 98 C90 78 75 70 55 90 Z" />
          {/* small heart */}
          <path d="M40 180 C30 170 22 174 24 184 C26 194 40 204 40 204 C40 204 54 194 56 184 C58 174 50 170 40 180 Z" />
          {/* brain / head outline */}
          <circle cx="55" cy="280" r="28" />
          <path d="M40 275 c5-12 15-16 25-10" />
          <path d="M42 290 c8 6 18 6 26-2" />
          {/* pulse */}
          <path d="M25 360 h15 l6-14 8 28 6-14 h20" />
        </>
      )}
    </svg>
  );
}

/* ---- Shared 4-frame collage layout (same arrangement in every section) ---- */
const FRAMES = [
  { rot: -4, pos: "left-[1%] top-[3%] w-[49%] z-[2]", tape: "tl" as const },
  { rot: 3, pos: "right-[1%] top-0 w-[47%] z-[3]", tape: "tr" as const },
  { rot: -2.5, pos: "left-[9%] bottom-[1%] w-[46%] z-[4]", tape: null },
  { rot: 4, pos: "right-[5%] bottom-[6%] w-[44%] z-[5]", tape: null },
];

function Tape({ pos }: { pos: "tl" | "tr" }) {
  return (
    <div
      aria-hidden
      className={`absolute -top-3 z-10 w-16 h-6 rounded-[2px] shadow-sm ${pos === "tl" ? "-left-5 -rotate-[38deg]" : "-right-5 rotate-[38deg]"}`}
      style={{
        background: "repeating-linear-gradient(90deg, rgba(242,97,28,0.9) 0 10px, rgba(255,140,77,0.9) 10px 20px)",
        opacity: 0.92,
      }}
    />
  );
}

const SECTIONS: {
  key: AreaKey;
  num: string;
  titleHi: string;
  titleEn: string;
  tagline: string;
  hindi: string;
  color: string;
  tint: string;
  collage: string[];
}[] = [
  {
    key: "shiksha",
    num: "01",
    titleHi: "शिक्षा",
    titleEn: "Shiksha",
    tagline: "Learning today for a brighter tomorrow.",
    hindi: "हर बच्चे तक गुणवत्तापूर्ण शिक्षा, उज्जवल समाज की नींव है।",
    color: "#1f5fd1",
    tint: "#eaf1ff",
    collage: [
      "images/shiksha.jpg",
      "images/volunteers.jpg",
      "images/shiksha.jpg",
      "images/swasthya.jpg",
    ],
  },
  {
    key: "swachhata",
    num: "02",
    titleHi: "स्वच्छता",
    titleEn: "Swachhata",
    tagline: "Cleaner spaces, healthier communities.",
    hindi: "स्वच्छ वातावरण, स्वस्थ जीवन और सशक्त समाज की ओर।",
    color: "#f2611c",
    tint: "#fff4eb",
    collage: [
      "images/swachhata.jpg",
      "images/clogrun.jpg",
      "images/volunteers.jpg",
      "images/swachhata.jpg",
    ],
  },
  {
    key: "paryavaran",
    num: "03",
    titleHi: "पर्यावरण",
    titleEn: "Paryavaran",
    tagline: "Greener today for a healthier tomorrow.",
    hindi: "पेड़, प्रकृति और पर्यावरण — एक बेहतर कल के लिए आज ही कदम।",
    color: "#3f9a3a",
    tint: "#eef8ec",
    collage: [
      "images/paryavaran.jpg",
      "images/paryavaran.jpg",
      "images/volunteers.jpg",
      "images/swachhata.jpg",
    ],
  },
  {
    key: "swasthya",
    num: "04",
    titleHi: "मानसिक स्वास्थ्य",
    titleEn: "Mansik Swasthya",
    tagline: "Stronger minds, brighter lives.",
    hindi: "मानसिक स्वास्थ्य के प्रति जागरूकता, खुशहाल और आत्मविश्वासी समुदाय के लिए।",
    color: "#d62828",
    tint: "#fdf0f0",
    collage: [
      "images/swasthya.jpg",
      "images/shiksha.jpg",
      "images/volunteers.jpg",
      "images/swasthya.jpg",
    ],
  },
];

const MONTHLY: Record<AreaKey, { month: string; images: { src: string; caption: string }[] }[]> = {
  shiksha: [{
    month: "November 2026",
    images: [
      { src: "images/shiksha.jpg", caption: "Eklavya Batch — evening class" },
      { src: "images/volunteers.jpg", caption: "Doubt-clearing session" },
      { src: "images/shiksha.jpg", caption: "Group study circle" },
      { src: "images/swasthya.jpg", caption: "Reading hour" },
      { src: "images/shiksha.jpg", caption: "Homework support" },
      { src: "images/volunteers.jpg", caption: "Weekend revision" },
    ],
  }],
  swachhata: [{
    month: "November 2026",
    images: [
      { src: "images/swachhata.jpg", caption: "Rameshwar Kund cleanup" },
      { src: "images/clogrun.jpg", caption: "Clog Run drive" },
      { src: "images/volunteers.jpg", caption: "Volunteer team at site" },
      { src: "images/swachhata.jpg", caption: "Weekly kund cleaning" },
      { src: "images/clogrun.jpg", caption: "Waste segregation" },
      { src: "images/volunteers.jpg", caption: "Community drive" },
    ],
  }],
  paryavaran: [{
    month: "November 2026",
    images: [
      { src: "images/paryavaran.jpg", caption: "Sapling plantation" },
      { src: "images/volunteers.jpg", caption: "Green space care" },
      { src: "images/paryavaran.jpg", caption: "Tree nurturing" },
      { src: "images/swachhata.jpg", caption: "Kund surroundings" },
      { src: "images/paryavaran.jpg", caption: "Volunteer planting" },
      { src: "images/volunteers.jpg", caption: "Community greening" },
    ],
  }],
  swasthya: [{
    month: "November 2026",
    images: [
      { src: "images/swasthya.jpg", caption: "Awareness session" },
      { src: "images/shiksha.jpg", caption: "Student circle talk" },
      { src: "images/swasthya.jpg", caption: "Phone addiction workshop" },
      { src: "images/volunteers.jpg", caption: "Peer support group" },
      { src: "images/swasthya.jpg", caption: "Well-being discussion" },
      { src: "images/shiksha.jpg", caption: "Classroom dialogue" },
    ],
  }],
};

function getAreaFromHash(): AreaKey | null {
  const h = window.location.hash.replace("#/", "");
  const m = h.match(/^gallery\/(shiksha|swachhata|paryavaran|swasthya)$/);
  return m ? (m[1] as AreaKey) : null;
}

export default function Gallery() {
  const [area, setArea] = useState<AreaKey | null>(getAreaFromHash);

  useEffect(() => {
    const on = () => setArea(getAreaFromHash());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  const openArea = (key: AreaKey) => {
    window.location.hash = `/gallery/${key}`;
    setArea(key);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  const backToGallery = () => {
    window.location.hash = "/gallery";
    setArea(null);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  /* ---- Detail page ---- */
  if (area) {
    const sec = SECTIONS.find((s) => s.key === area)!;
    return (
      <>
        <PageHero
          eyebrow="Gallery"
          title={
            <>
              <span className="notranslate" translate="no">{sec.titleHi}</span>
              {" — "}
              <span className="text-flame">{sec.titleEn}</span>
            </>
          }
          sub={sec.tagline}
          img={sec.collage[0]}
        />
        <section className="max-w-7xl mx-auto px-5 py-10 md:py-14">
          <button onClick={backToGallery} className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-ink transition mb-8">
            ← Back to Gallery
          </button>
          {MONTHLY[area].map((album) => (
            <div key={album.month} className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-full grid place-items-center shadow-sm" style={{ background: sec.color }}>
                  <SectionIcon k={area} />
                </div>
                <div>
                  <h2 className="font-display font-extrabold text-2xl text-ink">{album.month}</h2>
                  <p className="text-sm text-slate-500">Work done under {sec.titleEn}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                {album.images.map((im, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-md ring-1 ring-black/5">
                    <img src={im.src} alt={im.caption} className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white text-sm font-semibold leading-snug">{im.caption}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </>
    );
  }

  /* ---- Main gallery overview ---- */
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={<>Moments from <span className="text-flame">the ground</span></>}
        sub="Photographs and stories from our classes, cleanups, environment work and awareness sessions."
        img="images/swachhata.jpg"
      />

      <div>
        {SECTIONS.map((s) => (
          <section key={s.key} className="relative overflow-hidden" style={{ background: s.tint }}>
            {/* Background: watercolour wash, soft waves and leaf sprigs */}
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse 60% 50% at 88% 6%, rgba(255,255,255,0.85), transparent 70%), radial-gradient(ellipse 55% 45% at 4% 96%, ${s.color}22, transparent 70%), radial-gradient(ellipse 45% 40% at 96% 92%, ${s.color}16, transparent 70%)`,
                }}
              />
              <svg className="absolute left-0 bottom-0 w-full h-[46%]" viewBox="0 0 1200 240" preserveAspectRatio="none">
                <path d="M0 150 C180 110 320 190 520 150 S860 100 1050 150 S1150 170 1200 150 L1200 240 L0 240 Z" fill={s.color} opacity="0.07" />
                <path d="M0 185 C200 150 380 215 600 180 S980 150 1200 190 L1200 240 L0 240 Z" fill="#ffffff" opacity="0.55" />
              </svg>
              <svg className="absolute right-0 top-0 w-[38%] h-[30%]" viewBox="0 0 400 200" preserveAspectRatio="none">
                <path d="M400 0 L400 60 C330 40 270 90 200 50 S90 10 0 30 L0 0 Z" fill={s.color} opacity="0.05" />
              </svg>
              <LeafBranch className="absolute -left-8 top-[32%] w-[170px] opacity-[0.22] hidden md:block -rotate-[24deg]" />
              <LeafBranch className="absolute -left-10 bottom-[4%] w-[190px] opacity-[0.26] hidden md:block rotate-[6deg]" />
              <LeafBranch className="absolute right-[-40px] top-[14%] w-[150px] opacity-[0.18] hidden lg:block -scale-x-100 -rotate-[6deg]" />
              <LeafBranch className="absolute right-[-30px] bottom-[10%] w-[140px] opacity-[0.2] hidden lg:block -scale-x-100 rotate-[14deg]" />
            </div>

            {/* Side line-art decorations */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-[72px] md:w-[100px] lg:w-[120px] opacity-[0.11] hidden sm:block" aria-hidden>
              <SideDecor k={s.key} color={s.color} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-6 lg:gap-10 items-center">
                {/* LEFT copy */}
                <div className="md:col-span-1 lg:col-span-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-14 h-14 sm:w-[60px] sm:h-[60px] rounded-full grid place-items-center shadow-md"
                      style={{ background: s.color, boxShadow: `0 8px 24px ${s.color}40` }}
                    >
                      <SectionIcon k={s.key} />
                    </div>
                    <span className="text-[15px] sm:text-base font-bold tracking-[0.18em]" style={{ color: s.color }}>
                      {s.num}
                    </span>
                  </div>

                  <h2 className="font-display font-extrabold text-[26px] sm:text-[30px] md:text-[34px] leading-[1.2] text-ink">
                    <span className="notranslate" translate="no">{s.titleHi}</span>
                    <span className="text-slate-400 font-bold"> - </span>
                    <span style={{ color: s.color }}>{s.titleEn}</span>
                  </h2>

                  <p className="mt-2.5 text-[15px] sm:text-[16px] font-semibold text-slate-700 leading-snug">
                    {s.tagline}
                  </p>
                  <p className="mt-2 text-[14px] sm:text-[15px] text-slate-600 leading-relaxed max-w-sm notranslate" translate="no">
                    {s.hindi}
                  </p>

                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-[12px] sm:text-[13px] font-semibold text-slate-600 ring-1 ring-black/5">
                    <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                    {MONTHLY[s.key][0].month} · {MONTHLY[s.key][0].images.length} photos
                  </div>
                  <div className="mt-6 sm:mt-8 flex items-center gap-3">
                    <button
                      onClick={() => openArea(s.key)}
                      className="inline-flex items-center gap-2 h-11 sm:h-12 px-6 sm:px-7 rounded-full text-white font-bold text-[14px] sm:text-[15px] shadow-lg hover:brightness-110 active:scale-[0.98] transition"
                      style={{ background: s.color, boxShadow: `0 10px 24px ${s.color}45` }}
                    >
                      See More
                      <span className="text-base leading-none">→</span>
                    </button>
                  </div>
                </div>

                {/* RIGHT collage: 4 framed photos */}
                <div className="md:col-span-1 lg:col-span-7">
                  <div className="relative w-full">
                    <div className="relative mx-auto md:mx-0 md:ml-auto w-full max-w-[400px] md:max-w-[420px] lg:max-w-[440px] xl:max-w-[470px] aspect-square md:aspect-[5/4]">
                      {/* scrapbook backdrop in the section colour */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-[3%] inset-y-[5%] rounded-[32px] -rotate-[1.5deg]"
                        style={{ background: `${s.color}14`, boxShadow: `inset 0 0 0 1px ${s.color}1f` }}
                      />

                      {/* sparkles */}
                      <svg className="pointer-events-none absolute -left-2 top-[2%] w-7 h-7 hidden sm:block" viewBox="0 0 24 24" aria-hidden>
                        <path d="M12 2 L13.6 10.4 L22 12 L13.6 13.6 L12 22 L10.4 13.6 L2 12 L10.4 10.4 Z" fill={s.color} opacity="0.55" />
                      </svg>
                      <svg className="pointer-events-none absolute right-[2%] bottom-[2%] w-5 h-5 hidden sm:block" viewBox="0 0 24 24" aria-hidden>
                        <path d="M12 2 L13.6 10.4 L22 12 L13.6 13.6 L12 22 L10.4 13.6 L2 12 L10.4 10.4 Z" fill={s.color} opacity="0.4" />
                      </svg>

                      {s.collage.map((src, i) => {
                        const f = FRAMES[i];
                        return (
                          <div
                            key={i}
                            className={`group absolute bg-white p-[6px] sm:p-[9px] rounded-[4px] shadow-[0_14px_30px_rgba(0,0,0,0.16)] ${f.pos}`}
                            style={{ transform: `rotate(${f.rot}deg)` }}
                          >
                            {f.tape && <Tape pos={f.tape} />}
                            <div className="relative aspect-square overflow-hidden">
                              <img
                                src={src}
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        );
                      })}

                      {/* leaf accent */}
                      <svg
                        className="pointer-events-none absolute -right-1 top-[30%] w-8 h-10 opacity-50 hidden sm:block"
                        viewBox="0 0 32 40"
                        fill="none"
                        stroke={s.color}
                        strokeWidth="1.5"
                        aria-hidden
                      >
                        <path d="M16 38 V18" strokeLinecap="round" />
                        <path d="M16 20 C6 20 4 8 10 4 C12 12 16 16 16 20" />
                        <path d="M16 22 C26 22 28 10 22 6 C20 14 16 18 16 22" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
