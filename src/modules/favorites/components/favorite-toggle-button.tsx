"use client";

import type { Product } from "@/modules/products/types";
import { Button } from "@/shared/components/ui";
import { cn } from "@/shared/utils";

import { useFavoritesStore } from "../store";

type FavoriteToggleButtonProps = {
  product: Product;
  compact?: boolean;
  className?: string;
};

export function FavoriteToggleButton({
  product,
  compact = false,
  className,
}: FavoriteToggleButtonProps) {
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const isFavorite = useFavoritesStore((state) =>
    state.items.some((item) => item.product.id === product.id),
  );

  function handleToggleFavorite() {
    toggleFavorite(product);
  }

  return (
    <Button
      variant={isFavorite ? "secondary" : "outline"}
      size={compact ? "sm" : "md"}
      onClick={handleToggleFavorite}
      className={cn("whitespace-nowrap", className)}
      aria-pressed={isFavorite}
      aria-label={
        isFavorite
          ? `Remove ${product.name} from favorites`
          : `Add ${product.name} to favorites`
      }
    >
      <span aria-hidden="true">{isFavorite ? "♥" : "♡"}</span>
      {compact ? null : isFavorite ? "Saved" : "Wishlist"}
    </Button>
  );
}