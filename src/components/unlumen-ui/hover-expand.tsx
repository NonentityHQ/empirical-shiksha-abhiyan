import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

export interface HoverExpandItem {
  label: string;
  image: string;
  sublabel?: string;
  description?: string;
  imageAlt?: string;
  accent?: string;
  tint?: string;
  href?: string;
}

export interface HoverExpandProps {
  items: HoverExpandItem[];
  collapsedHeight?: number;
  expandedHeight?: number;
  className?: string;
  onNavigate?: (href: string) => void;
}

/**
 * Quiet-by-default image accordion. Photos are revealed only on hover/focus/tap;
 * navigation is kept on a separate arrow control so revealing never changes route.
 */
export function HoverExpand({
  items,
  collapsedHeight = 78,
  expandedHeight = 196,
  className = "",
  onNavigate,
}: HoverExpandProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const rowSpring = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 245, damping: 30, mass: 0.9 };

  return (
    <div
      className={`w-full space-y-2.5 ${className}`}
      onPointerLeave={() => setActiveIndex(null)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setActiveIndex(null);
        }
      }}
    >
      {items.map((item, index) => {
        const isActive = activeIndex === index;
        const hasActive = activeIndex !== null;
        const accent = item.accent ?? "#1f5fd1";
        const tint = item.tint ?? "#edf3ff";

        return (
          <motion.div
            key={`${item.label}-${index}`}
            initial={false}
            onHoverStart={() => setActiveIndex(index)}
            onFocusCapture={() => setActiveIndex(index)}
            animate={{
              height: isActive ? expandedHeight : collapsedHeight,
              opacity: hasActive && !isActive ? 0.76 : 1,
            }}
            transition={{
              height: rowSpring,
              opacity: reduceMotion ? { duration: 0 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
            }}
            className="group relative isolate w-full overflow-hidden rounded-[22px] border border-slate-200/80 shadow-[0_10px_28px_-23px_rgba(12,36,97,.42)] outline-none"
            style={{ backgroundColor: tint }}
          >
            {/* The real photo stays fully hidden until the row is explored. */}
            <motion.img
              src={item.image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 1.055 }}
              transition={reduceMotion ? { duration: 0 } : { opacity: { duration: 0.42 }, scale: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }}
            />
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.32 }}
              style={{ background: "linear-gradient(100deg, rgba(7,24,58,.9) 0%, rgba(7,24,58,.62) 50%, rgba(7,24,58,.18) 100%)" }}
            />

            {/* Brand-colour accent and soft geometric detail in the resting state. */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -top-12 h-36 w-36 rounded-full border-[14px]"
              animate={{ opacity: isActive ? 0 : 0.18, scale: isActive ? 0.9 : 1 }}
              transition={rowSpring}
              style={{ borderColor: accent }}
            />

            <button
              type="button"
              aria-expanded={isActive}
              aria-label={`${isActive ? "Collapse" : "Explore"} ${item.sublabel ?? item.label}`}
              onClick={() => setActiveIndex((current) => (current === index ? null : index))}
              className="absolute inset-0 z-10 flex w-full items-center pr-20 pl-5 text-left outline-none focus-visible:ring-4 focus-visible:ring-[#f2611c]/35 sm:pl-7"
            >
              <span className="relative z-10 block min-w-0">
                {item.sublabel && (
                  <span
                    className={`mb-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] transition-colors duration-300 sm:text-[11px] ${isActive ? "text-white/75" : "text-slate-500"}`}
                  >
                    {item.sublabel}
                  </span>
                )}
                <span
                  className={`block font-display text-[18px] font-extrabold leading-tight transition-colors duration-300 sm:text-[21px] ${isActive ? "text-white" : "text-[#12307a]"}`}
                >
                  {item.label}
                </span>
                {item.description && (
                  <motion.span
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 7, maxHeight: isActive ? 64 : 0 }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.36, delay: isActive ? 0.06 : 0, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-2 block max-w-2xl overflow-hidden text-[12px] leading-[1.65] text-white/90 sm:text-[13px]"
                  >
                    {item.description}
                  </motion.span>
                )}
              </span>
            </button>

            {/* Only this arrow navigates; the row itself just reveals the image. */}
            <button
              type="button"
              aria-label={`Open ${item.sublabel ?? item.label} page`}
              title={`Open ${item.sublabel ?? item.label}`}
              onClick={() => onNavigate?.(item.href ?? "initiatives")}
              className={`absolute right-4 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#f2611c]/40 sm:right-5 ${isActive ? "border-white/45 bg-white/20 text-white shadow-lg backdrop-blur-sm hover:bg-white/30" : "border-white bg-white text-[#12307a] shadow-sm hover:-translate-y-[55%] hover:shadow-md"}`}
            >
              <span className="text-xl leading-none" aria-hidden="true">→</span>
            </button>
          </motion.div>
        );
      })}
    </div>
  );
}

export default HoverExpand;
