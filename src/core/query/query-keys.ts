import type { ProductFilters } from "@/modules/products/types";

export const queryKeys = {
  products: {
    all: ["products"] as const,
    lists: () => [...queryKeys.products.all, "list"] as const,
    list: (filters: ProductFilters) =>
      [...queryKeys.products.lists(), filters] as const,
    details: () => [...queryKeys.products.all, "detail"] as const,
    detail: (productId: number | string) =>
      [...queryKeys.products.details(), productId] as const,
    categories: () => [...queryKeys.products.all, "categories"] as const,
  },

  auth: {
    all: ["auth"] as const,
    me: () => [...queryKeys.auth.all, "me"] as const,
  },
} as const;