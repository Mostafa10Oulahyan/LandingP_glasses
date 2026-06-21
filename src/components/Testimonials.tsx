import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const quotes = [
  {
    body: 'I’ve worn a lot of frames. None have ever felt this considered. The hinge action alone is unlike anything off the shelf — and the case is the kind of object you keep on your nightstand.',
    name: 'Margaux Lévêque',
    title: 'Editor-in-Chief, RIVAGE Paris',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    pair: 'Eclisse · N°014',
  },
  {
    body: 'A real house, with a real point of view. They re-cut my optical frames after a year of daily wear at no charge. That is what lifetime repair actually looks like.',
    name: 'Hideo Yamashiro',
    title: 'Architect, Kyoto',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=300&q=80',
    pair: 'Marina · N°027',
  },
  {
    body: 'The Soléa is the most flattering pair of sunglasses I’ve ever owned. The honey acetate catches the light like polished amber. They photograph as well as they wear.',
    name: 'Aïsha Conté',
    title: 'Creative Director, Lagos',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=300&q=80',
    pair: 'Soléa · N°032',
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const q = quotes[i];

  const next = () => setI((p) => (p + 1) % quotes.length);
  const prev = () => setI((p) => (p - 1 + quotes.length) % quotes.length);

  const timer = useRef<number | null>(null);
  useEffect(() => {
    if (reduced || paused) return;
    timer.current = window.setInterval(next, 6000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [reduced, paused]);

  return (
    <section
      className="relative overflow-hidden bg-obsidian py-[64px] text-porcelain md:py-[120px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(900px_500px_at_70%_-10%,rgba(117,31,43,0.4),transparent_60%)]" />

      <div className="relative mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest2 text-gold-400">
              <span className="h-px w-8 bg-gold-400" />
              Customer Voices
            </div>
            <h2 className="max-w-[16ch] font-display kerning-tight text-[44px] leading-[1] md:text-[64px]">
              Worn, and <span className="italic text-gold-400">remembered.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 text-porcelain/80">
            <span className="mr-2 text-[11px] uppercase tracking-widest2 text-porcelain/60">
              {String(i + 1).padStart(2, '0')} / {String(quotes.length).padStart(2, '0')}
            </span>
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-porcelain/15 transition-colors hover:bg-porcelain/5"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-porcelain/15 transition-colors hover:bg-porcelain/5"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-12 items-center gap-10">
          <div className="relative col-span-12 min-h-[260px] md:col-span-7">
            <Quote className="absolute -left-2 -top-6 text-gold-400/40" size={64} />
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <p className="font-display text-[26px] leading-[1.3] text-porcelain md:text-[34px]">
                  “{q.body}”
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <img
                    src={q.image}
                    alt={q.name}
                    className="h-12 w-12 rounded-full border border-gold-400/40 object-cover"
                    loading="lazy"
                  />
                  <div>
                    <div className="text-[14px] font-medium text-porcelain">{q.name}</div>
                    <div className="text-[11px] uppercase tracking-widest2 text-porcelain/60">{q.title}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="col-span-12 grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-porcelain/10 bg-porcelain/10 md:col-span-5">
            <Stat label="Average rating" value="4.92" sub="from 3,420 reviews" />
            <Stat label="Re-purchase rate" value="68%" sub="of clients return" />
            <Stat label="Press features" value="120+" sub="across 14 countries" />
            <Stat label="Lifetime repairs" value="∞" sub="for every frame" />
            <div className="col-span-2 flex items-center justify-between bg-obsidian/60 p-5">
              <div className="flex items-center gap-1 text-gold-400">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} size={14} fill="currentColor" />
                ))}
              </div>
              <div className="text-[11px] uppercase tracking-widest2 text-porcelain/70">{q.pair}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-obsidian p-6">
      <div className="text-[10px] uppercase tracking-widest2 text-porcelain/50">{label}</div>
      <div className="mt-2 font-display text-[40px] leading-none text-gold-400">{value}</div>
      <div className="mt-2 text-[11px] text-porcelain/60">{sub}</div>
    </div>
  );
}
