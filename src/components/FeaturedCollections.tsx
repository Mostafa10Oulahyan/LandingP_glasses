import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader';
import SmartImage from './SmartImage';
import { useGSAP } from '../hooks/useGSAP';
import { scrollReveal } from '../animations/scrollReveal';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { cn } from '../utils/cn';

const collections = [
  {
    no: '01',
    name: 'The Riviera',
    blurb: 'Sun-soaked silhouettes for the Mediterranean.',
    image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=900&q=80',
    pieces: 24,
    dark: false,
    tone: 'bg-sand',
  },
  {
    no: '02',
    name: 'The Atelier',
    blurb: 'Optical frames cut from honey acetate.',
    image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=900&q=80',
    pieces: 18,
    dark: false,
    tone: 'bg-bone',
  },
  {
    no: '03',
    name: 'Noir Edition',
    blurb: 'Architectural shapes in deep obsidian.',
    image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=900&q=80',
    pieces: 12,
    dark: true,
    tone: 'bg-obsidian',
  },
];

export default function FeaturedCollections() {
  const grid = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (grid.current) scrollReveal(grid.current, ':scope > *', { reduced, y: 44, stagger: 0.1 });
    },
    { scope: grid, dependencies: [reduced] }
  );

  return (
    <section id="collections" className="relative bg-cream py-[64px] md:py-[120px]">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <SectionHeader
          eyebrow="Featured Collections"
          title={
            <>
              Three chapters.{' '}
              <span className="italic text-bordeaux-700 dark:text-gold-400">One house.</span>
            </>
          }
          description="Each collection is conceived around a single idea — a place, a mood, a material — and produced in a strictly limited run."
          cta={{ href: '#best', label: 'View all collections' }}
        />

        <div ref={grid} className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-3 md:gap-8">
          {collections.map((c) => (
            <a
              href="#best"
              key={c.no}
              className={cn(
                'group relative overflow-hidden rounded-[28px] lift',
                c.tone,
                c.dark ? 'text-porcelain' : 'text-ink'
              )}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <SmartImage
                  src={c.image}
                  alt={`${c.name} collection — Crown Eye Optique`}
                  className="duration-[1.2s] transition-transform ease-out group-hover:scale-[1.06]"
                />
              </div>
              {c.dark && (
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" />
              )}

              <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                <div className="flex items-start justify-between">
                  <span className="text-[11px] uppercase tracking-widest2 opacity-80">N°{c.no}</span>
                  <span className="text-[11px] uppercase tracking-widest2 opacity-80">{c.pieces} pieces</span>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-display text-[34px] leading-none md:text-[40px]">{c.name}</h3>
                    <p
                      className={cn(
                        'mt-2 max-w-[20ch] text-[13px]',
                        c.dark ? 'text-porcelain/70' : 'text-ink/65'
                      )}
                    >
                      {c.blurb}
                    </p>
                  </div>
                  <span
                    className={cn(
                      'grid h-12 w-12 place-items-center rounded-full transition-all duration-500 group-hover:scale-110',
                      c.dark ? 'bg-porcelain text-obsidian' : 'bg-bordeaux-700 text-white'
                    )}
                  >
                    <ArrowUpRight size={18} className="transition-transform duration-500 group-hover:rotate-45" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
