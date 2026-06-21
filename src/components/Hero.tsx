import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import { useGSAP } from '../hooks/useGSAP';
import { textReveal } from '../animations/textReveal';
import { useReducedMotion } from '../hooks/useReducedMotion';
import MagneticButton from './MagneticButton';

const HERO_IMG =
  'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1400&q=80';
const HERO_ALT =
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80';

const ease = [0.2, 0.7, 0.2, 1] as const;

export default function Hero() {
  const scope = useRef<HTMLElement>(null);
  const headline = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (headline.current)
        textReveal(headline.current, { emphasisSelector: '.emph', reduced, start: 'top 95%' });
    },
    { scope, dependencies: [reduced] }
  );

  return (
    <section ref={scope} className="grain relative overflow-hidden bg-cream pb-24 md:pb-32">
      <div className="absolute right-10 top-10 z-10 hidden flex-col items-end text-[10px] uppercase tracking-widest2 text-smoke/70 md:flex">
        <span>Lookbook</span>
        <span className="mt-1 text-bordeaux-700 dark:text-gold-400">N°01 / 26</span>
      </div>

      <div className="mx-auto max-w-[1500px] px-6 pt-10 md:px-10 md:pt-20">
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-10">
          {/* Headline */}
          <div className="relative col-span-12 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease }}
              className="flex items-center gap-3 text-[11px] uppercase tracking-widest2 text-smoke"
            >
              <span className="h-px w-10 bg-gold-400" />
              The Crown Collection · 2026
            </motion.div>

            {/* Visual headline (decorative); a11y handled by sr-only h1 */}
            <h1 className="sr-only">Vision, refined.</h1>
            <div
              ref={headline}
              aria-hidden
              className="mt-6 font-display kerning-tight leading-[0.92] text-ink md:mt-8"
            >
              <span className="block text-[15vw] font-light md:text-[10.5vw] lg:text-[8.6vw]">
                Vision,
              </span>
              <span className="emph block text-[15vw] font-light italic text-bordeaux-700 dark:text-gold-400 md:text-[10.5vw] lg:text-[8.6vw]">
                refined.
              </span>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.4 }}
              className="mt-8 max-w-md text-[15px] leading-[1.7] text-smoke"
            >
              Sunglasses and optical frames, hand-finished and crowned with intention. Cut from
              premium acetate, polished for seven days, and set with Japanese titanium hinges —
              every piece numbered, every detail considered.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.55 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton>
                <a
                  href="#collections"
                  className="group inline-flex items-center gap-3 rounded-full bg-bordeaux-700 px-7 py-4 text-[12px] uppercase tracking-widest2 text-white transition-colors hover:bg-bordeaux-800"
                >
                  Shop the collection
                  <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" />
                </a>
              </MagneticButton>
              <a
                href="#best"
                className="group inline-flex items-center gap-3 rounded-full border border-ink/15 px-7 py-4 text-[12px] uppercase tracking-widest2 text-ink transition-colors hover:border-ink/40"
              >
                Explore new arrivals
                <span className="h-1 w-1 rounded-full bg-gold-400 transition-all duration-500 group-hover:w-6" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease, delay: 0.75 }}
              className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-widest2 text-smoke"
            >
              <span className="flex items-center gap-2"><Dot /> Free worldwide shipping</span>
              <span className="flex items-center gap-2"><Dot /> Lifetime repair</span>
              <span className="flex items-center gap-2"><Dot /> Secure checkout</span>
            </motion.div>
          </div>

          {/* Image stack */}
          <div className="relative col-span-12 min-h-[420px] lg:col-span-5 lg:min-h-[640px]">
            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease }}
              className="absolute right-0 top-0 aspect-[3/4] w-[78%] overflow-hidden rounded-[28px] bg-bone shadow-[0_30px_80px_-30px_rgba(14,13,11,0.45)]"
            >
              <img
                src={HERO_IMG}
                alt="Model wearing Crown Eye Optique acetate sunglasses"
                className="h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-porcelain">
                <div>
                  <div className="text-[10px] uppercase tracking-widest2 opacity-80">N°07 — The Crown</div>
                  <div className="mt-1 font-display text-2xl">Eclisse</div>
                </div>
                <div className="text-[11px] uppercase tracking-widest2">$ 385</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease, delay: 0.35 }}
              className="absolute bottom-0 left-0 aspect-[4/5] w-[58%] overflow-hidden rounded-[24px] bg-sand shadow-[0_24px_60px_-30px_rgba(14,13,11,0.4)]"
            >
              <img
                src={HERO_ALT}
                alt="Crown Eye Optique tortoise acetate sunglasses on linen"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease, delay: 0.6 }}
              className="glass absolute bottom-6 right-2 flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-cream lg:bottom-16 lg:right-4"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-bordeaux-700 text-white">
                <Play size={14} fill="currentColor" />
              </span>
              <span className="text-left">
                <span className="block text-[10px] uppercase tracking-widest2 text-smoke">Atelier film</span>
                <span className="block text-[12px] font-medium text-ink">Inside the workshop — 02:14</span>
              </span>
            </motion.button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-[1500px] px-6 md:mt-28 md:px-10">
        <div className="gold-rule" />
      </div>
    </section>
  );
}

function Dot() {
  return <span className="inline-block h-[5px] w-[5px] rounded-full bg-gold-400" />;
}
