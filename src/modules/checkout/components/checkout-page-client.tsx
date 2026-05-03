"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Badge, Button, ButtonLink, Card, Input } from "@/shared/components/ui";
import { Container, SectionHeader } from "@/shared/components/layout";
import { createLocalOrder } from "@/modules/orders/services";
import { EmptyPageState } from "@/shared/components/feedback";
import { getCartTotals, useCartStore } from "@/modules/cart/store";
import { routes } from "@/core/router";
import type { CartItem } from "@/modules/cart/types";


type DeliveryMethod = "standard" | "express";

type CheckoutFormState = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  deliveryMethod: DeliveryMethod;
};

const initialFormState: CheckoutFormState = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  deliveryMethod: "standard",
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

function getDeliveryFee(deliveryMethod: DeliveryMethod): number {
  if (deliveryMethod === "express") return 9.99;

  return 0;
}

function getDeliveryLabel(deliveryMethod: DeliveryMethod): string {
  if (deliveryMethod === "express") return "Express delivery";

  return "Standard delivery";
}

function getItemTotal(item: CartItem): number {
  return item.product.discountedPrice * item.quantity;
}

export function CheckoutPageClient() {
  const router = useRouter();
  
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const totals = useMemo(() => getCartTotals(items), [items]);

  const [formState, setFormState] =
    useState<CheckoutFormState>(initialFormState);

  const deliveryFee = getDeliveryFee(formState.deliveryMethod);
  const grandTotal = totals.total + deliveryFee;

  const canPlaceOrder =
    formState.fullName.trim().length > 0 &&
    formState.email.trim().length > 0 &&
    formState.address.trim().length > 0 &&
    formState.city.trim().length > 0 &&
    formState.postalCode.trim().length > 0 &&
    items.length > 0;

  function updateFormField<Key extends keyof CheckoutFormState>(
    key: Key,
    value: CheckoutFormState[Key],
  ) {
    setFormState((currentState) => ({
      ...currentState,
      [key]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canPlaceOrder) return;

    const order = createLocalOrder({
      customer: {
        fullName: formState.fullName,
        email: formState.email,
        phone: formState.phone,
        address: formState.address,
        city: formState.city,
        postalCode: formState.postalCode,
      },
      delivery: {
        method: formState.deliveryMethod,
        label: getDeliveryLabel(formState.deliveryMethod),
        fee: deliveryFee,
      },
      items,
      totals: {
        subtotal: totals.subtotal,
        discountTotal: totals.discountTotal,
        deliveryFee,
        taxTotal: 0,
        total: grandTotal,
      },
    });

    window.sessionStorage.setItem("shoplite-checkout-in-progress", "true");

    clearCart();
    router.push(`${routes.orderSuccess}?orderId=${order.id}`);
  }

  if (items.length === 0) {
    return (
      <EmptyPageState
        eyebrow="Checkout"
        title="Your checkout is empty."
        description="Add products to the cart first. The checkout demo will then show customer information, delivery options, simulated payment and order summary."
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
            eyebrow="Checkout demo"
            title="Complete a simulated premium checkout."
            description="This page demonstrates a realistic checkout flow without collecting payments, secrets or backend data."
          />

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{totals.itemCount} items</Badge>
            <Badge variant="primary">Demo only</Badge>
            <Badge variant="muted">No real payment</Badge>
          </div>
        </div>

        <form
          className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px]"
          onSubmit={handleSubmit}
        >
          <section className="space-y-6" aria-label="Checkout form">
            <Card className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <Badge variant="secondary">Step 01</Badge>

                  <h2 className="mt-4 font-display text-2xl font-bold text-foreground">
                    Contact information
                  </h2>
                </div>

                <Badge variant="muted">Required</Badge>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Full name
                  </span>

                  <Input
                    value={formState.fullName}
                    onChange={(event) =>
                      updateFormField("fullName", event.target.value)
                    }
                    placeholder="Giordan Apaza"
                    autoComplete="name"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Email
                  </span>

                  <Input
                    type="email"
                    value={formState.email}
                    onChange={(event) =>
                      updateFormField("email", event.target.value)
                    }
                    placeholder="giordan@example.com"
                    autoComplete="email"
                  />
                </label>

                <label className="grid gap-2 md:col-span-2">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Phone
                  </span>

                  <Input
                    value={formState.phone}
                    onChange={(event) =>
                      updateFormField("phone", event.target.value)
                    }
                    placeholder="+34 600 000 000"
                    autoComplete="tel"
                  />
                </label>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <Badge variant="secondary">Step 02</Badge>

                  <h2 className="mt-4 font-display text-2xl font-bold text-foreground">
                    Delivery details
                  </h2>
                </div>

                <Badge variant="muted">Required</Badge>
              </div>

              <div className="mt-6 grid gap-4">
                <label className="grid gap-2">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Address
                  </span>

                  <Input
                    value={formState.address}
                    onChange={(event) =>
                      updateFormField("address", event.target.value)
                    }
                    placeholder="Street, number, floor"
                    autoComplete="street-address"
                  />
                </label>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                      City
                    </span>

                    <Input
                      value={formState.city}
                      onChange={(event) =>
                        updateFormField("city", event.target.value)
                      }
                      placeholder="Murcia"
                      autoComplete="address-level2"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                      Postal code
                    </span>

                    <Input
                      value={formState.postalCode}
                      onChange={(event) =>
                        updateFormField("postalCode", event.target.value)
                      }
                      placeholder="30000"
                      autoComplete="postal-code"
                    />
                  </label>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div>
                <Badge variant="secondary">Step 03</Badge>

                <h2 className="mt-4 font-display text-2xl font-bold text-foreground">
                  Delivery method
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Choose a simulated delivery method. No shipping provider is called.
                </p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <button
                  type="button"
                  aria-pressed={formState.deliveryMethod === "standard"}
                  onClick={() => updateFormField("deliveryMethod", "standard")}
                  className={`rounded-card border p-5 text-left transition duration-200 ${
                    formState.deliveryMethod === "standard"
                      ? "border-secondary/50 bg-secondary/10 shadow-[0_0_28px_rgba(0,229,255,0.12)]"
                      : "border-border-subtle bg-white/[0.03] hover:border-border-strong hover:bg-white/[0.06]"
                  }`}
                >
                  <Badge
                    variant={
                      formState.deliveryMethod === "standard"
                        ? "secondary"
                        : "muted"
                    }
                  >
                    Standard
                  </Badge>

                  <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                    Free delivery
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Estimated arrival in 4 to 6 business days.
                  </p>
                </button>

                <button
                  type="button"
                  aria-pressed={formState.deliveryMethod === "express"}
                  onClick={() => updateFormField("deliveryMethod", "express")}
                  className={`rounded-card border p-5 text-left transition duration-200 ${
                    formState.deliveryMethod === "express"
                      ? "border-primary/50 bg-primary/10 shadow-[0_0_28px_rgba(124,58,237,0.18)]"
                      : "border-border-subtle bg-white/[0.03] hover:border-border-strong hover:bg-white/[0.06]"
                  }`}
                >
                  <Badge
                    variant={
                      formState.deliveryMethod === "express" ? "primary" : "muted"
                    }
                  >
                    Express
                  </Badge>

                  <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                    {formatCurrency(9.99)}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Estimated arrival in 1 to 2 business days.
                  </p>
                </button>
              </div>
            </Card>

            <Card className="p-6">
              <div>
                <Badge variant="secondary">Step 04</Badge>

                <h2 className="mt-4 font-display text-2xl font-bold text-foreground">
                  Simulated payment
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Payment is intentionally mocked. This portfolio project never asks for card data.
                </p>
              </div>

              <div className="mt-6 rounded-card border border-border-subtle bg-white/[0.03] p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                      Payment method
                    </p>

                    <p className="mt-2 font-display text-xl font-bold text-foreground">
                      Demo payment token
                    </p>
                  </div>

                  <Badge variant="success">Ready</Badge>
                </div>
              </div>
            </Card>
          </section>

          <aside className="lg:sticky lg:top-28 lg:h-fit" aria-label="Checkout summary">
            <Card className="overflow-hidden p-0">
              <div className="relative overflow-hidden border-b border-border-subtle bg-card-gradient p-6">
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-secondary/20 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-primary/20 blur-3xl" />

                <div className="relative">
                  <Badge variant="primary">Checkout summary</Badge>

                  <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                    {formatCurrency(grandTotal)}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Final simulated total including selected delivery.
                  </p>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {items.slice(0, 3).map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-3 rounded-card border border-border-subtle bg-white/[0.03] p-3"
                    >
                      <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-button bg-card-gradient">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.product.thumbnail.url}
                          alt={item.product.thumbnail.alt}
                          className="h-full w-full object-contain p-2"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-foreground">
                          {item.product.name}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          Qty {item.quantity}
                        </p>
                      </div>

                      <p className="text-sm font-bold text-foreground">
                        {formatCurrency(getItemTotal(item))}
                      </p>
                    </div>
                  ))}

                  {items.length > 3 ? (
                    <p className="text-sm text-muted-foreground">
                      + {items.length - 3} more products in your cart.
                    </p>
                  ) : null}
                </div>

                <div className="mt-6 space-y-4 border-t border-border-subtle pt-6 text-sm">
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
                    <span>{getDeliveryLabel(formState.deliveryMethod)}</span>
                    <span className="font-semibold text-foreground">
                      {deliveryFee === 0 ? "Free" : formatCurrency(deliveryFee)}
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
                        {formatCurrency(grandTotal)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-3">
                  <Button type="submit" className="w-full" disabled={!canPlaceOrder}>
                    Place demo order
                  </Button>

                  <ButtonLink href={routes.cart} variant="outline" className="w-full">
                    Back to cart
                  </ButtonLink>
                </div>

                <div className="mt-6 rounded-card border border-border-subtle bg-white/[0.03] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Safety note
                  </p>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    No real checkout is executed. This page only simulates the final
                    step of a commerce flow.
                  </p>
                </div>
              </div>
            </Card>
          </aside>
        </form>
      </Container>
    </div>
  );
}