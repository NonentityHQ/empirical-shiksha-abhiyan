import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AREAS, type Page } from "./shared";
import { Bi } from "./lang";
import { AIcon, AREA_ICON } from "./icons";

export default function SubNav({ page, onPick, activeKey = "", navVisible = true, hidden = false }: { page: Page; onPick: (key: string) => void; activeKey?: string; navVisible?: boolean; hidden?: boolean }) {
  const [active, setActive] = useState(activeKey);
  const navRef = useRef<HTMLElement>(null);
  // Publish where the floating bars end (--stack-h) so every hero starts BELOW them and no text is hidden.
  useLayoutEffect(() => {
    const set = () => {
      const h = navRef.current?.offsetHeight ?? 60;
      document.documentElement.style.setProperty("--stack-h", `${78 + 8 + h + 8}px`);
    };
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);
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
      className={`fixed inset-x-0 z-[60] px-3 sm:px-5 pt-2 pointer-events-none transition-[top,opacity,transform] duration-300 ${hidden ? "invisible opacity-0 -translate-y-4" : ""} ${page === "initiatives" || page === "initiative-detail" ? "" : "max-md:hidden"}`}
    >
      <div className="max-w-7xl mx-auto flex justify-center">
        <nav ref={navRef} aria-label="Our focus areas" className="pointer-events-auto no-scrollbar max-w-full overflow-x-auto sub-print bg-[#FFFDF7] p-1.5 flex gap-1">
          {AREAS.map((a) => {
            const on = active === a.key;
            return (
              <button key={a.key} onClick={() => { setActive(a.key); onPick(a.key); }}
                className={`press shrink-0 inline-flex items-center gap-2 px-4 sm:px-5 h-11 rounded-lg text-[14px] font-bold whitespace-nowrap transition-all duration-300 ${on ? "bg-[#2B459E] text-white" : "text-[#1F2A44] hover:bg-[#FBF3E4]"}`}>
                <span className={on ? "text-white" : "text-[#2B459E]"}><AIcon n={AREA_ICON[a.key]} s={18} /></span>
                <Bi en={a.en} hi={a.hi} />
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
