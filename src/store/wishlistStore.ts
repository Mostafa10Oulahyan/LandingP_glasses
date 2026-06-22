import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
  ids: string[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
  count: () => number;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: (id) =>
        set((s) => ({
          ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id],
        })),
      remove: (id) => set((s) => ({ ids: s.ids.filter((x) => x !== id) })),
      has: (id) => get().ids.includes(id),
      count: () => get().ids.length,
      clear: () => set({ ids: [] }),
    }),
    { name: 'ceo-wishlist', partialize: (s) => ({ ids: s.ids }) }
  )
);
