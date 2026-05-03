import type { QueryParams, QueryParamValue } from "./http.types";

function appendQueryParam(
  searchParams: URLSearchParams,
  key: string,
  value: QueryParamValue,
) {
  if (value === null || value === undefined || value === "") {
    return;
  }

  searchParams.append(key, String(value));
}

export function buildQueryString(query?: QueryParams): string {
  if (!query) return "";

  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => appendQueryParam(searchParams, key, item));
      return;
    }

    appendQueryParam(searchParams, key, value);
  });

  const queryString = searchParams.toString();

  return queryString ? `?${queryString}` : "";
}