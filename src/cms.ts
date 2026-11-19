/// <reference types="vite/client" />
import { useEffect, useState } from "react";

/* ------------------------------------------------------------------
   Tiny read-only Sanity client (plain fetch, no extra dependency).
   - Set VITE_SANITY_PROJECT_ID (+ VITE_SANITY_DATASET) in .env to go live.
   - Without it, or if the request fails, the built-in defaults below show,
     so the page never goes blank.
------------------------------------------------------------------- */
const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined;
const DATASET = (import.meta.env.VITE_SANITY_DATASET as string | undefined) || "production";
const API_VERSION = "2026-07-01";

const cmsEnabled = !!PROJECT_ID && PROJECT_ID !== "YOUR_PROJECT_ID";

async function sanityFetch<T>(query: string, signal?: AbortSignal): Promise<T | null> {
  if (!cmsEnabled) return null;
  const url = `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Sanity ${res.status}`);
  const json = (await res.json()) as { result: T };
  return json.result ?? null;
}

/** Sanity CDN images: ask for a sensible width + modern format. */
const optimise = (url: string, w = 1400) =>
  url.includes("cdn.sanity.io") ? `${url}?w=${w}&auto=format&q=80` : url;

/* ---------------- Before / After section ---------------- */
export type BAPhoto = { src: string; alt: string };
export type BAItem = {
  id: string;
  kicker: string; kickerHi?: string;
  title: string; titleHi?: string;
  description?: string; descriptionHi?: string;
  date?: string;
  beforeLabel?: string; afterLabel?: string;
  start: number; // 0–100 — where the slider handle starts
  before: BAPhoto;
  after: BAPhoto;
};
export type BAData = { items: BAItem[] };

/* Shown until the client adds items in Sanity (Impact → "Before & After").
   NOTE: these two are placeholder photos from the same clean-up event —
   replace them with a true before / after pair from the Studio. */
export const DEFAULT_BEFORE_AFTER: BAData = {
  items: [
    {
      id: "rameshwar-kund",
      kicker: "Every Week at", kickerHi: "हर सप्ताह",
      title: "Rameshwar Kund", titleHi: "रामेश्वर कुंड",
      description: "A community-led cleanup and awareness drive for a cleaner and healthier Khandwa.",
      descriptionHi: "एक स्वच्छ और स्वस्थ खंडवा के लिए समुदाय के नेतृत्व में सफाई और जागरूकता अभियान।",
      start: 50,
      before: { src: "images/real-kund-2.webp", alt: "Rameshwar Kund before the cleanup" },
      after: { src: "images/real-kund.webp", alt: "Rameshwar Kund after the cleanup" },
    },
  ],
};

const BA_QUERY = `*[_type == "beforeAfterSection" && _id == "before-after-section"][0]{
  visible,
  items[visible != false]{
    _key, kicker, kickerHi, title, titleHi, description, descriptionHi, date,
    beforeLabel, afterLabel, startPosition,
    "before": beforeImage{"url": asset->url, alt},
    "after": afterImage{"url": asset->url, alt}
  }
}`;

type RawBA = {
  visible?: boolean;
  items?: {
    _key: string; kicker?: string; kickerHi?: string; title?: string; titleHi?: string;
    description?: string; descriptionHi?: string; date?: string;
    beforeLabel?: string; afterLabel?: string; startPosition?: number;
    before?: { url?: string; alt?: string }; after?: { url?: string; alt?: string };
  }[];
} | null;

function mapBA(raw: RawBA): BAData | null {
  if (!raw || raw.visible === false) return raw && raw.visible === false ? { items: [] } : null;
  const items: BAItem[] = (raw.items ?? [])
    .filter((i) => i.before?.url && i.after?.url) // an item needs both photos
    .map((i) => ({
      id: i._key,
      kicker: i.kicker || "",
      kickerHi: i.kickerHi || undefined,
      title: i.title || "",
      titleHi: i.titleHi || undefined,
      description: i.description || undefined,
      descriptionHi: i.descriptionHi || undefined,
      date: i.date || undefined,
      beforeLabel: i.beforeLabel || undefined,
      afterLabel: i.afterLabel || undefined,
      start: typeof i.startPosition === "number" ? Math.min(95, Math.max(5, i.startPosition)) : 50,
      before: { src: optimise(i.before!.url!), alt: i.before?.alt || "Before" },
      after: { src: optimise(i.after!.url!), alt: i.after?.alt || "After" },
    }));
  return items.length ? { items } : null; // nothing usable → keep the defaults
}

export function useBeforeAfter(): BAData {
  const [data, setData] = useState<BAData>(DEFAULT_BEFORE_AFTER);
  useEffect(() => {
    if (!cmsEnabled) return;
    const ac = new AbortController();
    sanityFetch<RawBA>(BA_QUERY, ac.signal)
      .then((raw) => {
        const mapped = mapBA(raw);
        if (mapped) setData(mapped);
      })
      .catch(() => { /* offline / CORS not set yet → defaults stay */ });
    return () => ac.abort();
  }, []);
  return data;
}
