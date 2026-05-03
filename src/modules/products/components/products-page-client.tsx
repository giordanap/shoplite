"use client";

import { routes } from "@/core/router/routes";
import { Container, SectionHeader } from "@/shared/components/layout";
import {
  Badge,
  ButtonLink,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  SkeletonBlock,
} from "@/shared/components/ui";

import { useProductsQuery } from "../hooks";
import { defaultProductFilters } from "../services";

export function ProductsPageClient() {
  const productsQuery = useProductsQuery(defaultProductFilters);

  if (productsQuery.isLoading) {
    return <ProductsLoadingState />;
  }

  if (productsQuery.isError) {
    return <ProductsErrorState />;
  }

  const result = productsQuery.data;

  return (
    <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-aetheric">
      <div className="aetheric-grid pointer-events-none absolute inset-0 opacity-30" />

      <Container className="relative py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Products"
            title="Real products from DummyJSON."
            description="This is the first connected product list. The next commits will add premium catalog layout, search, filters, sorting and pagination controls."
          />

          <Badge variant="secondary" className="w-fit">
            {result?.pagination.total ?? 0} products available
          </Badge>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {result?.items.map((product) => (
            <Card key={product.id} className="overflow-hidden p-4">
              <div className="grid aspect-[4/3] place-items-center overflow-hidden rounded-card border border-border-subtle bg-card-gradient">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.thumbnail.url}
                  alt={product.thumbnail.alt}
                  className="h-full w-full object-contain p-4"
                  loading="lazy"
                />
              </div>

              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <Badge variant="secondary">{product.category.name}</Badge>
                  <h2 className="mt-4 line-clamp-2 font-display text-xl font-bold text-foreground">
                    {product.name}
                  </h2>
                </div>

                <Badge
                  variant={
                    product.availabilityStatus === "in-stock"
                      ? "success"
                      : product.availabilityStatus === "low-stock"
                        ? "warning"
                        : "danger"
                  }
                >
                  {product.availabilityStatus}
                </Badge>
              </div>

              <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">
                {product.description}
              </p>

              <div className="mt-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Price
                  </p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <p className="font-display text-2xl font-bold text-foreground">
                      ${product.discountedPrice}
                    </p>
                    {product.discountPercent > 0 ? (
                      <p className="text-sm text-muted-foreground line-through">
                        ${product.price}
                      </p>
                    ) : null}
                  </div>
                </div>

                <ButtonLink
                  href={routes.productDetail(product.id)}
                  variant="outline"
                  size="sm"
                >
                  Details
                </ButtonLink>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-10">
          <CardHeader>
            <CardTitle className="text-secondary">
              Pagination foundation
            </CardTitle>
            <CardDescription>
              Page {result?.pagination.page ?? 1} of{" "}
              {result?.pagination.totalPages ?? 1}. Showing{" "}
              {result?.pagination.limit ?? defaultProductFilters.limit} items.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-muted-foreground">
              The service already maps DummyJSON&apos;s limit/skip response into
              our internal pagination model. Visual pagination controls will be
              added in the catalog layout commit.
            </p>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

function ProductsLoadingState() {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-aetheric">
      <div className="aetheric-grid pointer-events-none absolute inset-0 opacity-30" />

      <Container className="relative py-20">
        <SectionHeader
          eyebrow="Products"
          title="Loading products."
          description="Fetching real product data from DummyJSON."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonBlock key={index} className="h-96" />
          ))}
        </div>
      </Container>
    </div>
  );
}

function ProductsErrorState() {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-aetheric">
      <div className="aetheric-grid pointer-events-none absolute inset-0 opacity-30" />

      <Container className="relative flex min-h-[calc(100vh-5rem)] items-center py-20">
        <Card className="w-full p-8 md:p-10">
          <Badge variant="danger">API error</Badge>

          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-foreground">
            Products could not be loaded.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            DummyJSON may be unavailable or the network request failed. Try
            refreshing the page.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href={routes.products}>Retry route</ButtonLink>
            <ButtonLink href={routes.home} variant="outline">
              Back to home
            </ButtonLink>
          </div>
        </Card>
      </Container>
    </div>
  );
}