import { dummyJsonClient } from "@/core/api";
import { dummyJsonEndpoints } from "@/core/api/dummyjson";
import { toOffsetPagination } from "@/core/pagination";

import {
  mapDummyJsonCategoryDtoToProductCategory,
  mapDummyJsonProductDtoToProduct,
  mapDummyJsonProductsResponseDtoToPaginatedProducts,
} from "../mappers";
import type {
  DummyJsonProductCategoryDto,
  DummyJsonProductDto,
  DummyJsonProductsResponseDto,
  Product,
  ProductCategory,
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

export function normalizeProductFilters(
  filters?: Partial<ProductFilters>,
): ProductFilters {
  return {
    ...defaultProductFilters,
    ...filters,
    search: filters?.search?.trim() ?? defaultProductFilters.search,
    categorySlug: filters?.categorySlug?.trim() || null,
  };
}

export const productsService = {
  async getProducts(filters?: Partial<ProductFilters>) {
    const normalizedFilters = normalizeProductFilters(filters);
    const { limit, skip } = toOffsetPagination({
      page: normalizedFilters.page,
      limit: normalizedFilters.limit,
    });

    const endpoint = normalizedFilters.categorySlug
      ? dummyJsonEndpoints.products.byCategory(normalizedFilters.categorySlug)
      : normalizedFilters.search
        ? dummyJsonEndpoints.products.search
        : dummyJsonEndpoints.products.list;

    const response = await dummyJsonClient.get<DummyJsonProductsResponseDto>(
      endpoint,
      {
        query: {
          limit,
          skip,
          sortBy: normalizedFilters.sortBy,
          order: normalizedFilters.order,
          q:
            !normalizedFilters.categorySlug && normalizedFilters.search
              ? normalizedFilters.search
              : undefined,
        },
      },
    );

    return mapDummyJsonProductsResponseDtoToPaginatedProducts(response);
  },

  async getProductCategories(): Promise<ProductCategory[]> {
    const response = await dummyJsonClient.get<DummyJsonProductCategoryDto[]>(
      dummyJsonEndpoints.products.categories,
    );

    return response.map(mapDummyJsonCategoryDtoToProductCategory);
  },

  async getProductById(productId: number | string): Promise<Product> {
    const response = await dummyJsonClient.get<DummyJsonProductDto>(
      dummyJsonEndpoints.products.detail(productId),
    );

    return mapDummyJsonProductDtoToProduct(response);
  },
};