import { useEffect, useMemo, useRef, useState } from "react";

type ParsedMetric = {
  prefix: string;
  target: number;
  suffix: string;
  decimals: number;
};

function parseMetric(value: string): ParsedMetric | null {
  const match = value.trim().match(/^([^0-9]*)([0-9][0-9,]*(?:\.[0-9]+)?)(.*)$/);
  if (!match) return null;
  const numeric = Number(match[2].replace(/,/g, ""));
  if (!Number.isFinite(numeric)) return null;
  const decimalPart = match[2].split(".")[1] ?? "";
  return { prefix: match[1], target: numeric, suffix: match[3], decimals: decimalPart.length };
}

/** Accessible, one-shot count-up for numeric feature/stat values. */
export default function CountUpValue({
  value,
  duration = 1050,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const parsed = useMemo(() => parseMetric(value), [value]);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!parsed) return;
    const node = nodeRef.current;
    if (!node) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      setCurrent(parsed.target);
      return;
    }

    let frame = 0;
    let observer: IntersectionObserver | undefined;
    const startCount = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 4);
        setCurrent(progress >= 1 ? parsed.target : parsed.target * eased);
        if (progress < 1) frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
    };

    observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer?.disconnect();
      startCount();
    }, { threshold: 0.45, rootMargin: "0px 0px 4% 0px" });

    observer.observe(node);
    return () => {
      observer?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [parsed?.target, duration]);

  if (!parsed) return <span className={className}>{value}</span>;

  const formatted = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: parsed.decimals,
    maximumFractionDigits: parsed.decimals,
  }).format(current);

  return (
    <span ref={nodeRef} className={className} aria-label={value}>
      {parsed.prefix}{formatted}{parsed.suffix}
    </span>
  );
}
