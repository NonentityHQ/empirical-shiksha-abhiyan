import { Bi } from "../lang";
import { useState, type ReactNode } from "react";
import {
  BadgeCheck, Check, ChevronDown, Clock, ExternalLink, GraduationCap, Handshake, Heart,
  Mail, MapPin, Megaphone, PencilLine, Phone, Send, Smartphone, Sprout, Target, User, Users,
} from "lucide-react";
import { BrandIcon, type BrandName } from "../brand";
import { EMAIL, PHONE } from "../shared";
import { IG_HANDLE, IG_PROFILE, YT_CHANNEL } from "../data";

/* Add real links here when you have them — a tile only shows when it has a url. */
const SOCIALS: { name: string; brand: BrandName; handle: string; url: string }[] = [
  { name: "YouTube", brand: "youtube", handle: "@EmpiricalShikshaAbhiyan", url: YT_CHANNEL },
  { name: "Instagram", brand: "instagram", handle: IG_HANDLE, url: IG_PROFILE },
  { name: "Facebook", brand: "facebook", handle: "@EmpiricalShikshaAbhiyan", url: "" },
  { name: "X (Twitter)", brand: "x", handle: "@EmpiricalShiksha", url: "" },
  { name: "LinkedIn", brand: "linkedin", handle: "Empirical Shiksha Abhiyan", url: "" },
  { name: "WhatsApp", brand: "whatsapp", handle: "Chat with us", url: `https://wa.me/91${PHONE}` },
];

const FOUNDERS = [
  { name: "Rahul Geete", img: "images/rahul.webp", text: "A social educator and community builder passionate about creating equal learning opportunities for every child." },
  { name: "Jayram Malakar", img: "images/jay.webp", text: "An educator and mentor dedicated to student development, mental well-being, and social awareness through education." },
];

function Field({ icon, children, className = "" }: { icon: ReactNode; children: ReactNode; className?: string }) {
  return (
    <label className={`c-field ${className}`}>
      <span className="c-field-ico">{icon}</span>
      {children}
    </label>
  );
}

export default function Contact() {
  const [sent, setSent] = useState(false);

  const info = [
    { icon: <Phone size={22} />, tint: "#FDE7EF", fg: "#D6246E", label: <Bi en="Phone" hi="फ़ोन" />, value: `+91 ${PHONE}`, href: `tel:${PHONE}` },
    { icon: <Mail size={22} />, tint: "#FFEBD2", fg: "#E8730C", label: <Bi en="Email" hi="ईमेल" />, value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: <MapPin size={22} />, tint: "#FFF0D2", fg: "#E8730C", label: <Bi en="Address" hi="पता" />, value: <Bi en="Khandwa, Madhya Pradesh, India" hi="खंडवा, मध्य प्रदेश, भारत" />, href: "" },
    { icon: <Clock size={22} />, tint: "#E6EAFB", fg: "#3A4FD0", label: <Bi en="Working Hours" hi="कार्य समय" />, value: <Bi en="Mon – Sat, 10:00 AM – 6:00 PM" hi="सोम – शनि, सुबह 10:00 – शाम 6:00" />, href: "" },
  ];

  return (
    <div className="contact-page">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden pb-6 pt-8 md:pt-10">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#DDF2D8]/70 blur-3xl" />
          <div className="absolute -right-16 top-0 h-80 w-80 rounded-full bg-[#FFE9B8]/60 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-5">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-10">
            <div className="relative">
              <div className="flex items-center gap-2 text-[15px] font-extrabold text-[#E8730C]">
                Contact Us
              </div>
              <h1 className="mt-3 font-display text-[40px] font-extrabold leading-[1.05] tracking-tight text-[#14213D] sm:text-[52px] lg:text-[60px]">
                Get in Touch<br />
                <span className="relative inline-block text-[#17773A]">With Us
                  
                </span>
              </h1>
              <p className="mt-6 max-w-md text-[17px] leading-relaxed text-[#25324F]">
                <Bi en="Have a question, idea, or want to collaborate? We’d love to hear from you." hi="कोई सवाल, विचार या साथ काम करना चाहते हैं? हमें आपसे सुनकर खुशी होगी।" />
              </p>
              <ul className="mt-5 space-y-2.5">
                {["Collaboration & Partnership", "Volunteer Opportunities", "Program & Initiative Information"].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[16px] font-semibold text-[#14213D]">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#17773A] text-white"><Check size={15} strokeWidth={3} /></span>{t}
                  </li>
                ))}
              </ul>
            </div>

            {/* photo in a flowing shape with a green rim (all inside one SVG) */}
            <div className="relative mx-auto w-full max-w-[640px] lg:max-w-none">
              <svg viewBox="0 0 660 400" className="block h-auto w-full" role="img" aria-label="Our volunteers">
                <defs>
                  <clipPath id="contact-photo-clip"><path d="M95 390 C25 306 12 200 108 116 C191 48 332 21 460 29 C556 37 620 14 652 63 L652 390 Z" /></clipPath>
                </defs>
                <path d="M83 400 C13 316 0 210 96 126 C179 58 320 31 448 39 C544 47 608 24 640 73 L640 400 Z" fill="#17773A" />
                <image href="images/real-group.webp" x="0" y="0" width="660" height="400" preserveAspectRatio="xMidYMid slice" clipPath="url(#contact-photo-clip)" />
              </svg>
              <svg viewBox="0 0 120 70" className="pointer-events-none absolute -top-6 left-0 hidden w-28 text-[#17773A] sm:block lg:-left-6" aria-hidden>
                <path d="M6 62C18 30 44 52 56 28" stroke="currentColor" strokeWidth="2" strokeDasharray="4 5" fill="none" strokeLinecap="round" />
                <path d="M60 6 L112 20 L72 30 L64 48 L58 30 Z" fill="#fff" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
              </svg>
              <div className="pointer-events-none absolute -right-1 top-1 hidden gap-1 sm:flex" aria-hidden>
                <span className="h-9 w-2.5 rotate-[20deg] rounded-full bg-[#F5B72E]" /><span className="mt-2 h-7 w-2.5 rotate-[50deg] rounded-full bg-[#F5B72E]" />
              </div>
            </div>
          </div>

          {/* 4 info cards, overlapping the photo's lower edge on desktop */}
          <div className="relative z-10 mt-6 grid grid-cols-1 gap-3 min-[460px]:grid-cols-2 lg:-mt-12 lg:ml-auto lg:w-[64%] lg:grid-cols-4">
            {info.map((c, i) => {
              const inner = (
                <div className="c-card h-full p-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full" style={{ background: c.tint, color: c.fg }}>{c.icon}</span>
                  <div className="mt-3 text-[14px] font-extrabold text-[#14213D]">{c.label}</div>
                  <div className="mt-1 break-words text-[13px] font-medium leading-snug text-[#3B4763] [overflow-wrap:anywhere]">{c.value}</div>
                </div>
              );
              return c.href ? <a key={i} href={c.href} className="block min-w-0">{inner}</a> : <div key={i} className="min-w-0">{inner}</div>;
            })}
          </div>
        </div>
      </section>

      {/* ============ FOUNDERS + MISSION ============ */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-5 md:py-10">
        <div className="mb-6 flex items-center justify-center gap-4">
          
          <h2 className="font-display text-[26px] font-extrabold text-[#14213D] sm:text-[30px]"><Bi en="Our Founders" hi="हमारे संस्थापक" /></h2>
          
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.05fr]">
          {FOUNDERS.map((f) => (
            <div key={f.name} className="c-card flex items-start gap-4 p-4 sm:p-5">
              <div className="c-photo aspect-[4/5] w-[104px] shrink-0 overflow-hidden bg-[#EAF3E3] sm:w-[120px]">
                <img src={f.img} alt={f.name} className="h-full w-full object-cover object-top" loading="lazy" />
              </div>
              <div className="min-w-0">
                <div className="font-display text-[22px] font-extrabold leading-tight text-[#14213D]">{f.name}</div>
                <span className="mt-1.5 inline-block rounded-full bg-[#F5A524] px-3 py-0.5 text-[12px] font-extrabold text-white">Co-Founder</span>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[#3B4763]">{f.text}</p>
                <div className="mt-3 flex gap-2" aria-hidden>
                  {(["linkedin", "youtube", "instagram", "x", "facebook"] as BrandName[]).map((n) => <BrandIcon key={n} name={n} size={30} />)}
                </div>
              </div>
            </div>
          ))}

          <div className="c-mission relative overflow-hidden p-5 sm:p-6 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 text-[#17773A]">
              <Target size={34} /><h3 className="font-display text-[26px] font-extrabold text-[#17603A]">Our Mission</h3>
            </div>
            <p className="relative mt-3 max-w-[260px] text-[16px] leading-relaxed text-[#25324F]">
              <Bi en="To empower underprivileged children through quality education, better health, a cleaner environment, and holistic mental well-being." hi="वंचित बच्चों को गुणवत्तापूर्ण शिक्षा, बेहतर स्वास्थ्य, स्वच्छ पर्यावरण और मानसिक कल्याण के माध्यम से सशक्त बनाना।" />
            </p>
            <Sprout className="absolute -bottom-2 right-3 text-[#2E9E45]/80" size={96} strokeWidth={1.4} aria-hidden />
          </div>
        </div>
      </section>

      {/* ============ SOCIAL STRIP ============ */}
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-5">
        <div className="c-card flex flex-col gap-4 p-4 lg:flex-row lg:items-center">
          <div className="flex items-center gap-4 lg:w-[38%]">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#FFF0D2] text-[#E8730C]"><Megaphone size={30} /></span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 font-display text-[19px] font-extrabold leading-tight text-[#14213D]">Empirical Shiksha Abhiyan – Official <BadgeCheck size={20} className="text-[#1877F2]" /></div>
              <p className="mt-1 text-[13px] leading-snug text-[#3B4763]">Follow us on our official social media channels for updates, impact stories, upcoming drives, and ways to get involved.</p>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-2.5 min-[520px]:grid-cols-3 lg:grid-cols-6">
            {SOCIALS.filter((s) => s.url).map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="c-tile flex min-w-0 flex-col items-center px-2 py-3 text-center">
                <BrandIcon name={s.brand} size={40} />
                <span className="mt-1 text-[13px] font-extrabold text-[#14213D]">{s.name}</span>
                <span className="w-full truncate text-[10.5px] font-medium text-[#5B6784]">{s.handle}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FORM + LOCATION ============ */}
      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5">
        <div className="grid gap-5 lg:grid-cols-12">
          <div className="c-card p-5 sm:p-7 lg:col-span-7">
            {sent ? (
              <div className="py-16 text-center">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#DDF2D8] text-[#17773A]"><Check size={34} strokeWidth={3} /></span>
                <h3 className="mt-4 font-display text-2xl font-extrabold text-[#14213D]">Message sent</h3>
                <p className="mt-2 text-[#3B4763]">Thank you for reaching out. We’ll reply soon.</p>
                <button type="button" onClick={() => setSent(false)} className="mt-5 font-bold text-[#E8730C]">Send another →</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#17773A]"><Send size={28} /></span>
                  <h2 className="font-display text-[26px] font-extrabold text-[#14213D]">Send Us a Message</h2>
                </div>
                <p className="mt-1 text-[14px] text-[#3B4763]">Share your idea, query, or collaboration proposal with our team.</p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Field icon={<User size={18} />}><input required name="name" placeholder="Your Name *" className="c-input" autoComplete="name" /></Field>
                  <Field icon={<Users size={18} />} className="c-select">
                    <select required name="role" defaultValue="" className="c-input">
                      <option value="" disabled>Your Role *</option>
                      <option>Student</option><option>Parent</option><option>Volunteer</option><option>Teacher</option><option>Other</option>
                    </select>
                    <ChevronDown size={18} className="c-chev" />
                  </Field>
                  <Field icon={<Smartphone size={18} />}><input required name="mobile" type="tel" inputMode="tel" placeholder="Mobile Number *" className="c-input" autoComplete="tel" /></Field>
                  <Field icon={<Mail size={18} />}><input required name="email" type="email" placeholder="Email Address *" className="c-input" autoComplete="email" /></Field>
                  <Field icon={<PencilLine size={18} />} className="c-area sm:col-span-2"><textarea required name="message" rows={4} placeholder="Your Message *" className="c-input c-textarea" /></Field>
                </div>
                <div className="mt-4 flex justify-end">
                  <button type="submit" className="c-btn-orange inline-flex items-center justify-center gap-2 px-8 text-[15px] font-extrabold text-white max-sm:w-full">Send Message <Send size={16} /></button>
                </div>
              </form>
            )}
          </div>

          <div className="c-card flex flex-col overflow-hidden lg:col-span-5">
            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-2 text-[#E8730C]"><MapPin size={24} /><h2 className="font-display text-[22px] font-extrabold text-[#14213D]">Our Location</h2></div>
              <div className="mt-3 font-display text-[19px] font-extrabold text-[#14213D]">Empirical Shiksha Abhiyan</div>
              <div className="mt-1.5 flex items-start gap-2 text-[14px] leading-snug text-[#3B4763]">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#E8730C]" />Arya Mahila Samaj Bhawan, Ramganj Ward, Khandwa, Madhya Pradesh 450001
              </div>
              <a href="https://www.google.com/maps?q=Empirical+Institute,+Arya+Mahila+Samaj+Bhawan,+Wamanrao+Deo+Marg,+Ramganj+Ward,+Khandwa,+Madhya+Pradesh+450001" target="_blank" rel="noopener noreferrer"
                className="c-chip mt-4 inline-flex items-center gap-2 px-4 text-[13.5px] font-extrabold text-[#17603A]">View on Google Maps <ExternalLink size={14} /></a>
            </div>
            <div className="relative min-h-[240px] flex-1">
              <iframe title="Empirical Institute, Khandwa" className="absolute inset-0 h-full w-full" loading="lazy"
                src="https://maps.google.com/maps?q=Empirical+Institute,+Arya+Mahila+Samaj+Bhawan,+Khandwa,+Madhya+Pradesh+450001&z=16&output=embed" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ JOIN THE MOVEMENT ============ */}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-5">
        <div className="c-join flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:gap-6">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[#E4F3DC] text-[#17773A]"><Users size={34} /></span>
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-[26px] font-extrabold leading-tight text-white sm:text-[30px]">Join the Movement</h2>
            <p className="mt-1.5 max-w-xl text-[14.5px] leading-relaxed text-white/80">Be a part of Empirical Shiksha Abhiyan and help us create better learning, healthier minds, and cleaner communities for every child.</p>
          </div>
          <div className="hidden gap-3 xl:flex">
            {[[<GraduationCap key="g" size={22} />, "Volunteer", "with Us"], [<Handshake key="h" size={22} />, "Partner", "with Us"], [<Heart key="e" size={22} />, "Support", "Our Initiatives"]].map(([ic, a, b], k) => (
              <div key={k} className="flex items-center gap-2.5 rounded-xl bg-white/10 px-3 py-2 text-white"><span className="text-[#F5C451]">{ic}</span><span className="text-[13px] font-bold leading-tight">{a}<br /><span className="font-medium text-white/80">{b}</span></span></div>
            ))}
          </div>
          <a href={`https://wa.me/91${PHONE}`} target="_blank" rel="noopener noreferrer" className="c-btn-white inline-flex shrink-0 items-center justify-center gap-2 px-7 text-[15px] font-extrabold text-[#14213D]">Become a Volunteer →</a>
        </div>
      </section>
    </div>
  );
}
