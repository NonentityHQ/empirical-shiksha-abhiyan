import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BookOpen, CalendarDays, HandHeart, HelpCircle, HeartHandshake, MessageCircle, Users } from "lucide-react";
import { useState } from "react";

const iconMap = { BookOpen, CalendarDays, HandHeart, HelpCircle, HeartHandshake, MessageCircle, Users };
type FaqIcon = keyof typeof iconMap;
export interface FaqItem { question: string; answer: string; icon: FaqIcon | string }
export interface FaqCategory { id: string; name: string; faqs: FaqItem[] }
export interface FaqsGridProps { title?: string; description?: string; categories?: FaqCategory[] }

const defaultCategories: FaqCategory[] = [
  { id: "general", name: "General", faqs: [
    { question: "What is this organisation?", answer: "A community-led initiative focused on education, cleanliness, environment and well-being.", icon: "HelpCircle" },
  ] },
];

export function FaqsGrid({
  title = "Questions people ask us",
  description = "Clear answers about our work, programmes and how the community can get involved.",
  categories = defaultCategories,
}: FaqsGridProps) {
  const [activeTab, setActiveTab] = useState(0);
  const reduceMotion = useReducedMotion();
  const activeCategory = categories[Math.min(activeTab, Math.max(0, categories.length - 1))];

  if (!categories.length) return null;

  return (
    <section className="bg-transparent py-2 md:py-4">
      <div className="mx-auto max-w-5xl px-4 sm:px-5">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[28px] font-extrabold text-[#12307a] sm:text-[32px]">{title}</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-slate-600 sm:text-[15px]">{description}</p>
        </div>
        <div className="mt-7 border-b border-[#dbe5f4]">
          <div role="tablist" aria-label="Frequently asked question categories" className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                type="button"
                role="tab"
                id={`faq-tab-${category.id}`}
                aria-selected={activeTab === index}
                aria-controls={`faq-panel-${category.id}`}
                tabIndex={activeTab === index ? 0 : -1}
                onClick={() => setActiveTab(index)}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className={`relative rounded-t-xl px-4 py-3 text-[13px] font-extrabold transition-colors ${activeTab === index ? "text-[#f2611c]" : "text-slate-500 hover:text-[#12307a]"}`}
              >
                {category.name}
                {activeTab === index && <motion.span layoutId="empirical-faq-tab" className="absolute inset-x-2 bottom-0 h-[3px] rounded-full bg-[#f2611c]" transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 34 }} />}
              </motion.button>
            ))}
          </div>
        </div>
        <div className="mt-7">
          <AnimatePresence mode="wait">
            <motion.dl
              key={activeCategory.id}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.48, ease: "easeOut" }}
              id={`faq-panel-${activeCategory.id}`}
              role="tabpanel"
              aria-labelledby={`faq-tab-${activeCategory.id}`}
              className="grid gap-x-8 gap-y-7 sm:grid-cols-2"
            >
              {activeCategory.faqs.map((faq, index) => {
                const Icon = iconMap[faq.icon as FaqIcon] ?? HelpCircle;
                return (
                  <motion.div
                    key={`${activeCategory.id}-${faq.question}`}
                    initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.58, delay: index * 0.09 }}
                    className="rounded-[20px] border border-[#e3eaf5] bg-white/90 p-5 shadow-[0_10px_30px_-24px_rgba(18,48,122,.35)]"
                  >
                    <dt className="flex items-start gap-3 font-display text-[16px] font-extrabold leading-snug text-[#12307a]">
                      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-xl bg-[#fff0e5] text-[#f2611c]"><Icon className="size-4" aria-hidden="true" /></span>
                      {faq.question}
                    </dt>
                    <dd className="mt-3 pl-11 text-[14px] leading-relaxed text-slate-600">{faq.answer}</dd>
                  </motion.div>
                );
              })}
            </motion.dl>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default FaqsGrid;
