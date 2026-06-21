import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import ScrollProgressRing from './ScrollProgressRing';
import { useLenis } from '../hooks/useLenis';

/**
 * Back-to-top control that wraps the scroll-progress ring (the ring doubles as
 * the trigger target). Fades in past 300px.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
          className="relative grid h-12 w-12 place-items-center rounded-full bg-cream text-ink shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)] ring-1 ring-ink/10"
        >
          <ScrollProgressRing />
          <ArrowUp size={16} className="relative" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
