/* Simple vector illustrations for CTA banners (no stock images). */
const Leaf = ({ x, y, r, c, s = 1 }: { x: number; y: number; r: number; c: string; s?: number }) => (
  <path d="M0 0C-6-14 0-30 14-34c4 16-2 32-14 34z" fill={c} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} />
);

export default function Art({ kind, color = "#3A7D44" }: { kind: "books" | "bin" | "head" | "sprout"; color?: string }) {
  return (
    <svg viewBox="0 0 240 200" className="h-full w-full" aria-hidden>
      {kind === "books" && (<>
        <ellipse cx="120" cy="184" rx="100" ry="12" fill="#fff" opacity=".18" />
        <rect x="34" y="142" width="160" height="30" rx="5" fill="#EE9B13" /><rect x="34" y="142" width="160" height="7" rx="3" fill="#F5C77A" />
        <rect x="48" y="114" width="138" height="28" rx="5" fill="#2B459E" /><rect x="48" y="114" width="138" height="7" rx="3" fill="#D9C196" />
        <rect x="40" y="88" width="146" height="26" rx="5" fill="#D8501F" /><rect x="40" y="88" width="146" height="7" rx="3" fill="#F5C77A" />
        <path d="M120 22 192 50 120 78 48 50z" fill="#1F2A44" /><path d="M86 66v22c22 12 46 12 68 0V66l-34 14z" fill="#2B459E" />
        <path d="M184 52v34" stroke="#F4B93E" strokeWidth="3" /><circle cx="184" cy="90" r="5" fill="#F4B93E" />
        <Leaf x={22} y={176} r={-20} c="#3A7D44" s={1.4} /><Leaf x={34} y={178} r={25} c="#3A7D44" s={1.1} /><Leaf x={214} y={176} r={20} c="#3A7D44" s={1.4} /><Leaf x={200} y={178} r={-25} c="#3A7D44" s={1.1} />
      </>)}
      {kind === "bin" && (<>
        <ellipse cx="120" cy="186" rx="105" ry="10" fill="#000" opacity=".18" />
        <ellipse cx="46" cy="160" rx="30" ry="28" fill="#1b1f26" /><path d="M40 134c2-8 8-8 10 0z" fill="#1b1f26" />
        <ellipse cx="200" cy="162" rx="28" ry="26" fill="#1b1f26" /><path d="M194 138c2-8 8-8 10 0z" fill="#1b1f26" />
        <path d="M74 64h92l-9 118H83z" fill={color} /><path d="M74 64h30l-6 118H83z" fill="#fff" opacity=".18" />
        <rect x="66" y="48" width="108" height="20" rx="7" fill={color} /><rect x="66" y="48" width="108" height="6" rx="3" fill="#fff" opacity=".3" />
        <rect x="104" y="38" width="32" height="10" rx="5" fill={color} />
        <circle cx="120" cy="122" r="30" fill="#fff" opacity=".95" />
        <g transform="translate(94 96) scale(2.2)" stroke={color} fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h8a3 3 0 0 1 3 3v1M17 17H9a3 3 0 0 1-3-3v-1M15 4l3 3-3 3M9 20l-3-3 3-3" /></g>
        <Leaf x={128} y={46} r={-10} c="#3A7D44" s={1.3} /><Leaf x={140} y={44} r={30} c="#3A7D44" s={1.1} />
      </>)}
      {kind === "head" && (<>
        <path d="M62 196v-44C34 142 30 100 52 74c22-28 70-38 100-14 24 20 20 48 10 62l6 10-16 4v18l-12 6v36z" fill="#DDEDE7" />
        <path d="M118 150V92" stroke="#1A7F78" strokeWidth="4" strokeLinecap="round" fill="none" />
        <Leaf x={118} y={96} r={-35} c="#1A7F78" s={1.5} /><Leaf x={118} y={110} r={40} c="#3A7D44" s={1.3} />
        <path d="M0 150c20-10 40-8 56 0z" fill="#fff" opacity=".25" />
      </>)}
      {kind === "sprout" && (<>
        <ellipse cx="120" cy="186" rx="108" ry="10" fill="#000" opacity=".18" />
        <path d="M120 180V96" stroke="#3A7D44" strokeWidth="7" strokeLinecap="round" />
        <Leaf x={120} y={104} r={-50} c="#3A7D44" s={2.2} /><Leaf x={120} y={124} r={50} c="#3A7D44" s={2.2} /><Leaf x={120} y={92} r={5} c="#7FB069" s={1.6} />
        <path d="M70 184c10-24 40-24 50 0z" fill="#EE9B13" /><path d="M120 184c10-24 40-24 50 0z" fill="#D8501F" />
      </>)}
    </svg>
  );
}
