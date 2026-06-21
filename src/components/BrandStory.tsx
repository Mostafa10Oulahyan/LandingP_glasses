import { useRef } from 'react';
import { gsap, useGSAP } from '../hooks/useGSAP';

const chapters = [
  {
    no: '01',
    title: 'Slow eyewear, made well.',
    body: 'Crown Eye Optique was founded on a simple conviction: a pair of glasses deserves the patience of a fine watch and the honesty of a well-made shoe.',
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1100&q=80',
  },
  {
    no: '02',
    title: 'Cut by hand.',
    body: 'Every frame is cut from a single block of premium acetate, then polished across seven days until the surface holds light like glass.',
    image: 'https://images.unsplash.com/photo-1556306535-38febf6782e7?auto=format&fit=crop&w=1100&q=80',
  },
  {
    no: '03',
    title: 'Crowned and numbered.',
    body: 'Gold-pin hinges, a bordeaux signature inside the temple, and a number that is yours alone. Made to be kept — and repaired — for life.',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1100&q=80',
  },
];

export default function BrandStory() {
  const root = useRef<HTMLDivElement>(null);
  const horizontal = useRef<HTMLDivElement>(null);
  const vertical = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        // switch to the horizontal experience
        gsap.set(vertical.current, { display: 'none' });
        gsap.set(horizontal.current, { display: 'block' });

        const trackEl = track.current!;
        const distance = trackEl.scrollWidth - window.innerWidth;

        gsap.to(trackEl, {
          x: -distance,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="story" className="relative overflow-hidden bg-cream">
      {/* Horizontal (desktop, motion) — hidden until matchMedia enables it */}
      <div ref={horizontal} style={{ display: 'none' }} className="h-screen">
        <div ref={track} className="flex h-screen w-max items-stretch">
          {/* Intro panel */}
          <div className="flex h-screen w-screen shrink-0 flex-col justify-center px-[8vw]">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest2 text-bordeaux-700 dark:text-gold-400">
              <span className="h-px w-8 bg-gold-400" />
              The House of Crown Eye Optique
            </div>
            <h2 className="mt-6 max-w-[14ch] font-display kerning-tight text-[clamp(2.5rem,6vw,5rem)] leading-[0.95]">
              An atelier, <span className="italic text-bordeaux-700 dark:text-gold-400">in three chapters.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-[1.8] text-smoke">
              Scroll to move through the making of a frame — from raw block to crowned, numbered
              object.
            </p>
            <span className="mt-10 inline-flex items-center gap-2 text-[11px] uppercase tracking-widest2 text-smoke">
              Scroll <span className="h-px w-10 bg-gold-400" /> →
            </span>
          </div>

          {/* Chapter panels */}
          {chapters.map((c) => (
            <article
              key={c.no}
              className="flex h-screen w-[72vw] shrink-0 items-center gap-10 px-[4vw]"
            >
              <div className="h-[64vh] w-1/2 overflow-hidden rounded-[28px] bg-bone">
                <img src={c.image} alt={c.title} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="w-1/2">
                <span className="font-display text-[clamp(3rem,8vw,7rem)] leading-none text-bordeaux-700/15 dark:text-gold-400/20">
                  {c.no}
                </span>
                <h3 className="mt-2 font-display kerning-tight text-[clamp(2rem,4vw,3.5rem)] leading-[1]">
                  {c.title}
                </h3>
                <p className="mt-5 max-w-md text-[15.5px] leading-[1.8] text-smoke">{c.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Vertical fallback (mobile + reduced motion) */}
      <div ref={vertical} className="mx-auto max-w-[1500px] px-6 py-[64px] md:px-10 md:py-[120px]">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest2 text-bordeaux-700 dark:text-gold-400">
          <span className="h-px w-8 bg-gold-400" />
          The House of Crown Eye Optique
        </div>
        <h2 className="mt-6 max-w-[16ch] font-display kerning-tight text-[40px] leading-[1] md:text-[56px]">
          An atelier, <span className="italic text-bordeaux-700 dark:text-gold-400">in three chapters.</span>
        </h2>

        <div className="mt-12 flex flex-col gap-12">
          {chapters.map((c) => (
            <article key={c.no} className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-center">
              <div className="aspect-[4/3] overflow-hidden rounded-[24px] bg-bone">
                <img src={c.image} alt={c.title} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-widest2 text-bordeaux-700 dark:text-gold-400">
                  Chapter {c.no}
                </span>
                <h3 className="mt-2 font-display text-[28px] leading-tight">{c.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.8] text-smoke">{c.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
