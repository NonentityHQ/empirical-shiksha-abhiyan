import type { ReactNode } from "react";

/* Hero photo shapes, in objectBoundingBox units so they scale with the box.
   curve = Shiksha (slanted edge) · bow = Swachhata/Paryavaran ("(" shaped edge) · blob = Mental Health */
const SHAPES = {
  curve: {
    clip: "M0.26,0 L1,0 L1,1 L0.05,1 C-0.03,0.72 0,0.34 0.26,0 Z",
    // tapering crescent hugging the edge (thick in the middle, pointed at both ends)
    swoosh: "M0.26,0 C-0.03,0.34 -0.06,0.72 0.05,1 C-0.03,0.72 0,0.34 0.26,0 Z",
    line: "M0.26,0 C0,0.34 -0.03,0.72 0.05,1",
  },
  bow: {
    clip: "M0.2,0 L1,0 L1,1 L0.13,1 C-0.04,0.8 -0.05,0.3 0.2,0 Z",
    swoosh: "M0.2,0 C-0.09,0.3 -0.09,0.8 0.13,1 C-0.04,0.8 -0.05,0.3 0.2,0 Z",
    line: "M0.2,0 C-0.05,0.3 -0.04,0.8 0.13,1",
  },
  blob: {
    clip: "M0.5,0 C0.78,0 1,0.22 1,0.5 C1,0.78 0.78,1 0.5,1 C0.22,1 0,0.78 0,0.5 C0,0.22 0.22,0 0.5,0 Z",
    swoosh: "", line: "",
  },
} as const;

export default function HeroVisual({ id, kind, src, pos = "center", main, accent, children }: { id: string; kind: "curve" | "bow" | "blob"; src: string; pos?: string; main: string; accent: string; children?: ReactNode }) {
  const s = SHAPES[kind];
  const cid = `hero-clip-${id}`;
  const blob = kind === "blob";
  return (
    <div className={`relative min-h-[270px] sm:min-h-[350px] lg:absolute ${blob ? "lg:bottom-[84px] lg:right-[9%] lg:top-5 lg:w-[42%]" : "hero-vis lg:inset-y-0"}`} data-depth="9">
      <svg width="0" height="0" className="absolute" aria-hidden><defs><clipPath id={cid} clipPathUnits="objectBoundingBox"><path d={s.clip} /></clipPath></defs></svg>
      <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: `url(#${cid})`, objectPosition: pos }} />
      <svg viewBox="0 0 1 1" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        {blob ? (
          <>
            <path d={s.clip} fill="none" stroke="#fff" strokeWidth="8" vectorEffect="non-scaling-stroke" />
            <path d="M0.03,0.78 C0.2,1.06 0.55,1.06 0.8,0.88" fill="none" stroke={main} strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            <path d="M0.4,1.03 C0.6,1.05 0.85,1 1.02,0.8" fill="none" stroke="#9CCFC5" strokeWidth="9" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </>
        ) : (
          <>
            <path d={s.swoosh} fill={main} />
            <path d={s.line} fill="none" stroke={accent} strokeWidth="3.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" transform="translate(0.012 0)" />
            {kind === "bow" && (
              <>
                {/* bottom-right flourish over the photo */}
                <path d="M1,0.64 C0.93,0.86 0.78,0.98 0.52,1 C0.8,0.93 0.93,0.84 1,0.8 Z" fill={main} />
                <path d="M1,0.7 C0.93,0.88 0.8,0.97 0.62,0.995" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              </>
            )}
          </>
        )}
      </svg>
      {children}
    </div>
  );
}
