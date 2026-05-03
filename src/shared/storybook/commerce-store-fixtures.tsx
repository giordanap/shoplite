"use client";

import { ReactNode, useEffect } from "react";

import { useCartStore } from "@/modules/cart/store";
import type { CartItem } from "@/modules/cart/types";
import { useFavoritesStore } from "@/modules/favorites/store";
import type { FavoriteItem } from "@/modules/favorites/types";
import type { Product } from "@/modules/products/types";

type CommerceFixtureMode = {
  cart?: "empty" | "with-product" | "maxed";
  favorite?: "empty" | "saved";
  product: Product;
};

type CommerceStoreFixtureProps = CommerceFixtureMode & {
  children: ReactNode;
};

function createCartItem(product: Product, quantity: number): CartItem {
  return {
    product: {
      id: product.id,
      name: product.name,
      categoryName: product.category.name,
      price: product.price,
      discountedPrice: product.discountedPrice,
      stock: product.stock,
      availabilityStatus: product.availabilityStatus,
      thumbnail: product.thumbnail,
    },
    quantity,
  };
}

function createFavoriteItem(product: Product): FavoriteItem {
  return {
    product: {
      id: product.id,
      name: product.name,
      categoryName: product.category.name,
      price: product.price,
      discountedPrice: product.discountedPrice,
      rating: product.rating,
      thumbnail: product.thumbnail,
    },
    createdAt: "2026-01-01T10:00:00.000Z",
  };
}

function getCartItems({
  cart = "empty",
  product,
}: CommerceFixtureMode): CartItem[] {
  if (cart === "with-product") {
    return [createCartItem(product, 1)];
  }

  if (cart === "maxed") {
    return [createCartItem(product, Math.max(product.stock, 1))];
  }

  return [];
}

function getFavoriteItems({
  favorite = "empty",
  product,
}: CommerceFixtureMode): FavoriteItem[] {
  if (favorite === "saved") {
    return [createFavoriteItem(product)];
  }

  return [];
}

export function CommerceStoreFixture({
  children,
  cart = "empty",
  favorite = "empty",
  product,
}: CommerceStoreFixtureProps) {
  useEffect(() => {
    useCartStore.setState({
      items: getCartItems({
        cart,
        product,
      }),
    });

    useFavoritesStore.setState({
      items: getFavoriteItems({
        favorite,
        product,
      }),
    });

    return () => {
      useCartStore.setState({
        items: [],
      });

      useFavoritesStore.setState({
        items: [],
      });
    };
  }, [cart, favorite, product]);

  return <>{children}</>;
}