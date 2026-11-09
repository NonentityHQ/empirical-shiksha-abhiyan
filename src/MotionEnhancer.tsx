import { useEffect, useRef } from "react";

/**
 * Site-wide motion layer. It enhances existing sections/cards instead of
 * wrapping or restructuring the page markup, so current layouts stay intact.
 */
export default function MotionEnhancer({ routeKey }: { routeKey: string }) {
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.getElementById("site-main");
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canTilt = !reducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const sectionNodes = Array.from(
      root.querySelectorAll<HTMLElement>("section:not(.reveal), article, .card-pop, .flip-scene, [data-motion='reveal']"),
    ).filter((node) => !(node.tagName === "ARTICLE" && node.closest(".flip-scene")));

    const cardNodes = sectionNodes.filter((node) =>
      node.classList.contains("card-pop") || node.classList.contains("flip-scene") || node.tagName === "ARTICLE",
    );

    sectionNodes.forEach((node, index) => {
      node.classList.add("motion-reveal");
      if (cardNodes.includes(node)) node.style.setProperty("--motion-stagger", `${Math.min(index % 5, 4) * 72}ms`);
      if (node.classList.contains("card-pop")) node.classList.add("motion-tilt");
    });

    const controls = Array.from(root.querySelectorAll<HTMLElement>("button, a[role='button'], [role='button']"));
    controls.forEach((node) => node.classList.add("motion-control"));

    // Only large hero/project imagery receives the very subtle scroll-softening effect.
    const scrollMedia = Array.from(
      root.querySelectorAll<HTMLElement>(
        ".about-hero > div:first-child, .initiative-hero-image, .initiative-hero img, section:first-of-type img.object-cover",
      ),
    );
    scrollMedia.forEach((node) => node.classList.add("motion-scroll-media"));

    let observer: IntersectionObserver | undefined;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      sectionNodes.forEach((node) => node.classList.add("is-inview"));
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const node = entry.target as HTMLElement;
            node.classList.add("is-inview");
            observer?.unobserve(node);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
      );
      sectionNodes.forEach((node) => observer?.observe(node));
    }

    let activeCard: HTMLElement | null = null;
    let scrollFrame = 0;
    let scrollSettleTimer: number | undefined;

    const resetCard = () => {
      if (!activeCard) return;
      activeCard.classList.remove("is-tilting");
      activeCard.style.removeProperty("--tilt-x");
      activeCard.style.removeProperty("--tilt-y");
      activeCard.style.removeProperty("--shine-x");
      activeCard.style.removeProperty("--shine-y");
      activeCard = null;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!canTilt) return;
      const target = event.target instanceof Element ? event.target : null;
      const card = target?.closest<HTMLElement>(".card-pop.motion-tilt") ?? null;
      if (!card) {
        resetCard();
        return;
      }
      const rect = card.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      if (activeCard && activeCard !== card) resetCard();
      activeCard = card;
      const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
      card.style.setProperty("--tilt-x", `${((x - 0.5) * 7).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${((0.5 - y) * 6).toFixed(2)}deg`);
      card.style.setProperty("--shine-x", `${(x * 100).toFixed(1)}%`);
      card.style.setProperty("--shine-y", `${(y * 100).toFixed(1)}%`);
      card.classList.add("is-tilting");
    };

    const onPointerLeave = () => resetCard();

    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        const doc = document.documentElement;
        const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
        const progress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
        root.classList.add("motion-scrolling");
        if (scrollSettleTimer !== undefined) window.clearTimeout(scrollSettleTimer);
        scrollSettleTimer = window.setTimeout(() => root.classList.remove("motion-scrolling"), 135);
      });
    };

    root.addEventListener("pointermove", onPointerMove, { passive: true });
    root.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer?.disconnect();
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      if (scrollSettleTimer !== undefined) window.clearTimeout(scrollSettleTimer);
      root.classList.remove("motion-scrolling");
      resetCard();
    };
  }, [routeKey]);

  return (
    <div className="motion-scroll-progress" aria-hidden="true">
      <span ref={progressRef} />
    </div>
  );
}
