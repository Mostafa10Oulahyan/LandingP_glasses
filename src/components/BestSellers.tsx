import { useRef, useState } from 'react';
import SectionHeader from './SectionHeader';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import type { ProductType } from '../types/product';
import { useGSAP } from '../hooks/useGSAP';
import { scrollReveal } from '../animations/scrollReveal';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { cn } from '../utils/cn';

type Filter = 'all' | ProductType;

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'sun', label: 'Sunglasses' },
  { id: 'optical', label: 'Optical' },
  { id: 'limited', label: 'Limited' },
];

export default function BestSellers() {
  const [filter, setFilter] = useState<Filter>('all');
  const filtered = products.filter((p) => filter === 'all' || p.type === filter);

  const grid = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // one ScrollTrigger per grid; re-runs when the filter changes the children
  useGSAP(
    () => {
      if (grid.current) scrollReveal(grid.current, ':scope > *', { reduced, y: 36 });
    },
    { scope: grid, dependencies: [filter, reduced] }
  );

  return (
    <section id="best" className="relative bg-bone py-[64px] md:py-[120px]">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <SectionHeader
          eyebrow="Best Sellers"
          title={
            <>
              The most coveted{' '}
              <span className="italic text-bordeaux-700 dark:text-gold-400">silhouettes.</span>
            </>
          }
          description="A rotating index of our most-collected pieces — restocked in small batches, often before they're announced."
        />

        {/* Filter pills */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                'rounded-full border px-5 py-2.5 text-[11px] uppercase tracking-widest2 transition-all duration-300',
                filter === f.id
                  ? 'border-bordeaux-700 bg-bordeaux-700 text-white'
                  : 'border-ink/15 bg-transparent text-ink/70 hover:border-ink/40 hover:text-ink'
              )}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-auto text-[11px] uppercase tracking-widest2 text-smoke">
            Showing {filtered.length} of {products.length}
          </span>
        </div>

        {/* Grid */}
        <div ref={grid} className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4 md:gap-8">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#collections"
            className="inline-flex items-center gap-3 rounded-full border border-bordeaux-700 px-8 py-4 text-[12px] uppercase tracking-widest2 text-bordeaux-700 transition-colors hover:bg-bordeaux-50 dark:border-gold-400 dark:text-gold-400 dark:hover:bg-ink/20"
          >
            View the entire archive
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
