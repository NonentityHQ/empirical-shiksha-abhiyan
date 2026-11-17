import { Bi } from "../lang";
import { useState, useEffect } from "react";
import { AIcon } from "../icons";

type Sec = {
  id: string;
  hi: string;
  en: string;
  icon: string;
  color: string;
  tint: string;
  bg: string;
  bg2: string;
  next: string;
  title: string;
  text: string;
  img: string;
  pos?: string;
  flip?: boolean;
  badgeRight?: boolean;
  deco?: "books" | "leaf";
  n: string;
  l: string;
  sIcon: string;
  list?: string[];
  cards?: [string, string][];
};

const SECS: Sec[] = [
  {
    id: "shiksha",
    hi: "शिक्षा",
    en: "Education",
    icon: "book",
    color: "#2B459E",
    tint: "#FBF3E4",
    bg: "#FBF3E4",
    bg2: "#FFFBF1",
    next: "#FBE6C8",
    deco: "books",
    title: "Education through the Eklavya Batch",
    img: "images/real-group.webp",
    text: "Started after the 2021 lockdown, the Eklavya Batch gives regular academic support to students from middle-class and economically disadvantaged families.",
    n: "80+",
    l: "Students currently benefiting",
    sIcon: "users",
    list: [
      "Regular subject classes & revision",
      "Doubt-clearing sessions",
      "Guidance and mentoring by volunteers",
      "A supportive peer group",
    ],
  },
  {
    id: "swachhata",
    hi: "स्वच्छता",
    en: "Cleanliness",
    icon: "broom",
    color: "#D8501F",
    tint: "#FBE6C8",
    bg: "#FBE6C8",
    bg2: "#FBE6C8",
    next: "#E4EED8",
    flip: true,
    badgeRight: true,
    title: "Cleanliness drives around Khandwa",
    img: "images/clean-group-1.webp",
    pos: "center 42%",
    text: "Since 2 October 2024, volunteers have cleaned the city's kunds and public places. Rameshwar Kund is cleaned every week.",
    n: "25+",
    l: "Cleanup visits & drives",
    sIcon: "recycle",
    list: [
      "Rameshwar Kund — 20+ visits, weekly",
      "Padam Kund — 2 visits",
      "Suraj Kund & the Stadium — 1 visit each",
      "Cleanups after the Guru Purnima fair",
      "The Clog Run",
    ],
  },
  {
    id: "paryavaran",
    hi: "पर्यावरण",
    en: "Environment",
    icon: "leaf",
    color: "#3A7D44",
    tint: "#E4EED8",
    bg: "#E4EED8",
    bg2: "#E4EED8",
    next: "#FBE6C8",
    deco: "leaf",
    title: "Caring for our environment",
    img: "images/init-environment.webp",
    pos: "center 55%",
    text: "Our kunds are old water bodies and shared heritage. Keeping them clean protects water, wildlife and the places where Khandwa gathers.",
    n: "हरित",
    l: "Khandwa Drive",
    sIcon: "leaf",
    cards: [
      ["drop", "Protecting kunds and water bodies"],
      ["leaf", "Building environmental awareness"],
      ["recycle", "Removing plastic and waste"],
      ["users", "Encouraging proper waste disposal"],
    ],
  },
  {
    id: "swasthya",
    hi: "मानसिक स्वास्थ्य",
    en: "Mental Health",
    icon: "heart",
    color: "#D8501F",
    tint: "#FBE6C8",
    bg: "#FBE6C8",
    bg2: "#FBE6C8",
    next: "",
    flip: true,
    title: "Student well-being & awareness",
    img: "images/init-rally.webp",
    pos: "center 32%",
    text: "We talk with students about phone addiction, screen time and mental well-being — honest conversations that help them build healthier habits.",
    n: "1,000+",
    l: "Students consulted",
    sIcon: "users",
    list: [
      "Phone-addiction awareness sessions",
      "Conversations on mental well-being",
      "Healthy study & screen-time habits",
      "Open Q&A with volunteers",
    ],
  },
];

function Block({ s, onPick }: { s: Sec; onPick: (key: string) => void }) {
  const photo = (
    <div className={`relative w-full max-w-[540px] mx-auto ${s.flip ? "lg:order-2" : ""}`}>
      <div
        className={`absolute -top-4 ${s.flip ? "-right-4" : "-left-4"} w-full h-full rounded-[32px] border-4`}
        style={{ borderColor: s.color + "88" }}
      />
      <div className="relative aspect-[4/3] rounded-[28px] overflow-hidden shadow-[0_18px_40px_-18px_rgba(31,42,68,0.4)]">
        <img
          src={s.img}
          alt={s.en}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: s.pos }}
        />
      </div>

      <div
        className={`absolute -bottom-6 ${
          s.badgeRight ? "right-4 sm:-right-4" : "left-4 sm:-left-4"
        } flex items-center gap-3 rounded-full bg-white pl-2.5 pr-6 py-2.5 shadow-xl ring-1 ring-black/5`}
      >
        <span
          className="w-11 h-11 rounded-xl grid place-items-center text-white"
          style={{ background: s.color }}
        >
          <AIcon n={s.sIcon} />
        </span>
        <span className="leading-tight">
          <b className="block font-display font-extrabold text-[22px]" style={{ color: s.color }}>
            {s.n}
          </b>
          <span className="text-[12px] font-semibold text-slate-600">{s.l}</span>
        </span>
      </div>
    </div>
  );

  return (
    <section
      id={s.id}
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${s.bg}, ${s.bg2})`,
        scrollMarginTop: 150,
      }}
    >
      <div
        className="pointer-events-none absolute -top-16 w-80 h-80 rounded-full blur-3xl opacity-45"
        style={{ background: s.tint, [s.flip ? "right" : "left"]: -60 }}
      />

      <div className="relative max-w-[1240px] mx-auto px-5 py-14 md:py-[72px] grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
        {photo}

        <div className={`relative ${s.flip ? "lg:order-1" : ""}`}>
          {s.deco && (
            <svg
              className="absolute right-0 -top-10 w-24 h-24 opacity-35 hidden md:block"
              viewBox="0 0 64 64"
              fill="none"
              stroke={s.color}
              strokeWidth="1.6"
              strokeLinejoin="round"
              aria-hidden
            >
              {s.deco === "books" ? (
                <>
                  <path d="M8 44l30-8 18 4-30 8z" />
                  <path d="M8 44v6l30 8 18-4v-6" />
                  <path d="M14 30l30-8 12 3-30 8z" />
                  <path d="M14 30v6" />
                </>
              ) : (
                <>
                  <path d="M10 54C8 30 24 10 54 8c2 28-14 46-44 46z" />
                  <path d="M10 54L38 26M28 40l-2-10M36 32h10" />
                </>
              )}
            </svg>
          )}

          <div className="flex items-center gap-3.5">
            <span
              className="w-14 h-14 rounded-full grid place-items-center text-white shadow-lg ring-4 ring-white"
              style={{ background: s.color }}
            >
              <AIcon n={s.icon} s={28} />
            </span>
            <span
              className="px-5 py-2.5 rounded-full bg-white text-[17px] sm:text-[19px] font-extrabold shadow-md border-2"
              style={{ color: s.color, borderColor: s.color + "55" }}
            >
              <Bi en={s.en} hi={s.hi} />
            </span>
          </div>

          <h2 className="mt-5 font-display font-extrabold text-[30px] sm:text-[38px] leading-[1.15] text-[#1F2A44] max-w-md">
            {s.title}
          </h2>
          <p className="mt-4 text-[16px] sm:text-[17px] text-slate-700 leading-[1.75]">{s.text}</p>

          {s.list && (
            <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-3.5">
              {s.list.map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-3 text-[14.5px] sm:text-[15px] text-slate-700 leading-snug"
                >
                  <span
                    className="mt-px w-6 h-6 rounded-full text-white grid place-items-center shrink-0"
                    style={{ background: s.color }}
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12l5 5 9-10" />
                    </svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          )}

          {s.cards && (
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {s.cards.map(([ic, t]) => (
                <div key={t} className="rounded-2xl bg-white ring-1 ring-[#7FB069] p-3.5 text-center shadow-sm">
                  <span className="inline-block" style={{ color: s.color }}><AIcon n={ic} s={30} /></span>
                  <div className="mt-2 text-[12.5px] font-semibold text-slate-700 leading-snug">{t}</div>
                </div>
              ))}
            </div>
          )}
          <button onClick={() => onPick(s.id)}
            className="mt-7 inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-white font-extrabold shadow-lg transition-transform hover:-translate-y-0.5"
            style={{ background: s.color }}>
            Explore {s.en} <span aria-hidden>→</span>
          </button>
        </div>
      </div>

      {s.next && (
        <svg
          className="relative block w-full h-12 sm:h-20 -mb-px"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0 40 C240 10 480 70 760 40 C1040 10 1260 60 1440 30 L1440 80 L0 80Z"
            fill={s.next}
            opacity="0.55"
          />
          <path
            d={
              s.flip
                ? "M0 55 C300 20 600 75 900 50 C1150 30 1330 55 1440 45 L1440 80 L0 80Z"
                : "M0 45 C300 75 600 25 900 55 C1150 75 1330 40 1440 55 L1440 80 L0 80Z"
            }
            fill={s.next}
          />
        </svg>
      )}
    </section>
  );
}

const HERO_IMGS = [
  { src: "images/clean-group-1.webp", pos: "center 40%" },
  { src: "images/init-environment.webp", pos: "center 50%" },
  { src: "images/group-banner.webp", pos: "center 30%" },
  { src: "images/init-rally.webp", pos: "center 35%" },
  { src: "images/team-gloves.webp", pos: "center 40%" },
  { src: "images/clean-group-2.webp", pos: "center 45%" },
];

export default function Initiatives({ onPick }: { onPick: (key: string) => void }) {
  const [hi, setHi] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setHi((i) => (i + 1) % HERO_IMGS.length), 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-[#F6EAD3]">
        {/* Auto-swapping hero images every 2.5s */}
        {HERO_IMGS.map((img, i) => (
          <img
            key={img.src}
            src={img.src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            style={{
              objectPosition: img.pos,
              opacity: i === hi ? 1 : 0,
              zIndex: i === hi ? 1 : 0,
            }}
          />
        ))}
        {/* Lighter overlay — photos stay more visible */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-white/85 via-white/50 to-white/5 sm:from-white/80 sm:via-white/40" />

        <div className="relative z-[3] max-w-[1240px] mx-auto px-5 pt-12 pb-28 sm:pb-36 md:pt-16 md:pb-44">
          <span className="inline-flex px-4 py-1.5 rounded-full bg-white text-[#D8501F] text-[14px] font-bold shadow ring-1 ring-[#D8501F]/30">
            Our Initiatives
          </span>
          <h1 className="mt-5 font-display font-extrabold text-[#1F2A44] text-[32px] sm:text-[46px] md:text-[56px] leading-[1.1] hero-text-h">
            Service for
            <br />
            Education, Cleanliness,
            <br />
            Environment & <span className="text-[#D8501F]">Well-Being</span>
          </h1>
          <p className="mt-4 text-[15px] sm:text-[17px] text-[#1F2A44] max-w-md hero-text-p">
            On-ground work that creates real, lasting change in Khandwa.
          </p>
          <svg className="mt-3 w-44 h-3" viewBox="0 0 176 12" fill="none" aria-hidden>
            <path d="M2 8C40 2 100 2 174 6" stroke="#D8501F" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>

        <svg
          className="absolute bottom-0 left-0 w-full h-10 sm:h-16 z-[3]"
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0 40 C300 70 600 10 900 38 C1150 60 1330 30 1440 22 L1440 64 L0 64Z"
            fill="#FBF3E4"
          />
        </svg>
      </section>

      {SECS.map((s) => (
        <Block key={s.id} s={s} onPick={onPick} />
      ))}
    </>
  );
}
