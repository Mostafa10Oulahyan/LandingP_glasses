import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Instagram, X } from 'lucide-react';
import { useFocusTrap } from '../hooks/useFocusTrap';

const images = [
  { src: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80', tag: '#CrownRiviera', tall: true },
  { src: 'https://images.unsplash.com/photo-1556015048-4d3aa10df74c?auto=format&fit=crop&w=800&q=80', tag: '#Soléa', tall: false },
  { src: 'https://images.unsplash.com/photo-1612479112139-c0f3e1ea3f06?auto=format&fit=crop&w=800&q=80', tag: '#Marina', tall: false },
  { src: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80', tag: '#Eclisse', tall: true },
  { src: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=800&q=80', tag: '#Nocturne', tall: false },
  { src: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80', tag: '#Atelier', tall: true },
  { src: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80', tag: '#Costa', tall: false },
  { src: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=800&q=80', tag: '#Brera', tall: false },
];

const ease = [0.2, 0.7, 0.2, 1] as const;

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const trapRef = useFocusTrap<HTMLDivElement>(lightbox !== null, () => setLightbox(null));

  const show = lightbox !== null;
  const go = (dir: number) =>
    setLightbox((l) => (l === null ? null : (l + dir + images.length) % images.length));

  return (
    <section id="gallery" className="relative overflow-hidden bg-bone py-[64px] md:py-[120px]">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest2 text-bordeaux-700 dark:text-gold-400">
              <span className="h-px w-8 bg-gold-400" />
              On The Street · @crowneyeoptique
            </div>
            <h2 className="max-w-[18ch] font-display kerning-tight text-[44px] leading-[1] text-ink md:text-[64px]">
              Seen in the <span className="italic text-bordeaux-700 dark:text-gold-400">wild.</span>
            </h2>
          </div>
          <a
            href="https://instagram.com"
            className="group inline-flex items-center gap-3 text-[12px] uppercase tracking-widest2 text-ink link-underline"
          >
            <Instagram size={16} />
            Follow on Instagram
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </a>
        </div>

        {/* CSS columns masonry */}
        <div className="columns-2 gap-3 md:columns-3 md:gap-4 [column-fill:_balance]">
          {images.map((img, i) => (
            <motion.button
              key={img.src}
              type="button"
              onClick={() => setLightbox(i)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease, delay: (i % 3) * 0.06 }}
              aria-label={`View ${img.tag}`}
              className="group relative mb-3 block w-full overflow-hidden rounded-2xl bg-cream md:mb-4"
            >
              <img
                src={img.src}
                alt={`Crown Eye Optique — ${img.tag}`}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06] ${
                  img.tall ? 'aspect-[3/4]' : 'aspect-square'
                }`}
              />
              <div className="absolute inset-0 bg-obsidian/0 transition-colors duration-500 group-hover:bg-obsidian/30" />
              <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-between p-4 text-porcelain opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-[11px] uppercase tracking-widest2">{img.tag}</span>
                <Instagram size={14} />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {show && (
          <div
            className="fixed inset-0 z-[120] grid place-items-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <motion.div
              className="absolute inset-0 bg-obsidian/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
            />
            <motion.div
              ref={trapRef}
              className="relative max-h-[88vh] w-full max-w-3xl"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease }}
            >
              <img
                src={images[lightbox!].src}
                alt={`Crown Eye Optique — ${images[lightbox!].tag}`}
                className="max-h-[88vh] w-full rounded-2xl object-contain"
              />
              <button
                onClick={() => setLightbox(null)}
                aria-label="Close viewer"
                className="absolute -top-12 right-0 grid h-10 w-10 place-items-center rounded-full bg-porcelain/10 text-porcelain hover:bg-porcelain/20"
              >
                <X size={18} />
              </button>
              <button
                onClick={() => go(-1)}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-porcelain/10 text-porcelain hover:bg-porcelain/20"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next image"
                className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-porcelain/10 text-porcelain hover:bg-porcelain/20"
              >
                <ChevronRight size={20} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
