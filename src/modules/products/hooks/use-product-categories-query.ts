"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/core/query";

import { productsService } from "../services";

export function useProductCategoriesQuery() {
  return useQuery({
    queryKey: queryKeys.products.categories(),
    queryFn: productsService.getProductCategories,
    staleTime: 24 * 60 * 60 * 1000,
  });
}