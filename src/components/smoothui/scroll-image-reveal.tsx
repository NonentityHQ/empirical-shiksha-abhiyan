import { cn } from "@/lib/utils";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import type { RefObject } from "react";
import { useRef } from "react";

export type ScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];
export type ScrollImageRevealMask = "wipe" | "curtain" | "circle" | "blinds" | "scale";
export type ScrollImageRevealDirection = "left" | "right" | "up" | "down";

export interface ScrollImageRevealProps {
  alt: string;
  className?: string;
  container?: RefObject<HTMLElement | null>;
  direction?: ScrollImageRevealDirection;
  mask?: ScrollImageRevealMask;
  offset?: ScrollOffset;
  once?: boolean;
  parallax?: number;
  rounded?: string;
  src: string;
}

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const BLIND_BAND = 40;
const DEFAULT_OFFSET: ScrollOffset = ["start 0.9", "end 0.6"];

function clipFor(mask: ScrollImageRevealMask, direction: ScrollImageRevealDirection, progress: number) {
  const hidden = (1 - progress) * 100;
  if (mask === "wipe") return direction === "right" ? `inset(0% 0% 0% ${hidden}%)` : `inset(0% ${hidden}% 0% 0%)`;
  if (mask === "curtain") return direction === "down" ? `inset(${hidden}% 0% 0% 0%)` : `inset(0% 0% ${hidden}% 0%)`;
  if (mask === "circle") return `circle(${progress * 90}% at 50% 50%)`;
  return "inset(0% 0% 0% 0%)";
}

export default function ScrollImageReveal({
  src,
  alt,
  mask = "wipe",
  direction = "left",
  parallax = 50,
  offset = DEFAULT_OFFSET,
  container,
  once = true,
  rounded = "rounded-2xl",
  className,
}: ScrollImageRevealProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const maxProgress = useRef(0);
  const { scrollYProgress } = useScroll({ container, offset, target: frameRef });
  const spring = useSpring(scrollYProgress, { damping: 32, mass: 0.4, stiffness: 260 });
  const progress = useTransform(spring, (latest) => {
    const current = clamp(latest * 2.5);
    if (!once) return current;
    maxProgress.current = Math.max(maxProgress.current, current);
    return maxProgress.current;
  });
  const clipPath = useTransform(progress, (value) => reduceMotion || mask === "blinds" || mask === "scale" ? "inset(0% 0% 0% 0%)" : clipFor(mask, direction, value));
  const maskImage = useTransform(progress, (value) => {
    if (reduceMotion || mask !== "blinds") return "none";
    const reveal = clamp(value) * BLIND_BAND;
    const axis = direction === "left" || direction === "right" ? "to right" : "to bottom";
    return `repeating-linear-gradient(${axis}, #000 0px, #000 ${reveal}px, transparent ${reveal}px, transparent ${BLIND_BAND}px)`;
  });
  const scale = useTransform(progress, (value) => reduceMotion || mask !== "scale" ? 1 : 1.12 - 0.12 * clamp(value));
  const opacity = useTransform(progress, (value) => reduceMotion || mask !== "scale" ? 1 : clamp(value));
  const overscan = reduceMotion ? 0 : Math.abs(parallax);
  const y = useTransform(spring, (value) => reduceMotion ? 0 : overscan - value * overscan * 2);

  return (
    <motion.div
      ref={frameRef}
      className={cn("relative overflow-hidden", rounded, className)}
      style={{ clipPath, maskImage, WebkitMaskImage: maskImage }}
    >
      <motion.img
        src={src}
        alt={alt}
        decoding="async"
        className="absolute inset-x-0 w-full object-cover"
        style={{ height: `calc(100% + ${overscan * 2}px)`, top: -overscan, y, scale, opacity }}
      />
    </motion.div>
  );
}
