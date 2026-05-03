export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type NormalizedPaginationParams = {
  page: number;
  limit: number;
};

export type OffsetPaginationParams = {
  limit: number;
  skip: number;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type PaginatedResult<TItem> = {
  items: TItem[];
  pagination: PaginationMeta;
};