import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });

/* Mood of the film: the page background itself shifts between tones as scenes
   come in, so there are no hard seams between "sections". */
const TONES: Record<string, { bg: string; fg: string }> = {
  night: { bg: "#1f130d", fg: "#FBF3E4" },
  paper: { bg: "#FBF3E4", fg: "#1F2A44" },
  blue: { bg: "#16224a", fg: "#EAF0FF" },
};

type Scene = HTMLElement;
const W = ".w>span"; // inner span of every revealed word

/** Scrubbed timeline. `pinned` scenes use a CSS-sticky stage; others scrub while passing through. */
const mk = (scene: Scene, pinned: boolean) =>
  gsap.timeline({
    defaults: { ease: "power2.out" },
    scrollTrigger: pinned
      ? { trigger: scene, start: "top top", end: "bottom bottom", scrub: 0.35 }
      : { trigger: scene, start: "top 70%", end: "bottom 55%", scrub: 0.3 },
  });

const pad = (tl: gsap.core.Timeline, to: number) => tl.to({}, { duration: 0.01 }, to - 0.01);

const wordsIn = (tl: gsap.core.Timeline, els: Element[], at: number, dur = 0.9, stagger = 0.1) =>
  tl.fromTo(els, { yPercent: 115, opacity: 0 }, { yPercent: 0, opacity: 1, duration: dur, stagger }, at);

/* ---------- generic flow behaviour (mobile, and scenes that are not pinned) ---------- */
function flow(scene: Scene) {
  const once = (trigger: Element, start = "top 90%") => ({ trigger, start, once: true });
  scene.querySelectorAll<HTMLElement>("[data-k]").forEach((el) =>
    gsap.from(el, { opacity: 0, y: 36, duration: 0.85, ease: "power2.out", scrollTrigger: once(el) }),
  );
  scene.querySelectorAll<SVGElement>(".draw").forEach((p) =>
    gsap.fromTo(p, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: "power1.inOut", scrollTrigger: once(p) }),
  );
  scene.querySelectorAll<HTMLElement>("[data-words]").forEach((el) => {
    gsap.fromTo(el.querySelectorAll(W), { opacity: 0, yPercent: 60 }, { opacity: 1, yPercent: 0, stagger: 0.05, duration: 0.7, ease: "power2.out", scrollTrigger: once(el, "top 88%") });
  });
  // founders slide in from their own side (Rahul from the left, Jayram from the right)
  scene.querySelectorAll<HTMLElement>("[data-slide]").forEach((el) => {
    const dir = el.dataset.slide === "l" ? -1 : 1;
    gsap.from(el, { xPercent: dir * 55, opacity: 0, duration: 1.2, ease: "power3.out", scrollTrigger: once(el, "top 90%") });
  });
  scene.querySelectorAll<HTMLElement>("[data-speed]").forEach((el) => {
    const s = parseFloat(el.dataset.speed || "8");
    gsap.fromTo(el, { yPercent: -s }, { yPercent: s, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } });
  });
  scene.querySelectorAll<HTMLElement>("[data-line]").forEach((el) =>
    gsap.fromTo(el, { scaleY: 0 }, { scaleY: 1, transformOrigin: "top", duration: 1.8, ease: "power1.inOut", scrollTrigger: once(el.parentElement ?? el, "top 70%") }),
  );
}

/* ---------- pinned / choreographed scenes ---------- */
type Builder = (scene: Scene, q: (s: string) => Element[], pinned: boolean) => void;

const opening: Builder = (scene, q, pinned) => {
  // time-based first beat so the screen is never empty at scroll 0
  gsap.fromTo(q(".q " + W), { yPercent: 115, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.5, stagger: 0.16, delay: 0.5, ease: "power3.out" });
  gsap.from(q(".cue"), { opacity: 0, duration: 1.2, delay: 3.2 });
  const tl = mk(scene, pinned);
  tl.fromTo(q("[data-k=bg] img"), { scale: 1.18, xPercent: 2 }, { scale: 1.04, xPercent: -2, ease: "none", duration: 10 }, 0)
    .to(q("[data-k=warm]"), { opacity: 1, ease: "none", duration: 6 }, 3)
    .to(q(".cue"), { opacity: 0, duration: 0.5 }, 0.4)
    .to(q(".q"), { opacity: 0, yPercent: -12, scale: 0.97, duration: 1.6 }, 2.6);
  wordsIn(tl, q(".a " + W), 4.4, 1.1, 0.25);
  tl.to(q(".a"), { yPercent: -6, ease: "none", duration: 3 }, 6.5);
  pad(tl, 10);
};

const people: Builder = (scene, q) => {
  const tl = mk(scene, true);
  tl.fromTo(q(".pe-q " + W), { opacity: 0.1, yPercent: 30 }, { opacity: 1, yPercent: 0, stagger: 0.18, duration: 0.8 }, 0.2)
    .fromTo(q(".pe-halo"), { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 3, ease: "none" }, 0.5)
    .to(q(".pe-q"), { yPercent: -60, opacity: 0.0, duration: 1.4 }, 3.4)
    .fromTo(q(".pe-r"), { xPercent: -30, opacity: 0, scale: 1.12 }, { xPercent: 0, opacity: 1, scale: 1, duration: 1.6 }, 2.6)
    .fromTo(q(".pe-ghost-r"), { xPercent: -25, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 2, ease: "none" }, 2.6)
    .fromTo(q(".pe-cap-r"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, 3.8)
    .fromTo(q(".pe-j"), { xPercent: 30, opacity: 0, scale: 1.12 }, { xPercent: 0, opacity: 1, scale: 1, duration: 1.6 }, 5)
    .fromTo(q(".pe-ghost-j"), { xPercent: 25, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 2, ease: "none" }, 5)
    .fromTo(q(".pe-cap-j"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, 6.2);
  wordsIn(tl, q(".pe-tag " + W), 7.2, 0.9, 0.14);
  tl.to(q(".pe-r"), { xPercent: -3, ease: "none", duration: 3 }, 7).to(q(".pe-j"), { xPercent: 3, ease: "none", duration: 3 }, 7);
  pad(tl, 10);
};

/* Shared opening of both founder pages: portrait, sticker, headline, cards and lists assemble. */
const founderIntro = (tl: gsap.core.Timeline, q: (s: string) => Element[], fromX: number) => {
  const T = (sel: string, from: gsap.TweenVars, to: gsap.TweenVars, at: number) => { const e = q(sel); if (e.length) tl.fromTo(e, from, to, at); };
  T(".fd-portrait", { xPercent: fromX, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 1.4 }, 0);
  T(".fd-halo", { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6, ease: "none" }, 0);
  T(".fd-stick", { opacity: 0, y: -34 }, { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.6)" }, 0.5);
  T(".fd-name", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 1.2);
  wordsIn(tl, q(".fd-h " + W), 1, 0.7, 0.05);
  T(".fd-intro", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, 2.4);
  T(".fd-decor", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 2.4);
  T(".fd-decor .draw", { strokeDashoffset: 1 }, { strokeDashoffset: 0, stagger: 0.2, duration: 1.2, ease: "none" }, 2.4);
  T(".fd-decor .book", { opacity: 0, y: 24 }, { opacity: 1, y: 0, stagger: 0.25, duration: 0.6 }, 2.6);
  T(".fd-note", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 3.2);
  T(".fd-stat", { opacity: 0, y: 30, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, stagger: 0.35, duration: 0.7 }, 3.4);
  T(".fd-cta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 4.4);
  T(".fd-panel", { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.5, duration: 0.8 }, 4.8);
  T(".fd-panel .fd-item", { opacity: 0, x: -12 }, { opacity: 1, x: 0, stagger: 0.07, duration: 0.4 }, 5.2);
  T(".fd-card", { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.45, duration: 0.7 }, 6.4);
  T(".fd-bottom", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 8);
};

const rahul: Builder = (scene, q) => {
  const tl = mk(scene, true);
  founderIntro(tl, q, -18);
  tl.to(q(".fd-main"), { opacity: 0, y: -30, duration: 1 }, 10.5)
    .to(q(".fd-portrait, .fd-stick"), { xPercent: -25, opacity: 0, duration: 1 }, 10.5)
    .fromTo(q(".ph-reveal"), { opacity: 0, yPercent: 6 }, { opacity: 1, yPercent: 0, duration: 1.4, ease: "power2.inOut" }, 10.6)
    .fromTo(q(".ph-reveal .ph-a"), { scale: 1.35 }, { scale: 1.02, duration: 5, ease: "none" }, 10.6)
    .fromTo(q(".ph-reveal .ph-b"), { opacity: 0, scale: 1.2 }, { opacity: 1, scale: 1, duration: 1.4, ease: "none" }, 15.2);
  wordsIn(tl, q(".ph-l1 " + W), 11.4, 0.9, 0.045);
  tl.to(q(".ph-l1"), { opacity: 0, y: -24, duration: 0.6 }, 15.2);
  wordsIn(tl, q(".ph-l2 " + W), 15.9, 0.9, 0.05);
  pad(tl, 19.4);
};

const jayram: Builder = (scene, q) => {
  const tl = mk(scene, true);
  founderIntro(tl, q, 18);
  tl.to(q(".fd-main"), { opacity: 0, y: -30, duration: 1 }, 10.5)
    .to(q(".fd-portrait, .fd-stick"), { xPercent: 25, opacity: 0, duration: 1 }, 10.5)
    .fromTo(q(".j-strip-wrap"), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 10.8);
  const strip = q(".j-strip")[0] as HTMLElement;
  tl.fromTo(strip, { x: () => window.innerWidth * 0.12 }, { x: () => -(strip.scrollWidth - window.innerWidth * 0.88), ease: "none", duration: 4 }, 11.2);
  wordsIn(tl, q(".j-line " + W), 11.6, 0.9, 0.09);
  pad(tl, 15.8);
};

const turning: Builder = (scene, q, pinned) => {
  const tl = mk(scene, pinned);
  tl.fromTo(q(".t-p0 img"), { scale: 1.25 }, { scale: 1.05, ease: "none", duration: 13 }, 0)
    .fromTo(q(".t-q " + W), { opacity: 0.1, yPercent: 30 }, { opacity: 1, yPercent: 0, stagger: 0.16, duration: 0.8 }, 0.2)
    .to(q(".t-q"), { opacity: 0, yPercent: -10, duration: 1.2 }, 5);
  wordsIn(tl, q(".t-a " + W), 5.6, 0.9, 0.07);
  tl.fromTo(q(".t-p1"), { opacity: 0 }, { opacity: 1, duration: 2, ease: "power2.inOut" }, 7)
    .fromTo(q(".t-p1 img"), { scale: 1.3 }, { scale: 1.05, duration: 4, ease: "none" }, 7)
    .fromTo(q(".t-p2"), { opacity: 0, xPercent: 6 }, { opacity: 1, xPercent: 0, duration: 1.6, ease: "power2.inOut" }, 9.4)
    .fromTo(q(".t-p3"), { opacity: 0, yPercent: 6 }, { opacity: 1, yPercent: 0, duration: 1.6, ease: "power2.inOut" }, 11)
    .to(q(".t-a"), { yPercent: -4, ease: "none", duration: 6 }, 7);
  pad(tl, 13);
};

const pillars: Builder = (scene, q) => {
  const tl = mk(scene, true);
  const layers = q(".pillar");
  layers.forEach((l, i) => {
    const at = i * 3;
    const img = l.querySelector("img");
    if (i > 0) tl.fromTo(l, { opacity: 0 }, { opacity: 1, duration: 1.3, ease: "power2.inOut" }, at - 0.4);
    if (img) tl.fromTo(img, { scale: 1.3, xPercent: i % 2 ? 3 : -3 }, { scale: 1.02, xPercent: 0, duration: 3.4, ease: "none" }, at - 0.4);
    tl.fromTo(l.querySelectorAll(".p-txt > *"), { opacity: 0, y: 26 }, { opacity: 1, y: 0, stagger: 0.18, duration: 0.8 }, at + 0.3);
    if (i < layers.length - 1) tl.to(l.querySelectorAll(".p-txt"), { opacity: 0, y: -20, duration: 0.6 }, at + 2.5);
    const dots = q(".p-dot");
    tl.to(dots[i], { scaleY: 1, opacity: 1, duration: 0.4 }, at);
    if (i > 0) tl.to(dots[i - 1], { scaleY: 0.35, opacity: 0.45, duration: 0.4 }, at);
  });
  pad(tl, 12);
};

const finale: Builder = (scene, q, pinned) => {
  const tl = mk(scene, pinned);
  tl.fromTo(q(".f-tile"), { opacity: 0, scale: 1.18 }, { opacity: 1, scale: 1, stagger: 0.18, duration: 1.6 }, 0)
    .fromTo(q(".f-drift"), { yPercent: 4 }, { yPercent: -4, ease: "none", duration: 12 }, 0)
    .fromTo(q(".f-4"), { opacity: 0, xPercent: -45 }, { opacity: 1, xPercent: 0, duration: 1.5 }, 0.8)
    .fromTo(q(".f-5"), { opacity: 0, xPercent: 45 }, { opacity: 1, xPercent: 0, duration: 1.5 }, 1.1);
  wordsIn(tl, q(".f1 " + W), 1.4, 1, 0.14);
  tl.to(q(".f1"), { opacity: 0.0, y: -30, duration: 0.8 }, 4.2);
  wordsIn(tl, q(".f2 " + W), 4.8, 0.9, 0.05);
  tl.to(q(".f2"), { opacity: 0.0, y: -30, duration: 0.8 }, 7.8);
  wordsIn(tl, q(".f3 " + W), 8.5, 1, 0.1);
  tl.fromTo(q(".f-cta"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, stagger: 0.15, duration: 0.8 }, 10.4);
  pad(tl, 12.6);
};

/* name -> [builder, alwaysPinned] ; non-always-pinned ones fall back to flow() on small screens */
const BUILDERS: Record<string, [Builder, boolean]> = {
  open: [opening, true],
  turn: [turning, true],
  final: [finale, true],
  people: [people, false],
  rahul: [rahul, false],
  jayram: [jayram, false],
  pillars: [pillars, false],
};

export function useCinema(ref: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add(
        { desk: "(min-width: 1100px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)", mob: "(not ((min-width: 1100px) and (min-height: 680px))) and (prefers-reduced-motion: no-preference)" },
        (c) => {
          const desk = !!c.conditions?.desk;
          root.classList.add("is-cinema");
          root.classList.toggle("is-desk", desk);

          // tone shifts
          const first = root.querySelector<HTMLElement>("[data-tone]");
          if (first) gsap.set(root, { backgroundColor: TONES[first.dataset.tone!].bg, "--fg": TONES[first.dataset.tone!].fg });
          root.querySelectorAll<HTMLElement>("[data-tone]").forEach((s) => {
            const t = TONES[s.dataset.tone!];
            ScrollTrigger.create({
              trigger: s, start: "top 55%", end: "bottom 55%",
              onToggle: (self) => self.isActive && gsap.to(root, { backgroundColor: t.bg, "--fg": t.fg, duration: 0.9, ease: "power1.inOut", overwrite: "auto" }),
            });
          });

          root.querySelectorAll<HTMLElement>("[data-scene]").forEach((scene) => {
            const entry = BUILDERS[scene.dataset.scene!];
            const q = gsap.utils.selector(scene);
            if (entry && (desk || entry[1])) entry[0](scene, q, true);
            else flow(scene);
          });

          return () => { root.classList.remove("is-cinema", "is-desk"); };
        },
      );
    }, root);

    // late layout changes (fonts, images) -> recalc trigger positions
    let t = 0;
    const refresh = () => { window.clearTimeout(t); t = window.setTimeout(() => ScrollTrigger.refresh(), 150); };
    root.querySelectorAll("img").forEach((img) => { if (!img.complete) img.addEventListener("load", refresh, { once: true }); });
    // decode every photo up-front so no image is decoded for the first time mid-scroll
    root.querySelectorAll("img").forEach((img) => { img.decode?.().catch(() => {}); });
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      mm.revert();
      ctx.revert();
    };
  }, [ref]);
}
