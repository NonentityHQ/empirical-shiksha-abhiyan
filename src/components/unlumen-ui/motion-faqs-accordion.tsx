import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState, type ReactNode } from "react";

export interface MotionAccordionItem {
  question: ReactNode;
  answer: ReactNode;
}

export interface MotionAccordionProps {
  items: MotionAccordionItem[];
  gap?: number;
  className?: string;
}

/**
 * Single-open FAQ accordion. The measured auto-height reveal uses a calm,
 * deliberately damped spring and respects the user's reduced-motion setting.
 */
export function MotionAccordion({ items, gap = 10, className = "" }: MotionAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const instanceId = useId().replace(/:/g, "");

  if (!items.length) return null;

  const spring = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 245, damping: 28, mass: 0.88 };

  return (
    <div className={`w-full ${className}`} style={{ display: "grid", gap }}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${instanceId}-faq-trigger-${index}`;
        const panelId = `${instanceId}-faq-panel-${index}`;

        return (
          <motion.div
            key={`${instanceId}-${index}`}
            layout={!reduceMotion}
            className={`overflow-hidden rounded-[20px] border transition-colors ${
              isOpen
                ? "border-[#f4b184] bg-white shadow-[0_14px_34px_-25px_rgba(18,48,122,.36)]"
                : "border-[#e1e9f4] bg-white/85 hover:border-[#c9d9f0]"
            }`}
            transition={spring}
          >
            <button
              id={triggerId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex((current) => (current === index ? null : index))}
              className="flex w-full items-center justify-between gap-5 px-5 py-[19px] text-left sm:px-6 sm:py-5"
            >
              <span className="min-w-0 font-display text-[15px] font-extrabold leading-relaxed text-[#12307a] sm:text-[16px]">
                {item.question}
              </span>
              <motion.span
                aria-hidden="true"
                animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? "#fff0e5" : "#edf3fc" }}
                transition={spring}
                className="grid size-9 shrink-0 place-items-center rounded-full text-[#f2611c]"
              >
                <Plus className="size-[18px]" strokeWidth={2.2} />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={reduceMotion ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0, y: 5 }}
                  animate={{ height: "auto", opacity: 1, y: 0 }}
                  exit={reduceMotion ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0, y: 3 }}
                  transition={reduceMotion ? { duration: 0 } : {
                    height: { type: "spring", stiffness: 245, damping: 28, mass: 0.88 },
                    opacity: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
                    y: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
                  }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-[#edf1f7] px-5 pb-5 pt-4 text-[14px] leading-[1.8] text-slate-600 sm:px-6 sm:pb-6 sm:pt-5 sm:text-[15px]">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

export default MotionAccordion;
