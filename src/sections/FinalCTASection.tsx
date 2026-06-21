import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useGSAP } from '../hooks/useGSAP';
import { parallax } from '../animations/parallax';
import { useReducedMotion } from '../hooks/useReducedMotion';
import MagneticButton from '../components/MagneticButton';

const BG =
  'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1800&q=80';

export default function FinalCTASection() {
  const root = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (img.current) parallax(img.current, { amount: 22, reduced });
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <section
      ref={root}
      className="relative isolate overflow-hidden bg-obsidian py-[96px] text-porcelain md:py-[160px]"
    >
      {/* Parallax background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          ref={img}
          src={BG}
          alt=""
          aria-hidden
          className="h-[130%] w-full object-cover opacity-50"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/55 to-obsidian/85" />
      </div>

      <div className="mx-auto max-w-[1500px] px-6 text-center md:px-10">
        <div className="mx-auto flex items-center justify-center gap-3 text-[11px] uppercase tracking-widest2 text-gold-400">
          <span className="h-px w-8 bg-gold-400" />
          The Crown Awaits
          <span className="h-px w-8 bg-gold-400" />
        </div>

        <h2
          className="mx-auto mt-8 max-w-[14ch] font-display font-light kerning-tight leading-[0.95]"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
        >
          Elevate Your <span className="italic text-gold-400">Vision</span>
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-[15px] leading-[1.8] text-porcelain/70">
          Frames worth keeping for a lifetime — hand-finished, numbered, and crowned with
          intention. Find the pair that becomes yours.
        </p>

        <div className="mt-12 flex justify-center">
          <MagneticButton>
            <a
              href="#collections"
              className="group inline-flex items-center gap-3 rounded-full bg-gold-400 px-9 py-5 text-[12px] uppercase tracking-widest2 text-gold-900 transition-colors hover:bg-gold-500"
            >
              Shop the collection
              <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" />
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
