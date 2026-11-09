import type { ReactNode } from "react";

/* Hero photo shapes copied from the reference designs (objectBoundingBox units, so they scale). */
const SHAPES = {
  // Shiksha / Swachhata: full-height photo with a sweeping curved left edge
  curve: { clip: "M0.2,0 L1,0 L1,1 L0.03,1 C0.12,0.74 0.05,0.3 0.2,0 Z", edge: "M0.2,0 C0.05,0.3 0.12,0.74 0.03,1" },
  // Mental health: organic rounded blob
  blob: { clip: "M0.1,0.3 C0.16,0.07 0.5,0.01 0.72,0.04 C0.92,0.08 1,0.3 0.96,0.52 C0.92,0.78 0.72,0.97 0.46,0.98 C0.22,1 0.04,0.86 0.02,0.62 C0,0.48 0.04,0.4 0.1,0.3 Z", edge: "M0.1,0.3 C0.16,0.07 0.5,0.01 0.72,0.04 C0.92,0.08 1,0.3 0.96,0.52 C0.92,0.78 0.72,0.97 0.46,0.98 C0.22,1 0.04,0.86 0.02,0.62 C0,0.48 0.04,0.4 0.1,0.3 Z" },
} as const;

export default function HeroVisual({ id, kind, src, pos = "center", main, accent, children }: { id: string; kind: "curve" | "blob"; src: string; pos?: string; main: string; accent: string; children?: ReactNode }) {
  const s = SHAPES[kind];
  const cid = `hero-clip-${id}`;
  const blob = kind === "blob";
  return (
    <div className={`relative min-h-[270px] sm:min-h-[350px] lg:absolute lg:w-[57%] ${blob ? "lg:inset-y-5 lg:right-4" : "lg:inset-y-0 lg:right-0"}`}>
      <svg width="0" height="0" className="absolute" aria-hidden><defs><clipPath id={cid} clipPathUnits="objectBoundingBox"><path d={s.clip} /></clipPath></defs></svg>
      <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: `url(#${cid})`, objectPosition: pos }} />
      <svg viewBox="0 0 1 1" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        {blob ? (
          <>
            <path d={s.edge} fill="none" stroke="#fff" strokeWidth="9" vectorEffect="non-scaling-stroke" />
            <path d="M0.08,0.84 C0.3,1.05 0.62,1.02 0.86,0.8" fill="none" stroke={main} strokeWidth="6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </>
        ) : (
          <>
            <path d={s.edge} fill="none" stroke={main} strokeWidth="16" strokeLinecap="round" vectorEffect="non-scaling-stroke" transform="translate(-0.012 0)" />
            <path d={s.edge} fill="none" stroke={accent} strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke" transform="translate(0.012 0)" />
          </>
        )}
      </svg>
      {children}
    </div>
  );
}
