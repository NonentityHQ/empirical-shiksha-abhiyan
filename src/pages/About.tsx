import { useState } from "react";
import { type Page } from "../shared";

const FAQ = [
  {
    q: "Who runs Empirical Shiksha Abhiyan Samiti?",
    a: "The organisation was founded by Rahul Geete and Jayram Malakar and is supported by a team of 60+ volunteers in Khandwa.",
  },
  {
    q: "Do you accept donations?",
    a: "No. We are fully self-funded by our founders. We do not ask for or accept public donations.",
  },
  {
    q: "What is the Eklavya Batch?",
    a: "A free regular academic support programme for students from middle-class and economically disadvantaged families in Khandwa.",
  },
  {
    q: "How can I volunteer?",
    a: "Reach us on WhatsApp or the Contact page. We welcome students, teachers and neighbours who can give time every week.",
  },
  {
    q: "When was the organisation registered?",
    a: "Empirical Shiksha Abhiyan Samiti was registered on 13 July 2026 in Khandwa, Madhya Pradesh.",
  },
];

export default function About({ go }: { go: (p: Page) => void }) {
  const [open, setOpen] = useState(0);

  return (
    <>
      {/* ===== HERO — matches design: text left, founders right ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <img src="images/hero-landscape.png" alt="" className="absolute inset-0 w-full h-full object-cover object-center opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-5 pt-10 md:pt-14 pb-12 md:pb-16 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 text-[#f2611c] text-[13px] font-bold">
              <span className="w-6 h-[3px] rounded-full bg-[#f2611c]" />
              About Us
            </div>
            <h1 className="mt-3 font-display font-extrabold text-[34px] sm:text-[44px] md:text-[52px] leading-[1.08] tracking-tight text-ink">
              Education that{" "}
              <span className="relative inline-block text-[#f2611c]">
                Turns into Service
                <span className="absolute left-0 -bottom-1 w-full h-2 rounded-full bg-[#f2611c]/20" />
              </span>
            </h1>
            <p className="mt-4 text-[15px] sm:text-[16px] text-slate-600 leading-relaxed max-w-lg">
              We are a group of students, teachers and neighbours in Khandwa who believe that learning is only complete when it gives something back to the community.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#our-story" className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[#1f5fd1] text-white font-bold text-[14px] shadow-md hover:bg-[#174bb0] transition">
                Our Journey →
              </a>
              <a href="#founders" className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-white ring-2 ring-[#1f5fd1] text-[#1f5fd1] font-bold text-[14px] hover:bg-[#e8f0fe] transition">
                Meet the Founders
              </a>
            </div>
          </div>

          {/* Founders visual */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px] aspect-[5/4]">
              <div className="absolute inset-0 rounded-[40%] bg-gradient-to-br from-[#c9dafb]/50 to-[#fbd3b0]/30 blur-2xl" />
              <div className="absolute right-0 top-0 w-[58%] rounded-[28px] overflow-hidden shadow-xl ring-4 ring-white">
                <img src="images/volunteers.jpg" alt="Jayram Malakar" className="w-full aspect-[3/4] object-cover object-top" />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white text-[11px] font-bold text-ink shadow whitespace-nowrap">
                  Jayram Malakar · Co-Founder
                </div>
              </div>
              <div className="absolute left-0 bottom-0 w-[55%] rounded-[28px] overflow-hidden shadow-xl ring-4 ring-white z-10">
                <img src="images/clogrun.jpg" alt="Rahul Geete" className="w-full aspect-[3/4] object-cover object-top" />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white text-[11px] font-bold text-ink shadow whitespace-nowrap">
                  Rahul Geete · Co-Founder
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUR STORY ===== */}
      <section id="our-story" className="max-w-7xl mx-auto px-4 sm:px-5 py-14 md:py-18">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[24px] overflow-hidden shadow-lg ring-1 ring-black/5 aspect-[4/3] -rotate-2">
              <img src="images/shiksha.jpg" alt="Classroom" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-2 sm:right-4 w-[55%] rounded-[20px] overflow-hidden shadow-xl ring-4 ring-white rotate-3">
              <img src="images/swachhata.jpg" alt="Cleanup" className="w-full aspect-[4/3] object-cover" />
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
      <section id="founders" className="relative py-14 md:py-20 overflow-hidden">
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
                img: "images/volunteers.jpg",
                bio: "Co-founded Empirical Shiksha Abhiyan Samiti and personally funds its work. Started teaching students after the 2021 lockdown, which grew into the Eklavya Batch.",
                color: "#f2611c",
                bg: "#fff0e3",
                badgeBg: "#f2611c",
              },
              {
                name: "Jayram Malakar",
                role: "Co-Founder",
                img: "images/clogrun.jpg",
                bio: "Co-founded Empirical Shiksha Abhiyan Samiti and personally funds its work. Started teaching students after the 2021 lockdown, which grew into the Eklavya Batch.",
                color: "#1f5fd1",
                bg: "#e8f0fe",
                badgeBg: "#1f5fd1",
              },
            ].map((f) => (
              <div
                key={f.name}
                className="rounded-[28px] bg-white ring-1 ring-slate-100/80 shadow-[0_12px_40px_-16px_rgba(30,60,120,0.15)] p-6 sm:p-8 flex flex-col sm:flex-row gap-5 sm:gap-6 items-start hover:shadow-[0_16px_48px_-12px_rgba(30,60,120,0.2)] transition"
              >
                <div
                  className="w-full sm:w-36 md:w-40 h-44 sm:h-44 md:h-48 rounded-[22px] overflow-hidden shrink-0 ring-4 ring-white shadow-md"
                  style={{ background: f.bg }}
                >
                  <img src={f.img} alt={f.name} className="w-full h-full object-cover object-top" />
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
      <section className="max-w-7xl mx-auto px-4 sm:px-5 py-10 md:py-14">
        <div className="grid lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-5 relative rounded-[28px] overflow-hidden min-h-[260px] shadow-lg">
            <img src="images/hero-landscape.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
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
      <section className="max-w-7xl mx-auto px-4 sm:px-5 py-10 md:py-14">
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

      {/* ===== FAQ ===== */}
      <section className="max-w-3xl mx-auto px-4 sm:px-5 py-10 md:py-14">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 rounded-full bg-[#f2611c]" />
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#f2611c]">FAQ</span>
            <span className="h-[2px] w-8 rounded-full bg-[#f2611c]" />
          </div>
          <h2 className="mt-2 font-display font-extrabold text-[28px] sm:text-[32px] text-ink">Questions people ask us</h2>
        </div>
        <div className="space-y-3">
          {FAQ.map((item, idx) => (
            <div
              key={item.q}
              className={`rounded-2xl bg-white ring-1 overflow-hidden transition ${open === idx ? "ring-[#f2611c]/40 shadow-sm" : "ring-slate-150"}`}
            >
              <button
                type="button"
                onClick={() => setOpen(open === idx ? -1 : idx)}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
              >
                <span className="font-bold text-[14px] sm:text-[15px] text-ink">{item.q}</span>
                <span className={`w-7 h-7 rounded-full grid place-items-center shrink-0 text-sm font-bold transition ${open === idx ? "bg-[#f2611c] text-white" : "bg-slate-100 text-slate-500"}`}>
                  {open === idx ? "−" : "+"}
                </span>
              </button>
              {open === idx && (
                <div className="px-5 pb-4 text-[14px] text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ===== PHOTO STRIP ===== */}
      <section className="pb-14 pt-4">
        <div className="max-w-5xl mx-auto px-4 flex justify-center gap-2 sm:gap-3 overflow-hidden">
          {["images/shiksha.jpg", "images/paryavaran.jpg", "images/volunteers.jpg", "images/swasthya.jpg", "images/swachhata.jpg"].map((src, i) => (
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
