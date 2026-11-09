import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

export interface BlurOutUpProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  triggerOnView?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BlurOutUp({
  children,
  className = "",
  delay = 0,
  stagger = 28,
  triggerOnView = false,
}: BlurOutUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const play = (!triggerOnView || inView) && !reduceMotion;
  const words = children.split(" ");
  const effectiveStagger = Math.max(40, stagger * 1.45);

  return (
    <span aria-label={children} className={className} ref={ref}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <motion.span
            aria-hidden="true"
            initial={reduceMotion ? { opacity: 1 } : { filter: "blur(6px)", opacity: 0, y: 10 }}
            animate={play ? { filter: "blur(0px)", opacity: 1, y: 0 } : undefined}
            transition={reduceMotion ? { duration: 0 } : { delay: delay / 1000 + (index * effectiveStagger) / 1000, duration: 0.86, ease: EASE }}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 && <span aria-hidden="true" style={{ display: "inline-block", whiteSpace: "pre" }}> </span>}
        </span>
      ))}
    </span>
  );
}
