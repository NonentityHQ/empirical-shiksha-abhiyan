/* Decorative background artwork (pure SVG, no text, purely visual).
   Gradients live in <DecorDefs/> once, so every SVG below can reference them
   even if an individual SVG is hidden by CSS. */

export function DecorDefs() {
  const g = (id: string, a: string, b: string, diag = false) => (
    <linearGradient id={id} x1="0" y1="0" x2={diag ? "1" : "0"} y2="1">
      <stop offset="0" stopColor={a} />
      <stop offset="1" stopColor={b} />
    </linearGradient>
  );
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden focusable="false">
      <defs>
        {g("dg-leaf", "#98dc7c", "#33a14c", true)}
        {g("dg-leafDark", "#4fb75f", "#1f7d3c", true)}
        {g("dg-leafBlue", "#a9d3ff", "#3f86e3", true)}
        {g("dg-leafTeal", "#9ae6d6", "#2fa99c", true)}
        {g("dg-hillBlue", "#cde1fb", "#9cc4f4")}
        {g("dg-hillTeal", "#aee4de", "#62c0cd")}
        {g("dg-hillSand", "#ffeebd", "#ffd885")}
        {g("dg-hillGreen", "#d9f1c9", "#a7dc94")}
        {g("dg-bookBlue", "#6aa5f7", "#2f6fe0")}
        {g("dg-bookOrange", "#ffc25a", "#f58a1e")}
      </defs>
    </svg>
  );
}

/* ---------- Leaves ---------- */
const LeafBody = ({ fill }: { fill: string }) => (
  <>
    <path d="M30 2 C52 22 56 62 30 98 C4 62 8 22 30 2Z" fill={`url(#${fill})`} />
    <path d="M30 14 C30 40 30 70 30 94" stroke="rgba(255,255,255,.7)" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M30 40 L44 28 M30 40 L16 28 M30 60 L46 46 M30 60 L14 46 M30 78 L40 68 M30 78 L20 68" stroke="rgba(255,255,255,.35)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
  </>
);

export function Leaf({ fill = "dg-leaf", className = "" }: { fill?: string; className?: string }) {
  return (
    <svg viewBox="0 0 60 100" className={className} aria-hidden>
      <LeafBody fill={fill} />
    </svg>
  );
}

const L = ({ x, y, r, s, f }: { x: number; y: number; r: number; s: number; f: string }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s}) translate(-30 -98)`}>
    <LeafBody fill={f} />
  </g>
);

/* A leafy branch. Stem starts bottom-right and climbs to the top-left. */
export function LeafBranch({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 -40 200 200" overflow="visible" className={className} aria-hidden>
      <path d="M192 152 C150 122 108 82 62 30" fill="none" stroke="#7d8f4c" strokeWidth="3" strokeLinecap="round" />
      <L x={167} y={133} r={-72} s={0.6} f="dg-leafDark" />
      <L x={141} y={111} r={22} s={0.7} f="dg-leaf" />
      <L x={122} y={93} r={-62} s={0.72} f="dg-leaf" />
      <L x={102} y={74} r={18} s={0.68} f="dg-leafDark" />
      <L x={82} y={53} r={-52} s={0.66} f="dg-leaf" />
      <L x={70} y={38} r={14} s={0.56} f="dg-leaf" />
      <L x={62} y={30} r={-20} s={0.66} f="dg-leafDark" />
    </svg>
  );
}

/* ---------- Small icons / doodles ---------- */
export function RayDashes({ className = "", color = "#ff9a2e" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 60 50" className={className} aria-hidden>
      {[-38, 0, 38].map((deg) => {
        const r = (deg * Math.PI) / 180;
        const x1 = 30 + Math.sin(r) * 24, y1 = 50 - Math.cos(r) * 24;
        const x2 = 30 + Math.sin(r) * 44, y2 = 50 - Math.cos(r) * 44;
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="4.5" strokeLinecap="round" />;
      })}
    </svg>
  );
}

export function Diya({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path d="M20 4 C27 12 27 19 20 24 C13 19 13 12 20 4Z" fill="#ff9a2e" />
      <path d="M20 12 C23 16 23 19 20 21 C17 19 17 16 20 12Z" fill="#ffd36a" />
      <path d="M4 26 H36 C35 34 28 38 20 38 C12 38 5 34 4 26Z" fill="#ffc24a" />
      <path d="M4 26 H36" stroke="#f2a21d" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Pin({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 30" className={className} aria-hidden>
      <path d="M12 29 C4 19 3 15 3 11 A9 9 0 0 1 21 11 C21 15 20 19 12 29Z" fill="#ff8a1f" />
      <circle cx="12" cy="11" r="3.6" fill="#fff" />
    </svg>
  );
}

export function HeartShape({ className = "", fill = "#7bc47f", stroke }: { className?: string; fill?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 20.5 C4 14.5 2 9.5 5 6.2 C8 3 11 5 12 8 C13 5 16 3 19 6.2 C22 9.5 20 14.5 12 20.5Z"
        fill={stroke ? "none" : fill} stroke={stroke ?? "none"} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export function CloudDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 44" className={className} aria-hidden>
      <path d="M16 36 C6 36 3 23 13 21 C13 10 28 6 35 14 C41 5 58 9 56 22 C68 20 74 36 60 36Z"
        fill="none" stroke="#9cc0ee" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

/* Tiny doodle that sits in the corner of each counter cell. */
export function CellDoodle({ i }: { i: number }) {
  const cls = "pointer-events-none absolute right-5 bottom-4 w-7";
  if (i === 0)
    return (
      <svg viewBox="0 0 28 28" className={cls} aria-hidden>
        <path d="M7 23 L11 8 M16 24 L21 10" stroke="#f08fa0" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      </svg>
    );
  if (i === 1) return <HeartShape stroke="#f19aa8" className={cls} />;
  if (i === 2)
    return (
      <svg viewBox="0 0 28 28" className={cls} aria-hidden>
        <path d="M5 24 L22 5" stroke="#52b36e" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      </svg>
    );
  return (
    <svg viewBox="0 0 28 28" className={cls} aria-hidden>
      <path d="M3 19 L9 9 L14 20 L20 7 L25 16" stroke="#f08fa0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/* ---------- Hero scene: books + sprout ---------- */
export function Books({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 58 220 92" className={className} aria-hidden>
      <ellipse cx="112" cy="136" rx="98" ry="6" fill="rgba(18,48,122,.16)" />
      {/* bottom book (blue) */}
      <path d="M12 102 L32 112 L32 134 L12 124Z" fill="#2554bd" />
      <path d="M32 112 L204 96.5 L204 118.5 L32 134Z" fill="#1f4fb0" />
      <path d="M32 115 L204 99.5 L204 115.5 L32 131Z" fill="#fff" />
      <path d="M32 120 L204 104.5 M32 124 L204 108.5 M32 128 L204 112.5" stroke="#cfdff3" strokeWidth=".8" />
      <path d="M12 102 L184 86.5 L204 96.5 L32 112Z" fill="url(#dg-bookBlue)" />
      {/* top book (orange) */}
      <path d="M32 77 L46 85 L46 111 L32 103Z" fill="#e9791a" />
      <path d="M46 85 L182 72.5 L182 98.5 L46 111Z" fill="#e0711a" />
      <path d="M46 88 L182 75.5 L182 95.5 L46 108Z" fill="#fff" />
      <path d="M46 94 L182 81.5 M46 98 L182 85.5 M46 102 L182 89.5" stroke="#f3d9bf" strokeWidth=".8" />
      <path d="M32 77 L168 64.5 L182 72.5 L46 85Z" fill="url(#dg-bookOrange)" />
    </svg>
  );
}

export function Sprout({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 110" className={className} aria-hidden>
      <ellipse cx="45" cy="106" rx="22" ry="4" fill="rgba(18,48,122,.14)" />
      <path d="M45 106 C45 84 44 66 47 46" fill="none" stroke="#5c8f3a" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M46 60 C20 62 6 44 8 20 C34 20 48 38 46 60Z" fill="url(#dg-leaf)" />
      <path d="M46 58 C34 46 22 34 12 24" stroke="rgba(255,255,255,.6)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M47 48 C72 48 86 32 84 8 C58 8 46 28 47 48Z" fill="url(#dg-leafDark)" />
      <path d="M47 46 C60 34 72 22 82 12" stroke="rgba(255,255,255,.55)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M47 46 C41 34 43 22 51 14 C56 26 54 38 47 46Z" fill="#ffb940" />
    </svg>
  );
}

/* ---------- Watercolour hills ---------- */
export function HeroHills({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 260" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden>
      <path d="M0 140 C160 90 330 80 520 130 C700 178 860 150 1040 104 C1200 64 1340 78 1440 110 L1440 260 L0 260Z" fill="url(#dg-hillBlue)" opacity=".85" />
      <path d="M640 190 C800 120 980 70 1160 78 C1290 84 1380 110 1440 100 L1440 260 L640 260Z" fill="url(#dg-hillTeal)" opacity=".85" />
      <path d="M0 190 C140 150 300 160 460 196 C560 218 640 214 720 200 L720 260 L0 260Z" fill="url(#dg-hillBlue)" opacity=".9" />
      <path d="M0 222 C200 196 420 206 660 226 C900 246 1160 214 1440 188 L1440 260 L0 260Z" fill="url(#dg-hillSand)" opacity=".95" />
      <path d="M0 248 C360 236 760 256 1100 244 C1260 238 1370 240 1440 236 L1440 260 L0 260Z" fill="#fff" opacity=".75" />
    </svg>
  );
}

export function AboutHills({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 220" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden>
      <path d="M0 110 C200 40 420 60 640 110 C820 150 1000 120 1200 90 C1320 72 1400 80 1440 90 L1440 220 L0 220Z" fill="url(#dg-hillBlue)" opacity=".7" />
      <path d="M0 150 C240 110 480 130 720 150 C960 170 1200 130 1440 120 L1440 220 L0 220Z" fill="url(#dg-hillSand)" opacity=".9" />
      <path d="M560 175 C800 120 1100 110 1440 150 L1440 220 L560 220Z" fill="url(#dg-hillGreen)" opacity=".85" />
      <path d="M0 200 C400 180 900 212 1440 190 L1440 220 L0 220Z" fill="#f6faff" opacity=".9" />
    </svg>
  );
}

/* Faint skyline of temples / domes / minarets */
export function Skyline({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 110" className={className} aria-hidden>
      <g fill="#a9c4ea" opacity=".6">
        {/* left pavilion */}
        <path d="M28 110 V82 H33 V74 Q50 52 67 74 V82 H72 V110Z" />
        <path d="M50 52 V42" stroke="#a9c4ea" strokeWidth="2" />
        {/* tiered temple */}
        <path d="M96 110 V80 L108 76 L112 56 L120 50 L124 32 L131 22 L138 32 L142 50 L150 56 L154 76 L166 80 V110Z" />
        <path d="M131 22 V8" stroke="#a9c4ea" strokeWidth="2" />
        {/* minarets + grand dome */}
        <path d="M178 110 V54 H185 V110Z" />
        <path d="M176 54 Q181.5 42 187 54Z" />
        <path d="M192 110 V72 H202 V64 Q202 42 240 36 Q278 42 278 64 V72 H288 V110Z" />
        <path d="M240 36 V16 M233 23 H247" stroke="#a9c4ea" strokeWidth="2" />
        <path d="M295 110 V54 H302 V110Z" />
        <path d="M293 54 Q298.5 42 304 54Z" />
        {/* gateway with arch */}
        <path fillRule="evenodd" d="M322 110 V76 Q322 58 346 52 Q370 58 370 76 V110Z M336 110 V88 Q346 78 356 88 V110Z" />
        {/* spires */}
        <path d="M398 110 V72 L408 42 L418 72 V110Z" />
        <path d="M408 42 V30" stroke="#a9c4ea" strokeWidth="2" />
        <path d="M436 110 V86 H452 V110Z" />
        <path d="M434 86 Q444 72 454 86Z" />
      </g>
    </svg>
  );
}

/* Pale-blue cloud band that hugs the photo marquee */
export function SoftClouds({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 240" preserveAspectRatio="none" className={className} aria-hidden>
      <path d="M0 78 C120 40 250 36 380 66 C500 94 600 84 720 56 C860 24 1000 30 1130 62 C1250 90 1350 80 1440 52 L1440 120 L0 120Z" fill="#d4e5fb" opacity=".7" />
      <path d="M0 150 L1440 150 L1440 190 C1330 218 1200 224 1070 198 C940 172 840 176 720 204 C600 232 470 228 340 204 C220 182 110 186 0 214Z" fill="#d9e8fb" opacity=".75" />
      <ellipse cx="170" cy="204" rx="80" ry="14" fill="#fff" opacity=".7" />
      <ellipse cx="1190" cy="42" rx="90" ry="12" fill="#fff" opacity=".65" />
    </svg>
  );
}

/* Wave that sits at the bottom of the counters card */
export function CardWave({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 120" preserveAspectRatio="none" className={className} aria-hidden>
      <path d="M0 74 C60 30 120 22 190 52 C240 74 270 62 300 32 L300 120 L0 120Z" fill="url(#dg-hillBlue)" opacity=".55" />
      <path d="M70 102 C130 82 210 92 300 72 L300 120 L70 120Z" fill="url(#dg-hillTeal)" opacity=".35" />
    </svg>
  );
}
