import { gsap } from '../hooks/useGSAP';

interface ParallaxOptions {
  /** total travel in percent of own height across the scroll range */
  amount?: number;
  reduced?: boolean;
}

/** Scrub-tied vertical parallax. Skipped entirely under reduced motion. */
export function parallax(el: HTMLElement, opts: ParallaxOptions = {}) {
  const { amount = 18, reduced = false } = opts;
  if (reduced) return () => {};

  const tween = gsap.fromTo(
    el,
    { yPercent: -amount / 2 },
    {
      yPercent: amount / 2,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    }
  );

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}
