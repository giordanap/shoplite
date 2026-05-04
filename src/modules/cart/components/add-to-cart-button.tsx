"use client";

import { useEffect, useRef, useState } from "react";

import type { Product } from "@/modules/products/types";
import { Button } from "@/shared/components/ui";
import { cn } from "@/shared/utils";

import { useCartStore } from "../store";

type AddToCartButtonProps = {
  product: Product;
  size?: "sm" | "md" | "lg";
  compact?: boolean;
  className?: string;
};

function getButtonLabel({
  compact,
  quantity,
  stock,
  isOutOfStock,
}: {
  compact: boolean;
  quantity: number;
  stock: number;
  isOutOfStock: boolean;
}) {
  if (isOutOfStock) return "Out of stock";

  if (quantity >= stock) {
    return compact ? "Max" : "Stock limit reached";
  }

  if (compact) {
    return quantity > 0 ? `Add +1 (${quantity})` : "Add";
  }

  return quantity > 0 ? `Add one more · ${quantity} in cart` : "Add to cart";
}

export function AddToCartButton({
  product,
  size = "md",
  compact = false,
  className,
}: AddToCartButtonProps) {
  const addProduct = useCartStore((state) => state.addProduct);

  const quantity =
    useCartStore(
      (state) =>
        state.items.find((item) => item.product.id === product.id)?.quantity,
    ) ?? 0;

  const [wasAdded, setWasAdded] = useState(false);
  const feedbackTimeoutRef = useRef<number | null>(null);

  const isOutOfStock =
    product.availabilityStatus === "out-of-stock" || product.stock <= 0;

  const isStockLimitReached = quantity >= product.stock;
  const isDisabled = isOutOfStock || isStockLimitReached;

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        window.clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, []);

  function handleAddToCart() {
    addProduct(product);
    setWasAdded(true);

    if (feedbackTimeoutRef.current) {
      window.clearTimeout(feedbackTimeoutRef.current);
    }

    feedbackTimeoutRef.current = window.setTimeout(() => {
      setWasAdded(false);
    }, 1100);
  }

  return (
    <Button
      size={size}
      disabled={isDisabled}
      onClick={handleAddToCart}
      className={cn("whitespace-nowrap", className)}
    >
      {wasAdded
        ? compact
          ? "Added"
          : "Added to cart"
        : getButtonLabel({
            compact,
            quantity,
            stock: product.stock,
            isOutOfStock,
          })}
    </Button>
  );
}