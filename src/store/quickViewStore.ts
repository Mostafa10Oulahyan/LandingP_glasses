import { create } from 'zustand';

interface QuickViewState {
  openId: string | null;
  open: (id: string) => void;
  close: () => void;
}

/** Holds the product id whose Quick View modal is open (null = closed). */
export const useQuickViewStore = create<QuickViewState>((set) => ({
  openId: null,
  open: (id) => set({ openId: id }),
  close: () => set({ openId: null }),
}));
