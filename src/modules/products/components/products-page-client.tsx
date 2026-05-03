"use client";

import { ProductCatalog } from "./product-catalog";
import {
  ProductCatalogEmptyState,
  ProductCatalogErrorState,
  ProductCatalogLoadingState,
} from "./product-catalog-states";
import {
  useProductCategoriesQuery,
  useProductSearchParams,
  useProductsQuery,
} from "../hooks";

export function ProductsPageClient() {
  const {
    filters,
    setSearch,
    clearSearch,
    setCategory,
    clearFilters,
  } = useProductSearchParams();

  const productsQuery = useProductsQuery(filters);
  const categoriesQuery = useProductCategoriesQuery();

  if (productsQuery.isLoading) {
    return <ProductCatalogLoadingState />;
  }

  if (productsQuery.isError) {
    return <ProductCatalogErrorState />;
  }

  if (!productsQuery.data || productsQuery.data.items.length === 0) {
    return <ProductCatalogEmptyState />;
  }

  return (
    <ProductCatalog
      products={productsQuery.data.items}
      categories={categoriesQuery.data ?? []}
      pagination={productsQuery.data.pagination}
      search={filters.search}
      selectedCategorySlug={filters.categorySlug}
      isFetching={productsQuery.isFetching}
      isLoadingCategories={categoriesQuery.isLoading}
      onSearchChange={setSearch}
      onClearSearch={clearSearch}
      onCategoryChange={setCategory}
      onClearFilters={clearFilters}
    />
  );
}