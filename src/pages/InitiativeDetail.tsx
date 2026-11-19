import { useMemo, useState, type CSSProperties } from "react";
import { AIcon } from "../icons";
import { Leaf, BookOpen, Brain } from "lucide-react";
import { Bi } from "../lang";
import HeroVisual from "./HeroVisual";
import { CountUp } from "../ui";
import Art from "./Art";

const NAVY = "#1F2A44";
const ORANGE = "#EE9B13";
const BLUE = "#2B459E";
const GREEN = "#3A7D44";

type Stat = { v: string; l: string; icon: string; c: string; d?: string };
type Focus = { icon: string; title: string; text: string; c: string; bg: string };
type Pg = {
  mental?: boolean;
  pill?: { bg: string; fg: string; text: string };
  title: string; titleColor: string; titleIcon: string; titleIconColor: string;
  sub?: string; subLine: string; intro: string;
  heroImage: string; pos: string; shape: "curve" | "bow" | "blob"; swoosh: string; swoosh2: string; heroBg: string;
  stats: Stat[];
  focusKicker?: string; focusTitle: [string, string]; focusHl: string; focusNote?: string; focus: Focus[];
  galleryKicker?: string; galleryTitle: string; filters: { l: string; icon?: string }[];
  gallery: { t: string; img: string; tags: string[]; pos?: string }[]; captions: boolean; capIcon: string;
  main: string;
  impactTitle: string; impactSub: string; impactIcon: string; impactBg: string; impact: Stat[];
  cta: { eyebrow: string; title: [string, string]; hl: string; text: string; from: string; to: string; art: "books" | "bin" | "head" | "sprout"; artColor?: string; button: string; contact: boolean };
};

const shikshaFocus: Focus[] = [
  { icon: "cap", title: "Learning Support", text: "Regular subject classes, revision and doubt clearing.", c: BLUE, bg: "#FBF3E4" },
  { icon: "book", title: "Study Resources", text: "Providing books, notes and learning material.", c: ORANGE, bg: "#FBE6C8" },
  { icon: "user", title: "Mentorship", text: "Guidance, motivation and career awareness.", c: "#D9C196", bg: "#FBF3E4" },
  { icon: "laptop", title: "Digital Learning", text: "Computer training and access to online learning tools.", c: "#1A7F78", bg: "#DDEDE7" },
];
const swachhFocus = (blue: boolean): Focus[] => [
  { icon: "trash", title: "Cleanliness Drives", text: "Regular cleaning of schools, parks and public spaces.", c: blue ? BLUE : GREEN, bg: blue ? "#FBF3E4" : "#E4EED8" },
  { icon: "users", title: "Community Awareness", text: "Campaigns to promote clean and healthy surroundings.", c: ORANGE, bg: "#FBE6C8" },
  { icon: "recycle", title: "Waste Management", text: "Segregation, recycling and responsible waste disposal.", c: blue ? BLUE : GREEN, bg: blue ? "#FBF3E4" : "#E4EED8" },
  { icon: "sprout", title: "Clean Habits", text: "Encouraging long-term cleanliness and hygiene practices.", c: blue ? ORANGE : GREEN, bg: blue ? "#FBE6C8" : "#E4EED8" },
];
const swachhStats = (blue: boolean): Stat[] => [
  { v: "300+", l: "Volunteers", icon: "users", c: blue ? BLUE : GREEN },
  { v: "20+", l: "Cleanliness Drives", icon: "broom", c: blue ? ORANGE : GREEN },
  { v: "12+", l: "Public Areas Cleaned", icon: "pin", c: blue ? BLUE : GREEN },
  { v: "5+", l: "Schools & Institutions", icon: "school", c: blue ? ORANGE : GREEN },
];
const swachhImpact = (blue: boolean): Stat[] => [
  { v: "300+", l: "Volunteers", icon: "users", c: blue ? BLUE : GREEN },
  { v: "20+", l: "Cleanliness Drives", icon: "broom", c: blue ? ORANGE : GREEN },
  { v: "50+", l: "Kg Waste Collected", icon: "recycle", c: blue ? BLUE : GREEN },
  { v: "12+", l: "Public Areas", icon: "sprout", c: blue ? ORANGE : GREEN },
  { v: "5+", l: "Schools Engaged", icon: "school", c: blue ? BLUE : GREEN },
];
const swachhGallery = [
  { t: "Cleanliness Drive", img: "images/swachhata.webp", tags: ["Drives"], pos: "center 40%" },
  { t: "Awareness Campaign", img: "images/group-banner.webp", tags: ["Awareness"] },
  { t: "Rameshwar Kund Cleanup", img: "images/real-kund.webp", tags: ["Community", "Drives"] },
  { t: "Community Cleaning", img: "images/clogrun.webp", tags: ["Community"] },
  { t: "Students & Volunteers", img: "images/real-group.webp", tags: ["Schools", "Awareness"] },
];
const swachhFilters = [{ l: "All" }, { l: "Drives", icon: "broom" }, { l: "Awareness", icon: "users" }, { l: "Community", icon: "pin" }, { l: "Schools", icon: "school" }];

const swachhata = (blue: boolean): Pg => ({
  pill: { bg: blue ? "#FBE6C8" : "#E4EED8", fg: blue ? ORANGE : "#3A7D44", text: "Our Initiative" },
  title: "Swachhata", titleColor: blue ? NAVY : "#17605C", titleIcon: "broom", titleIconColor: blue ? BLUE : GREEN,
  sub: "Clean Surroundings, Healthy Communities", subLine: blue ? ORANGE : "#3A7D44",
  intro: "A community-driven initiative to create cleaner schools, public spaces and neighbourhoods through awareness, participation and action.",
  heroImage: "images/swachhata.webp", pos: "center 40%", shape: "bow",
  swoosh: blue ? ORANGE : "#3A7D44", swoosh2: blue ? BLUE : "#3A7D44",
  heroBg: blue ? "#F9E8C9" : "#E6EFD6",
  stats: swachhStats(blue), focusKicker: "OUR FOCUS AREAS", focusTitle: ["How We Drive ", "Cleanliness"], focusHl: blue ? ORANGE : GREEN, focus: swachhFocus(blue),
  galleryKicker: "OUR WORK IN ACTION", galleryTitle: "A Glimpse of Our Swachhata Initiatives", filters: swachhFilters, gallery: swachhGallery, captions: true, capIcon: "broom",
  main: blue ? BLUE : GREEN,
  impactTitle: "Our Impact So Far", impactSub: "Collective efforts for a cleaner and healthier community.", impactIcon: blue ? "sprout" : "sprout", impactBg: blue ? "#FBF3E4" : "#E4EED8", impact: swachhImpact(blue),
  cta: { eyebrow: "Be a part of Swachhata", title: ["Let’s Build a ", "Cleaner Community"], hl: blue ? ORANGE : "#7FB069", text: "Join hands with us to keep our schools, streets and public spaces clean, green and healthy for everyone.", from: blue ? "#2B459E" : "#17605C", to: blue ? "#2B459E" : "#3A7D44", art: "bin", artColor: blue ? "#2B459E" : "#3A7D44", button: "Join as a Volunteer", contact: true },
});

const PAGES: Record<string, Pg> = {
  shiksha: {
    pill: { bg: "#FBE6C8", fg: ORANGE, text: "Our Initiative" },
    title: "Shiksha", titleColor: NAVY, titleIcon: "book", titleIconColor: BLUE,
    sub: "Education for Equal Opportunities", subLine: ORANGE,
    intro: "Bridging learning gaps, supporting underprivileged students, and creating a stronger educational foundation for every child.",
    heroImage: "images/shiksha.webp", pos: "center 48%", shape: "curve", swoosh: ORANGE, swoosh2: BLUE,
    heroBg: "#F9E8C9",
    stats: [
      { v: "80+", l: "Students Supported", icon: "users", c: BLUE }, { v: "100+", l: "Learning Sessions", icon: "book", c: BLUE },
      { v: "12+", l: "Volunteers", icon: "users", c: ORANGE }, { v: "4", l: "Schools Reached", icon: "school", c: BLUE },
    ],
    focusKicker: "OUR FOCUS AREAS", focusTitle: ["How We Support ", "Education"], focusHl: ORANGE, focus: shikshaFocus,
    galleryKicker: "OUR WORK IN ACTION", galleryTitle: "A Glimpse of Our Shiksha Initiatives",
    filters: [{ l: "All" }, { l: "Classes", icon: "laptop" }, { l: "Workshops", icon: "users" }, { l: "Events", icon: "calendar" }, { l: "Resources", icon: "book" }],
    gallery: [
      { t: "Learning Session", img: "images/shiksha.webp", tags: ["Classes"], pos: "center 40%" },
      { t: "Eklavya Batch & Team", img: "images/group-banner.webp", tags: ["Events"] },
      { t: "Students Learning Together", img: "images/real-group.webp", tags: ["Workshops", "Events"] },
      { t: "Volunteer-led Learning", img: "images/volunteers.webp", tags: ["Classes", "Workshops"] },
      { t: "Study Support Drive", img: "images/group-banner.webp", tags: ["Resources"] },
    ],
    captions: true, capIcon: "book", main: BLUE,
    impactTitle: "Our Impact So Far", impactSub: "Small efforts, a big difference in students’ learning and confidence.", impactIcon: "trophy", impactBg: "#FBF3E4",
    impact: [
      { v: "80+", l: "Students", icon: "users", c: BLUE }, { v: "100+", l: "Sessions", icon: "book", c: BLUE },
      { v: "95%", l: "Learning Improvement", icon: "cap", c: BLUE }, { v: "4", l: "Schools", icon: "chart", c: BLUE },
    ],
    cta: { eyebrow: "Be a part of Shiksha", title: ["Support a Child’s ", "Education"], hl: ORANGE, text: "Join hands with us to provide learning opportunities, resources and guidance to underprivileged students.", from: "#2B459E", to: "#2B459E", art: "books", button: "Get Involved", contact: true },
  },
  swachhata: swachhata(false),
  "swachhata-blue": swachhata(true),
  paryavaran: {
    pill: { bg: "#E4EED8", fg: "#3A7D44", text: "Our Initiative" },
    title: "Paryavaran", titleColor: "#17605C", titleIcon: "sprout", titleIconColor: GREEN,
    sub: "A Greener and Healthier Tomorrow", subLine: "#3A7D44",
    intro: "Spreading awareness, planting trees and promoting sustainable habits for a cleaner, healthier and more balanced environment.",
    heroImage: "images/paryavaran.webp", pos: "center 45%", shape: "bow", swoosh: "#3A7D44", swoosh2: "#3A7D44",
    heroBg: "#E6EFD6",
    stats: [
      { v: "Green", l: "Community initiatives", icon: "sprout", c: GREEN }, { v: "Local", l: "Environmental action", icon: "users", c: GREEN },
      { v: "Khandwa", l: "Shared spaces", icon: "pin", c: GREEN }, { v: "Ongoing", l: "Awareness work", icon: "recycle", c: GREEN },
    ],
    focusKicker: "OUR FOCUS AREAS", focusTitle: ["How We Protect Our ", "Environment"], focusHl: GREEN,
    focus: [
      { icon: "sprout", title: "Tree Plantation", text: "Planting more trees for greener shared spaces.", c: GREEN, bg: "#E4EED8" },
      { icon: "users", title: "Environmental Awareness", text: "Sharing knowledge about conservation.", c: ORANGE, bg: "#FBE6C8" },
      { icon: "recycle", title: "Sustainable Habits", text: "Encouraging reduce, reuse and recycle.", c: GREEN, bg: "#E4EED8" },
      { icon: "drop", title: "Resource Conservation", text: "Promoting care for water and biodiversity.", c: GREEN, bg: "#E4EED8" },
    ],
    galleryKicker: "OUR WORK IN ACTION", galleryTitle: "A Glimpse of Our Paryavaran Initiatives",
    filters: [{ l: "All" }, { l: "Plantation", icon: "sprout" }, { l: "Awareness", icon: "users" }, { l: "Community", icon: "pin" }],
    gallery: [
      { t: "Plantation Activity", img: "images/paryavaran.webp", tags: ["Plantation"] },
      { t: "Saplings and Green Spaces", img: "images/real-plant.webp", tags: ["Plantation"] },
      { t: "Awareness Rally", img: "images/init-rally-photo.webp", tags: ["Awareness"] },
      { t: "Community Awareness", img: "images/real-group.webp", tags: ["Community", "Awareness"] },
      { t: "Planting for Tomorrow", img: "images/init-environment.webp", tags: ["Plantation", "Community"] },
    ],
    captions: true, capIcon: "sprout", main: GREEN,
    impactTitle: "Our Impact So Far", impactSub: "Small actions, meaningful change in our community.", impactIcon: "sprout", impactBg: "#E4EED8",
    impact: [
      { v: "Green", l: "Community action", icon: "sprout", c: GREEN }, { v: "Local", l: "Participation", icon: "users", c: GREEN },
      { v: "Ongoing", l: "Awareness", icon: "recycle", c: GREEN }, { v: "Khandwa", l: "Our home", icon: "pin", c: GREEN },
    ],
    cta: { eyebrow: "Be a part of Paryavaran", title: ["Let’s Make Our ", "Khandwa Greener"], hl: "#7FB069", text: "Join hands with us to care for nature, protect shared spaces and build a healthier environment.", from: "#17605C", to: "#3A7D44", art: "sprout", button: "Plant a Tree Today", contact: true },
  },
  swasthya: {
    mental: true,
    pill: { bg: "#DDEDE7", fg: "#1A7F78", text: "Our Initiative" },
    title: "Mental Health", titleColor: "#17605C", titleIcon: "brain", titleIconColor: "#1A7F78",
    sub: "Healthy Minds, Brighter Futures", subLine: ORANGE,
    intro: "Creating awareness, reducing stigma, and supporting the mental well-being of students and youth in our community.",
    heroImage: "images/swasthya.webp", pos: "center 38%", shape: "curve", swoosh: "#1A7F78", swoosh2: ORANGE,
    heroBg: "#DCEBE4",
    stats: [
      { v: "10+", l: "Awareness Sessions", icon: "users", c: BLUE }, { v: "500+", l: "Students Reached", icon: "users", c: ORANGE },
      { v: "15+", l: "Wellness Activities", icon: "leaf", c: "#1A7F78" }, { v: "50+", l: "Volunteers Involved", icon: "heart", c: "#1A7F78" },
    ],
    focusTitle: ["Our Focus Areas", ""], focusHl: ORANGE, focusNote: "How we support mental well-being",
    focus: [
      { icon: "brain", title: "Mental Health Awareness", text: "Breaking the stigma and encouraging open conversations.", c: BLUE, bg: "#FBF3E4" },
      { icon: "leaf", title: "Stress & Anxiety Management", text: "Simple and practical ways to handle academic and personal stress.", c: "#1A7F78", bg: "#DDEDE7" },
      { icon: "users", title: "Emotional Support", text: "A safe and positive space for students to share and seek guidance.", c: ORANGE, bg: "#FBE6C8" },
      { icon: "heart", title: "Healthy Habits", text: "Building a balanced lifestyle with good sleep, focus, and digital well-being.", c: "#1A7F78", bg: "#DDEDE7" },
    ],
    galleryTitle: "Activity Gallery",
    filters: [{ l: "All" }, { l: "Awareness" }, { l: "Workshops" }, { l: "Discussions" }, { l: "Activities" }],
    gallery: [
      { t: "Mental Health Awareness Session", img: "images/swasthya.webp", tags: ["Awareness", "Workshops"], pos: "center 40%" },
      { t: "Group Discussion", img: "images/volunteers.webp", tags: ["Discussions"] },
      { t: "Awareness Through Action", img: "images/init-rally-photo.webp", tags: ["Activities", "Awareness"] },
      { t: "Mental Health Awareness Drive", img: "images/real-group.webp", tags: ["Awareness", "Activities"] },
      { t: "Student Workshop", img: "images/group-banner.webp", tags: ["Workshops", "Discussions"] },
    ],
    captions: false, capIcon: "heart", main: "#1F2A44",
    impactTitle: "Our Impact", impactSub: "Small steps towards a mentally healthier and more confident generation.", impactIcon: "", impactBg: "#FBF3E4",
    impact: [
      { v: "Better Awareness", l: "", icon: "cap", c: BLUE, d: "More students now understand the importance of mental health." },
      { v: "Positive Conversations", l: "", icon: "users", c: ORANGE, d: "An open and supportive environment in classrooms." },
      { v: "Improved Well-being", l: "", icon: "target", c: ORANGE, d: "Students feel more confident, focused, and stress-free." },
    ],
    cta: { eyebrow: "", title: ["Let’s Build a Mentally Healthier Generation", ""], hl: "#fff", text: "Be a part of our Mental Health initiative. Volunteer, organize sessions, or support awareness drives in your community.", from: "#2B459E", to: "#2B459E", art: "head", button: "Join as a Volunteer", contact: false },
  },
};

const toContact = () => { window.location.hash = "#/contact"; };
const Play = ({ c }: { c: string }) => <span className="grid h-6 w-6 place-items-center rounded-full text-white" style={{ background: c }}><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l13 8-13 8z" /></svg></span>;
const Leafy = ({ c, className, style }: { c: string; className?: string; style?: CSSProperties }) => <Leaf className={className} style={{ ...style, color: c }} strokeWidth={1.4} fill="currentColor" fillOpacity={0.85} aria-hidden />;

export default function InitiativeDetail({ id, goBack }: { id: string; goBack: () => void }) {
  const pg = PAGES[id] ?? PAGES.shiksha;
  const [filter, setFilter] = useState("All");
  const items = useMemo(() => pg.gallery.filter((g) => filter === "All" || g.tags.includes(filter)), [pg, filter]);
  const m = !!pg.mental;
  const wrap = "mx-auto max-w-[1320px] px-4 sm:px-7";

  return (
    <div className="bg-white">
      {/* ===== Hero ===== */}
      <section data-parallax className={`hero-x relative overflow-hidden pb-14 lg:pb-14`} style={{ background: pg.heroBg }}>
        <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden>
          <path d="M0 100V58C150 18 290 78 470 52S760 6 960 40 1280 70 1440 36V100z" fill={pg.shape === "blob" ? "#DDEDE7" : pg.swoosh === ORANGE ? "#F6EAD3" : "#E4EED8"} opacity=".55" />
          <path d="M0 100V78C170 50 330 94 520 72S820 40 1010 64 1300 90 1440 62V100z" fill={pg.shape === "blob" ? "#9CCFC5" : pg.swoosh === ORANGE ? "#F6EAD3" : "#E4EED8"} opacity=".45" />
        </svg>
        {pg.swoosh === ORANGE && (
          <svg className="pointer-events-none absolute bottom-0 left-0 hidden h-[62%] w-[56%] lg:block" viewBox="0 0 560 300" preserveAspectRatio="none" aria-hidden>
            <defs><linearGradient id="rib" x1="0" x2="1"><stop offset="0" stopColor="#F8D7A3" stopOpacity="0" /><stop offset=".55" stopColor="#EE9B13" /><stop offset="1" stopColor="#EE9B13" /></linearGradient></defs>
            <path d="M0 300V232C90 196 170 250 285 208S470 70 560 0V70C480 130 380 250 260 276S60 262 0 300z" fill="#FBF3E4" opacity=".75" />
            <path d="M0 250C110 214 190 268 300 226S480 84 560 2" fill="none" stroke="url(#rib)" strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            <path d="M0 268C120 232 200 284 310 244S490 110 560 30" fill="none" stroke="#2B459E" strokeOpacity=".55" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
          </svg>
        )}
        {pg.shape === "bow" && <>
          <Leafy c={pg.swoosh === ORANGE ? "#EBDCBC" : "#7FB069"} className="absolute float-med" style={{ left: "1.5%", top: 18, width: 30, height: 38, transform: "rotate(-35deg)", opacity: .85 }} />
          <Leafy c={pg.swoosh === ORANGE ? "#EBDCBC" : "#3A7D44"} className="absolute hidden float-slow lg:block" style={{ left: "38%", top: "66%", width: 40, height: 50, transform: "rotate(35deg)" }} />
          {pg.swoosh !== ORANGE && <Leafy c="#3A7D44" className="absolute hidden float-med lg:block" style={{ left: "36%", top: 26, width: 54, height: 66, transform: "rotate(18deg)" }} />}
        </>}
        {pg.shape === "curve" && pg.swoosh === ORANGE && id === "shiksha" && <BookOpen className="absolute left-[40%] top-6 hidden h-28 w-28 -rotate-12 opacity-20 lg:block" strokeWidth={1.1} color={BLUE} aria-hidden />}
        

        <div className="px-4 sm:px-7 lg:pl-[var(--pl)] lg:pr-0">
          <div className="hero-col relative z-10 py-8 sm:py-10 lg:py-14">
            {m ? (
              <>
                <nav className="hero-in hero-in-1 flex items-center gap-1.5 text-[12px] font-semibold text-slate-600" aria-label="Breadcrumb">
                  <AIcon n="home" s={15} /><span>›</span><button onClick={goBack} className="hover:underline">Initiatives</button><span>›</span><b className="text-[#1F2A44]"><Bi en="Mental Health" hi="मानसिक स्वास्थ्य" /></b>
                </nav>
                <div className="hero-in hero-in-1 mt-4 flex items-center gap-3 font-display font-extrabold text-[#1F2A44]" style={{ fontSize: "clamp(18px,1.7vw,24px)" }}><span className="text-[#1A7F78]"><AIcon n="brain" s={46} duo /></span><Bi en="Mental Health Campaign" hi="मानसिक स्वास्थ्य अभियान" /></div>
                <h1 className="hero-in hero-in-2 mt-4 font-display font-extrabold leading-[1.08] tracking-tight text-[#1F2A44]" style={{ fontSize: "clamp(30px,3.1vw,56px)" }}><Bi en={<>A Healthy Mind for<br />a <span style={{ color: ORANGE }}>Better Tomorrow</span></>} hi={<>स्वस्थ मन,<br /><span style={{ color: ORANGE }}>बेहतर कल</span></>} /></h1>
                <p className="hero-in hero-in-3 mt-4 max-w-[470px] leading-[1.65] text-slate-700" style={{ fontSize: "clamp(15px,1.2vw,18px)" }}>{pg.intro}</p>
                <div className="hero-in hero-in-4 mt-6 flex flex-wrap gap-3">
                  <button onClick={() => document.getElementById("gallery-sec")?.scrollIntoView({ behavior: "smooth" })} className="press inline-flex items-center gap-2 rounded-full bg-[#EE9B13] btn-solid px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-orange-200">Our Activities →</button>
                  <button onClick={toContact} className="press rounded-full border border-[#1F2A44]/50 bg-white/80 px-6 py-3 text-sm font-extrabold text-[#1F2A44]">Get Involved</button>
                </div>
              </>
            ) : (
              <>
                <span className="hero-in hero-in-1 inline-block rounded-md border-[1.5px] border-[#1F2A44] bg-[#FFFDF7] px-3.5 py-1 text-[13px] font-extrabold uppercase tracking-wide" style={{ color: pg.pill!.fg }}>{pg.pill!.text}</span>
                <div className="hero-in hero-in-2 mt-3 flex items-center gap-[1.2vw]">
                  <span className="shrink-0 [&>svg]:h-full [&>svg]:w-full" style={{ color: pg.titleIconColor, width: "clamp(48px,4.8vw,88px)", height: "clamp(48px,4.8vw,88px)" }}><AIcon n={pg.titleIcon} s={96} duo /></span>
                  <div className="min-w-0">
                    <h1 className="font-display font-extrabold leading-[1.02] tracking-tight" style={{ color: pg.titleColor, fontSize: "clamp(36px,3.8vw,70px)" }}>{pg.title}</h1>
                    <div className="mt-1 inline-block font-display font-extrabold" style={{ color: pg.titleColor, fontSize: "clamp(15px,1.3vw,20px)" }}>{pg.sub}<span className="mt-1.5 block h-[3px] w-full rounded" style={{ background: pg.subLine }} /></div>
                  </div>
                </div>
                <p className="hero-in hero-in-3 mt-6 max-w-[500px] leading-[1.65] text-slate-700" style={{ fontSize: "clamp(15px,1.2vw,18px)" }}>{pg.intro}</p>
                <div className="hero-in hero-in-4 mt-6 flex flex-wrap gap-3">
                  <button onClick={() => document.getElementById("gallery-sec")?.scrollIntoView({ behavior: "smooth" })} className="press inline-flex items-center gap-2 rounded-full bg-[#EE9B13] btn-solid px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-orange-200">Our Work →</button>
                  <a href="https://www.youtube.com/@empiricalinstituteabhiyan" target="_blank" rel="noreferrer" className="press inline-flex items-center gap-2 rounded-full border bg-white/90 px-5 py-3 text-sm font-extrabold shadow-sm" style={{ color: NAVY, borderColor: "#F6EAD3" }}><Play c={pg.main} />Watch Our Story</a>
                </div>
              </>
            )}
          </div>
          <HeroVisual id={id} kind={pg.shape} src={pg.heroImage} pos={pg.pos} main={pg.swoosh} accent={pg.swoosh2}>
            {false && (
              <>
                <div className="absolute -top-3 -right-[6%] hidden w-[96px] text-[#1A7F78] sm:block" aria-hidden><Brain className="h-full w-full" strokeWidth={1.2} /><Leafy c="#1A7F78" className="absolute -right-4 bottom-1 h-9 w-7" /></div>
                <div className="pill-card absolute -right-[6%] bottom-[14%] z-10 hidden w-[220px] bg-white px-4 py-3 shadow-xl ring-1 ring-slate-100 sm:block">
                  {[["users", ORANGE, "Awareness Sessions"], ["leaf", "#1A7F78", "Stress Management Workshops"], ["heart", "#2B459E", "Student Support & Guidance"]].map(([ic, c, t], i) => (
                    <div key={t} className={`flex items-center gap-2.5 py-2 text-[11.5px] font-bold leading-tight text-[#1F2A44] ${i ? "border-t border-slate-100" : ""}`}><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full" style={{ background: c + "22", color: c }}><AIcon n={ic} s={17} /></span>{t}</div>
                  ))}
                </div>
              </>
            )}
          </HeroVisual>
        </div>
      </section>

      {/* ===== Stats strip ===== */}
      <section className={`${wrap} relative z-10 -mt-12 lg:-mt-10`}>
        <div data-reveal-me data-tilt-me data-tilt-max="1.6" className={`grid grid-cols-2 gap-y-4 rounded-[22px] p-4 sm:grid-cols-4 sm:p-5 ${m ? "bg-[#FBF3E4]/95" : "bg-white shadow-[0_18px_40px_-20px_rgba(31,42,68,.4)] ring-1 ring-slate-100"}`}>
          {pg.stats.map((s, i) => (
            <div key={s.l} className={`flex items-center justify-center gap-3 px-2 ${m ? "flex-col text-center" : ""} ${i ? "sm:border-l sm:border-slate-200" : ""}`}>
              <span style={{ color: s.c }}><AIcon n={s.icon} s={m ? 42 : 48} duo /></span>
              <span><b className={`block font-display font-extrabold leading-none text-[#1F2A44] ${m ? "text-[38px]" : "text-[32px]"}`}><CountUp value={s.v} /></b><span className={`mt-1.5 block font-semibold text-slate-600 ${m ? "text-[15.5px]" : "text-[14.5px]"}`}>{s.l}</span></span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Focus areas ===== */}
      <section className={`${wrap} mt-12`}>
        {m ? (
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <h2 className="font-display text-[34px] font-extrabold text-[#1F2A44]">{pg.focusTitle[0]}</h2>
            <p className="text-sm font-semibold text-slate-500">{pg.focusNote}</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="inline-flex items-center gap-3 text-[12px] font-extrabold tracking-[.16em]" style={{ color: NAVY }}>{pg.focusKicker}</div>
            <h2 className="mt-2 font-display text-[34px] font-extrabold text-[#1F2A44] sm:text-[38px]">{pg.focusTitle[0]}<span style={{ color: pg.focusHl }}>{pg.focusTitle[1]}</span></h2>
          </div>
        )}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pg.focus.map((f) => (
            <article key={f.title} className={`rounded-[20px] p-4 ${m ? "" : "bg-white shadow-[0_12px_28px_-18px_rgba(31,42,68,.45)] ring-1 ring-slate-100"}`} style={m ? { background: f.bg } : undefined}>
              <div className="flex items-center gap-3">
                <span className={`grid shrink-0 place-items-center ${m ? "h-14 w-14" : "h-[68px] w-[68px] rounded-full"}`} style={{ color: f.c, background: m ? "transparent" : f.bg }}><AIcon n={f.icon} s={m ? 50 : 34} duo /></span>
                <b className="font-display text-[18.5px] font-extrabold leading-tight text-[#1F2A44]">{f.title}</b>
              </div>
              <p className={`mt-2.5 text-[14.5px] leading-[1.55] text-slate-600 ${m ? "" : "pl-0.5"}`}>{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ===== Gallery ===== */}
      <section id="gallery-sec" className={`${wrap} mt-14 scroll-mt-24`}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            {pg.galleryKicker && <div className="inline-flex items-center gap-3 text-[12px] font-extrabold tracking-[.12em]" style={{ color: NAVY }}>{pg.galleryKicker}</div>}
            <h2 className="font-display text-[28px] font-extrabold text-[#1F2A44] sm:text-[34px]">{pg.galleryTitle}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {pg.filters.map((f) => (
              <button key={f.l} onClick={() => setFilter(f.l)} className={`press inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-extrabold ring-1 ${filter === f.l ? "text-white ring-transparent" : "bg-white ring-slate-200"}`} style={filter === f.l ? { background: m ? NAVY : pg.main } : { color: NAVY }}>
                {f.icon && <AIcon n={f.icon} s={15} />}{f.l}
              </button>
            ))}
          </div>
        </div>
        <div key={filter} className="mt-5 grid auto-rows-[150px] gap-3 sm:auto-rows-[165px] md:grid-cols-3 lg:auto-rows-[158px] lg:grid-cols-[1.5fr_1fr_1fr]">
          {items.map((g, i) => (
            <figure key={g.t} className={`group relative overflow-hidden rounded-2xl shadow-lg shadow-slate-300/50 ${i === 0 ? "md:row-span-2" : ""}`}>
              <img src={g.img} alt={g.t} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" style={{ objectPosition: g.pos }} />
              {pg.captions && <figcaption className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-[12px] font-bold text-white backdrop-blur"><AIcon n={pg.capIcon} s={15} />{g.t}</figcaption>}
            </figure>
          ))}
        </div>
      </section>

      {/* ===== Impact ===== */}
      <section className={`${wrap} mt-12`}>
        <div data-reveal-me data-tilt-me data-tilt-max="1.4" className="relative overflow-hidden rounded-[24px] p-5 ring-1 ring-slate-100 sm:p-6" style={{ background: pg.impactBg }}>
          {!m && id !== "shiksha" && <Leafy c={pg.main} className="absolute -left-2 bottom-0 h-24 w-20 opacity-25" />}
          <div className="relative grid items-center gap-6 lg:grid-cols-[minmax(0,.9fr)_minmax(0,2.4fr)]">
            <div className="flex items-center gap-4">
              {pg.impactIcon && id === "shiksha" && <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#FFF1C9] text-[#F4B93E]"><AIcon n="trophy" s={34} /></span>}
              <div><h2 className="font-display text-[26px] font-extrabold leading-tight text-[#1F2A44]">{pg.impactTitle}</h2><p className="mt-1 max-w-[260px] text-[13.5px] leading-5 text-slate-600">{pg.impactSub}</p></div>
            </div>
            <div className="grid gap-4 sm:[grid-template-columns:repeat(var(--n),minmax(0,1fr))]" style={{ "--n": pg.impact.length } as CSSProperties}>
              {pg.impact.map((s, i) => m ? (
                <div key={s.v} className="flex items-start gap-3 border-slate-300/70 sm:border-l sm:pl-5">
                  <span style={{ color: s.c }}><AIcon n={s.icon} s={46} duo /></span>
                  <span><b className="block font-display text-[18px] font-extrabold leading-tight text-[#1F2A44]">{s.v}</b><span className="mt-1.5 block text-[14px] leading-5 text-slate-600">{s.d}</span></span>
                </div>
              ) : (
                <div key={s.l} className={`flex flex-col items-center text-center ${i || true ? "sm:border-l sm:border-slate-300/70" : ""}`}>
                  <span style={{ color: s.c }}><AIcon n={s.icon} s={42} duo /></span>
                  <b className="mt-1 font-display text-[32px] font-extrabold leading-none text-[#1F2A44]"><CountUp value={s.v} /></b>
                  <span className="mt-1 text-[14.5px] font-semibold text-slate-600">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className={`${wrap} mt-8 pb-12`}>
        <div data-reveal-me data-tilt-me data-tilt-max="1.4" className="relative flex flex-col items-center gap-4 overflow-hidden rounded-[26px] px-6 py-8 text-white shadow-xl sm:flex-row sm:px-10" style={{ background: `${pg.cta.from}` }}>
          {id === "shiksha" && <img src="images/shiksha.webp" alt="" className="absolute inset-y-0 right-0 hidden h-full w-[42%] object-cover opacity-20 [mask-image:linear-gradient(90deg,transparent,#000_60%)] lg:block" />}
          <div className="float-slow -my-6 h-[170px] w-[210px] shrink-0 sm:-my-8 sm:h-[210px] sm:w-[270px]"><Art kind={pg.cta.art} color={pg.cta.artColor ?? pg.main} /></div>
          <div className="relative flex-1 text-center sm:text-left">
            {pg.cta.eyebrow && <div className="text-[12px] font-extrabold uppercase tracking-wider" style={{ color: pg.cta.hl === "#7FB069" ? "#EE9B13" : ORANGE }}>{pg.cta.eyebrow} →</div>}
            <h2 className="mt-1 font-display text-[28px] font-extrabold leading-tight sm:text-[34px]">{pg.cta.title[0]}<span style={{ color: pg.cta.hl }}>{pg.cta.title[1]}</span></h2>
            <p className="mt-2 max-w-[560px] text-[14.5px] leading-6 text-white/90">{pg.cta.text}</p>
            {!m && (
              <div className="mt-4 flex flex-wrap justify-center gap-3 sm:justify-start">
                <button onClick={toContact} className="press rounded-full bg-[#EE9B13] btn-solid px-6 py-3 text-sm font-extrabold shadow-lg">{pg.cta.button} →</button>
                {pg.cta.contact && <button onClick={toContact} className="press rounded-full border border-white/70 px-6 py-3 text-sm font-extrabold">✉ Contact Us</button>}
              </div>
            )}
          </div>
          {m && <button onClick={toContact} className="press relative shrink-0 rounded-full bg-[#EE9B13] btn-solid px-7 py-3.5 text-sm font-extrabold shadow-lg">{pg.cta.button} →</button>}
        </div>
      </section>
    </div>
  );
}
