import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqs = [
  {
    q: 'How long does shipping take?',
    a: 'Complimentary express shipping arrives in 2–5 business days worldwide, dispatched in a reusable case with full tracking. Orders over $180 ship free.',
  },
  {
    q: 'What is your returns policy?',
    a: 'Wear them on your own terms for 30 days. If the fit isn’t right, we cover the return and the re-cut — a full refund or exchange, no questions asked.',
  },
  {
    q: 'What materials are the frames made from?',
    a: 'Every frame is cut from premium Mazzucchelli acetate or feather-light Japanese titanium, finished with gold-pin hinges and Carl Zeiss-ready lenses.',
  },
  {
    q: 'How do I find the right size and fit?',
    a: 'Each listing shows lens–bridge measurements in millimetres. Share your current frame size or face width via WhatsApp and our opticians will recommend the ideal fit.',
  },
  {
    q: 'Can I add prescription lenses?',
    a: 'Yes. Every optical and most sun styles accept single-vision or progressive prescription lenses, fitted by our in-house lab before dispatch.',
  },
];

const ease = [0.2, 0.7, 0.2, 1] as const;

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-cream py-[64px] md:py-[120px]">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest2 text-bordeaux-700 dark:text-gold-400">
            <span className="h-px w-8 bg-gold-400" />
            Questions
          </div>
          <h2 className="mt-6 font-display kerning-tight text-[40px] leading-[1] md:text-[56px]">
            Everything you <span className="italic text-bordeaux-700 dark:text-gold-400">need to know.</span>
          </h2>
          <p className="mt-6 max-w-sm text-[14.5px] leading-[1.7] text-smoke">
            Still curious? Our opticians answer within the hour on WhatsApp.
          </p>
        </div>

        <div className="md:col-span-8">
          <ul className="flex flex-col">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q} className="border-b border-ink/10">
                  <motion.button
                    layout
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-[20px] leading-snug md:text-[24px]">
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 135 : 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/15 text-bordeaux-700 dark:text-gold-400"
                    >
                      <Plus size={16} />
                    </motion.span>
                  </motion.button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 text-[15px] leading-[1.8] text-smoke">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
