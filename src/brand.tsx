/* Official-style brand logos (drawn as inline SVG, full colour). */
export type BrandName = "youtube" | "instagram" | "facebook" | "x" | "linkedin" | "whatsapp";

export function BrandIcon({ name, size = 36, className = "" }: { name: BrandName; size?: number; className?: string }) {
  const p = { width: size, height: size, viewBox: "0 0 48 48", className, "aria-hidden": true, role: "img" as const };
  switch (name) {
    case "youtube":
      return (
        <svg {...p}>
          <rect x="2" y="9" width="44" height="30" rx="9" fill="#FF0000" />
          <path d="M19.5 17.5v13l11.5-6.5z" fill="#fff" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...p}>
          <defs>
            <radialGradient id="ig-g" cx="30%" cy="107%" r="140%">
              <stop offset="0" stopColor="#FED576" /><stop offset=".26" stopColor="#F47133" /><stop offset=".61" stopColor="#BC3081" /><stop offset="1" stopColor="#4C63D2" />
            </radialGradient>
          </defs>
          <rect x="3" y="3" width="42" height="42" rx="12" fill="url(#ig-g)" />
          <rect x="11" y="11" width="26" height="26" rx="8" fill="none" stroke="#fff" strokeWidth="3" />
          <circle cx="24" cy="24" r="6.3" fill="none" stroke="#fff" strokeWidth="3" />
          <circle cx="32.2" cy="15.8" r="1.9" fill="#fff" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...p}>
          <circle cx="24" cy="24" r="21" fill="#1877F2" />
          <path d="M26.6 44.8V29.2h5.2l.8-6h-6v-3.9c0-1.7.5-2.9 3-2.9h3.2v-5.4c-.6-.1-2.5-.2-4.7-.2-4.6 0-7.7 2.8-7.7 7.9v4.5h-5.2v6h5.2v15.6a21 21 0 0 0 6.2 0z" fill="#fff" />
        </svg>
      );
    case "x":
      return (
        <svg {...p}>
          <rect x="3" y="3" width="42" height="42" rx="11" fill="#000" />
          <g transform="translate(11 11) scale(.85)"><path fill="#fff" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></g>
        </svg>
      );
    case "linkedin":
      return (
        <svg {...p}>
          <rect x="3" y="3" width="42" height="42" rx="9" fill="#0A66C2" />
          <rect x="11" y="19" width="5.6" height="18" fill="#fff" />
          <circle cx="13.8" cy="13.3" r="3.3" fill="#fff" />
          <path d="M20.6 19h5.4v2.5c.9-1.6 2.9-3 5.8-3 5.6 0 6.7 3.7 6.7 8.5V37h-5.6v-8.6c0-2.1 0-4.7-2.9-4.7s-3.3 2.2-3.3 4.5V37h-5.6z" fill="#fff" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...p}>
          <circle cx="24" cy="24" r="21" fill="#25D366" />
          <path d="M24 10.5a13.4 13.4 0 0 0-11.5 20.2L10.6 37.5l7-1.8A13.4 13.4 0 1 0 24 10.5z" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinejoin="round" />
          <path d="M19.2 18.2c.3-.7.7-.7 1.1-.7h.8c.2 0 .5.1.6.5l1 2.4c.1.3 0 .5-.1.7l-.7.8c-.2.2-.2.4-.1.6.7 1.3 2.2 2.7 3.7 3.4.3.1.5.1.7-.1l.9-1c.2-.2.4-.3.8-.1l2.3 1.1c.3.1.5.3.5.5 0 .9-.4 1.8-1.1 2.3-.8.5-1.9.6-3.2.1-2.9-1-5-2.8-6.5-5.1-.9-1.3-1.5-2.8-1-4.2.1-.5.4-1 .6-1.2z" fill="#fff" />
        </svg>
      );
  }
}
