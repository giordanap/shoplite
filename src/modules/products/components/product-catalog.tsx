import type { PaginationMeta } from "@/core/pagination";
import { Container, SectionHeader } from "@/shared/components/layout";
import { Badge, ButtonLink } from "@/shared/components/ui";

import type {
  Product,
  ProductCategory,
  ProductSortField,
  ProductSortOrder,
} from "../types";

import { ProductCard } from "./product-card";
import { ProductFilters } from "./product-filters";
import { ProductPagination } from "./product-pagination";
import { ProductToolbar } from "./product-toolbar";

type ProductCatalogProps = {
  products: Product[];
  categories: ProductCategory[];
  pagination: PaginationMeta;
  search: string;
  selectedCategorySlug: string | null;
  sortBy: ProductSortField;
  order: ProductSortOrder;
  isFetching: boolean;
  isLoadingCategories?: boolean;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onCategoryChange: (categorySlug: string | null) => void;
  onSortChange: (sortBy: ProductSortField, order: ProductSortOrder) => void;
  onPageChange: (page: number) => void;
  onClearFilters: () => void;
};

function getSelectedCategoryName(
  categories: ProductCategory[],
  selectedCategorySlug: string | null,
): string | null {
  if (!selectedCategorySlug) return null;

  return (
    categories.find((category) => category.slug === selectedCategorySlug)
      ?.name ?? selectedCategorySlug
  );
}

export function ProductCatalog({
  products,
  categories,
  pagination,
  search,
  selectedCategorySlug,
  sortBy,
  order,
  isFetching,
  isLoadingCategories = false,
  onSearchChange,
  onClearSearch,
  onCategoryChange,
  onSortChange,
  onPageChange,
  onClearFilters,
}: ProductCatalogProps) {
  const selectedCategoryName = getSelectedCategoryName(
    categories,
    selectedCategorySlug,
  );

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
            title="Explore real products by search and category."
            description="The catalog is connected to DummyJSON search, category, sorting and pagination endpoints, with state reflected in the URL."
          />

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{pagination.total} products</Badge>
            <Badge variant="muted">DummyJSON live data</Badge>
            {isFetching ? <Badge variant="primary">Refreshing</Badge> : null}
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="hidden lg:block">
            <ProductFilters
              categories={categories}
              selectedCategorySlug={selectedCategorySlug}
              isLoadingCategories={isLoadingCategories}
              onCategoryChange={onCategoryChange}
              onClearFilters={onClearFilters}
            />
          </div>

          <div>
            <ProductToolbar
              total={pagination.total}
              showing={products.length}
              page={pagination.page}
              totalPages={pagination.totalPages}
              search={search}
              selectedCategoryName={selectedCategoryName}
              sortBy={sortBy}
              order={order}
              onSearchChange={onSearchChange}
              onClearSearch={onClearSearch}
              onSortChange={onSortChange}
            />

            <div className="mt-6 lg:hidden">
              <ProductFilters
                categories={categories}
                selectedCategorySlug={selectedCategorySlug}
                isLoadingCategories={isLoadingCategories}
                onCategoryChange={onCategoryChange}
                onClearFilters={onClearFilters}
              />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <ProductPagination
              pagination={pagination}
              onPageChange={onPageChange}
            />

            <div className="mt-10 rounded-card border border-border-subtle bg-white/[0.03] p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Next catalog milestone
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Sorting and pagination are now functional. The next step is
                    the product detail page.
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