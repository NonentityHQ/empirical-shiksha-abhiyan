import type { ReactNode } from "react";

export const ICONS: Record<string, ReactNode> = {
  book: <><path d="M12 7v14" /><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" /></>,
  broom: <><path d="M21 3l-8.5 8.5" /><path d="M9.5 9.5l5 5" /><path d="M9.5 9.5C6 9.5 4 12 3 21c9-1 11.5-3 11.5-6.5" /><path d="M7 14l3 3" /><path d="M5 17.5l2.5 2.5" /></>,
  leaf: <><path d="M7 20h10" /><path d="M10 20c5.5-2.5.8-6.4 3-10" /><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" /><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" /></>,
  heart: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z" />,
  users: <path d="M16 19v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V19M9.5 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 19v-1.5a4 4 0 0 0-3-3.8M15.5 4.2a3 3 0 0 1 0 5.6" />,
  drop: <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />,
  recycle: <path d="M7 7h8a3 3 0 0 1 3 3v1M17 17H9a3 3 0 0 1-3-3v-1M15 4l3 3-3 3M9 20l-3-3 3-3" />,
};
export const AREA_ICON: Record<string, string> = { shiksha: "book", swachhata: "broom", paryavaran: "leaf", swasthya: "heart" };

export const AIcon = ({ n, s = 22 }: { n: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{ICONS[n]}</svg>
);
