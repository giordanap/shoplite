"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/core/query";

import { productsService } from "../services";
import type { ProductFilters } from "../types";

export function useProductsQuery(filters: ProductFilters) {
  return useQuery({
    queryKey: queryKeys.products.list(filters),
    queryFn: () => productsService.getProducts(filters),
    placeholderData: keepPreviousData,
  });
}