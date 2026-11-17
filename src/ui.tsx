import { useEffect, useRef, useState } from "react";

/* Counts up "80+", "1,000+", "95%" when scrolled into view; other text is shown as is. */
export function CountUp({ value }: { value: string }) {
  const m = value.match(/^(\d[\d,]*)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const target = m ? parseInt(m[1].replace(/,/g, ""), 10) : 0;
  const [n, setN] = useState(m ? 0 : target);
  useEffect(() => {
    if (!m) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(target); return; }
    const el = ref.current; if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), dur = 1300;
      const step = (t: number) => { const k = Math.min(1, (t - t0) / dur); setN(Math.round(target * (1 - Math.pow(1 - k, 3)))); if (k < 1) raf = requestAnimationFrame(step); };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!m) return <>{value}</>;
  return <span ref={ref} className="notranslate tabular-nums" translate="no">{(m[1].includes(",") ? n.toLocaleString("en-IN") : String(n))}{m[2]}</span>;
}
