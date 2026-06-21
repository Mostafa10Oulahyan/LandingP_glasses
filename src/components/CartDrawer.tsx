import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../types/product';
import { useFocusTrap } from '../hooks/useFocusTrap';

const ease = [0.2, 0.7, 0.2, 1] as const;

export default function CartDrawer() {
  const { lines, isOpen, close, setQty, remove, subtotal, count } = useCartStore();
  const panelRef = useFocusTrap<HTMLDivElement>(isOpen, close);

  const total = subtotal();
  const items = count();
  const FREE_SHIP = 180;
  const remaining = Math.max(0, FREE_SHIP - total);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120]" role="dialog" aria-modal="true" aria-label="Shopping bag">
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
                <ShoppingBag size={18} />
                <h2 className="font-display text-xl">Your Bag</h2>
                <span className="text-[11px] uppercase tracking-widest2 text-smoke">({items})</span>
              </div>
              <button
                onClick={close}
                aria-label="Close bag"
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-bone"
              >
                <X size={18} />
              </button>
            </div>

            {/* Free shipping progress */}
            {items > 0 && (
              <div className="border-b border-ink/10 px-6 py-4">
                <p className="text-[11px] uppercase tracking-widest2 text-smoke">
                  {remaining > 0 ? (
                    <>You're {formatPrice(remaining)} from free shipping</>
                  ) : (
                    <>You've unlocked complimentary shipping</>
                  )}
                </p>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-bone">
                  <div
                    className="h-full rounded-full bg-gold-400 transition-all duration-500"
                    style={{ width: `${Math.min(100, (total / FREE_SHIP) * 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag size={40} className="text-smoke/40" />
                  <p className="mt-4 font-display text-xl">Your bag is empty</p>
                  <p className="mt-2 max-w-[24ch] text-sm text-smoke">
                    Discover frames worth keeping for life.
                  </p>
                  <button
                    onClick={close}
                    className="mt-6 rounded-full bg-bordeaux-700 px-6 py-3 text-[11px] uppercase tracking-widest2 text-white transition-colors hover:bg-bordeaux-800"
                  >
                    Continue shopping
                  </button>
                </div>
              ) : (
                <ul className="flex flex-col gap-5">
                  <AnimatePresence initial={false}>
                    {lines.map((l) => (
                      <motion.li
                        key={l.lineId}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-4"
                      >
                        <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-bone">
                          <img
                            src={l.product.image}
                            alt={l.product.name}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-display text-[17px] leading-tight">{l.product.name}</h3>
                              <p className="mt-0.5 text-[11px] uppercase tracking-widest2 text-smoke">
                                {l.product.category}
                              </p>
                            </div>
                            <button
                              onClick={() => remove(l.lineId)}
                              aria-label={`Remove ${l.product.name}`}
                              className="text-smoke hover:text-bordeaux-700"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                          <div className="mt-1 flex items-center gap-3 text-[11px] uppercase tracking-widest2 text-smoke">
                            <span className="flex items-center gap-1.5">
                              <span
                                className="h-3 w-3 rounded-full border border-ink/15"
                                style={{ background: l.color }}
                              />
                            </span>
                            <span>{l.size}</span>
                          </div>
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex items-center rounded-full border border-ink/15">
                              <button
                                onClick={() => setQty(l.lineId, l.qty - 1)}
                                aria-label="Decrease quantity"
                                className="grid h-8 w-8 place-items-center rounded-full hover:bg-bone"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="w-6 text-center text-sm tabular-nums">{l.qty}</span>
                              <button
                                onClick={() => setQty(l.lineId, l.qty + 1)}
                                aria-label="Increase quantity"
                                className="grid h-8 w-8 place-items-center rounded-full hover:bg-bone"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                            <span className="font-display text-[16px]">
                              {formatPrice(l.product.price * l.qty)}
                            </span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {items > 0 && (
              <div className="border-t border-ink/10 px-6 py-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-widest2 text-smoke">Subtotal</span>
                  <span className="font-display text-2xl">{formatPrice(total)}</span>
                </div>
                <p className="mt-1 text-[11px] text-smoke">Taxes and shipping calculated at checkout.</p>
                <button className="mt-4 w-full rounded-full bg-gold-400 py-4 text-[12px] uppercase tracking-widest2 text-gold-900 transition-colors hover:bg-gold-500">
                  Proceed to checkout
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
