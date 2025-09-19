import { create } from 'zustand';
import type { CartItem, Package } from '@/types';
import { getPackageById } from '@/utils/storage';
import { config } from '@/config';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (packageId: string, quantity?: number) => void;
  removeItem: (packageId: string) => void;
  updateQuantity: (packageId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  getCartItems: () => Array<CartItem & { package: Package | undefined; total: number }>;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
      items: [],
      isOpen: false,

      addItem: (packageId: string, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(item => item.packageId === packageId);

        if (existingItem) {
          const newQuantity = Math.min(
            existingItem.qty + quantity,
            config.MAX_CART_QUANTITY
          );
          set({
            items: items.map(item =>
              item.packageId === packageId
                ? { ...item, qty: newQuantity }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { packageId, qty: Math.min(quantity, config.MAX_CART_QUANTITY) }],
          });
        }
      },

      removeItem: (packageId: string) => {
        const { items } = get();
        set({
          items: items.filter(item => item.packageId !== packageId),
        });
      },

      updateQuantity: (packageId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(packageId);
          return;
        }

        const { items } = get();
        const clampedQuantity = Math.min(quantity, config.MAX_CART_QUANTITY);

        set({
          items: items.map(item =>
            item.packageId === packageId
              ? { ...item, qty: clampedQuantity }
              : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getCartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const packageData = getPackageById(item.packageId);
          return total + (packageData?.price || 0) * item.qty;
        }, 0);
      },

      getCartItemsCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.qty, 0);
      },

      getCartItems: () => {
        const { items } = get();
        return items.map(item => {
          const packageData = getPackageById(item.packageId);
          return {
            ...item,
            package: packageData,
            total: (packageData?.price || 0) * item.qty,
          };
        });
      },

      toggleCart: () => {
        set(state => ({ isOpen: !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },
}));