export type ProductSortField = "title" | "price" | "rating";

export type ProductSortOrder = "asc" | "desc";

export type ProductFilters = {
  search: string;
  categorySlug: string | null;
  page: number;
  limit: number;
  sortBy: ProductSortField;
  order: ProductSortOrder;
};