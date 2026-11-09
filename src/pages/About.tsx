import { useState, useEffect } from "react";
import { type Page } from "../shared";
import BlurOutUp from "../components/smoothui/blur-out-up";
import MotionAccordion from "../components/unlumen-ui/motion-faqs-accordion";

const FAQ_CATEGORIES = [
  {
    id: "general",
    name: "General",
    faqs: [
      {
        question: "Who runs Empirical Shiksha Abhiyan Samiti?",
        answer: "The organisation was founded by Rahul Geete and Jayram Malakar and is supported by a team of 60+ volunteers in Khandwa.",
        icon: "Users",
      },
      {
        question: "When was the organisation registered?",
        answer: "Empirical Shiksha Abhiyan Samiti was registered on 13 July 2026 in Khandwa, Madhya Pradesh.",
        icon: "CalendarDays",
      },
    ],
  },
  {
    id: "programmes",
    name: "Programmes",
    faqs: [
      {
        question: "What is the Eklavya Batch?",
        answer: "A free regular academic support programme for students from middle-class and economically disadvantaged families in Khandwa.",
        icon: "BookOpen",
      },
    ],
  },
  {
    id: "community",
    name: "Community",
    faqs: [
      {
        question: "Do you accept donations?",
        answer: "No. We are fully self-funded by our founders. We do not ask for or accept public donations.",
        icon: "HandHeart",
      },
      {
        question: "How can I volunteer?",
        answer: "Reach us on WhatsApp or the Contact page. We welcome students, teachers and neighbours who can give time every week.",
        icon: "MessageCircle",
      },
    ],
  },
];

const FAQ_ITEMS = FAQ_CATEGORIES.flatMap((category) =>
  category.faqs.map((faq) => ({
    question: (
      <span className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5">
        <span className="rounded-full bg-[#fff0e5] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#d95a18]">
          {category.name}
        </span>
        <span>{faq.question}</span>
      </span>
    ),
    answer: faq.answer,
  })),
);

export default function About({ go }: { go: (p: Page) => void }) {
  const [activeFounder, setActiveFounder] = useState(0);
  const founders = [
    { name: "Rahul Geete", role: "Co-Founder", image: "/images/about-rahul.png", accent: "#1f5fd1" },
    { name: "Jayram Malakar", role: "Co-Founder", image: "/images/about-jayram.png", accent: "#f2611c" },
  ];

  // Rotate one founder at a time; image and name transition as a single unit.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveFounder((current) => (current + 1) % founders.length);
    }, 4800);
    return () => window.clearInterval(timer);
  }, []);

  // Reveal sections/cards as they enter the viewport; respects reduced-motion in CSS.
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ===== HERO — founder-led story ===== */}
      <section className="about-hero relative isolate overflow-hidden min-h-[560px] lg:min-h-[590px]">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/about-khandwa-bg.webp')", backgroundSize: "100% 100%", backgroundPosition: "center bottom" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/95 via-white/78 to-white/12" aria-hidden="true" />
        {/* The supplied landscape already contains the blue-orange wave; do not overlay another wave. */}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-5 pt-7 sm:pt-8 lg:pt-9 pb-16 lg:pb-20 grid lg:grid-cols-12 gap-6 lg:gap-2 items-center min-h-[560px] lg:min-h-[590px]">
          <div className="lg:col-span-5 relative z-10 max-w-[590px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#f2611c]/50 bg-white/90 px-3 py-1 text-[12px] font-bold text-[#f2611c] shadow-sm hero-enter">
              <span className="w-2 h-2 rounded-full bg-[#f2611c] animate-pulse" />
              About Us
            </span>
            <h1 className="mt-5 font-display font-extrabold text-[38px] sm:text-[50px] md:text-[58px] leading-[1.02] tracking-tight text-[#12307a] hero-enter hero-delay-1">
              Education that
              <span className="block mt-1">Turns into <em className="relative inline-block not-italic text-[#f2611c]">
                Service
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#f2611c]" viewBox="0 0 220 12" fill="none" aria-hidden="true"><path d="M3 9C57 1 153 1 217 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
              </em></span>
            </h1>
            <p className="mt-6 max-w-md text-[15px] sm:text-[16px] leading-relaxed text-slate-700 hero-enter hero-delay-2">
              <BlurOutUp delay={140} stagger={24}>We are a group of students, teachers and neighbours in Khandwa who believe that learning is only complete when it gives something back to the community.</BlurOutUp>
            </p>
            <div className="mt-7 flex flex-wrap gap-3 hero-enter hero-delay-3">
              <a href="#our-story" className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-gradient-to-r from-[#ff8a1f] to-[#f2611c] text-white font-bold text-[14px] shadow-[0_8px_20px_-8px_rgba(242,97,28,.8)] hover:-translate-y-1 transition-transform">
                Our Journey <span aria-hidden>→</span>
              </a>
              <a href="#founders" className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-white/95 text-[#12307a] ring-1 ring-[#f2611c]/70 font-bold text-[14px] shadow-sm hover:-translate-y-1 transition-transform">
                Meet the Founders
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 relative min-h-[350px] sm:min-h-[410px] lg:min-h-[450px] flex items-end justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="absolute right-[4%] bottom-[7%] w-[94%] h-[76%] rounded-[48%] bg-gradient-to-br from-[#ffbd77]/85 via-[#fff4e8]/70 to-[#dceaff]/80 blur-[1px] ring-1 ring-white/80" aria-hidden="true" />
            <div className="absolute right-[1%] bottom-[4%] w-[98%] h-[80%] rounded-[48%] border border-white/75 bg-white/10 shadow-[0_25px_70px_-35px_rgba(18,48,122,.4)]" aria-hidden="true" />

            <div className="relative z-10 w-full max-w-[620px] h-[350px] sm:h-[410px] lg:h-[450px] flex items-end justify-center">
              <div
                key={founders[activeFounder].name}
                className="founder-single-slide relative h-full w-full flex items-end justify-center"
                aria-live="polite"
              >
                <img
                  src={founders[activeFounder].image}
                  alt={`${founders[activeFounder].name}, ${founders[activeFounder].role}`}
                  className="founder-single-portrait h-full w-auto max-w-full object-contain object-bottom"
                  decoding="async"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[22%] z-20 min-w-[170px] sm:min-w-[205px] rounded-2xl border border-white/85 bg-white/95 px-5 py-3 text-center shadow-[0_12px_30px_-10px_rgba(18,48,122,.38)] backdrop-blur">
                  <div className="font-display font-extrabold text-[15px] sm:text-[18px] text-[#12307a]">
                    {founders[activeFounder].name}
                  </div>
                  <div className="text-[11px] sm:text-[13px] font-semibold text-slate-600">
                    {founders[activeFounder].role}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-1 right-1 sm:right-4 z-30 flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-3 py-2 shadow-lg backdrop-blur">
                {founders.map((founder, index) => (
                  <button
                    key={founder.name}
                    type="button"
                    onClick={() => setActiveFounder(index)}
                    aria-label={`Show ${founder.name}`}
                    aria-pressed={activeFounder === index}
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      activeFounder === index ? "w-7 bg-[#1f5fd1]" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
                <span className="ml-1 text-[11px] font-bold tabular-nums text-slate-600">
                  {activeFounder + 1}/2
                </span>
              </div>
            </div>
            <div className="absolute top-[12%] right-[8%] w-3 h-3 rounded-full bg-[#f2611c] twinkle" />
            <div className="absolute top-[28%] left-[10%] w-2.5 h-2.5 rounded-full bg-[#1f5fd1] twinkle" />
          </div>
        </div>
      </section>

      {/* ===== OUR STORY ===== */}
      <section id="our-story" data-reveal className="reveal max-w-7xl mx-auto px-4 sm:px-5 py-14 md:py-18">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[24px] overflow-hidden shadow-lg ring-1 ring-black/5 aspect-[4/3] -rotate-2">
              <img src="images/group-banner.png" alt="Classroom" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-2 sm:right-4 w-[55%] rounded-[20px] overflow-hidden shadow-xl ring-4 ring-white rotate-3">
              <img src="images/clean-group-1.png" alt="Cleanup" className="w-full aspect-[4/3] object-cover" />
            </div>
            <div className="absolute -top-3 right-6 px-3 py-1.5 rounded-full bg-white shadow-md ring-1 ring-slate-100 text-[12px] font-bold text-ink">
              📅 2021 · where it began
            </div>
          </div>

          <div className="lg:col-span-7 pt-8 lg:pt-0">
            <div className="flex items-center gap-2 text-[#f2611c] text-[12px] font-bold uppercase tracking-wider">
              <span className="w-5 h-[2px] rounded-full bg-[#f2611c]" />
              Our Story
            </div>
            <h2 className="mt-2 font-display font-extrabold text-[26px] sm:text-[32px] text-ink leading-tight">
              It started with a few students and a lot of lost time.
            </h2>
            <div className="mt-4 space-y-3 text-[15px] text-slate-600 leading-relaxed">
              <p>
                When schools reopened after the 2021 lockdown, many students in Khandwa had fallen behind — and many families could not afford extra coaching. Our founders began teaching them. That group became the{" "}
                <span className="font-bold text-[#1f5fd1]">Eklavya Batch</span>.
              </p>
              <p>
                On <span className="font-bold text-ink">2 October 2024</span>, the work grew beyond the classroom. Students and volunteers started cleaning Rameshwar Kund — and kept coming back every week.
              </p>
              <p>
                Today our work covers four areas: <span className="font-semibold text-ink">Shiksha, Swachhata, Paryavaran and Mansik Swasthya</span>. We are funded entirely by our founders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOUNDERS ===== */}
      <section id="founders" data-reveal className="reveal relative py-14 md:py-20 overflow-hidden">
        {/* soft colored background band */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#eef5fd] via-[#f5f9ff] to-[#eef5fd]" aria-hidden />
        <div className="absolute -left-20 top-10 w-72 h-72 rounded-full bg-[#c9dafb]/40 blur-3xl" aria-hidden />
        <div className="absolute -right-16 bottom-10 w-80 h-80 rounded-full bg-[#fbd3b0]/30 blur-3xl" aria-hidden />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-5">
          <div className="text-center mb-10 md:mb-12">
            <div className="flex items-center justify-center gap-3">
              <span className="h-[2px] w-10 rounded-full bg-[#f2611c]" />
              <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#f2611c]">Our Founders</span>
              <span className="h-[2px] w-10 rounded-full bg-[#f2611c]" />
            </div>
            <h2 className="mt-3 font-display font-extrabold text-[30px] sm:text-[38px] md:text-[42px] text-ink tracking-tight">
              The people who started it
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                name: "Rahul Geete",
                role: "Co-Founder",
                img: "/images/about-rahul.png",
                bio: "Co-founded Empirical Shiksha Abhiyan Samiti and personally funds its work. Started teaching students after the 2021 lockdown, which grew into the Eklavya Batch.",
                color: "#f2611c",
                bg: "#fff0e3",
                badgeBg: "#f2611c",
              },
              {
                name: "Jayram Malakar",
                role: "Co-Founder",
                img: "/images/about-jayram.png",
                bio: "Co-founded Empirical Shiksha Abhiyan Samiti and personally funds its work. Started teaching students after the 2021 lockdown, which grew into the Eklavya Batch.",
                color: "#1f5fd1",
                bg: "#e8f0fe",
                badgeBg: "#1f5fd1",
              },
            ].map((f) => (
              <div
                key={f.name}
                className="reveal-child card-pop rounded-[28px] bg-white ring-1 ring-slate-100/80 shadow-[0_12px_40px_-16px_rgba(30,60,120,0.15)] p-6 sm:p-8 flex flex-col sm:flex-row gap-5 sm:gap-6 items-start hover:shadow-[0_16px_48px_-12px_rgba(30,60,120,0.2)] transition"
              >
                <div
                  className="w-full sm:w-36 md:w-40 h-44 sm:h-44 md:h-48 rounded-[22px] overflow-hidden shrink-0 ring-4 ring-white shadow-md flex items-end justify-center"
                  style={{ background: f.bg }}
                >
                  <img src={f.img} alt={f.name} className="w-full h-full object-contain object-bottom" />
                </div>
                <div className="min-w-0 flex-1 pt-1">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-[12px] font-bold text-white shadow-sm"
                    style={{ background: f.badgeBg }}
                  >
                    {f.role}
                  </span>
                  <h3 className="mt-3 font-display font-extrabold text-[24px] sm:text-[26px] text-ink leading-tight">
                    {f.name}
                  </h3>
                  <p className="mt-3 text-[14px] sm:text-[15px] text-slate-600 leading-relaxed">
                    {f.bio}
                  </p>
                  <button
                    type="button"
                    onClick={() => go("contact")}
                    className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-bold hover:gap-2.5 transition-all"
                    style={{ color: f.color }}
                  >
                    Get in touch →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VISION + FOCUS AREAS ===== */}
      <section data-reveal className="reveal max-w-7xl mx-auto px-4 sm:px-5 py-10 md:py-14">
        <div className="grid lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-5 relative rounded-[28px] overflow-hidden min-h-[260px] shadow-lg">
            <img src="images/group-banner.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f4d]/95 via-[#0b1f4d]/60 to-transparent" />
            <div className="relative p-6 sm:p-8 flex flex-col justify-end h-full min-h-[260px]">
              <div className="text-[12px] font-bold uppercase tracking-wider text-[#ffc73a]">Our Vision</div>
              <h3 className="mt-2 font-display font-extrabold text-[22px] sm:text-[26px] text-white leading-tight">
                A Khandwa where every student can learn, and every learner gives back.
              </h3>
              <div className="mt-3 text-[#ffc73a] font-bold text-[14px]">शिक्षा से सेवा</div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-4">
            {[
              { hi: "शिक्षा", en: "Education", desc: "Free, regular academic support through the Eklavya Batch.", color: "#1f5fd1", bg: "#e8f0fe", icon: "📚" },
              { hi: "स्वच्छता", en: "Cleanliness", desc: "Weekly and event-based cleanups at kunds and public spaces.", color: "#f2611c", bg: "#fff0e3", icon: "🧹" },
              { hi: "पर्यावरण", en: "Environment", desc: "Protecting our water bodies and shared green spaces.", color: "#3f9a3a", bg: "#e9f5e6", icon: "🌿" },
              { hi: "मानसिक स्वास्थ्य", en: "Mental Health", desc: "Awareness on phone addiction and student mental well-being.", color: "#d62828", bg: "#fce8f0", icon: "❤️" },
            ].map((a) => (
              <div key={a.en} className="rounded-[20px] p-4 sm:p-5 shadow-sm" style={{ background: a.bg }}>
                <div className="text-2xl">{a.icon}</div>
                <div className="mt-2 font-display font-extrabold text-[15px] sm:text-[16px]" style={{ color: a.color }}>
                  {a.hi}
                </div>
                <div className="text-[12px] font-semibold text-slate-500">{a.en}</div>
                <p className="mt-1.5 text-[12px] sm:text-[13px] text-slate-600 leading-snug">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REGISTRATION ===== */}
      <section data-reveal className="reveal max-w-7xl mx-auto px-4 sm:px-5 py-10 md:py-14">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-2 text-[#f2611c] text-[12px] font-bold uppercase tracking-wider">
              <span className="w-5 h-[2px] rounded-full bg-[#f2611c]" />
              Registration
            </div>
            <h2 className="mt-2 font-display font-extrabold text-[28px] sm:text-[32px] text-ink">Officially Registered</h2>
            <p className="mt-3 text-[15px] text-slate-600 leading-relaxed max-w-md">
              Empirical Shiksha Abhiyan Samiti was registered on 13 July 2026. A copy of the official certificate will be published here.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e8f0fe] text-[#1f5fd1] text-[12px] font-bold">
                📅 Registered: 13 July 2026
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fff0e3] text-[#f2611c] text-[12px] font-bold">
                📍 Khandwa, Madhya Pradesh
              </span>
            </div>
            <button
              type="button"
              disabled
              className="mt-5 h-11 px-5 rounded-full bg-[#1f5fd1] text-white font-bold text-[14px] opacity-70 cursor-not-allowed"
            >
              Download Certificate (PDF) →
            </button>
          </div>
          <div className="rounded-[24px] bg-white ring-1 ring-slate-200 shadow-sm p-6 min-h-[220px] flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 grid place-items-center text-2xl">📄</div>
            <div className="mt-3 font-bold text-ink">Certificate preview area</div>
            <p className="mt-1 text-[13px] text-slate-500 max-w-xs">The official scanned certificate will appear here once uploaded by the organisation.</p>
          </div>
        </div>
      </section>

      {/* ===== SmoothUI FAQ block with the organisation's real answers ===== */}
      <section data-reveal className="max-w-5xl mx-auto px-4 sm:px-5 py-10 md:py-14">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <h2 className="font-display text-[28px] font-extrabold text-[#12307a] sm:text-[32px]">Questions people ask us</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-slate-600 sm:text-[15px]">Learn more about our organisation, programmes and ways to contribute your time.</p>
          </div>
          <MotionAccordion items={FAQ_ITEMS} gap={12} />
        </div>
      </section>

      {/* ===== PHOTO STRIP ===== */}
      <section data-reveal className="reveal pb-14 pt-4">
        <div className="max-w-5xl mx-auto px-4 flex justify-center gap-2 sm:gap-3 overflow-hidden">
          {["images/group-banner.png", "images/plant-real.png", "images/team-gloves.png", "images/rally-march.png", "images/clean-group-1.png"].map((src, i) => (
            <div
              key={src}
              className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-white shadow-md shrink-0"
              style={{ marginTop: i % 2 === 0 ? 0 : 16 }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <p className="mt-6 text-center font-display font-extrabold text-[18px] sm:text-[20px] text-ink">
          शिक्षा से सेवा — <span className="text-[#f2611c]">Service through Education</span>
        </p>
      </section>
    </>
  );
}
