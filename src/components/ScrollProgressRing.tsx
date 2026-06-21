import { useEffect, useRef } from 'react';
import { ScrollTrigger } from '../hooks/useGSAP';

const SIZE = 48;
const STROKE = 2;
const R = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * R;

/**
 * Presentational circular scroll-progress ring. Self-subscribes to page scroll
 * via ScrollTrigger and drives stroke-dashoffset. Fills its positioned parent.
 */
export default function ScrollProgressRing() {
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const c = circleRef.current;
        if (c) c.style.strokeDashoffset = String(CIRC * (1 - self.progress));
      },
    });
    return () => st.kill();
  }, []);

  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      aria-hidden
      className="absolute inset-0 -rotate-90"
    >
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={R}
        fill="none"
        strokeWidth={STROKE}
        className="stroke-bordeaux-700/15 dark:stroke-gold-400/20"
      />
      <circle
        ref={circleRef}
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={R}
        fill="none"
        strokeWidth={STROKE}
        strokeLinecap="round"
        className="stroke-bordeaux-700 dark:stroke-gold-400"
        style={{ strokeDasharray: CIRC, strokeDashoffset: CIRC }}
      />
    </svg>
  );
}
