import { useEffect } from "react";

/* Site-wide motion: scroll-reveal, 3D tilt on cards, mouse parallax, lazy images. */
const REVEAL = "main article, main figure, main section h2, main ol > li, main .flip-scene, main [data-reveal-me]";
const TILT = "main article, main figure, main [data-tilt-me]";

export function useMotion(key: string) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    // ---- lazy-load + async decode for images that are below the fold
    const tuneImages = () => {
      document.querySelectorAll<HTMLImageElement>("main img:not([data-img-ok])").forEach((img) => {
        img.dataset.imgOk = "1";
        img.decoding = "async";
        if (!img.hasAttribute("loading") && img.getBoundingClientRect().top > window.innerHeight * 1.1) img.loading = "lazy";
      });
    };

    let io: IntersectionObserver | null = null;
    let mo: MutationObserver | null = null;
    let raf = 0;
    let t0 = 0;

    if (!reduce) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add("is-in"); io!.unobserve(e.target); } });
      }, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" });

      const tag = () => {
        document.querySelectorAll<HTMLElement>(REVEAL).forEach((el) => {
          if (el.dataset.motion) return;
          if (el.closest("[data-no-motion], .flip-card")) return;
          if (el.parentElement?.closest("[data-motion]")) return; // no nested reveals
          el.dataset.motion = "1";
          el.setAttribute("data-reveal", "");
          if (fine && el.matches(TILT) && !el.closest("[data-no-tilt]")) el.setAttribute("data-tilt", "");
          const sibs = el.parentElement ? Array.from(el.parentElement.children) : [];
          el.style.setProperty("--d", Math.min(Math.max(sibs.indexOf(el), 0), 8) * 80 + "ms");
          io!.observe(el);
        });
        tuneImages();
      };
      const schedule = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(tag); };
      t0 = window.setTimeout(tag, 30);
      mo = new MutationObserver(schedule);
      mo.observe(document.querySelector("main") ?? document.body, { childList: true, subtree: true });
    } else tuneImages();

    // ---- 3D tilt + parallax from pointer
    let cur: HTMLElement | null = null;
    let par: HTMLElement | null = null;
    const reset = (el: HTMLElement | null) => { if (el) { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); } };
    const onMove = (ev: PointerEvent) => {
      if (reduce || ev.pointerType === "touch") return;
      const t = ev.target as HTMLElement | null;
      const tilt = t?.closest?.("[data-tilt].is-in") as HTMLElement | null;
      if (cur && cur !== tilt) reset(cur);
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const max = parseFloat(tilt.dataset.tiltMax || "6");
        const px = (ev.clientX - r.left) / r.width - 0.5;
        const py = (ev.clientY - r.top) / r.height - 0.5;
        tilt.style.setProperty("--ry", (px * max * 2).toFixed(2) + "deg");
        tilt.style.setProperty("--rx", (-py * max * 2).toFixed(2) + "deg");
      }
      cur = tilt;
      const p = t?.closest?.("[data-parallax]") as HTMLElement | null;
      if (par && par !== p) { par.style.setProperty("--mx", "0"); par.style.setProperty("--my", "0"); }
      if (p) {
        const r = p.getBoundingClientRect();
        p.style.setProperty("--mx", String(((ev.clientX - r.left) / r.width - 0.5) * 2));
        p.style.setProperty("--my", String(((ev.clientY - r.top) / r.height - 0.5) * 2));
      }
      par = p;
    };
    const onLeave = () => { reset(cur); cur = null; if (par) { par.style.setProperty("--mx", "0"); par.style.setProperty("--my", "0"); par = null; } };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    // ---- scroll progress bar + scroll-linked parallax (rAF-throttled)
    let bar = document.querySelector<HTMLElement>(".scroll-progress");
    if (!bar) { bar = document.createElement("div"); bar.className = "scroll-progress"; bar.setAttribute("aria-hidden", "true"); document.body.appendChild(bar); }
    let ticking = false;
    const frame = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar!.style.setProperty("--sp", max > 0 ? String(Math.min(1, window.scrollY / max)) : "0");
      if (reduce) return;
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>("main [data-scroll-y], main [data-scroll-rot]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const p = (r.top + r.height / 2 - vh / 2) / vh; // -1 .. 1 around viewport centre
        const k = parseFloat(el.dataset.scrollY || "0");
        if (k) el.style.setProperty("--sy", (p * k * -1).toFixed(1));
        const rk = parseFloat(el.dataset.scrollRot || "0");
        if (rk) el.style.setProperty("--sr", (p * rk).toFixed(2));
      });
    };
    const onScrollMotion = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
    window.addEventListener("scroll", onScrollMotion, { passive: true });
    window.addEventListener("resize", onScrollMotion);
    // auto-attach depth to hero collage photos and floating decor so every page gets scroll parallax
    const tagParallax = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>("main section:first-of-type img[class*=\"absolute\"], main .float-slow, main .float-med").forEach((el, i) => {
        if (el.dataset.scrollY) return;
        el.dataset.scrollY = String(24 + (i % 4) * 14);
        if (i % 2) el.dataset.scrollRot = "3";
      });
      frame();
    }, 120);
    frame();

    return () => {
      window.removeEventListener("scroll", onScrollMotion);
      window.removeEventListener("resize", onScrollMotion);
      window.clearTimeout(tagParallax);
      io?.disconnect(); mo?.disconnect(); cancelAnimationFrame(raf); window.clearTimeout(t0);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [key]);
}
