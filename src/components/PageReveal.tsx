import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

const KEY = 'ceo-revealed';
const ease = [0.76, 0, 0.24, 1] as const;

/**
 * One-time load reveal: logo + wordmark mask, then a panel wipe.
 * Skipped on repeat visits (sessionStorage) and under reduced motion.
 */
export default function PageReveal() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !sessionStorage.getItem(KEY);
  });

  useEffect(() => {
    if (!show) return;
    if (reduced) {
      setShow(false);
      sessionStorage.setItem(KEY, '1');
      return;
    }
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(KEY, '1');
    }, 1700);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, [show, reduced]);

  return (
    <AnimatePresence onExitComplete={() => (document.body.style.overflow = '')}>
      {show && (
        <motion.div
          key="reveal"
          className="fixed inset-0 z-[200] grid place-items-center bg-porcelain"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease }}
        >
          <div className="flex flex-col items-center">
            <motion.img
              src="/ndadr-removebg-preview.png"
              alt="Crown Eye Optique"
              className="h-36 w-auto select-none"
              initial={{ opacity: 0, scale: 0.92, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease }}
            />
            <motion.span
              className="mt-2 block h-px bg-gold-400"
              initial={{ width: 0 }}
              animate={{ width: 140 }}
              transition={{ duration: 0.8, ease, delay: 0.4 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
