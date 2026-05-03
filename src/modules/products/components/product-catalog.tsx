import type { PaginationMeta } from "@/core/pagination";
import { Container, SectionHeader } from "@/shared/components/layout";
import { Badge, ButtonLink } from "@/shared/components/ui";

import type { Product, ProductCategory } from "../types";
import { ProductCard } from "./product-card";
import { ProductFilters } from "./product-filters";
import { ProductPagination } from "./product-pagination";
import { ProductToolbar } from "./product-toolbar";

type ProductCatalogProps = {
  products: Product[];
  pagination: PaginationMeta;
  search: string;
  isFetching: boolean;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
};

function getCatalogCategories(products: Product[]): ProductCategory[] {
  return Array.from(
    new Map(
      products.map((product) => [product.category.slug, product.category]),
    ).values(),
  );
}

export function ProductCatalog({
  products,
  pagination,
  search,
  isFetching,
  onSearchChange,
  onClearSearch,
}: ProductCatalogProps) {
  const categories = getCatalogCategories(products);

  return (
    <div
      id="top"
      className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-aetheric"
    >
      <div className="aetheric-grid pointer-events-none absolute inset-0 opacity-30" />

      <Container className="relative py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Premium catalog"
            title="Explore real products with searchable URL state."
            description="The catalog is connected to DummyJSON search and keeps the current search term in the browser URL."
          />

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{pagination.total} products</Badge>
            <Badge variant="muted">DummyJSON live data</Badge>
            {isFetching ? <Badge variant="primary">Refreshing</Badge> : null}
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="hidden lg:block">
            <ProductFilters categories={categories} />
          </div>

          <div>
            <ProductToolbar
              total={pagination.total}
              showing={products.length}
              page={pagination.page}
              totalPages={pagination.totalPages}
              search={search}
              onSearchChange={onSearchChange}
              onClearSearch={onClearSearch}
            />

            <div className="mt-6 lg:hidden">
              <ProductFilters categories={categories} />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <ProductPagination pagination={pagination} />

            <div className="mt-10 rounded-card border border-border-subtle bg-white/[0.03] p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Next catalog milestone
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Category filters, sorting and real pagination behavior will
                    be layered on top of this searchable layout.
                  </p>
                </div>

                <ButtonLink href="#top" variant="outline" size="sm">
                  Back to top
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}