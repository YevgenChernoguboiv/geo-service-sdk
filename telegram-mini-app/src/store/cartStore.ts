import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '@/services/types';

interface CartStore {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product: Product, quantity: number) => {
        set((state) => {
          const existingItemIndex = state.cart.findIndex(
            (item) => item.product.id === product.id
          );

          if (existingItemIndex >= 0) {
            const newCart = [...state.cart];
            newCart[existingItemIndex].selected_quantity += quantity;
            return { cart: newCart };
          }

          return {
            cart: [...state.cart, { product, selected_quantity: quantity }],
          };
        });
      },

      removeFromCart: (productId: string) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId
              ? { ...item, selected_quantity: quantity }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ cart: [] });
      },

      getTotal: () => {
        return get().cart.reduce(
          (sum, item) => sum + item.product.price * item.selected_quantity,
          0
        );
      },

      getTotalItems: () => {
        return get().cart.reduce((sum, item) => sum + item.selected_quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
