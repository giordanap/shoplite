"use client";

import { ProductCatalog } from "./product-catalog";
import {
  ProductCatalogEmptyState,
  ProductCatalogErrorState,
  ProductCatalogLoadingState,
} from "./product-catalog-states";
import { useProductsQuery } from "../hooks";
import { defaultProductFilters } from "../services";

export function ProductsPageClient() {
  const productsQuery = useProductsQuery(defaultProductFilters);

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
    />
  );
}