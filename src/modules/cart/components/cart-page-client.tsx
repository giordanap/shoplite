"use client";

import { useMemo } from "react";

import { routes } from "@/core/router/routes";
import { EmptyPageState } from "@/shared/components/feedback";
import { Container, SectionHeader } from "@/shared/components/layout";
import { Badge, Button, ButtonLink, Card } from "@/shared/components/ui";

import { getCartTotals, useCartStore } from "../store";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

export function CartPageClient() {
  const items = useCartStore((state) => state.items);
  const totals = useMemo(() => getCartTotals(items), [items]);
  
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  if (items.length === 0) {
    return (
      <EmptyPageState
        eyebrow="Cart"
        title="Your cart is empty."
        description="Add products from the catalog and they will stay here thanks to localStorage persistence."
        primaryAction={{
          label: "Explore products",
          href: routes.products,
        }}
        secondaryAction={{
          label: "Back to home",
          href: routes.home,
        }}
      />
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-aetheric">
      <div className="aetheric-grid pointer-events-none absolute inset-0 opacity-30" />

      <Container className="relative py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Persistent cart"
            title="Review your selected products."
            description="Your cart is powered by Zustand and persisted in localStorage for this frontend-only portfolio demo."
          />

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{totals.itemCount} items</Badge>
            <Badge variant="muted">{totals.uniqueItemsCount} unique</Badge>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-4">
            {items.map((item) => (
              <Card
                key={item.product.id}
                className="grid gap-5 p-4 md:grid-cols-[120px_minmax(0,1fr)_auto]"
              >
                <div className="grid aspect-square place-items-center overflow-hidden rounded-card border border-border-subtle bg-card-gradient">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.product.thumbnail.url}
                    alt={item.product.thumbnail.alt}
                    className="h-full w-full object-contain p-4"
                  />
                </div>

                <div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{item.product.categoryName}</Badge>
                    <Badge variant="muted">
                      {item.product.availabilityStatus}
                    </Badge>
                  </div>

                  <h2 className="mt-4 font-display text-xl font-bold text-foreground">
                    {item.product.name}
                  </h2>

                  <div className="mt-3 flex flex-wrap items-baseline gap-2">
                    <p className="font-display text-2xl font-bold text-foreground">
                      {formatCurrency(item.product.discountedPrice)}
                    </p>

                    {item.product.discountedPrice < item.product.price ? (
                      <p className="text-sm text-muted-foreground line-through">
                        {formatCurrency(item.product.price)}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="flex flex-col gap-3 md:items-end">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={item.quantity <= 1}
                      onClick={() => decreaseQuantity(item.product.id)}
                    >
                      −
                    </Button>

                    <span className="grid h-9 min-w-10 place-items-center rounded-button border border-border-subtle bg-white/[0.04] px-3 text-sm font-black text-foreground">
                      {item.quantity}
                    </span>

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={item.quantity >= item.product.stock}
                      onClick={() => increaseQuantity(item.product.id)}
                    >
                      +
                    </Button>
                  </div>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeItem(item.product.id)}
                  >
                    Remove
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <Card className="h-fit p-6">
            <Badge variant="primary">Order summary</Badge>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between gap-4 text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatCurrency(totals.subtotal)}</span>
              </div>

              <div className="flex justify-between gap-4 text-success">
                <span>Discount</span>
                <span>-{formatCurrency(totals.discountTotal)}</span>
              </div>

              <div className="border-t border-border-subtle pt-4">
                <div className="flex justify-between gap-4">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-display text-2xl font-bold text-foreground">
                    {formatCurrency(totals.total)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-3">
              <ButtonLink href={routes.checkout} className="w-full">
                Continue to checkout
              </ButtonLink>

              <ButtonLink href={routes.products} variant="outline" className="w-full">
                Keep shopping
              </ButtonLink>

              <Button variant="danger" className="w-full" onClick={clearCart}>
                Clear cart
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}