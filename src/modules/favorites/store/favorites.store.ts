import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Product } from "@/modules/products/types";

import type {
  FavoriteProductSnapshot,
  FavoritesState,
  FavoritesStore,
} from "../types";

const FAVORITES_STORAGE_KEY = "shoplite-favorites-v1";

function createFavoriteProductSnapshot(
  product: Product,
): FavoriteProductSnapshot {
  return {
    id: product.id,
    name: product.name,
    categoryName: product.category.name,
    price: product.price,
    discountedPrice: product.discountedPrice,
    rating: product.rating,
    thumbnail: product.thumbnail,
  };
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set) => ({
      items: [],

      toggleFavorite: (product) => {
        set((state) => {
          const exists = state.items.some(
            (item) => item.product.id === product.id,
          );

          if (exists) {
            return {
              items: state.items.filter(
                (item) => item.product.id !== product.id,
              ),
            };
          }

          return {
            items: [
              {
                product: createFavoriteProductSnapshot(product),
                createdAt: new Date().toISOString(),
              },
              ...state.items,
            ],
          };
        });
      },

      addFavorite: (product) => {
        set((state) => {
          const exists = state.items.some(
            (item) => item.product.id === product.id,
          );

          if (exists) {
            return state;
          }

          return {
            items: [
              {
                product: createFavoriteProductSnapshot(product),
                createdAt: new Date().toISOString(),
              },
              ...state.items,
            ],
          };
        });
      },

      removeFavorite: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      clearFavorites: () => {
        set({
          items: [],
        });
      },
    }),
    {
      name: FAVORITES_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state): FavoritesState => ({
        items: state.items,
      }),
    },
  ),
);

export const selectFavoritesCount = (state: FavoritesStore) =>
  state.items.length;