import type { Product, ProductImage } from "@/modules/products/types";

export type FavoriteProductSnapshot = {
  id: number;
  name: string;
  categoryName: string;
  price: number;
  discountedPrice: number;
  rating: number;
  thumbnail: ProductImage;
};

export type FavoriteItem = {
  product: FavoriteProductSnapshot;
  createdAt: string;
};

export type FavoritesState = {
  items: FavoriteItem[];
};

export type FavoritesActions = {
  toggleFavorite: (product: Product) => void;
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: number) => void;
  clearFavorites: () => void;
};

export type FavoritesStore = FavoritesState & FavoritesActions;