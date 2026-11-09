import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

export interface BottomUpLettersProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  triggerOnView?: boolean;
}

const EASE = [0.18, 1, 0.32, 1] as const;

export default function BottomUpLetters({
  children,
  className = "",
  delay = 0,
  stagger = 88,
  triggerOnView = false,
}: BottomUpLettersProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const play = (!triggerOnView || inView) && !reduceMotion;
  const characters = Array.from(children);
  const effectiveStagger = Math.max(56, stagger * 1.6);

  return (
    <span aria-label={children} className={className} ref={ref}>
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          aria-hidden="true"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 46 }}
          animate={play ? { opacity: 1, y: 0 } : undefined}
          transition={reduceMotion ? { duration: 0 } : { delay: delay / 1000 + (index * effectiveStagger) / 1000, duration: 0.66, ease: EASE }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}
