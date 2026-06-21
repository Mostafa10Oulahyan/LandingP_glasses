import { gsap } from '../hooks/useGSAP';

interface ScrollRevealOptions {
  start?: string;
  y?: number;
  stagger?: number;
  duration?: number;
  reduced?: boolean;
}

/**
 * One ScrollTrigger per container that staggers in its direct children
 * (or a custom selector). Use on grids — never one trigger per card.
 */
export function scrollReveal(
  container: HTMLElement,
  childSelector = ':scope > *',
  opts: ScrollRevealOptions = {}
) {
  const { start = 'top 80%', y = 40, stagger = 0.08, duration = 0.9, reduced = false } = opts;
  const targets = container.querySelectorAll(childSelector);
  if (!targets.length) return () => {};

  const tween = gsap.from(targets, {
    y: reduced ? 0 : y,
    autoAlpha: 0,
    duration: reduced ? 0.5 : duration,
    ease: 'power3.out',
    stagger: reduced ? 0.04 : stagger,
    scrollTrigger: { trigger: container, start, once: true },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}
