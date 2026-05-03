import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Product } from "@/modules/products/types";

import type {
  CartItem,
  CartProductSnapshot,
  CartState,
  CartStore,
  CartTotals,
} from "../types";

const CART_STORAGE_KEY = "shoplite-cart-v1";
const DEFAULT_QUANTITY = 1;

function createProductSnapshot(product: Product): CartProductSnapshot {
  return {
    id: product.id,
    name: product.name,
    categoryName: product.category.name,
    price: product.price,
    discountedPrice: product.discountedPrice,
    stock: product.stock,
    availabilityStatus: product.availabilityStatus,
    thumbnail: product.thumbnail,
  };
}

function clampQuantity(quantity: number, stock: number): number {
  const safeStock = Math.max(stock, DEFAULT_QUANTITY);
  const safeQuantity = Number.isFinite(quantity)
    ? Math.floor(quantity)
    : DEFAULT_QUANTITY;

  return Math.min(Math.max(safeQuantity, DEFAULT_QUANTITY), safeStock);
}

function getItemSubtotal(item: CartItem): number {
  return item.product.price * item.quantity;
}

function getItemTotal(item: CartItem): number {
  return item.product.discountedPrice * item.quantity;
}

export function getCartTotals(items: CartItem[]): CartTotals {
  const subtotal = items.reduce((total, item) => total + getItemSubtotal(item), 0);
  const total = items.reduce((sum, item) => sum + getItemTotal(item), 0);

  return {
    uniqueItemsCount: items.length,
    itemCount: items.reduce((count, item) => count + item.quantity, 0),
    subtotal,
    discountTotal: subtotal - total,
    total,
  };
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addProduct: (product, quantity = DEFAULT_QUANTITY) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id,
          );

          const productSnapshot = createProductSnapshot(product);

          if (existingItem) {
            return {
              items: state.items.map((item) => {
                if (item.product.id !== product.id) {
                  return item;
                }

                return {
                  ...item,
                  product: productSnapshot,
                  quantity: clampQuantity(
                    item.quantity + quantity,
                    product.stock,
                  ),
                };
              }),
            };
          }

          return {
            items: [
              ...state.items,
              {
                product: productSnapshot,
                quantity: clampQuantity(quantity, product.stock),
              },
            ],
          };
        });
      },

      increaseQuantity: (productId) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (item.product.id !== productId) {
              return item;
            }

            return {
              ...item,
              quantity: clampQuantity(item.quantity + 1, item.product.stock),
            };
          }),
        }));
      },

      decreaseQuantity: (productId) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (item.product.id !== productId) {
              return item;
            }

            return {
              ...item,
              quantity: clampQuantity(item.quantity - 1, item.product.stock),
            };
          }),
        }));
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (item.product.id !== productId) {
              return item;
            }

            return {
              ...item,
              quantity: clampQuantity(quantity, item.product.stock),
            };
          }),
        }));
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      clearCart: () => {
        set({
          items: [],
        });
      },
    }),
    {
      name: CART_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state): CartState => ({
        items: state.items,
      }),
    },
  ),
);

export const selectCartItemCount = (state: CartStore) =>
  getCartTotals(state.items).itemCount;

export const selectCartTotals = (state: CartStore) =>
  getCartTotals(state.items);