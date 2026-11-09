import { useState } from "react";
import { EMAIL, PHONE } from "../shared";
import BlurOutUp from "../components/smoothui/blur-out-up";
import MagneticField from "../components/smoothui/magnetic-field";

const inputCls =
  "w-full h-11 px-4 rounded-full bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-[#f2611c] outline-none text-[14px] text-ink placeholder:text-slate-400";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden pt-10 md:pt-14 pb-6">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -right-20 top-0 w-72 h-72 rounded-full bg-[#c9dafb]/35 blur-3xl" />
          <div className="absolute left-10 top-20 w-48 h-48 rounded-full bg-[#fbd3b0]/25 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-5">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8">
              <div className="lg:w-[280px] shrink-0">
                <div className="flex items-center gap-2 text-[#f2611c] text-[13px] font-bold">
                  <span className="w-6 h-[3px] rounded-full bg-[#f2611c]" />
                  Contact Us
                </div>
                <h1 className="mt-3 font-display font-extrabold text-[34px] sm:text-[42px] md:text-[48px] leading-[1.1] tracking-tight text-ink">
                  Get in Touch{" "}
                  <span className="relative inline-block text-[#f2611c]">
                    With Us
                    <span className="absolute left-0 -bottom-1 w-full h-2 rounded-full bg-[#f2611c]/25" />
                  </span>
                </h1>
                <p className="mt-4 text-[15px] text-slate-600 leading-relaxed max-w-md">
                  <BlurOutUp triggerOnView delay={80} stagger={18}>Have a question, idea, or want to collaborate? We would love to hear from you.</BlurOutUp>
                </p>
              </div>

              {/* 4 info cards — one row on desktop */}
              <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-3 min-w-0">
                {[
                  { icon: "📞", label: "फ़ोन", value: `+91 ${PHONE}`, href: `tel:${PHONE}`, color: "#1f5fd1", bg: "#e8f0fe" },
                  { icon: "✉️", label: "ईमेल", value: EMAIL, href: `mailto:${EMAIL}`, color: "#f2611c", bg: "#fff0e3" },
                  { icon: "📍", label: "पता", value: "खंडवा, मध्य प्रदेश भारत", href: null, color: "#3f9a3a", bg: "#e9f5e6" },
                  { icon: "🕐", label: "कार्य समय", value: "सोम – शनि सुबह 10:00 – शाम 6:00", href: null, color: "#7b4fd6", bg: "#f3eefc" },
                ].map((c) => {
                  const inner = (
                    <div className="rounded-2xl bg-white ring-1 ring-slate-100 shadow-sm p-4 h-full hover:shadow-md transition">
                      <div className="w-10 h-10 rounded-xl grid place-items-center text-lg" style={{ background: c.bg }}>
                        {c.icon}
                      </div>
                      <div className="mt-2 text-[12px] font-bold" style={{ color: c.color }}>{c.label}</div>
                      <div className="mt-0.5 text-[12px] sm:text-[13px] font-semibold text-ink leading-snug break-all">{c.value}</div>
                    </div>
                  );
                  return c.href ? (
                    <a key={c.label} href={c.href} className="block">{inner}</a>
                  ) : (
                    <div key={c.label}>{inner}</div>
                  );
                })}
              </div>

              {/* Circular photo */}
              <div className="hidden lg:flex shrink-0 justify-center">
                <div className="relative w-44 h-44">
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#ffc73a]/40 to-[#1f5fd1]/20" />
                  <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                    <img src="images/group-banner.png" alt="Students" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders + Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-5 py-8 md:py-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-[2px] w-8 rounded-full bg-[#f2611c]" />
          <h2 className="font-display font-extrabold text-[20px] sm:text-[22px] text-[#f2611c]">हमारे संस्थापक</h2>
          <span className="h-[2px] w-8 rounded-full bg-[#f2611c]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Rahul */}
          <div className="rounded-[26px] bg-white ring-1 ring-slate-100 shadow-[0_14px_34px_-18px_rgba(18,48,122,0.35)] p-5 flex gap-4 items-start">
            <div className="w-24 aspect-[4/5] sm:w-28 rounded-2xl overflow-hidden bg-gradient-to-b from-[#cfe0fb] to-[#eaf2ff] shrink-0">
              <img src="images/rahul.jpg" alt="Rahul Geete" className="w-full h-full object-cover object-top" />
            </div>
            <div className="min-w-0">
              <div className="font-display font-extrabold text-[18px] text-ink">Rahul Geete</div>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-[#f2611c] text-white text-[11px] font-bold">Co-Founder</span>
              <p className="mt-2 text-[12px] sm:text-[13px] text-slate-600 leading-relaxed">
                A social educator and community builder passionate about creating equal learning opportunities for every child.
              </p>
              <div className="mt-3 flex gap-2">
                {[["in", "#0a66c2"], ["▶", "#e11d1d"], ["ig", "#d6249f"]].map(([s, c]) => (
                  <span key={s} className="w-8 h-8 rounded-lg grid place-items-center text-[12px] font-bold text-white" style={{ background: c }}>{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Jay */}
          <div className="rounded-[26px] bg-white ring-1 ring-slate-100 shadow-[0_14px_34px_-18px_rgba(18,48,122,0.35)] p-5 flex gap-4 items-start">
            <div className="w-24 aspect-[4/5] sm:w-28 rounded-2xl overflow-hidden bg-gradient-to-b from-[#ffe3c8] to-[#fff3e8] shrink-0">
              <img src="images/jay.jpg" alt="Jayram Malakar" className="w-full h-full object-cover object-top" />
            </div>
            <div className="min-w-0">
              <div className="font-display font-extrabold text-[18px] text-ink">Jayram Malakar</div>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-[#f2611c] text-white text-[11px] font-bold">Co-Founder</span>
              <p className="mt-2 text-[12px] sm:text-[13px] text-slate-600 leading-relaxed">
                An educator and mentor dedicated to student development, mental well-being, and social awareness through education.
              </p>
              <div className="mt-3 flex gap-2">
                {[["in", "#0a66c2"], ["▶", "#e11d1d"], ["ig", "#d6249f"]].map(([s, c]) => (
                  <span key={s} className="w-8 h-8 rounded-lg grid place-items-center text-[12px] font-bold text-white" style={{ background: c }}>{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#e8f0fe] to-[#f0f6ff] ring-1 ring-[#c9dafb]/60 p-5 sm:p-6 flex flex-col justify-center">
            <svg className="absolute right-3 bottom-0 w-36 opacity-80" viewBox="0 0 140 90" aria-hidden><path d="M0 90 L55 30 L80 55 L100 40 L140 90Z" fill="#b9d2fb" /><path d="M55 30 L40 12" stroke="#f2611c" strokeWidth="2" /><path d="M40 12 L62 17 L40 24Z" fill="#ffa51f" /></svg>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#1f5fd1] text-white grid place-items-center text-sm font-bold">◎</div>
              <h3 className="font-display font-extrabold text-[20px] text-[#1f5fd1]">Our Mission</h3>
            </div>
            <p className="relative mt-3 text-[15px] text-slate-700 leading-relaxed max-w-xs">
              To empower underprivileged children through quality education, better health, a cleaner environment, and holistic mental well-being.
            </p>
          </div>
        </div>
      </section>

      {/* Form + Location */}
      <section className="max-w-7xl mx-auto px-4 sm:px-5 pb-10">
        <div className="grid lg:grid-cols-12 gap-5">
          {/* Form */}
          <div className="lg:col-span-7 rounded-[26px] bg-white ring-1 ring-slate-100 shadow-[0_14px_34px_-18px_rgba(18,48,122,0.35)] p-5 sm:p-7">
            {sent ? (
              <div className="py-16 text-center">
                <div className="text-5xl">🙏</div>
                <h3 className="mt-3 font-display font-extrabold text-2xl text-ink">Message sent</h3>
                <p className="mt-2 text-slate-600">Thank you for reaching out. We&apos;ll reply soon.</p>
                <button type="button" onClick={() => setSent(false)} className="mt-5 text-[#f2611c] font-bold">
                  Send another →
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[#1f5fd1] text-xl">✈</span>
                  <h2 className="font-display font-extrabold text-[22px] text-[#1f5fd1]">Send Us a Message</h2>
                </div>
                <p className="mt-1 text-[13px] text-slate-500">Share your idea, query, or collaboration proposal with our team.</p>

                <div className="mt-5 grid sm:grid-cols-2 gap-3">
                  <input required placeholder="Your Name *" className={inputCls} />
                  <select required className={inputCls} defaultValue="">
                    <option value="" disabled>
                      Your Role *
                    </option>
                    <option>Student</option>
                    <option>Parent</option>
                    <option>Volunteer</option>
                    <option>Teacher</option>
                    <option>Other</option>
                  </select>
                  <input required placeholder="Mobile Number *" className={inputCls} />
                  <input type="email" placeholder="Email Address" className={inputCls} />
                  <textarea required rows={4} placeholder="Your Message *" className={`${inputCls} h-auto py-3 rounded-2xl sm:col-span-2 resize-none`} />
                </div>
                <div className="mt-4 flex justify-end">
                  <button type="submit" className="h-11 px-7 rounded-full bg-[#f2611c] hover:bg-[#e05510] text-white font-bold text-[14px] shadow-md transition">
                    Send Message →
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Location */}
          <div className="lg:col-span-5 rounded-[26px] bg-white ring-1 ring-slate-100 shadow-[0_14px_34px_-18px_rgba(18,48,122,0.35)] overflow-hidden flex flex-col">
            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <span className="text-[#f2611c] text-lg">📍</span>
                <h2 className="font-display font-extrabold text-[20px] text-[#f2611c]">Our Location</h2>
              </div>
              <div className="mt-3 font-display font-extrabold text-[18px] text-ink">Empirical Shiksha Abhiyan</div>
              <div className="mt-1 text-[13px] text-slate-600 flex items-start gap-1.5">
                <span className="text-[#f2611c]">📍</span>
                Arya Mahila Samaj Bhawan, Ramganj Ward, Khandwa, Madhya Pradesh 450001
              </div>
              <a
                href="https://www.google.com/maps?q=Empirical+Institute,+Arya+Mahila+Samaj+Bhawan,+Wamanrao+Deo+Marg,+Ramganj+Ward,+Khandwa,+Madhya+Pradesh+450001"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 h-10 px-4 rounded-full bg-[#e8f0fe] text-[#1f5fd1] font-bold text-[13px] hover:bg-[#1f5fd1] hover:text-white transition"
              >
                View on Google Maps ↗
              </a>
            </div>
            <div className="flex-1 min-h-[200px] relative">
              <iframe
                title="Empirical Institute, Khandwa"
                className="absolute inset-0 w-full h-full"
                loading="lazy"
                src="https://maps.google.com/maps?q=Empirical+Institute,+Arya+Mahila+Samaj+Bhawan,+Khandwa,+Madhya+Pradesh+450001&z=16&output=embed"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Join the Movement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-5 pb-14">
        <div className="rounded-[22px] bg-[#0b1f4d] text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-5 md:gap-8 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-[#ffc73a] text-[#0b1f4d] grid place-items-center text-2xl shrink-0">💡</div>
          <div className="flex-1 min-w-0">
            <h2 className="font-display font-extrabold text-[24px] sm:text-[28px] leading-tight">
              Join the <span className="text-[#ffc73a]">Movement</span>
            </h2>
            <p className="mt-1.5 text-[14px] text-white/75 leading-relaxed">
              Be a part of Empirical Shiksha Abhiyan and help us create better learning, healthier minds, and cleaner communities for every child.
            </p>
          </div>
          <MagneticField className="shrink-0" radius={130} strength={0.22}>
            <a
              data-magnetic
              href={`https://wa.me/91${PHONE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-white text-[#0b1f4d] font-bold text-[14px] hover:bg-[#ffc73a] transition"
            >
              👥 Become a Volunteer →
            </a>
          </MagneticField>
        </div>
      </section>
    </>
  );
}
