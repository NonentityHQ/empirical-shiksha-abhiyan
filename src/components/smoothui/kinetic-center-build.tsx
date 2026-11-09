import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export interface KineticCenterBuildProps {
  phrases: string[];
  className?: string;
  interval?: number;
}

export default function KineticCenterBuild({ phrases, className = "", interval = 4200 }: KineticCenterBuildProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [wordCount, setWordCount] = useState(1);
  const [exiting, setExiting] = useState(false);
  const reduceMotion = useReducedMotion();
  const current = phrases[phraseIndex] ?? phrases[0] ?? "";
  const words = current.split(" ").filter(Boolean);
  const phraseSignature = phrases.join("\u0000");

  useEffect(() => {
    if (phrases.length < 2) {
      setWordCount(words.length);
      return;
    }
    if (reduceMotion) {
      const id = window.setInterval(() => setPhraseIndex((prev) => (prev + 1) % phrases.length), interval);
      return () => window.clearInterval(id);
    }
    setWordCount(1);
    setExiting(false);
    const timers: number[] = [];
    for (let i = 1; i < words.length; i += 1) timers.push(window.setTimeout(() => setWordCount(i + 1), i * 470));
    const totalBuild = Math.max(0, words.length - 1) * 470 + 360;
    timers.push(window.setTimeout(() => {
      setExiting(true);
      timers.push(window.setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setWordCount(1);
        setExiting(false);
      }, 560));
    }, totalBuild + interval));
    return () => timers.forEach(window.clearTimeout);
  }, [phraseIndex, phraseSignature, interval, reduceMotion, words.length]);

  const visible = reduceMotion ? words : words.slice(0, wordCount);
  return (
    <span aria-live="polite" className={`flex flex-wrap items-center gap-x-[.35em] gap-y-1 ${className || "justify-center"}`}>
      <AnimatePresence mode="popLayout">
        {visible.map((word, index) => (
          <motion.span
            key={`${phraseIndex}-${index}`}
            initial={reduceMotion ? { opacity: 1 } : { filter: "blur(3px)", opacity: 0, scale: 0.99, x: 34, y: 4 }}
            animate={exiting ? { filter: "blur(2px)", opacity: 0, y: -5 } : { filter: "blur(0px)", opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ filter: "blur(2px)", opacity: 0, y: -5 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.62, ease: [0.2, 0.8, 0.2, 1], layout: { duration: 0.56 } }}
            layout
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  );
}
