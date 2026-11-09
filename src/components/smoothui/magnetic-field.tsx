import { cn } from "@/lib/utils";
import type { ReactElement, ReactNode } from "react";
import { useEffect, useRef } from "react";

export type MagneticFieldMode = "attract" | "repel" | "orbit";
export type MagneticFieldItem = { element: ReactElement; id: string };
export interface MagneticFieldProps {
  children?: ReactNode;
  className?: string;
  damping?: number;
  items?: MagneticFieldItem[];
  mode?: MagneticFieldMode;
  paused?: boolean;
  radius?: number;
  rotate?: boolean;
  stiffness?: number;
  strength?: number;
}

type Participant = { cx: number; cy: number; x: number; y: number; vx: number; vy: number; r: number; vr: number };
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Pointer-powered magnetic interaction. It stays idle until a pointer enters the field. */
export default function MagneticField({
  children,
  className,
  damping = 18,
  items,
  mode = "attract",
  paused = false,
  radius = 160,
  rotate = false,
  stiffness = 180,
  strength = 0.32,
}: MagneticFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (paused || reduceMotion.matches || !finePointer.matches) return;

    const participants = new Map<HTMLElement, Participant>();
    let pointer: { x: number; y: number } | null = null;
    let raf = 0;
    let last = 0;

    const measure = () => {
      const box = container.getBoundingClientRect();
      const nodes = Array.from(container.querySelectorAll<HTMLElement>("[data-magnetic]"));
      for (const element of Array.from(participants.keys())) {
        if (!nodes.includes(element)) {
          element.style.transform = "";
          element.style.willChange = "";
          participants.delete(element);
        }
      }
      nodes.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const state = participants.get(element) ?? { cx: 0, cy: 0, x: 0, y: 0, vx: 0, vy: 0, r: 0, vr: 0 };
        // getBoundingClientRect includes the current magnetic offset; subtract it
        // so re-measuring never shifts the element's neutral anchor point.
        state.cx = rect.left + rect.width / 2 - box.left - state.x;
        state.cy = rect.top + rect.height / 2 - box.top - state.y;
        participants.set(element, state);
        element.style.willChange = "transform";
      });
    };

    const step = (time: number) => {
      const dt = clamp((time - (last || time)) / 1000, 0, 0.04);
      last = time;
      let moving = false;
      for (const [element, state] of participants) {
        let targetX = 0;
        let targetY = 0;
        let targetR = 0;
        if (pointer) {
          const dx = pointer.x - state.cx;
          const dy = pointer.y - state.cy;
          const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < radius) {
            const falloff = (1 - distance / radius) ** 2;
            const sign = mode === "repel" ? -1 : 1;
            const pull = Math.abs(strength) * falloff * sign;
            if (mode === "orbit") {
              const tangent = pull * distance * 0.34;
              targetX = dx * pull * 0.18 - (dy / distance) * tangent;
              targetY = dy * pull * 0.18 + (dx / distance) * tangent;
            } else {
              targetX = dx * pull;
              targetY = dy * pull;
            }
            if (rotate) targetR = clamp((Math.atan2(dy, dx) * 180) / Math.PI * falloff, -10, 10);
          }
        }
        state.vx += ((targetX - state.x) * stiffness - state.vx * damping) * dt;
        state.vy += ((targetY - state.y) * stiffness - state.vy * damping) * dt;
        state.vr += ((targetR - state.r) * stiffness - state.vr * damping) * dt;
        state.x += state.vx * dt;
        state.y += state.vy * dt;
        state.r += state.vr * dt;
        element.style.transform = `translate3d(${state.x.toFixed(2)}px, ${state.y.toFixed(2)}px, 0) rotate(${state.r.toFixed(2)}deg)`;
        if (Math.abs(state.x) + Math.abs(state.y) + Math.abs(state.vx) + Math.abs(state.vy) + Math.abs(state.r) > 0.08) moving = true;
        else if (!pointer) element.style.transform = "";
      }
      // Stop once the spring settles. Pointer movement events restart the loop,
      // avoiding a permanent 60fps animation while the pointer is stationary.
      if (moving) raf = requestAnimationFrame(step);
      else { raf = 0; last = 0; }
    };

    const start = () => { if (!raf) raf = requestAnimationFrame(step); };
    const onMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      start();
    };
    const onLeave = () => { pointer = null; start(); };

    measure();
    const mutationObserver = new MutationObserver(measure);
    mutationObserver.observe(container, { childList: true, subtree: true });
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(container);
    window.addEventListener("resize", measure);
    container.addEventListener("pointermove", onMove, { passive: true });
    container.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      mutationObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
      participants.forEach((_, element) => { element.style.transform = ""; element.style.willChange = ""; });
    };
  }, [damping, mode, paused, radius, rotate, stiffness, strength]);

  const content = items
    ? items.map((item) => <div data-magnetic key={item.id} className="inline-block">{item.element}</div>)
    : children;

  return <div ref={containerRef} className={cn("relative", className)}>{content}</div>;
}
