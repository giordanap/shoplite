export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type QueryParamValue =
  | string
  | number
  | boolean
  | null
  | undefined;

export type QueryParams = Record<
  string,
  QueryParamValue | QueryParamValue[]
>;

export type FetchClientRequest = {
  baseUrl: string;
  path: string;
  method?: HttpMethod;
  query?: QueryParams;
  body?: unknown;
  headers?: HeadersInit;
  timeoutMs?: number;
  cache?: RequestCache;
};

export type FetchClientConfig = {
  defaultTimeoutMs?: number;
};