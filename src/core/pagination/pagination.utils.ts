import type {
  NormalizedPaginationParams,
  OffsetPaginationParams,
  PaginationMeta,
  PaginationParams,
} from "./pagination.types";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 48;

export function normalizePaginationParams(
  params: PaginationParams = {},
): NormalizedPaginationParams {
  const page = Math.max(params.page ?? DEFAULT_PAGE, 1);
  const limit = Math.min(Math.max(params.limit ?? DEFAULT_LIMIT, 1), MAX_LIMIT);

  return {
    page,
    limit,
  };
}

export function toOffsetPagination(
  params: PaginationParams = {},
): OffsetPaginationParams {
  const normalized = normalizePaginationParams(params);

  return {
    limit: normalized.limit,
    skip: (normalized.page - 1) * normalized.limit,
  };
}

export function buildPaginationMeta({
  total,
  limit,
  skip,
}: {
  total: number;
  limit: number;
  skip: number;
}): PaginationMeta {
  const safeLimit = Math.max(limit, 1);
  const page = Math.floor(skip / safeLimit) + 1;
  const totalPages = Math.max(Math.ceil(total / safeLimit), 1);

  return {
    page,
    limit: safeLimit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}