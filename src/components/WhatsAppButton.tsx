import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const PHONE = '15551234567'; // replace with the boutique's WhatsApp number
const MESSAGE = encodeURIComponent('Hello Crown Eye Optique — I have a question about your eyewear.');

/** Fixed WhatsApp concierge button, fades in past 300px. */
export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={`https://wa.me/${PHONE}?text=${MESSAGE}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
          className="grid h-12 w-12 place-items-center rounded-full bg-bordeaux-700 text-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)] transition-colors hover:bg-bordeaux-800"
        >
          <MessageCircle size={20} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
