import { useEffect, useState } from "react";
import { AREAS, type Page } from "./shared";
import { AIcon, AREA_ICON } from "./icons";

export default function SubNav({ page, onPick, scrolled = true }: { page: Page; onPick: (key: string) => void; scrolled?: boolean }) {
  const [active, setActive] = useState("");
  useEffect(() => {
    if (page !== "initiatives") { setActive(""); return; }
    const on = () => {
      let cur = "";
      for (const a of AREAS) {
        const el = document.getElementById(a.key);
        if (el && el.getBoundingClientRect().top <= 220) cur = a.key;
      }
      setActive(cur);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [page]);

  return (
    <div className={`sticky top-[84px] z-40 px-3 sm:px-5 pb-2 pt-1 transition-colors duration-300 ${scrolled ? `backdrop-blur-md ${page === "home" ? "bg-[#f6f1ec]/70" : "bg-paper/85"}` : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto flex justify-center">
        <nav aria-label="Our focus areas" className="no-scrollbar max-w-full overflow-x-auto rounded-full bg-white shadow-[0_10px_28px_-12px_rgba(31,95,209,0.4)] ring-1 ring-[#e3ebf7] p-1.5 flex gap-1">
          {AREAS.map((a) => {
            const on = active === a.key;
            return (
              <button key={a.key} onClick={() => { setActive(a.key); onPick(a.key); }}
                className={`press shrink-0 inline-flex items-center gap-2 px-4 sm:px-5 h-11 rounded-full text-[14px] font-bold whitespace-nowrap transition-all duration-300 ${on ? "bg-gradient-to-r from-[#2563eb] to-[#4338ca] text-white shadow-lg shadow-blue-300/50" : "text-[#1c2b4a] hover:bg-[#eef3fd]"}`}>
                <span className={on ? "text-white" : "text-[#1f5fd1]"}><AIcon n={AREA_ICON[a.key]} s={18} /></span>
                {a.name}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
