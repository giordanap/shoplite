"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/core/query";

import { productsService } from "../services";

export function useProductDetailQuery(productId: number | string | null) {
  return useQuery({
    queryKey: queryKeys.products.detail(productId ?? "unknown"),
    queryFn: () => productsService.getProductById(productId as number | string),
    enabled: productId !== null,
  });
}