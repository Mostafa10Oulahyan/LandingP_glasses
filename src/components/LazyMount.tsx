import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { ScrollTrigger } from '../hooks/useGSAP';

/**
 * Mounts children only once the placeholder approaches the viewport
 * (IntersectionObserver + rootMargin), then refreshes ScrollTrigger so any
 * scroll-driven animation inside measures against the final layout.
 */
export default function LazyMount({
  children,
  minHeight = 480,
}: {
  children: ReactNode;
  minHeight?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setShow(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          obs.disconnect();
        }
      },
      { rootMargin: '400px 0px' }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (show) {
      const id = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => cancelAnimationFrame(id);
    }
  }, [show]);

  return (
    <div ref={ref}>
      {show ? (
        <Suspense fallback={<div style={{ minHeight }} aria-hidden />}>{children}</Suspense>
      ) : (
        <div style={{ minHeight }} aria-hidden />
      )}
    </div>
  );
}
