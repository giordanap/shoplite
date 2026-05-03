"use client";

import { useMemo, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";

import { routes } from "@/core/router/routes";
import { EmptyPageState } from "@/shared/components/feedback";
import { Container, SectionHeader } from "@/shared/components/layout";
import { Badge, ButtonLink, Card } from "@/shared/components/ui";

import {
  findLocalOrderFromSnapshot,
  getLocalOrdersServerSnapshot,
  getLocalOrdersSnapshot,
  LOCAL_ORDERS_SERVER_SNAPSHOT,
  subscribeToLocalOrders,
} from "../services";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Just now";
  }

  return dateFormatter.format(date);
}

export function OrderSuccessPageClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const ordersSnapshot = useSyncExternalStore(
    subscribeToLocalOrders,
    getLocalOrdersSnapshot,
    getLocalOrdersServerSnapshot,
  );

  const order = useMemo(
    () => findLocalOrderFromSnapshot(ordersSnapshot, orderId),
    [ordersSnapshot, orderId],
  );

  if (ordersSnapshot === LOCAL_ORDERS_SERVER_SNAPSHOT) {
    return (
      <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-aetheric">
        <div className="aetheric-grid pointer-events-none absolute inset-0 opacity-30" />

        <Container className="relative py-20">
          <SectionHeader
            eyebrow="Order success"
            title="Preparing your confirmation."
            description="Loading the locally saved demo order."
          />

          <Card className="mt-10 p-6">
            <div className="h-8 w-48 rounded-full bg-white/[0.06]" />
            <div className="mt-6 h-24 rounded-card bg-white/[0.04]" />
            <div className="mt-4 h-24 rounded-card bg-white/[0.04]" />
          </Card>
        </Container>
      </div>
    );
  }

  if (!order) {
    return (
      <EmptyPageState
        eyebrow="Order success"
        title="No local order was found."
        description="Complete the checkout demo first so the order confirmation can read the locally persisted order."
        primaryAction={{
          label: "Explore products",
          href: routes.products,
        }}
        secondaryAction={{
          label: "Back to cart",
          href: routes.cart,
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
            eyebrow="Order confirmed"
            title="Your demo order was created locally."
            description="This confirmation is stored in localStorage. No backend, payment gateway or real fulfillment flow was called."
          />

          <div className="flex flex-wrap gap-2">
            <Badge variant="success">Confirmed demo</Badge>
            <Badge variant="secondary">{order.items.length} products</Badge>
            <Badge variant="muted">{order.id}</Badge>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
          <section className="space-y-6" aria-label="Order confirmation">
            <Card className="overflow-hidden p-0">
              <div className="relative overflow-hidden border-b border-border-subtle bg-card-gradient p-6">
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-success/20 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-secondary/20 blur-3xl" />

                <div className="relative">
                  <Badge variant="success">Success</Badge>

                  <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                    Thank you, {order.customer.fullName}.
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Order {order.id} was created on {formatDate(order.createdAt)}.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 p-6 md:grid-cols-3">
                <Card variant="subtle">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Status
                  </p>
                  <p className="mt-2 font-display text-xl font-bold text-success">
                    Confirmed
                  </p>
                </Card>

                <Card variant="subtle">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Payment
                  </p>
                  <p className="mt-2 font-display text-xl font-bold text-foreground">
                    Demo token
                  </p>
                </Card>

                <Card variant="subtle">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Delivery
                  </p>
                  <p className="mt-2 font-display text-xl font-bold text-foreground">
                    {order.delivery.label}
                  </p>
                </Card>
              </div>
            </Card>

            <Card className="p-0">
              <div className="border-b border-border-subtle p-6">
                <Badge variant="secondary">Order items</Badge>

                <h2 className="mt-4 font-display text-2xl font-bold text-foreground">
                  Products in this order
                </h2>
              </div>

              <div className="divide-y divide-border-subtle">
                {order.items.map((item) => (
                  <article
                    key={item.product.id}
                    className="grid gap-4 p-5 sm:grid-cols-[96px_minmax(0,1fr)_auto]"
                  >
                    <div className="grid aspect-square place-items-center overflow-hidden rounded-card border border-border-subtle bg-card-gradient">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.product.thumbnail.url}
                        alt={item.product.thumbnail.alt}
                        className="h-full w-full object-contain p-3"
                      />
                    </div>

                    <div className="min-w-0">
                      <Badge variant="secondary">{item.product.categoryName}</Badge>

                      <h3 className="mt-3 font-display text-lg font-bold text-foreground">
                        {item.product.name}
                      </h3>

                      <p className="mt-2 text-sm text-muted-foreground">
                        Quantity:{" "}
                        <span className="font-bold text-foreground">
                          {item.quantity}
                        </span>
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                        Line total
                      </p>

                      <p className="mt-2 font-display text-xl font-bold text-foreground">
                        {formatCurrency(item.lineTotal)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <Badge variant="secondary">Customer details</Badge>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Contact
                  </p>

                  <p className="mt-2 font-bold text-foreground">
                    {order.customer.fullName}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {order.customer.email}
                  </p>

                  {order.customer.phone ? (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {order.customer.phone}
                    </p>
                  ) : null}
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Delivery address
                  </p>

                  <p className="mt-2 font-bold text-foreground">
                    {order.customer.address}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {order.customer.city}, {order.customer.postalCode}
                  </p>
                </div>
              </div>
            </Card>
          </section>

          <aside className="lg:sticky lg:top-28 lg:h-fit" aria-label="Order summary">
            <Card className="overflow-hidden p-0">
              <div className="relative overflow-hidden border-b border-border-subtle bg-card-gradient p-6">
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />

                <div className="relative">
                  <Badge variant="primary">Order total</Badge>

                  <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                    {formatCurrency(order.totals.total)}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Final simulated amount for this local order.
                  </p>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between gap-4 text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-semibold text-foreground">
                      {formatCurrency(order.totals.subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 text-success">
                    <span>Discount</span>
                    <span className="font-semibold">
                      -{formatCurrency(order.totals.discountTotal)}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 text-muted-foreground">
                    <span>Delivery</span>
                    <span className="font-semibold text-foreground">
                      {order.totals.deliveryFee === 0
                        ? "Free"
                        : formatCurrency(order.totals.deliveryFee)}
                    </span>
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
                        {formatCurrency(order.totals.total)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-3">
                  <ButtonLink href={routes.products} className="w-full">
                    Continue shopping
                  </ButtonLink>

                  <ButtonLink href={routes.home} variant="outline" className="w-full">
                    Back to home
                  </ButtonLink>
                </div>

                <div className="mt-6 rounded-card border border-border-subtle bg-white/[0.03] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Demo disclaimer
                  </p>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    This confirmation is local only. It is useful for portfolio
                    flow demonstration, but it does not represent a real order,
                    payment, invoice or shipment.
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