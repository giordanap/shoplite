import { dummyJsonClient } from "@/core/api";
import { dummyJsonEndpoints } from "@/core/api/dummyjson";
import { toOffsetPagination } from "@/core/pagination";

import {
  mapDummyJsonProductDtoToProduct,
  mapDummyJsonProductsResponseDtoToPaginatedProducts,
} from "../mappers";
import type {
  DummyJsonProductDto,
  DummyJsonProductsResponseDto,
  Product,
  ProductFilters,
} from "../types";

export const defaultProductFilters: ProductFilters = {
  search: "",
  categorySlug: null,
  page: 1,
  limit: 12,
  sortBy: "title",
  order: "asc",
};

function normalizeProductFilters(
  filters?: Partial<ProductFilters>,
): ProductFilters {
  return {
    ...defaultProductFilters,
    ...filters,
  };
}

export const productsService = {
  async getProducts(filters?: Partial<ProductFilters>) {
    const normalizedFilters = normalizeProductFilters(filters);
    const { limit, skip } = toOffsetPagination({
      page: normalizedFilters.page,
      limit: normalizedFilters.limit,
    });

    const response = await dummyJsonClient.get<DummyJsonProductsResponseDto>(
      dummyJsonEndpoints.products.list,
      {
        query: {
          limit,
          skip,
          sortBy: normalizedFilters.sortBy,
          order: normalizedFilters.order,
        },
      },
    );

    return mapDummyJsonProductsResponseDtoToPaginatedProducts(response);
  },

  async getProductById(productId: number | string): Promise<Product> {
    const response = await dummyJsonClient.get<DummyJsonProductDto>(
      dummyJsonEndpoints.products.detail(productId),
    );

    return mapDummyJsonProductDtoToProduct(response);
  },
};