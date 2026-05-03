"use client";

import { useMemo } from "react";

import { routes } from "@/core/router/routes";
import { EmptyPageState } from "@/shared/components/feedback";
import { Container, SectionHeader } from "@/shared/components/layout";
import { Badge, Button, ButtonLink, Card } from "@/shared/components/ui";

import { getCartTotals, useCartStore } from "../store";
import type { CartItem } from "../types";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

function formatAvailabilityLabel(
  status: CartItem["product"]["availabilityStatus"],
): string {
  const labels: Record<CartItem["product"]["availabilityStatus"], string> = {
    "in-stock": "In stock",
    "low-stock": "Low stock",
    "out-of-stock": "Out of stock",
  };

  return labels[status];
}

function getAvailabilityVariant(
  status: CartItem["product"]["availabilityStatus"],
) {
  if (status === "in-stock") return "success";
  if (status === "low-stock") return "warning";

  return "danger";
}

function getCartItemTotal(item: CartItem): number {
  return item.product.discountedPrice * item.quantity;
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
        description="Add products from the catalog and they will stay here thanks to Zustand localStorage persistence."
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
            title="Curate your premium order."
            description="A Stitch-inspired cart experience with live quantity controls, persisted state and a clean order summary for this frontend-only commerce demo."
          />

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{totals.itemCount} items</Badge>
            <Badge variant="muted">{totals.uniqueItemsCount} unique products</Badge>
            <Badge variant="primary">Zustand persisted</Badge>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
          <section className="space-y-4" aria-label="Cart items">
            <Card className="overflow-hidden p-0">
              <div className="border-b border-border-subtle bg-white/[0.03] p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <Badge variant="secondary">Shopping bag</Badge>

                    <h2 className="mt-3 font-display text-2xl font-bold text-foreground">
                      Selected products
                    </h2>
                  </div>

                  <Button variant="danger" size="sm" onClick={clearCart}>
                    Clear cart
                  </Button>
                </div>
              </div>

              <div className="divide-y divide-border-subtle">
                {items.map((item) => {
                  const isDecreaseDisabled = item.quantity <= 1;
                  const isIncreaseDisabled = item.quantity >= item.product.stock;
                  const hasDiscount =
                    item.product.discountedPrice < item.product.price;

                  return (
                    <article
                      key={item.product.id}
                      className="grid gap-5 p-5 md:grid-cols-[132px_minmax(0,1fr)] xl:grid-cols-[132px_minmax(0,1fr)_190px]"
                    >
                      <a
                        href={routes.productDetail(item.product.id)}
                        className="group grid aspect-square place-items-center overflow-hidden rounded-card border border-border-subtle bg-card-gradient transition duration-300 hover:border-secondary/40"
                        aria-label={`View ${item.product.name}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.product.thumbnail.url}
                          alt={item.product.thumbnail.alt}
                          className="h-full w-full object-contain p-4 transition duration-300 group-hover:scale-105"
                        />
                      </a>

                      <div className="min-w-0">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">
                            {item.product.categoryName}
                          </Badge>

                          <Badge
                            variant={getAvailabilityVariant(
                              item.product.availabilityStatus,
                            )}
                          >
                            {formatAvailabilityLabel(
                              item.product.availabilityStatus,
                            )}
                          </Badge>
                        </div>

                        <h3 className="mt-4 font-display text-xl font-bold leading-tight text-foreground">
                          {item.product.name}
                        </h3>

                        <div className="mt-4 flex flex-wrap items-baseline gap-2">
                          <p className="font-display text-2xl font-bold text-foreground">
                            {formatCurrency(item.product.discountedPrice)}
                          </p>

                          {hasDiscount ? (
                            <p className="text-sm text-muted-foreground line-through">
                              {formatCurrency(item.product.price)}
                            </p>
                          ) : null}
                        </div>

                        <p className="mt-3 text-sm text-muted-foreground">
                          Stock available:{" "}
                          <span className="font-bold text-foreground">
                            {item.product.stock}
                          </span>
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3 xl:hidden">
                          <ButtonLink
                            href={routes.productDetail(item.product.id)}
                            variant="outline"
                            size="sm"
                          >
                            Details
                          </ButtonLink>

                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => removeItem(item.product.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between gap-5 md:col-span-2 xl:col-span-1 xl:items-end">
                        <div className="flex items-center gap-2 xl:justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={isDecreaseDisabled}
                            onClick={() => decreaseQuantity(item.product.id)}
                            aria-label={`Decrease quantity for ${item.product.name}`}
                          >
                            −
                          </Button>

                          <span className="grid h-9 min-w-12 place-items-center rounded-button border border-border-subtle bg-white/[0.04] px-3 text-sm font-black text-foreground">
                            {item.quantity}
                          </span>

                          <Button
                            variant="outline"
                            size="sm"
                            disabled={isIncreaseDisabled}
                            onClick={() => increaseQuantity(item.product.id)}
                            aria-label={`Increase quantity for ${item.product.name}`}
                          >
                            +
                          </Button>
                        </div>

                        <div className="xl:text-right">
                          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                            Item total
                          </p>

                          <p className="mt-1 font-display text-2xl font-bold text-foreground">
                            {formatCurrency(getCartItemTotal(item))}
                          </p>
                        </div>

                        <div className="hidden gap-2 xl:flex">
                          <ButtonLink
                            href={routes.productDetail(item.product.id)}
                            variant="outline"
                            size="sm"
                          >
                            Details
                          </ButtonLink>

                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => removeItem(item.product.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <Card variant="subtle">
                <Badge variant="secondary">01</Badge>

                <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                  Persistent bag
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Items remain available after refresh through localStorage.
                </p>
              </Card>

              <Card variant="subtle">
                <Badge variant="secondary">02</Badge>

                <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                  Frontend only
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  No backend, no payments and no secrets are used in this demo.
                </p>
              </Card>

              <Card variant="subtle">
                <Badge variant="secondary">03</Badge>

                <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                  Portfolio ready
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  The flow is designed to show realistic commerce behavior.
                </p>
              </Card>
            </div>
          </section>

          <aside className="lg:sticky lg:top-28 lg:h-fit" aria-label="Order summary">
            <Card className="overflow-hidden p-0">
              <div className="relative overflow-hidden border-b border-border-subtle bg-card-gradient p-6">
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-secondary/20 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-primary/20 blur-3xl" />

                <div className="relative">
                  <Badge variant="primary">Order summary</Badge>

                  <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                    {formatCurrency(totals.total)}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Estimated total for this frontend-only cart simulation.
                  </p>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between gap-4 text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-semibold text-foreground">
                      {formatCurrency(totals.subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 text-success">
                    <span>Discount</span>
                    <span className="font-semibold">
                      -{formatCurrency(totals.discountTotal)}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 text-muted-foreground">
                    <span>Shipping</span>
                    <span className="font-semibold text-foreground">Demo only</span>
                  </div>

                  <div className="flex justify-between gap-4 text-muted-foreground">
                    <span>Taxes</span>
                    <span className="font-semibold text-foreground">
                      Not calculated
                    </span>
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
                </div>

                <div className="mt-6 rounded-card border border-border-subtle bg-white/[0.03] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Demo note
                  </p>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Checkout is intentionally disabled from real payments. This
                    project keeps API keys, payments and secrets out of the
                    frontend.
                  </p>
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </Container>
    </div>
  );
}