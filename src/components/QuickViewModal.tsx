import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Heart, X } from 'lucide-react';
import { useQuickViewStore } from '../store/quickViewStore';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { getProduct } from '../data/products';
import { formatPrice } from '../types/product';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { cn } from '../utils/cn';

const ease = [0.2, 0.7, 0.2, 1] as const;

export default function QuickViewModal() {
  const openId = useQuickViewStore((s) => s.openId);
  const close = useQuickViewStore((s) => s.close);
  const add = useCartStore((s) => s.add);
  const wishHas = useWishlistStore((s) => s.has);
  const wishToggle = useWishlistStore((s) => s.toggle);

  const product = openId ? getProduct(openId) : undefined;
  const panelRef = useFocusTrap<HTMLDivElement>(!!product, close);

  const [color, setColor] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setColor(product.colors[0]);
      setSize(product.sizes?.[0] ?? 'One size');
      setActiveImg(0);
      setAdded(false);
    }
  }, [product]);

  const gallery = product?.images?.length ? product.images : product ? [product.image] : [];

  const onAdd = () => {
    if (!product) return;
    add(product, { color, size });
    setAdded(true);
  };

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[120] grid place-items-center p-4 md:p-8" role="dialog" aria-modal="true" aria-label={`${product.name} quick view`}>
          <motion.div
            className="absolute inset-0 bg-obsidian/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={close}
          />
          <motion.div
            ref={panelRef}
            className="relative grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-[24px] bg-cream text-ink shadow-2xl md:grid-cols-2"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.4, ease }}
          >
            <button
              onClick={close}
              aria-label="Close quick view"
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-cream/90 hover:bg-bone"
            >
              <X size={18} />
            </button>

            {/* Gallery */}
            <div className="flex flex-col gap-3 bg-bone p-4">
              <motion.div
                layoutId={`product-${product.id}`}
                className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-sand"
              >
                <img
                  src={gallery[activeImg]}
                  alt={`${product.name} — ${product.category}`}
                  className="h-full w-full object-cover"
                />
              </motion.div>
              {gallery.length > 1 && (
                <div className="flex gap-3">
                  {gallery.map((g, i) => (
                    <button
                      key={g}
                      onClick={() => setActiveImg(i)}
                      aria-label={`View image ${i + 1}`}
                      className={cn(
                        'h-16 w-14 overflow-hidden rounded-lg ring-1 transition',
                        i === activeImg ? 'ring-bordeaux-700' : 'ring-ink/10 hover:ring-ink/30'
                      )}
                    >
                      <img src={g} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col p-6 md:p-8">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest2 text-smoke">
                <span>{product.category}</span>
                <span className="h-[3px] w-[3px] rounded-full bg-gold-400" />
                <span>N°{product.no}</span>
              </div>
              <h2 className="mt-2 font-display text-[34px] leading-none">{product.name}</h2>
              <div className="mt-3 font-display text-2xl text-bordeaux-700 dark:text-gold-400">
                {formatPrice(product.price)}
              </div>
              <p className="mt-4 text-[14px] leading-[1.7] text-smoke">{product.description}</p>

              {/* Colors */}
              <div className="mt-6">
                <p className="text-[11px] uppercase tracking-widest2 text-smoke">Colour</p>
                <div className="mt-2 flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      aria-label={`Select colour ${c}`}
                      className={cn(
                        'h-8 w-8 rounded-full ring-2 ring-offset-2 ring-offset-cream transition',
                        color === c ? 'ring-bordeaux-700' : 'ring-transparent'
                      )}
                      style={{ background: c }}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              {product.sizes && (
                <div className="mt-5">
                  <p className="text-[11px] uppercase tracking-widest2 text-smoke">Size (mm)</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={cn(
                          'rounded-full border px-4 py-2 text-[12px] tracking-wide transition',
                          size === s
                            ? 'border-bordeaux-700 bg-bordeaux-50 text-bordeaux-800'
                            : 'border-ink/15 text-ink hover:border-ink/40'
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-auto flex items-center gap-3 pt-8">
                <button
                  onClick={onAdd}
                  className={cn(
                    'flex flex-1 items-center justify-center gap-2 rounded-full py-4 text-[12px] uppercase tracking-widest2 transition-colors',
                    added
                      ? 'bg-gold-400 text-gold-900 hover:bg-gold-500'
                      : 'bg-bordeaux-700 text-white hover:bg-bordeaux-800'
                  )}
                >
                  {added ? (
                    <>
                      <Check size={15} /> Added to bag
                    </>
                  ) : (
                    <>Add to bag — {formatPrice(product.price)}</>
                  )}
                </button>
                <button
                  onClick={() => wishToggle(product.id)}
                  aria-label="Toggle wishlist"
                  className="grid h-[52px] w-[52px] place-items-center rounded-full border border-ink/15 hover:border-ink/40"
                >
                  <Heart
                    size={18}
                    className={cn(wishHas(product.id) && 'fill-bordeaux-700 text-bordeaux-700')}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
