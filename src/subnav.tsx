import { useEffect, useState } from "react";
import { AREAS, type Page } from "./shared";
import { AIcon, AREA_ICON } from "./icons";

export default function SubNav({ page, onPick, activeKey = "", navVisible = true }: { page: Page; onPick: (key: string) => void; activeKey?: string; navVisible?: boolean }) {
  const [active, setActive] = useState(activeKey);
  useEffect(() => {
    if (page === "initiative-detail") { setActive(activeKey); return; }
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
  }, [page, activeKey]);

  return (
    <div
      style={{ top: navVisible ? 78 : 0 }}
      className="fixed inset-x-0 z-[60] px-3 sm:px-5 pt-2 pointer-events-none transition-[top] duration-300"
    >
      <div className="max-w-7xl mx-auto flex justify-center">
        <nav aria-label="Our focus areas" className="pointer-events-auto no-scrollbar max-w-full overflow-x-auto rounded-full bg-white shadow-[0_8px_22px_-13px_rgba(31,95,209,0.38)] ring-1 ring-[#e3ebf7] p-1.5 flex gap-1">
          {AREAS.map((a) => {
            const on = active === a.key;
            return (
              <button key={a.key} onClick={() => { setActive(a.key); onPick(a.key); }}
                className={`press shrink-0 inline-flex items-center gap-2 px-4 sm:px-5 h-11 rounded-full text-[14px] font-bold whitespace-nowrap transition-all duration-300 ${on ? "bg-[#087fb5] text-white shadow-md shadow-sky-200/60" : "text-[#1c2b4a] hover:bg-[#eef3fd]"}`}>
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
