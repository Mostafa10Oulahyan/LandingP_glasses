import { useEffect, useRef } from 'react';
import { gsap } from '../hooks/useGSAP';
import { usePointerFine } from '../hooks/useReducedMotion';

/**
 * Minimal dot + ring cursor. No trailing glow, no color shift.
 * Rendered only on fine-pointer devices (not merely hidden on mobile).
 */
export default function Cursor() {
  const fine = usePointerFine();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fine) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    document.documentElement.classList.add('has-cursor');

    // center on the pointer via transform (GSAP owns transform on these nodes)
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' });
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3' });

    const move = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const grow = () => gsap.to(ring, { scale: 1.8, duration: 0.3, ease: 'power3' });
    const shrink = () => gsap.to(ring, { scale: 1, duration: 0.3, ease: 'power3' });
    const down = () => gsap.to(ring, { scale: 0.8, duration: 0.18 });
    const up = () => gsap.to(ring, { scale: 1, duration: 0.18 });

    const isInteractive = (t: EventTarget | null) =>
      t instanceof HTMLElement && !!t.closest('a, button, input, textarea, select, [data-cursor]');

    const over = (e: MouseEvent) => {
      if (isInteractive(e.target)) grow();
    };
    const out = (e: MouseEvent) => {
      if (isInteractive(e.target)) shrink();
    };
    const leave = () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
    const enter = () => gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 });

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseout', out);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);

    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', out);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-8 w-8 rounded-full border border-bordeaux-700/60 dark:border-gold-400/70"
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-bordeaux-700 dark:bg-gold-400"
      />
    </>
  );
}
