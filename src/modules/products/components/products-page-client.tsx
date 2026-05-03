"use client";

import { ProductCatalog } from "./product-catalog";
import {
  ProductCatalogEmptyState,
  ProductCatalogErrorState,
  ProductCatalogLoadingState,
} from "./product-catalog-states";
import { useProductSearchParams, useProductsQuery } from "../hooks";

export function ProductsPageClient() {
  const { filters, setSearch, clearSearch } = useProductSearchParams();
  const productsQuery = useProductsQuery(filters);

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
      pagination={productsQuery.data.pagination}
      search={filters.search}
      isFetching={productsQuery.isFetching}
      onSearchChange={setSearch}
      onClearSearch={clearSearch}
    />
  );
}