import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartLine, Product } from '../types/product';

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (product: Product, opts?: { color?: string; size?: string; qty?: number }) => void;
  remove: (lineId: string) => void;
  setQty: (lineId: string, qty: number) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
}

const makeLineId = (id: string, color: string, size: string) => `${id}__${color}__${size}`;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      add: (product, opts = {}) => {
        const color = opts.color ?? product.colors[0] ?? '#000';
        const size = opts.size ?? product.sizes?.[0] ?? 'One size';
        const qty = opts.qty ?? 1;
        const lineId = makeLineId(product.id, color, size);
        set((s) => {
          const existing = s.lines.find((l) => l.lineId === lineId);
          const lines = existing
            ? s.lines.map((l) => (l.lineId === lineId ? { ...l, qty: l.qty + qty } : l))
            : [...s.lines, { lineId, product, color, size, qty }];
          return { lines, isOpen: true };
        });
      },
      remove: (lineId) => set((s) => ({ lines: s.lines.filter((l) => l.lineId !== lineId) })),
      setQty: (lineId, qty) =>
        set((s) => ({
          lines:
            qty <= 0
              ? s.lines.filter((l) => l.lineId !== lineId)
              : s.lines.map((l) => (l.lineId === lineId ? { ...l, qty } : l)),
        })),
      clear: () => set({ lines: [] }),
      count: () => get().lines.reduce((n, l) => n + l.qty, 0),
      subtotal: () => get().lines.reduce((n, l) => n + l.qty * l.product.price, 0),
    }),
    { name: 'ceo-cart', partialize: (s) => ({ lines: s.lines }) }
  )
);
