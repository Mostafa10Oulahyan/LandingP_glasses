import { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import type { Product } from '../types/product';
import { formatPrice } from '../types/product';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useQuickViewStore } from '../store/quickViewStore';
import { usePointerFine } from '../hooks/useReducedMotion';

export type { Product };

/**
 * Product card. Framer owns the inner 3D tilt (state-driven); GSAP owns the
 * grid-level scroll reveal in the parent section — never both on the same node.
 */
export default function ProductCard({ product }: { product: Product; index?: number }) {
  const [hover, setHover] = useState(false);
  const fine = usePointerFine();
  const ref = useRef<HTMLDivElement>(null);

  const add = useCartStore((s) => s.add);
  const wished = useWishlistStore((s) => s.ids.includes(product.id));
  const toggleWish = useWishlistStore((s) => s.toggle);
  const openQuickView = useQuickViewStore((s) => s.open);

  // tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    setHover(false);
    mx.set(0);
    my.set(0);
  };

  return (
    <div className="group relative" style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={onLeave}
        onMouseMove={onMove}
        style={{ rotateX: fine ? rx : 0, rotateY: fine ? ry : 0, transformStyle: 'preserve-3d' }}
      >
        <motion.div
          layoutId={`product-${product.id}`}
          className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-bone"
        >
          <img
            src={product.image}
            alt={`${product.name} — ${product.category}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
          />

          {product.tag && (
            <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1.5 text-[10px] uppercase tracking-widest2 text-bordeaux-700">
              {product.tag}
            </span>
          )}

          <button
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            onClick={() => toggleWish(product.id)}
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full glass transition-colors hover:bg-cream"
          >
            <Heart size={15} className={wished ? 'fill-bordeaux-700 text-bordeaux-700' : 'text-ink'} />
          </button>

          <AnimatePresence>
            {hover && (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 18 }}
                transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
                className="absolute bottom-3 left-3 right-3 flex items-center gap-2"
              >
                <button
                  onClick={() => add(product)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-bordeaux-700 py-3 text-[11px] uppercase tracking-widest2 text-white transition-colors hover:bg-bordeaux-800"
                >
                  <ShoppingBag size={13} /> Add to bag
                </button>
                <button
                  onClick={() => openQuickView(product.id)}
                  aria-label="Quick view"
                  className="grid h-11 w-11 place-items-center rounded-full bg-cream/95 text-ink transition-colors hover:bg-cream"
                >
                  <Eye size={15} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Meta */}
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest2 text-smoke">
            <span>{product.category}</span>
            <span className="inline-block h-[3px] w-[3px] rounded-full bg-gold-400" />
            <span>N°{product.no}</span>
          </div>
          <h3 className="mt-1 font-display text-[20px] leading-tight text-ink">{product.name}</h3>
        </div>
        <div className="text-right">
          <div className="font-display text-[18px] text-ink">{formatPrice(product.price)}</div>
          <div className="mt-1 flex justify-end gap-1.5">
            {product.colors.map((c) => (
              <span
                key={c}
                className="h-[10px] w-[10px] rounded-full border border-ink/15"
                style={{ background: c }}
                title="Colour"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
