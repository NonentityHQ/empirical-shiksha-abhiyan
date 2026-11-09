import { cn } from "@/lib/utils";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import type { RefObject } from "react";
import { useRef } from "react";

export type KineticTypeScrollAlign = "start" | "center" | "end";
type ScrollOptions = Parameters<typeof useScroll>[0];
export type ScrollOffsetTuple = NonNullable<ScrollOptions>["offset"];

export interface KineticTypeScrollProps {
  words: string[];
  align?: KineticTypeScrollAlign;
  className?: string;
  container?: RefObject<HTMLElement | null>;
  dimRange?: [number, number];
  liftRange?: [number, number];
  offset?: ScrollOffsetTuple;
  scaleRange?: [number, number];
  stagger?: number;
  trackingRange?: [number, number];
  weightRange?: [number, number];
}

const DEFAULT_OFFSET: ScrollOffsetTuple = ["start 0.9", "end 0.45"];

const DEFAULTS = {
  dim: [0.45, 1] as [number, number],
  lift: [0, -10] as [number, number],
  scale: [0.94, 1.12] as [number, number],
  tracking: [-0.4, 1.8] as [number, number],
  weight: [450, 800] as [number, number],
};

function KineticWord({
  word,
  index,
  total,
  progress,
  dimRange,
  liftRange,
  scaleRange,
  trackingRange,
  weightRange,
  stagger,
  reduceMotion,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  dimRange: [number, number];
  liftRange: [number, number];
  scaleRange: [number, number];
  trackingRange: [number, number];
  weightRange: [number, number];
  stagger: number;
  reduceMotion: boolean;
}) {
  const gaps = Math.max(1, total - 1);
  const spacing = Math.min(stagger, 0.72 / gaps);
  const center = (1 - spacing * gaps) / 2 + spacing * index;
  const half = Math.max(spacing * 1.2, 0.09);
  const local = useTransform(progress, [center - half, center + half], [0, 1], { clamp: true });
  const intensity = useTransform(local, (value) => 1 - Math.abs(value * 2 - 1));
  const rawScale = useTransform(intensity, [0, 1], scaleRange);
  const rawTracking = useTransform(intensity, [0, 1], trackingRange);
  const rawWeight = useTransform(intensity, [0, 1], weightRange);
  const rawLift = useTransform(intensity, [0, 1], liftRange);
  const rawOpacity = useTransform(intensity, [0, 1], dimRange);
  const spring = { type: "spring" as const, bounce: 0, duration: 0.56 };
  const scale = useSpring(rawScale, spring);
  const tracking = useTransform(useSpring(rawTracking, spring), (value) => `${value}px`);
  const weight = useTransform(useSpring(rawWeight, spring), (value) => `"wght" ${Math.round(value)}`);
  const y = useSpring(rawLift, spring);
  const opacity = useSpring(rawOpacity, spring);

  if (reduceMotion) return <span aria-hidden="true" className="inline-block">{word}</span>;
  return <motion.span aria-hidden="true" className="inline-block will-change-transform" style={{ scale, letterSpacing: tracking, fontVariationSettings: weight, y, opacity }}>{word}</motion.span>;
}

export default function KineticTypeScroll({
  words,
  align = "center",
  className,
  container,
  dimRange = DEFAULTS.dim,
  liftRange = DEFAULTS.lift,
  offset = DEFAULT_OFFSET,
  scaleRange = DEFAULTS.scale,
  stagger = 0.12,
  trackingRange = DEFAULTS.tracking,
  weightRange = DEFAULTS.weight,
}: KineticTypeScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ container, offset, target: ref });
  const alignClass = align === "start" ? "justify-start" : align === "end" ? "justify-end" : "justify-center";
  return (
    <div ref={ref} className={cn("flex flex-wrap gap-x-[0.4em] gap-y-[0.18em]", alignClass, className)}>
      <span className="sr-only">{words.join(" ")}</span>
      {words.map((word, index) => (
        <KineticWord key={`${word}-${index}`} word={word} index={index} total={words.length} progress={scrollYProgress} dimRange={dimRange} liftRange={liftRange} scaleRange={scaleRange} trackingRange={trackingRange} weightRange={weightRange} stagger={stagger} reduceMotion={reduceMotion} />
      ))}
    </div>
  );
}
