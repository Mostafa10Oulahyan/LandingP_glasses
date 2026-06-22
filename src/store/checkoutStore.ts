import { create } from 'zustand';

interface CheckoutState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

/** Controls the premium multi-step checkout overlay. */
export const useCheckoutStore = create<CheckoutState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
