"use client";

import { AddToCartButton } from "@/modules/cart/components";
import { Badge, ButtonLink, Card } from "@/shared/components/ui";
import { FavoriteToggleButton } from "@/modules/favorites/components";
import { routes } from "@/core/router/routes";

import type { Product } from "../types";

type ProductCardProps = {
  product: Product;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

function getAvailabilityLabel(status: Product["availabilityStatus"]): string {
  const labels: Record<Product["availabilityStatus"], string> = {
    "in-stock": "In stock",
    "low-stock": "Low stock",
    "out-of-stock": "Out",
  };

  return labels[status];
}

function getAvailabilityVariant(status: Product["availabilityStatus"]) {
  if (status === "in-stock") return "success";
  if (status === "low-stock") return "warning";

  return "danger";
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.discountPercent > 0;

  return (
    <Card className="interactive-lift soft-border-glow group overflow-hidden p-4 hover:border-secondary/40 hover:shadow-cyan">
      <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-card border border-border-subtle bg-card-gradient">
        <div className="pointer-events-none absolute inset-0 bg-primary-gradient opacity-0 blur-2xl transition duration-300 group-hover:opacity-10" />
        {hasDiscount ? (
          <Badge
            variant="accent"
            className="absolute left-4 top-4 z-10 tracking-[0.14em]"
          >
            -{Math.round(product.discountPercent)}%
          </Badge>
        ) : null}

        <Badge
          variant={getAvailabilityVariant(product.availabilityStatus)}
          className="absolute right-4 top-4 z-10 tracking-[0.14em]"
        >
          {getAvailabilityLabel(product.availabilityStatus)}
        </Badge>

        <div className="absolute bottom-4 right-4 z-10">
          <FavoriteToggleButton product={product} compact />
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.thumbnail.url}
          alt={product.thumbnail.alt}
          className="h-full w-full object-contain p-5 transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="secondary" className="max-w-[70%] truncate">
            {product.category.name}
          </Badge>

          <span className="text-sm font-bold text-warning">
            ★ {product.rating.toFixed(1)}
          </span>
        </div>

        <h2 className="mt-4 line-clamp-2 min-h-[3.5rem] font-display text-xl font-bold leading-tight text-foreground">
          {product.name}
        </h2>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Price
          </p>

          <div className="mt-1 flex flex-wrap items-baseline gap-2">
            <p className="font-display text-2xl font-bold text-foreground">
              {formatCurrency(product.discountedPrice)}
            </p>

            {hasDiscount ? (
              <p className="text-sm text-muted-foreground line-through">
                {formatCurrency(product.price)}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-5 grid gap-2 min-[420px]:grid-cols-2">
          <AddToCartButton
            product={product}
            compact
            size="sm"
            className="w-full"
          />

          <ButtonLink
            href={routes.productDetail(product.id)}
            variant="outline"
            size="sm"
            className="w-full"
          >
            Details
          </ButtonLink>
        </div>
      </div>
    </Card>
  );
}