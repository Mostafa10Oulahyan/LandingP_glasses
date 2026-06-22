import { AnimatePresence, motion } from 'framer-motion';
import { Eye, Heart, ShoppingBag, X } from 'lucide-react';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';
import { useQuickViewStore } from '../store/quickViewStore';
import { getProduct } from '../data/products';
import { formatPrice } from '../types/product';
import { useFocusTrap } from '../hooks/useFocusTrap';
import SmartImage from './SmartImage';

const ease = [0.2, 0.7, 0.2, 1] as const;

export default function WishlistDrawer() {
  const { ids, isOpen, close, remove } = useWishlistStore();
  const addToCart = useCartStore((s) => s.add);
  const openQuickView = useQuickViewStore((s) => s.open);
  const panelRef = useFocusTrap<HTMLDivElement>(isOpen, close);

  const items = ids.map(getProduct).filter(Boolean) as NonNullable<ReturnType<typeof getProduct>>[];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120]" role="dialog" aria-modal="true" aria-label="Wishlist">
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
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream text-ink shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <Heart size={18} className="fill-bordeaux-700 text-bordeaux-700" />
                <h2 className="font-display text-xl">Wishlist</h2>
                <span className="text-[11px] uppercase tracking-widest2 text-smoke">({items.length})</span>
              </div>
              <button
                onClick={close}
                aria-label="Close wishlist"
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-bone"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <Heart size={40} className="text-smoke/40" />
                  <p className="mt-4 font-display text-xl">Your wishlist is empty</p>
                  <p className="mt-2 max-w-[26ch] text-sm text-smoke">
                    Tap the heart on any frame to save it here for later.
                  </p>
                  <button
                    onClick={close}
                    className="mt-6 rounded-full bg-bordeaux-700 px-6 py-3 text-[11px] uppercase tracking-widest2 text-white transition-colors hover:bg-bordeaux-800"
                  >
                    Browse the collection
                  </button>
                </div>
              ) : (
                <ul className="flex flex-col gap-5">
                  <AnimatePresence initial={false}>
                    {items.map((p) => (
                      <motion.li
                        key={p.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-4"
                      >
                        <button
                          onClick={() => {
                            close();
                            openQuickView(p.id);
                          }}
                          aria-label={`Quick view ${p.name}`}
                          className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-bone"
                        >
                          <SmartImage src={p.image} alt={p.name} ratio="4/5" />
                        </button>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-display text-[17px] leading-tight">{p.name}</h3>
                              <p className="mt-0.5 text-[11px] uppercase tracking-widest2 text-smoke">
                                {p.category}
                              </p>
                            </div>
                            <span className="font-display text-[16px]">{formatPrice(p.price)}</span>
                          </div>
                          <div className="mt-auto flex items-center gap-2 pt-3">
                            <button
                              onClick={() => {
                                addToCart(p);
                                remove(p.id);
                              }}
                              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-bordeaux-700 py-2.5 text-[10.5px] uppercase tracking-widest2 text-white transition-colors hover:bg-bordeaux-800"
                            >
                              <ShoppingBag size={13} /> Move to bag
                            </button>
                            <button
                              onClick={() => {
                                close();
                                openQuickView(p.id);
                              }}
                              aria-label={`See ${p.name}`}
                              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/15 transition-colors hover:border-ink/40"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              onClick={() => remove(p.id)}
                              aria-label={`Remove ${p.name} from wishlist`}
                              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/15 text-smoke transition-colors hover:border-bordeaux-700 hover:text-bordeaux-700"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-ink/10 px-6 py-5">
                <button
                  onClick={() => {
                    items.forEach((p) => addToCart(p));
                    useWishlistStore.getState().clear();
                  }}
                  className="w-full rounded-full bg-gold-400 py-4 text-[12px] uppercase tracking-widest2 text-gold-900 transition-colors hover:bg-gold-500"
                >
                  Add all to bag
                </button>
                <button
                  onClick={close}
                  className="mt-2 w-full text-center text-[11px] uppercase tracking-widest2 text-smoke link-underline"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
