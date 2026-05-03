"use client";

import { Badge, ButtonLink, Card } from "@/shared/components/ui";
import { Container } from "@/shared/components/layout";
import { routes } from "@/core/router/routes";

import { AddToCartButton } from "@/modules/cart/components";
import { FavoriteToggleButton } from "@/modules/favorites/components";
import type { Product } from "../types";

type ProductDetailProps = {
  product: Product;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const reviewDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

function formatReviewDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recent";
  }

  return reviewDateFormatter.format(date);
}

function getAvailabilityLabel(status: Product["availabilityStatus"]): string {
  const labels: Record<Product["availabilityStatus"], string> = {
    "in-stock": "In stock",
    "low-stock": "Low stock",
    "out-of-stock": "Out of stock",
  };

  return labels[status];
}

function getAvailabilityVariant(status: Product["availabilityStatus"]) {
  if (status === "in-stock") return "success";
  if (status === "low-stock") return "warning";

  return "danger";
}

export function ProductDetail({ product }: ProductDetailProps) {
  const hasDiscount = product.discountPercent > 0;
  const heroImage = product.images[0] ?? product.thumbnail;
  const galleryImages =
    product.images.length > 0 ? product.images.slice(0, 4) : [product.thumbnail];

  return (
    <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-aetheric">
      <div className="aetheric-grid pointer-events-none absolute inset-0 opacity-30" />

      <Container className="relative py-20">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <ButtonLink href={routes.products} variant="outline" size="sm">
            Back to products
          </ButtonLink>

          <Badge variant="secondary">{product.category.name}</Badge>

          {product.brandName ? (
            <Badge variant="muted">{product.brandName}</Badge>
          ) : null}

          <Badge variant={getAvailabilityVariant(product.availabilityStatus)}>
            {getAvailabilityLabel(product.availabilityStatus)}
          </Badge>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:gap-10">
          <div>
            <Card className="overflow-hidden p-4">
              <div className="relative grid min-h-[320px] place-items-center overflow-hidden rounded-card border border-border-subtle bg-card-gradient sm:min-h-[420px]">
                {hasDiscount ? (
                  <Badge
                    variant="accent"
                    className="absolute left-5 top-5 z-10 tracking-[0.14em]"
                  >
                    -{Math.round(product.discountPercent)}%
                  </Badge>
                ) : null}

                <Badge
                  variant={getAvailabilityVariant(product.availabilityStatus)}
                  className="absolute right-5 top-5 z-10 tracking-[0.14em]"
                >
                  {getAvailabilityLabel(product.availabilityStatus)}
                </Badge>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroImage.url}
                  alt={heroImage.alt}
                  className="h-full max-h-[460px] w-full object-contain p-8"
                />
              </div>
            </Card>

            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {galleryImages.map((image, index) => (
                <Card key={`${image.url}-${index}`} variant="subtle" className="p-3">
                  <div className="grid aspect-square place-items-center overflow-hidden rounded-card border border-border-subtle bg-white/[0.03]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="h-full w-full object-contain p-3"
                      loading="lazy"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <Badge variant="primary">Live product detail</Badge>

            <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              {product.name}
            </h1>

            <p className="mt-5 text-base leading-8 text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-8 flex flex-wrap items-end gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Price
                </p>

                <div className="mt-2 flex flex-wrap items-baseline gap-3">
                  <p className="font-display text-4xl font-bold text-foreground">
                    {formatCurrency(product.discountedPrice)}
                  </p>

                  {hasDiscount ? (
                    <p className="text-base text-muted-foreground line-through">
                      {formatCurrency(product.price)}
                    </p>
                  ) : null}
                </div>
              </div>

              <Badge variant="warning">★ {product.rating.toFixed(1)}</Badge>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Card variant="subtle">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Stock
                </p>
                <p className="mt-2 font-display text-2xl font-bold text-foreground">
                  {product.stock}
                </p>
              </Card>

              <Card variant="subtle">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Minimum order
                </p>
                <p className="mt-2 font-display text-2xl font-bold text-foreground">
                  {product.minimumOrderQuantity ?? 1}
                </p>
              </Card>

              <Card variant="subtle">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  SKU
                </p>
                <p className="mt-2 truncate font-display text-xl font-bold text-foreground">
                  {product.sku ?? "N/A"}
                </p>
              </Card>
            </div>

            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
              <AddToCartButton product={product} />

              <FavoriteToggleButton product={product} />

              <ButtonLink href={routes.cart} variant="outline">
                Cart preview
              </ButtonLink>
            </div>

            <Card variant="subtle" className="mt-8">
              <h2 className="font-display text-xl font-bold text-foreground">
                Commerce details
              </h2>

              <dl className="mt-5 grid gap-4 text-sm text-muted-foreground">
                <div>
                  <dt className="font-bold uppercase tracking-[0.16em] text-foreground">
                    Warranty
                  </dt>
                  <dd className="mt-1">
                    {product.warrantyInformation ?? "Warranty information unavailable."}
                  </dd>
                </div>

                <div>
                  <dt className="font-bold uppercase tracking-[0.16em] text-foreground">
                    Shipping
                  </dt>
                  <dd className="mt-1">
                    {product.shippingInformation ?? "Shipping information unavailable."}
                  </dd>
                </div>

                <div>
                  <dt className="font-bold uppercase tracking-[0.16em] text-foreground">
                    Return policy
                  </dt>
                  <dd className="mt-1">
                    {product.returnPolicy ?? "Return policy unavailable."}
                  </dd>
                </div>
              </dl>
            </Card>

            {product.tags.length > 0 ? (
              <div className="mt-8 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="muted">
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {product.reviews.length > 0 ? (
          <section className="mt-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Badge variant="secondary">Reviews</Badge>
                <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                  Customer signals
                </h2>
              </div>

              <Badge variant="muted">{product.reviews.length} reviews</Badge>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {product.reviews.slice(0, 3).map((review, index) => (
                <Card key={`${review.reviewerName}-${index}`} variant="subtle">
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant="warning">★ {review.rating.toFixed(1)}</Badge>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {formatReviewDate(review.date)}
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-6 text-muted-foreground">
                    {review.comment}
                  </p>

                  <p className="mt-5 text-sm font-bold text-foreground">
                    {review.reviewerName}
                  </p>
                </Card>
              ))}
            </div>
          </section>
        ) : null}
      </Container>
    </div>
  );
}