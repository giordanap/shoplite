"use client";

import { useMemo, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

import { routes } from "@/core/router";
import { useAuthStore } from "@/modules/auth/store";
import { getCartTotals, useCartStore } from "@/modules/cart/store";
import { useFavoritesStore } from "@/modules/favorites/store";
import {
  getLocalOrdersFromSnapshot,
  getLocalOrdersServerSnapshot,
  getLocalOrdersSnapshot,
  LOCAL_ORDERS_SERVER_SNAPSHOT,
  subscribeToLocalOrders,
} from "@/modules/orders/services";
import { EmptyPageState } from "@/shared/components/feedback";
import { Container, SectionHeader } from "@/shared/components/layout";
import { Badge, Button, ButtonLink, Card } from "@/shared/components/ui";

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
    return "Recently";
  }

  return dateFormatter.format(date);
}

export function AccountDashboardPageClient() {
  const router = useRouter();

  const session = useAuthStore((state) => state.session);
  const logout = useAuthStore((state) => state.logout);

  const cartItems = useCartStore((state) => state.items);
  const cartTotals = useMemo(() => getCartTotals(cartItems), [cartItems]);

  const favoriteItems = useFavoritesStore((state) => state.items);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const favoritesCount = favoriteItems.length;

  const ordersSnapshot = useSyncExternalStore(
    subscribeToLocalOrders,
    getLocalOrdersSnapshot,
    getLocalOrdersServerSnapshot,
  );

  const orders = useMemo(
    () => getLocalOrdersFromSnapshot(ordersSnapshot),
    [ordersSnapshot],
  );

  const recentOrders = orders.slice(0, 3);
  const lifetimeValue = orders.reduce(
    (total, order) => total + order.totals.total,
    0,
  );

  function handleLogout() {
    logout();
    router.push(routes.login);
  }

  if (!session) {
    return (
      <EmptyPageState
        eyebrow="Account"
        title="Sign in to open your demo dashboard."
        description="Create a local demo session first. The account dashboard will then show profile data, local orders, cart stats and logout actions."
        primaryAction={{
          label: "Demo login",
          href: routes.login,
        }}
        secondaryAction={{
          label: "Explore products",
          href: routes.products,
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
            eyebrow="Account dashboard"
            title={`Welcome back, ${session.user.fullName}.`}
            description="A frontend-only customer dashboard powered by a local demo session, persisted cart data and local order history."
          />

          <div className="flex flex-wrap gap-2">
            <Badge variant="primary">Demo session</Badge>
            <Badge variant="secondary">{orders.length} orders</Badge>
            <Badge variant="muted">{cartTotals.itemCount} cart items</Badge>
            <Badge variant="accent">{favoritesCount} favorites</Badge>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="space-y-6">
            <Card className="overflow-hidden p-0">
              <div className="relative overflow-hidden border-b border-border-subtle bg-card-gradient p-6">
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-secondary/20 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-primary/20 blur-3xl" />

                <div className="relative">
                  <div className="grid size-16 place-items-center rounded-full border border-secondary/40 bg-secondary/10 font-display text-2xl font-black text-secondary shadow-[0_0_32px_rgba(0,229,255,0.16)]">
                    {session.user.avatarInitials}
                  </div>

                  <h2 className="mt-5 font-display text-2xl font-bold text-foreground">
                    {session.user.fullName}
                  </h2>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {session.user.email}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="font-bold uppercase tracking-[0.18em] text-muted-foreground">
                      Role
                    </dt>
                    <dd className="mt-1 font-semibold text-foreground">
                      Demo customer
                    </dd>
                  </div>

                  <div>
                    <dt className="font-bold uppercase tracking-[0.18em] text-muted-foreground">
                      Session created
                    </dt>
                    <dd className="mt-1 font-semibold text-foreground">
                      {formatDate(session.createdAt)}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-bold uppercase tracking-[0.18em] text-muted-foreground">
                      Auth mode
                    </dt>
                    <dd className="mt-1 font-semibold text-foreground">
                      LocalStorage only
                    </dd>
                  </div>
                </dl>

                <div className="mt-8 grid gap-3">
                  <ButtonLink href={routes.products} className="w-full">
                    Continue shopping
                  </ButtonLink>

                  <Button
                    variant="danger"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </Card>

            <Card variant="subtle">
              <Badge variant="muted">Security note</Badge>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                This is not real authentication. The session is created locally
                for portfolio purposes and no credentials are sent to a backend.
              </p>
            </Card>
          </aside>

          <section className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Card variant="subtle">
                <Badge variant="secondary">Cart</Badge>

                <p className="mt-4 font-display text-3xl font-bold text-foreground">
                  {cartTotals.itemCount}
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  Items currently saved in your persistent cart.
                </p>
              </Card>

              <Card variant="subtle">
                <Badge variant="secondary">Orders</Badge>

                <p className="mt-4 font-display text-3xl font-bold text-foreground">
                  {orders.length}
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  Local demo orders created from checkout.
                </p>
              </Card>

              <Card variant="subtle">
                <Badge variant="secondary">Wishlist</Badge>

                <p className="mt-4 font-display text-3xl font-bold text-foreground">
                  {favoritesCount}
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  Products saved to your persistent wishlist.
                </p>
              </Card>

              <Card variant="subtle">
                <Badge variant="secondary">Total demo spend</Badge>

                <p className="mt-4 font-display text-3xl font-bold text-foreground">
                  {formatCurrency(lifetimeValue)}
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  Sum of locally confirmed demo orders.
                </p>
              </Card>
            </div>

            <Card className="p-0">
              <div className="flex flex-col gap-4 border-b border-border-subtle p-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <Badge variant="primary">Order history</Badge>

                  <h2 className="mt-4 font-display text-2xl font-bold text-foreground">
                    Recent local orders
                  </h2>
                </div>

                <ButtonLink href={routes.products} variant="outline" size="sm">
                  Shop more
                </ButtonLink>
              </div>

              {ordersSnapshot === LOCAL_ORDERS_SERVER_SNAPSHOT ? (
                <div className="p-6">
                  <div className="h-24 rounded-card bg-white/[0.04]" />
                </div>
              ) : recentOrders.length > 0 ? (
                <div className="divide-y divide-border-subtle">
                  {recentOrders.map((order) => (
                    <article
                      key={order.id}
                      className="grid gap-4 p-5 md:grid-cols-[minmax(0,1fr)_auto]"
                    >
                      <div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="success">Confirmed</Badge>
                          <Badge variant="muted">{order.id}</Badge>
                        </div>

                        <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                          {order.items.length} products · {order.delivery.label}
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                          Created {formatDate(order.createdAt)}
                        </p>
                      </div>

                      <div className="md:text-right">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                          Total
                        </p>

                        <p className="mt-2 font-display text-2xl font-bold text-foreground">
                          {formatCurrency(order.totals.total)}
                        </p>

                        <ButtonLink
                          href={`${routes.orderSuccess}?orderId=${order.id}`}
                          variant="outline"
                          size="sm"
                          className="mt-4"
                        >
                          View order
                        </ButtonLink>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="p-6">
                  <div className="rounded-card border border-border-subtle bg-white/[0.03] p-6">
                    <Badge variant="muted">No orders yet</Badge>

                    <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                      Your order history is empty.
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Complete the checkout demo to create your first local
                      order.
                    </p>

                    <ButtonLink href={routes.products} className="mt-6">
                      Explore products
                    </ButtonLink>
                  </div>
                </div>
              )}
            </Card>

            <Card className="p-0">
              <div className="flex flex-col gap-4 border-b border-border-subtle p-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <Badge variant="accent">Wishlist</Badge>

                  <h2 className="mt-4 font-display text-2xl font-bold text-foreground">
                    Saved favorites
                  </h2>
                </div>

                <ButtonLink href={routes.products} variant="outline" size="sm">
                  Discover more
                </ButtonLink>
              </div>

              {favoriteItems.length > 0 ? (
                <div className="divide-y divide-border-subtle">
                  {favoriteItems.slice(0, 3).map((item) => (
                    <article
                      key={item.product.id}
                      className="grid gap-4 p-5 sm:grid-cols-[72px_minmax(0,1fr)_auto]"
                    >
                      <div className="grid aspect-square place-items-center overflow-hidden rounded-card border border-border-subtle bg-card-gradient">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.product.thumbnail.url}
                          alt={item.product.thumbnail.alt}
                          className="h-full w-full object-contain p-2"
                        />
                      </div>

                      <div className="min-w-0">
                        <Badge variant="secondary">
                          {item.product.categoryName}
                        </Badge>

                        <h3 className="mt-3 truncate font-display text-lg font-bold text-foreground">
                          {item.product.name}
                        </h3>

                        <p className="mt-1 text-sm text-muted-foreground">
                          Rating:{" "}
                          <span className="font-bold text-warning">
                            ★ {item.product.rating.toFixed(1)}
                          </span>
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 sm:justify-end">
                        <ButtonLink
                          href={routes.productDetail(item.product.id)}
                          variant="outline"
                          size="sm"
                        >
                          View
                        </ButtonLink>

                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeFavorite(item.product.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="p-6">
                  <div className="rounded-card border border-border-subtle bg-white/[0.03] p-6">
                    <Badge variant="muted">No favorites yet</Badge>

                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                      Save products from the catalog or product detail page to
                      build your wishlist.
                    </p>

                    <ButtonLink href={routes.products} className="mt-6">
                      Explore products
                    </ButtonLink>
                  </div>
                </div>
              )}
            </Card>

            <Card className="p-0">
              <div className="flex flex-col gap-4 border-b border-border-subtle p-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <Badge variant="secondary">Cart preview</Badge>

                  <h2 className="mt-4 font-display text-2xl font-bold text-foreground">
                    Saved cart state
                  </h2>
                </div>

                <ButtonLink href={routes.cart} variant="outline" size="sm">
                  Open cart
                </ButtonLink>
              </div>

              {cartItems.length > 0 ? (
                <div className="divide-y divide-border-subtle">
                  {cartItems.slice(0, 3).map((item) => (
                    <article
                      key={item.product.id}
                      className="grid gap-4 p-5 sm:grid-cols-[72px_minmax(0,1fr)_auto]"
                    >
                      <div className="grid aspect-square place-items-center overflow-hidden rounded-card border border-border-subtle bg-card-gradient">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.product.thumbnail.url}
                          alt={item.product.thumbnail.alt}
                          className="h-full w-full object-contain p-2"
                        />
                      </div>

                      <div className="min-w-0">
                        <Badge variant="secondary">
                          {item.product.categoryName}
                        </Badge>

                        <h3 className="mt-3 truncate font-display text-lg font-bold text-foreground">
                          {item.product.name}
                        </h3>

                        <p className="mt-1 text-sm text-muted-foreground">
                          Quantity:{" "}
                          <span className="font-bold text-foreground">
                            {item.quantity}
                          </span>
                        </p>
                      </div>

                      <p className="font-display text-xl font-bold text-foreground sm:text-right">
                        {formatCurrency(
                          item.product.discountedPrice * item.quantity,
                        )}
                      </p>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="p-6">
                  <div className="rounded-card border border-border-subtle bg-white/[0.03] p-6">
                    <Badge variant="muted">Empty cart</Badge>

                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                      Add products to see a live cart preview inside your
                      account.
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </section>
        </div>
      </Container>
    </div>
  );
}