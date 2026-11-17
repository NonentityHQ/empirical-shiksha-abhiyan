import { Bi } from "../lang";
import { Logo, Socials, PHONE, EMAIL, type Page } from "../shared";
import { AIcon } from "../icons";

const GREEN_KEYS = ["swachhata", "paryavaran"];

export default function InitFooter({ go, variant }: { go: (p: Page) => void; variant: string }) {
  const green = GREEN_KEYS.includes(variant);
  const bg = green ? "#17605C" : "#1F2A44";
  const wave = green ? "#3A7D44" : "#EE9B13";
  const mission = ["Volunteer", variant === "shiksha" ? "Support Education" : variant === "paryavaran" ? "Support Environment" : "Support Cleanliness", "Partner With Us"];
  const links: [string, Page][] = [["Home", "home"], ["About Us", "about"], ["Initiatives", "initiatives"], ["Impact", "impact"], ["Gallery", "gallery"], ["Success Stories", "success"], ["Contact Us", "contact"]];
  const head = "font-display text-[17px] font-extrabold text-[#F4B93E]";
  return (
    <footer className="relative mt-4 overflow-hidden text-white" style={{ background: bg }}>
      <div className="mx-auto grid max-w-[1320px] gap-8 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[1.25fr_1fr_1.45fr_1fr] lg:gap-0 lg:px-[4.5%]">
        <div className="lg:pr-8">
          <Logo size={78} light />
          <Socials className="mt-5" />
        </div>
        <div className="lg:border-l lg:border-white/15 lg:px-8">
          <h4 className={head}>Quick Links</h4>
          <ul className="mt-3 space-y-1.5 text-[14px] text-white/90">
            {links.map(([l, pg]) => <li key={l}><button onClick={() => go(pg)} className="inline-flex items-center gap-1.5 hover:text-[#F4B93E]">{l} <span className="text-[#F4B93E]">→</span></button></li>)}
          </ul>
        </div>
        <div className="lg:border-l lg:border-white/15 lg:px-8">
          <h4 className={head}>Contact</h4>
          <ul className="mt-3 space-y-3 text-[14px] text-white/90">
            <li className="flex items-center gap-2.5"><span className="text-[#F4B93E]"><AIcon n="phone" s={18} /></span>+91 {PHONE}</li>
            <li className="flex items-center gap-2.5"><span className="text-[#F4B93E]"><AIcon n="mail" s={18} /></span>{EMAIL}</li>
            <li className="flex items-start gap-2.5"><span className="mt-0.5 text-[#F4B93E]"><AIcon n="pin" s={18} /></span>Khandwa, Madhya Pradesh,<br />India</li>
          </ul>
        </div>
        <div className="lg:border-l lg:border-white/15 lg:pl-8">
          <h4 className={head}>Join Our Mission</h4>
          <ul className="mt-3 space-y-1.5 text-[14px] text-white/90">
            {mission.map((m) => <li key={m}><button onClick={() => go("contact")} className="inline-flex items-center gap-1.5 hover:text-[#F4B93E]">{m} <span className="text-[#F4B93E]">→</span></button></li>)}
          </ul>
        </div>
      </div>
      <svg className="pointer-events-none absolute inset-x-0 bottom-[46px] h-16 w-full" viewBox="0 0 1440 64" preserveAspectRatio="none" aria-hidden>
        <path d="M0 40C220 8 380 58 640 34S1040 4 1440 30" fill="none" stroke={wave} strokeWidth="4" vectorEffect="non-scaling-stroke" />
        <path d="M0 52C240 24 400 64 660 46S1060 18 1440 44" fill="none" stroke={wave} strokeOpacity=".35" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      {variant === "shiksha" && <svg viewBox="0 0 90 60" className="pointer-events-none absolute bottom-14 right-[6%] hidden w-28 -rotate-6 opacity-70 lg:block" fill="none" stroke="#2B459E" strokeWidth="1.8" aria-hidden><path d="M45 12C36 4 18 4 6 10v38c12-6 30-6 39 2 9-8 27-8 39-2V10c-12-6-30-6-39 2zM45 12v38" /></svg>}
      <div className="relative mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-2 px-5 pb-5 pt-1 text-[13px] text-white/90 sm:flex-row sm:px-8 lg:px-[4.5%]">
        <span className="inline-flex items-center gap-4 font-semibold">Empirical Shiksha Abhiyan <span className="h-4 w-px bg-white/40" /> <span className="text-[#F4B93E]"><Bi en="Shiksha Se Seva" hi="शिक्षा से सेवा" /></span></span>
        <span>© 2026 Empirical Shiksha Abhiyan. All rights reserved.</span>
      </div>
    </footer>
  );
}
