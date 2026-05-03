"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import type { ProductFilters, ProductSortField, ProductSortOrder } from "../types";
import { defaultProductFilters, normalizeProductFilters } from "../services";

function parsePositiveInteger(value: string | null, fallback: number): number {
  if (!value) return fallback;

  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue) || parsedValue < 1) {
    return fallback;
  }

  return Math.floor(parsedValue);
}

function parseSortField(value: string | null): ProductSortField {
  if (value === "price" || value === "rating" || value === "title") {
    return value;
  }

  return defaultProductFilters.sortBy;
}

function parseSortOrder(value: string | null): ProductSortOrder {
  if (value === "asc" || value === "desc") {
    return value;
  }

  return defaultProductFilters.order;
}

function buildSearchParams(filters: ProductFilters): string {
  const params = new URLSearchParams();

  if (filters.search) {
    params.set("q", filters.search);
  }

  if (filters.categorySlug) {
    params.set("category", filters.categorySlug);
  }

  if (filters.page > 1) {
    params.set("page", String(filters.page));
  }

  if (filters.limit !== defaultProductFilters.limit) {
    params.set("limit", String(filters.limit));
  }

  if (filters.sortBy !== defaultProductFilters.sortBy) {
    params.set("sortBy", filters.sortBy);
  }

  if (filters.order !== defaultProductFilters.order) {
    params.set("order", filters.order);
  }

  return params.toString();
}

export function useProductSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo<ProductFilters>(() => {
    return normalizeProductFilters({
      search: searchParams.get("q") ?? "",
      page: parsePositiveInteger(
        searchParams.get("page"),
        defaultProductFilters.page,
      ),
      limit: parsePositiveInteger(
        searchParams.get("limit"),
        defaultProductFilters.limit,
      ),
      sortBy: parseSortField(searchParams.get("sortBy")),
      order: parseSortOrder(searchParams.get("order")),
      categorySlug: searchParams.get("category"),
    });
  }, [searchParams]);

  const setFilters = useCallback(
    (nextFilters: Partial<ProductFilters>) => {
      const mergedFilters = normalizeProductFilters({
        ...filters,
        ...nextFilters,
      });

      const queryString = buildSearchParams(mergedFilters);
      const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

      router.replace(nextUrl, {
        scroll: false,
      });
    },
    [filters, pathname, router],
  );

  const setSearch = useCallback(
    (search: string) => {
      setFilters({
        search,
        categorySlug: null,
        page: 1,
      });
    },
    [setFilters],
  );

  const clearSearch = useCallback(() => {
    setFilters({
      search: "",
      page: 1,
    });
  }, [setFilters]);

  const setCategory = useCallback(
    (categorySlug: string | null) => {
      setFilters({
        categorySlug,
        search: "",
        page: 1,
      });
    },
    [setFilters],
  );

  const clearFilters = useCallback(() => {
    setFilters({
      search: "",
      categorySlug: null,
      page: 1,
    });
  }, [setFilters]);

  return {
    filters,
    setFilters,
    setSearch,
    clearSearch,
    setCategory,
    clearFilters,
  };
}