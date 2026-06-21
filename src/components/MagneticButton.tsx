import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from '../hooks/useGSAP';
import { usePointerFine } from '../hooks/useReducedMotion';
import { cn } from '../utils/cn';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** max pull distance in px (capped at 8 per design restraints) */
  strength?: number;
}

/**
 * Wraps content in a magnetic pull effect (GSAP quickTo). Pull capped at 8px,
 * no glow, no scale pulse. Inert on touch/coarse pointers.
 */
export default function MagneticButton({ children, className, strength = 8 }: MagneticButtonProps) {
  const fine = usePointerFine();
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!fine) return;
    const el = ref.current!;
    const max = Math.min(strength, 8);
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
    const clamp = gsap.utils.clamp(-max, max);

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const relX = e.clientX - (r.left + r.width / 2);
      const relY = e.clientY - (r.top + r.height / 2);
      xTo(clamp(relX * 0.35));
      yTo(clamp(relY * 0.35));
    };
    const reset = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', reset);
    return () => {
      el.removeEventListener('mousemove', move);
      el.removeEventListener('mouseleave', reset);
    };
  }, [fine, strength]);

  return (
    <span ref={ref} className={cn('inline-block', className)}>
      {children}
    </span>
  );
}
