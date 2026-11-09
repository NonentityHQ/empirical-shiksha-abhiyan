import { useMemo, useState, type CSSProperties } from "react";
import { AREAS } from "../shared";
import { AIcon } from "../icons";
import HeroVisual from "./HeroVisual";
import CountUpValue from "../components/CountUpValue";

type FocusItem = { icon: string; title: string; text: string };
type StatItem = { value: string; label: string; icon: string };
type PageInfo = {
  eyebrow: string;
  headline: string;
  subtitle: string;
  intro: string;
  heroImage: string;
  heroPosition?: string;
  theme: string;
  soft: string;
  deep: string;
  focusTitle: string;
  focus: FocusItem[];
  stats: StatItem[];
  galleryTitle: string;
  filters: string[];
  gallery: { title: string; image: string; tag: string; position?: string }[];
  impactLead: string;
  impact: StatItem[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaText: string;
  ctaImage: string;
  ctaButton: string;
  shape?: "curve" | "blob";
  accent?: string;
  impactCols?: number;
};

const PAGES: Record<string, PageInfo> = {
  shiksha: {
    eyebrow: "Our Initiative",
    headline: "Shiksha",
    subtitle: "Education for Equal Opportunities",
    intro: "Bridging learning gaps, supporting students, and creating a stronger educational foundation through the Eklavya Batch.",
    heroImage: "images/shiksha.jpg",
    heroPosition: "center 48%",
    theme: "#1769dc",
    soft: "#eaf3ff",
    deep: "#0d347f",
    focusTitle: "How We Support Education",
    focus: [
      { icon: "book", title: "Learning Support", text: "Regular subject classes, revision and doubt clearing." },
      { icon: "book", title: "Study Resources", text: "Providing books, notes and learning material." },
      { icon: "users", title: "Mentorship", text: "Guidance and motivation from volunteers." },
      { icon: "users", title: "Digital Learning", text: "Helping students access useful learning tools." },
    ],
    stats: [
      { value: "80+", label: "Students supported", icon: "users" },
      { value: "Eklavya", label: "Learning batch", icon: "book" },
      { value: "Regular", label: "Classes & revision", icon: "book" },
      { value: "Khandwa", label: "Community-led", icon: "users" },
    ],
    galleryTitle: "A Glimpse of Our Shiksha Initiatives",
    filters: ["All", "Classes", "Team", "Resources"],
    gallery: [
      { title: "Learning session", image: "images/shiksha.jpg", tag: "Classes" },
      { title: "Eklavya Batch & team", image: "images/group-banner.png", tag: "Team" },
      { title: "Students learning together", image: "images/real-group.jpg", tag: "Classes" },
      { title: "Volunteer-led learning", image: "images/hero-volunteers.png", tag: "Team" },
      { title: "Learning with volunteers", image: "images/hero-volunteers.png", tag: "Resources" },
    ],
    impactLead: "Our Impact So Far",
    impact: [
      { value: "80+", label: "Students", icon: "users" },
      { value: "Eklavya", label: "Batch", icon: "book" },
      { value: "Regular", label: "Learning support", icon: "book" },
      { value: "Khandwa", label: "Community", icon: "users" },
    ],
    ctaEyebrow: "Be a Part of Shiksha",
    ctaTitle: "Support a Child’s Education",
    ctaText: "Join hands with us to provide learning opportunities, resources and guidance to students who need support.",
    ctaImage: "images/shiksha.jpg",
    ctaButton: "Get Involved",
  },
  swachhata: {
    eyebrow: "Our Initiative",
    headline: "Swachhata",
    subtitle: "Clean Surroundings, Healthy Communities",
    intro: "A community-driven initiative to create cleaner schools, public spaces and neighbourhoods through awareness, participation and action.",
    heroImage: "images/clogrun.jpg",
    heroPosition: "center 48%",
    theme: "#1769dc",
    soft: "#eaf3ff",
    deep: "#0b347f",
    focusTitle: "How We Drive Cleanliness",
    focus: [
      { icon: "broom", title: "Cleanliness Drives", text: "Regular cleanups at kunds, schools and public spaces." },
      { icon: "users", title: "Community Awareness", text: "Local campaigns that build shared responsibility." },
      { icon: "recycle", title: "Waste Management", text: "Promoting waste collection and responsible disposal." },
      { icon: "drop", title: "Clean Habits", text: "Encouraging everyday hygiene and cleaner surroundings." },
    ],
    stats: [
      { value: "25+", label: "Cleanup visits & drives", icon: "broom" },
      { value: "20+", label: "Rameshwar Kund visits", icon: "drop" },
      { value: "2", label: "Padam Kund visits", icon: "recycle" },
      { value: "Weekly", label: "Community action", icon: "users" },
    ],
    galleryTitle: "A Glimpse of Our Swachhata Initiatives",
    filters: ["All", "Drives", "Kunds", "Community"],
    gallery: [
      { title: "Community cleanliness drive", image: "images/clogrun.jpg", tag: "Drives" },
      { title: "Rameshwar Kund cleanup", image: "images/clean-group-1.png", tag: "Kunds" },
      { title: "Volunteers at the kund", image: "images/real-kund.jpg", tag: "Community" },
      { title: "Public-space cleanup", image: "images/clean-group-2.png", tag: "Drives" },
      { title: "Padam Kund visit", image: "images/real-kund-2.jpg", tag: "Kunds" },
    ],
    impactLead: "Our Impact So Far",
    impact: [
      { value: "25+", label: "Cleanup visits", icon: "broom" },
      { value: "20+", label: "Rameshwar Kund", icon: "drop" },
      { value: "2", label: "Padam Kund visits", icon: "recycle" },
      { value: "Weekly", label: "Ongoing action", icon: "users" },
    ],
    ctaEyebrow: "Be a Part of Swachhata",
    ctaTitle: "Let’s Build a Cleaner Community",
    ctaText: "Join us in keeping schools, streets, kunds and public spaces clean, safe and welcoming for everyone.",
    ctaImage: "images/clogrun.jpg",
    ctaButton: "Join as a Volunteer",
  },
  paryavaran: {
    eyebrow: "Our Initiative",
    headline: "Paryavaran",
    subtitle: "A Greener and Healthier Tomorrow",
    intro: "Spreading awareness, planting trees and promoting sustainable habits for a cleaner, healthier and more balanced environment.",
    heroImage: "images/paryavaran.jpg",
    heroPosition: "center 48%",
    theme: "#279447",
    soft: "#eaf7e9",
    deep: "#075b35",
    focusTitle: "How We Protect Our Environment",
    focus: [
      { icon: "leaf", title: "Tree Plantation", text: "Planting more trees for greener shared spaces." },
      { icon: "users", title: "Environmental Awareness", text: "Sharing knowledge about conservation." },
      { icon: "recycle", title: "Sustainable Habits", text: "Encouraging reduce, reuse and recycle." },
      { icon: "drop", title: "Resource Conservation", text: "Promoting care for water and biodiversity." },
    ],
    stats: [
      { value: "Green", label: "Community initiatives", icon: "leaf" },
      { value: "Local", label: "Environmental action", icon: "users" },
      { value: "Khandwa", label: "Shared spaces", icon: "drop" },
      { value: "Ongoing", label: "Awareness work", icon: "recycle" },
    ],
    galleryTitle: "A Glimpse of Our Paryavaran Initiatives",
    filters: ["All", "Plantation", "Awareness", "Community"],
    gallery: [
      { title: "Plantation activity", image: "images/paryavaran.jpg", tag: "Plantation" },
      { title: "Saplings and green spaces", image: "images/plant-real.png", tag: "Plantation" },
      { title: "Volunteer participation", image: "images/team-gloves.png", tag: "Community" },
      { title: "Community awareness", image: "images/group-banner.png", tag: "Awareness" },
      { title: "Planting for tomorrow", image: "images/real-plant.jpg", tag: "Plantation" },
    ],
    impactLead: "Our Impact So Far",
    impact: [
      { value: "Green", label: "Community action", icon: "leaf" },
      { value: "Local", label: "Participation", icon: "users" },
      { value: "Ongoing", label: "Awareness", icon: "recycle" },
      { value: "Khandwa", label: "Our home", icon: "drop" },
    ],
    ctaEyebrow: "Be a Part of Paryavaran",
    ctaTitle: "Let’s Make Our Khandwa Greener",
    ctaText: "Join hands with us to care for nature, protect shared spaces and build a healthier environment.",
    ctaImage: "images/real-plant.jpg",
    ctaButton: "Plant a Tree Today",
  },
  swasthya: {
    eyebrow: "मानसिक स्वास्थ्य अभियान",
    headline: "A Healthy Mind for a Better Tomorrow",
    subtitle: "",
    intro: "Creating awareness, reducing stigma, and supporting the mental well-being of students and youth in our community.",
    heroImage: "images/swasthya.jpg",
    heroPosition: "center 43%",
    theme: "#087fb5",
    soft: "#e8f6fc",
    deep: "#103c78",
    focusTitle: "Our Focus Areas",
    focus: [
      { icon: "heart", title: "Mental Health Awareness", text: "Breaking the stigma and encouraging open conversations." },
      { icon: "leaf", title: "Stress & Anxiety Management", text: "Simple and practical ways to handle academic and personal stress." },
      { icon: "users", title: "Emotional Support", text: "A safe and positive space for students to share and seek guidance." },
      { icon: "heart", title: "Healthy Habits", text: "Building a balanced lifestyle with good sleep, focus and digital well-being." },
    ],
    stats: [
      { value: "10+", label: "Awareness sessions", icon: "users" },
      { value: "500+", label: "Students reached", icon: "users" },
      { value: "15+", label: "Wellness activities", icon: "heart" },
      { value: "50+", label: "Volunteers involved", icon: "users" },
    ],
    galleryTitle: "A Glimpse of Our Mansik Swasthya Initiatives",
    filters: ["All", "Sessions", "Students", "Awareness"],
    gallery: [
      { title: "Mental well-being session", image: "images/swasthya.jpg", tag: "Sessions" },
      { title: "Student awareness", image: "images/real-rally.jpg", tag: "Awareness" },
      { title: "Group discussion", image: "images/volunteers.jpg", tag: "Students" },
      { title: "Community conversations", image: "images/real-group.jpg", tag: "Students" },
      { title: "Awareness through action", image: "images/init-rally.jpg", tag: "Awareness" },
    ],
    impactLead: "Our Impact",
    impact: [
      { value: "Better", label: "Awareness", icon: "book" },
      { value: "Positive", label: "Conversations", icon: "users" },
      { value: "Improved", label: "Well-being", icon: "heart" },
      { value: "50+", label: "Volunteers involved", icon: "users" },
    ],
    ctaEyebrow: "Be a Part of Mansik Swasthya",
    ctaTitle: "Let’s Build a Mentally Healthier Generation",
    ctaText: "Be a part of our Mental Health initiative. Volunteer, organise sessions, or support awareness drives in your community.",
    ctaImage: "images/swasthya.jpg",
    ctaButton: "Join as a Volunteer",
  },
};

/* ---- Reference-design data: numbers, filters, theme and hero shape per page ---- */
const patch = (id: string, p: Partial<PageInfo>) => { PAGES[id] = { ...PAGES[id], ...p }; };
patch("shiksha", {
  shape: "curve", accent: "#f2850f", theme: "#1769dc", deep: "#0d2f7a", soft: "#eaf2ff",
  stats: [{ value: "80+", label: "Students Supported", icon: "users" }, { value: "100+", label: "Learning Sessions", icon: "book" }, { value: "12+", label: "Volunteers", icon: "users" }, { value: "4", label: "Schools Reached", icon: "book" }],
  filters: ["All", "Classes", "Workshops", "Events", "Resources"],
  gallery: [
    { title: "Learning Session", image: "images/shiksha.jpg", tag: "Classes" },
    { title: "Eklavya Batch & team", image: "images/group-banner.png", tag: "Events" },
    { title: "Students learning together", image: "images/real-group.jpg", tag: "Workshops" },
    { title: "Volunteer-led learning", image: "images/volunteers.jpg", tag: "Classes" },
    { title: "Study Material Support", image: "images/hero-volunteers.png", tag: "Resources" },
  ],
  impactLead: "Our Impact So Far",
  impact: [{ value: "80+", label: "Students", icon: "users" }, { value: "100+", label: "Sessions", icon: "book" }, { value: "95%", label: "Learning Improvement", icon: "book" }, { value: "4", label: "Schools", icon: "users" }],
});
patch("swachhata", {
  shape: "curve", accent: "#8bc34a", theme: "#2f9a46", deep: "#0b4a3a", soft: "#eaf7ea",
  stats: [{ value: "300+", label: "Volunteers", icon: "users" }, { value: "20+", label: "Cleanliness Drives", icon: "broom" }, { value: "12+", label: "Public Areas Cleaned", icon: "drop" }, { value: "5+", label: "Schools & Institutions", icon: "book" }],
  filters: ["All", "Drives", "Awareness", "Community", "Schools"],
  gallery: [
    { title: "Cleanliness Drive", image: "images/swachhata.jpg", tag: "Drives" },
    { title: "Awareness Campaign", image: "images/init-hero-group.png", tag: "Awareness" },
    { title: "Rameshwar Kund cleanup", image: "images/real-kund.jpg", tag: "Community" },
    { title: "Community Cleaning", image: "images/clogrun.jpg", tag: "Community" },
    { title: "Padam Kund visit", image: "images/real-kund-2.jpg", tag: "Schools" },
  ],
  heroImage: "images/swachhata.jpg", heroPosition: "center 40%",
  impact: [{ value: "300+", label: "Volunteers", icon: "users" }, { value: "20+", label: "Cleanliness Drives", icon: "broom" }, { value: "50+", label: "Kg Waste Collected", icon: "recycle" }, { value: "12+", label: "Public Areas", icon: "drop" }, { value: "5+", label: "Schools Engaged", icon: "book" }],
  impactCols: 5,
});
// Blue/orange alternate of Swachhata (reference #2): open at #/initiatives/swachhata-blue
PAGES["swachhata-blue"] = { ...PAGES.swachhata, theme: "#1769dc", deep: "#0d2f7a", soft: "#eaf2ff", accent: "#f2850f" };
patch("paryavaran", { shape: "curve", accent: "#8bc34a", theme: "#2f9a46", deep: "#0b4a3a" });
patch("swasthya", {
  shape: "blob", accent: "#f2850f", theme: "#0aa3a3", deep: "#0d2f7a", soft: "#e6f7f8",
  filters: ["All", "Awareness", "Workshops", "Discussions", "Activities"],
  gallery: [
    { title: "मानसिक स्वास्थ्य जागरूकता सत्र", image: "images/swasthya.jpg", tag: "Awareness" },
    { title: "Group discussion", image: "images/volunteers.jpg", tag: "Discussions" },
    { title: "Awareness through action", image: "images/init-rally.jpg", tag: "Activities" },
    { title: "Mental Health Awareness Drive", image: "images/real-group.jpg", tag: "Awareness" },
    { title: "Student workshop", image: "images/group-banner.png", tag: "Workshops" },
  ],
  impactCols: 3,
});

function Stat({ item, color }: { item: StatItem; color: string }) {
  return (
    <div className="flex min-w-0 items-center justify-center gap-3 px-3 py-2">
      <span className="shrink-0" style={{ color }}><AIcon n={item.icon} s={34} /></span>
      <span className="min-w-0 leading-tight">
        <b className="block font-display text-xl sm:text-2xl font-extrabold text-[#102b66]"><CountUpValue value={item.value} /></b>
        <span className="block text-[11px] sm:text-xs font-semibold text-slate-700">{item.label}</span>
      </span>
    </div>
  );
}

export default function InitiativeDetail({ id, goBack }: { id: string; goBack: () => void }) {
  const area = AREAS.find((a) => a.key === id.replace("-blue", ""));
  const page = PAGES[id];
  const [filter, setFilter] = useState("All");
  const gallery = useMemo(() => page ? page.gallery.filter((item) => filter === "All" || item.tag === filter) : [], [page, filter]);

  if (!area || !page) {
    return <section className="mx-auto max-w-4xl px-5 py-24"><h1 className="text-3xl font-extrabold text-[#0c2461]">Initiative not found</h1><button onClick={goBack} className="mt-6 rounded-full bg-[#1f5fd1] px-6 py-3 font-bold text-white">Back to initiatives</button></section>;
  }

  const style = { "--initiative": page.theme, "--initiative-soft": page.soft, "--initiative-deep": page.deep } as unknown as CSSProperties;

  return (
    <div className={`initiative-page ${area.key === "swasthya" ? "initiative-mental-health" : ""}`} style={style}>
      {/* Hero: same split composition, organic curved photo edge and floating stats as the supplied references. */}
      <section className="initiative-hero relative isolate overflow-hidden">
        <div className="initiative-hero-wash absolute inset-0 -z-10" />
        <div className="initiative-hero-copy relative z-10 grid w-full items-center gap-7 px-5 pb-20 pt-9 sm:px-8 md:pt-12 lg:min-h-[430px] lg:grid-cols-[minmax(0,44%)_minmax(0,56%)] lg:gap-0 lg:pb-24 lg:pl-8">
          <div className="max-w-[560px] py-4 lg:pl-2">
            <span className="inline-flex rounded-full px-4 py-1.5 text-xs font-extrabold shadow-sm" style={{ background: page.soft, color: page.deep }}>{page.eyebrow}</span>
            {area.key === "swasthya" && <div className="mt-3 flex items-center gap-3 text-[var(--initiative)]"><AIcon n="heart" s={34} /><span className="text-base font-extrabold text-[var(--initiative-deep)]">Mansik Swasthya Abhiyan</span></div>}
            <div className={`${area.key === "swasthya" ? "mt-3" : "mt-4"} flex items-center gap-3 sm:gap-4`}>
              <span className="hidden text-[var(--initiative)] sm:block"><AIcon n={area.key === "shiksha" ? "book" : area.key === "swachhata" ? "broom" : area.key === "paryavaran" ? "leaf" : "heart"} s={66} /></span>
              <h1 className={`font-display font-extrabold leading-[1.04] tracking-tight text-[var(--initiative-deep)] ${area.key === "swasthya" ? "text-[38px] sm:text-[46px] md:text-[52px] max-w-[560px]" : "text-5xl sm:text-6xl md:text-7xl"}`}>{page.headline}</h1>
            </div>
            {page.subtitle && <h2 className="mt-3 max-w-xl text-lg font-extrabold text-[var(--initiative-deep)] sm:text-xl">{page.subtitle}</h2>}
            <div className="mt-2 h-[3px] w-28 rounded-full" style={{ background: page.theme }} />
            <p className="mt-4 max-w-[490px] text-[15px] leading-6 text-slate-800 sm:text-base">{page.intro}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => document.getElementById("initiative-work")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#ff9a18] to-[#f2611c] px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-orange-200/70 transition hover:-translate-y-0.5">Our Work <span>→</span></button>
              <a href="https://www.youtube.com/@empiricalinstituteabhiyan" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[var(--initiative)]/40 bg-white/85 px-5 py-3 text-sm font-extrabold text-[var(--initiative-deep)] shadow-sm transition hover:-translate-y-0.5"><span className="grid h-5 w-5 place-items-center rounded-full text-white" style={{ background: page.theme }}>▶</span> Watch Our Story</a>
            </div>
          </div>
          <HeroVisual id={id} kind={page.shape ?? "curve"} src={page.heroImage} pos={page.heroPosition} main={page.theme} accent={page.accent ?? "#f2850f"}>
            {area.key === "swasthya" && (
              <>
                <div className="absolute right-3 top-0 hidden w-[84px] text-[#0aa3a3] sm:block" aria-hidden><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"><path d="M12 3.5c-2 0-3 1-3.4 2C6 5.6 5 7.6 5.6 9.4 4.4 10.2 4.2 12 5 13.2c.4 1 1.4 1.6 2.4 1.6.4 1.4 1.6 2.2 3 2.1V20M12 3.5c2 0 3 1 3.4 2 2.6.1 3.6 2.1 3 3.9 1.2.8 1.4 2.6.6 3.8-.4 1-1.4 1.6-2.4 1.6"/></svg></div>
                <div className="absolute bottom-6 right-0 z-10 hidden w-[200px] rounded-2xl border border-white/80 bg-white p-3 shadow-xl sm:block">
                  <div className="space-y-2.5 text-[11px] font-bold leading-tight text-[#24345a]">
                    <div className="flex items-center gap-2"><span className="text-[#f07818]"><AIcon n="users" s={20} /></span>Awareness Sessions</div>
                    <div className="flex items-center gap-2 border-t border-slate-100 pt-2"><span className="text-[#079b9b]"><AIcon n="leaf" s={20} /></span>Stress Management Workshops</div>
                    <div className="flex items-center gap-2 border-t border-slate-100 pt-2"><span className="text-[#087fb5]"><AIcon n="heart" s={20} /></span>Student Support & Guidance</div>
                  </div>
                </div>
              </>
            )}
          </HeroVisual>
        </div>
        <div className="initiative-hero-bottom absolute inset-x-0 bottom-0 -z-0 h-14" />
      </section>

      {/* Floating metrics strip */}
      <section className="relative z-20 mx-auto -mt-10 max-w-[1320px] px-4 sm:px-7">
        <div className="initiative-stat-strip grid grid-cols-2 gap-y-2 rounded-[25px] border border-white bg-white/95 p-3 shadow-[0_15px_36px_-18px_rgba(18,48,122,.35)] backdrop-blur-xl sm:grid-cols-4 sm:p-4">
          {page.stats.map((item, i) => <div key={`${item.value}-${item.label}`} className={i > 0 ? "sm:border-l sm:border-slate-200" : ""}><Stat item={item} color={page.theme} /></div>)}
        </div>
      </section>

      {/* Focus area cards */}
      <section className="mx-auto max-w-[1320px] px-5 pb-10 pt-12 sm:px-7 sm:pt-14">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 text-[11px] font-extrabold tracking-[.18em] text-[var(--initiative-deep)]"><span className="h-[2px] w-7 bg-[var(--initiative)]" /> OUR FOCUS AREAS <span className="h-[2px] w-7 bg-[var(--initiative)]" /></div>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[var(--initiative-deep)] sm:text-4xl">{page.focusTitle.split(" ").slice(0, -1).join(" ")} <span style={{ color: page.theme }}>{page.focusTitle.split(" ").slice(-1)}</span></h2>
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {page.focus.map((item) => (
            <article key={item.title} className="initiative-focus-card flex min-h-[112px] items-center gap-3 rounded-[21px] border border-slate-200/70 bg-white/85 p-4 shadow-[0_8px_18px_-14px_rgba(18,48,122,.35)] transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full" style={{ color: page.theme, background: page.soft }}><AIcon n={item.icon} s={31} /></span>
              <span><b className="block font-display text-[15px] font-extrabold leading-tight text-[#102b66]">{item.title}</b><span className="mt-1 block text-xs leading-[1.4] text-slate-600">{item.text}</span></span>
            </article>
          ))}
        </div>
      </section>

      {/* Real-photo mosaic gallery and working category filters */}
      <section id="initiative-work" className="mx-auto max-w-[1320px] scroll-mt-24 px-5 pb-12 pt-8 sm:px-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-extrabold tracking-wide text-[var(--initiative-deep)]"><span className="h-[2px] w-6 bg-[var(--initiative)]" /> OUR WORK IN ACTION</div>
            <h2 className="mt-2 font-display text-2xl font-extrabold leading-tight text-[var(--initiative-deep)] sm:text-3xl">{page.galleryTitle}</h2>
          </div>
          <div className="no-scrollbar flex max-w-full gap-2 overflow-x-auto pb-1">
            {page.filters.map((f) => <button key={f} onClick={() => setFilter(f)} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-extrabold shadow-sm transition ${filter === f ? "border-transparent text-white shadow-md" : "border-slate-200 bg-white text-slate-700 hover:border-[var(--initiative)]"}`} style={filter === f ? { background: page.theme } : undefined}>{f}</button>)}
          </div>
        </div>
        <div className="initiative-gallery mt-6 grid auto-rows-[145px] grid-cols-2 gap-3 sm:auto-rows-[165px] sm:gap-4 lg:auto-rows-[170px] lg:grid-cols-3">
          {gallery.map((item, i) => (
            <figure key={item.title} className={`group relative overflow-hidden rounded-[18px] bg-slate-100 shadow-sm ${i === 0 ? "row-span-2" : ""}`}>
              <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" style={{ objectPosition: item.position ?? "center" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-90" />
              <figcaption className="absolute bottom-0 left-0 right-0 flex items-center gap-2 p-3 text-sm font-extrabold text-white"><span className="grid h-7 w-7 place-items-center rounded-lg bg-white/20 backdrop-blur"><AIcon n={area.key === "shiksha" ? "book" : area.key === "swachhata" ? "broom" : area.key === "paryavaran" ? "leaf" : "heart"} s={17} /></span>{item.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Impact strip */}
      <section className="mx-auto max-w-[1320px] px-5 pb-10 pt-2 sm:px-7">
        <div className="initiative-impact grid gap-3 rounded-[25px] border border-[var(--initiative)]/15 p-4 sm:grid-cols-[1.2fr_2.8fr] sm:items-center sm:p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white/80 text-[var(--initiative)] shadow-sm"><AIcon n="users" s={32} /></span>
            <span><b className="block font-display text-xl font-extrabold text-[var(--initiative-deep)]">{page.impactLead}</b><span className="mt-1 block text-xs text-slate-600">Small actions, meaningful change in our community.</span></span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]" style={{ "--cols": page.impactCols ?? 4 } as CSSProperties}>
            {page.impact.map((item) => <div key={item.label} className="border-l border-[var(--initiative)]/20 px-2 text-center"><span className="inline-flex text-[var(--initiative)]"><AIcon n={item.icon} s={27} /></span><b className="mt-1 block font-display text-xl font-extrabold leading-none text-[var(--initiative-deep)]"><CountUpValue value={item.value} /></b><span className="mt-1 block text-[11px] font-semibold text-slate-600">{item.label}</span></div>)}
          </div>
        </div>
      </section>

      {/* Themed call to action with a real project photograph */}
      <section className="mx-auto max-w-[1320px] px-5 pb-12 sm:px-7">
        <div className="initiative-cta relative isolate overflow-hidden rounded-[28px] text-white shadow-[0_18px_38px_-20px_rgba(18,48,122,.45)]">
          <img src={page.ctaImage} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 -z-10" style={{ background: `linear-gradient(100deg, ${page.deep} 0%, ${page.deep}f2 54%, ${page.theme}d9 100%)` }} />
          <div className="relative grid min-h-[210px] items-center gap-5 p-7 sm:p-9 lg:grid-cols-[.8fr_1.2fr] lg:px-12">
            <div className="hidden h-full min-h-[150px] items-center justify-center lg:flex"><div className="rounded-full border border-white/25 bg-white/10 p-7 text-white/90 backdrop-blur"><AIcon n={area.key === "shiksha" ? "book" : area.key === "swachhata" ? "broom" : area.key === "paryavaran" ? "leaf" : "heart"} s={86} /></div></div>
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[.15em] text-white/80">{page.ctaEyebrow} <span className="text-orange-300">→</span></p>
              <h2 className="mt-2 max-w-2xl font-display text-3xl font-extrabold leading-tight sm:text-4xl">{page.ctaTitle}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/85">{page.ctaText}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href="#/contact" className="rounded-full bg-gradient-to-r from-[#ff9a18] to-[#f2611c] px-6 py-3 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-0.5">{page.ctaButton} →</a>
                <a href="#/contact" className="rounded-full border border-white/70 bg-white/5 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-white/15">✉ Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
