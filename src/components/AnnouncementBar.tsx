import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const messages = [
  'Complimentary worldwide shipping on orders over $180',
  'Hand-finished frames — every pair signed and numbered',
  'Free returns within 30 days · Lifetime frame repair',
  'New: The Crown Edition — limited to 240 pieces',
];

export default function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % messages.length), 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-bordeaux-700 text-porcelain/90 text-[11px] tracking-widest2 uppercase">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10 h-9 flex items-center justify-between gap-6">
        <span className="hidden md:inline text-gold-400">N°01 / 26 — The Crown Index</span>
        <div className="flex-1 text-center overflow-hidden h-9 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={i}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
              className="font-medium"
            >
              {messages[i]}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="hidden md:inline text-porcelain/60">EN · USD</span>
      </div>
    </div>
  );
}
