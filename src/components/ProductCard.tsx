import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Check, Eye, Heart, Loader2, ShoppingBag } from 'lucide-react';
import type { Product } from '../types/product';
import { formatPrice } from '../types/product';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useQuickViewStore } from '../store/quickViewStore';
import { usePointerFine } from '../hooks/useReducedMotion';
import { cn } from '../utils/cn';
import SmartImage from './SmartImage';

export type { Product };

type AddState = 'idle' | 'adding' | 'added';

/**
 * Product card. Framer owns the inner 3D tilt (fine-pointer only); GSAP owns the
 * grid-level scroll reveal in the parent section — never both on the same node.
 * Actions are hover-revealed on desktop and always visible on touch devices.
 */
export default function ProductCard({ product }: { product: Product; index?: number }) {
  const [hover, setHover] = useState(false);
  const [addState, setAddState] = useState<AddState>('idle');
  const fine = usePointerFine();
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const add = useCartStore((s) => s.add);
  const wished = useWishlistStore((s) => s.ids.includes(product.id));
  const toggleWish = useWishlistStore((s) => s.toggle);
  const openQuickView = useQuickViewStore((s) => s.open);

  useEffect(() => () => clearTimeout(timer.current), []);

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

  const handleAdd = () => {
    if (addState !== 'idle') return;
    setAddState('adding');
    // brief loading tick gives tactile feedback, then commit + success state
    timer.current = setTimeout(() => {
      add(product);
      setAddState('added');
      timer.current = setTimeout(() => setAddState('idle'), 1600);
    }, 420);
  };

  // On touch devices actions are always shown; on desktop they reveal on hover/focus.
  const showActions = hover || !fine;

  return (
    <div className="group relative" style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={onLeave}
        onMouseMove={onMove}
        onFocusCapture={() => setHover(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) onLeave();
        }}
        style={{ rotateX: fine ? rx : 0, rotateY: fine ? ry : 0, transformStyle: 'preserve-3d' }}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-bone">
          <motion.div layoutId={`product-${product.id}`} className="h-full w-full">
            <SmartImage
              src={product.image}
              alt={`${product.name} — ${product.category}`}
              className="duration-[1.2s] transition-transform ease-out group-hover:scale-[1.05]"
            />
          </motion.div>

          {/* soft scrim so action chips stay legible over any image */}
          <div
            className={cn(
              'pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-obsidian/45 to-transparent transition-opacity duration-500',
              showActions ? 'opacity-100' : 'opacity-0'
            )}
          />

          {product.tag && (
            <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1.5 text-[10px] uppercase tracking-widest2 text-bordeaux-700">
              {product.tag}
            </span>
          )}

          <button
            aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            aria-pressed={wished}
            onClick={(e) => {
              e.stopPropagation();
              toggleWish(product.id);
            }}
            className={cn(
              'absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full transition-all duration-300 hover:scale-110 active:scale-95',
              wished ? 'bg-bordeaux-700 text-white shadow-lg' : 'glass text-ink hover:bg-cream'
            )}
          >
            <Heart
              size={15}
              className={cn('transition-colors', wished ? 'animate-pop-in fill-white' : '')}
            />
          </button>

          {/* Action bar — hover-revealed on desktop, persistent on touch */}
          <div
            className={cn(
              'absolute bottom-3 left-3 right-3 flex items-center gap-2 transition-all duration-[400ms]',
              showActions
                ? 'pointer-events-auto translate-y-0 opacity-100'
                : 'pointer-events-none translate-y-3 opacity-0'
            )}
            style={{ transitionTimingFunction: 'cubic-bezier(.2,.7,.2,1)' }}
          >
            <button
              onClick={handleAdd}
              disabled={addState !== 'idle'}
              aria-label={`Add ${product.name} to bag`}
              className={cn(
                'inline-flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-[11px] uppercase tracking-widest2 text-white shadow-lg transition-all duration-300 active:scale-[0.97]',
                addState === 'added'
                  ? 'bg-gold-500 text-gold-900'
                  : 'bg-bordeaux-700 hover:bg-bordeaux-800'
              )}
            >
              {addState === 'adding' && <Loader2 size={13} className="animate-spin" />}
              {addState === 'added' && <Check size={14} className="animate-pop-in" />}
              {addState === 'idle' && <ShoppingBag size={13} />}
              {addState === 'adding' ? 'Adding…' : addState === 'added' ? 'Added' : 'Add to bag'}
            </button>
            <button
              onClick={() => openQuickView(product.id)}
              aria-label={`See ${product.name} product details`}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-cream/95 px-4 py-3 text-[11px] uppercase tracking-widest2 text-ink shadow-lg transition-all duration-300 hover:bg-cream active:scale-[0.97]"
            >
              <Eye size={14} /> 
            </button>
          </div>
        </div>
      </motion.div>

      {/* Meta */}
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest2 text-smoke">
            <span>{product.category}</span>
            <span className="inline-block h-[3px] w-[3px] rounded-full bg-gold-400" />
            <span>N°{product.no}</span>
          </div>
          <h3 className="mt-1 font-display text-[20px] leading-tight text-ink">
            <button
              onClick={() => openQuickView(product.id)}
              className="text-left link-underline hover:text-bordeaux-700 dark:hover:text-gold-400"
            >
              {product.name}
            </button>
          </h3>
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
