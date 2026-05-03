import { createFetchClient } from "@/core/http";

import { dummyJsonEndpoints } from "./dummyjson.endpoints";

export const DUMMYJSON_BASE_URL = "https://dummyjson.com";

const request = createFetchClient({
  defaultTimeoutMs: 8000,
});

type DummyJsonRequestOptions = {
  query?: Record<string, string | number | boolean | null | undefined>;
  headers?: HeadersInit;
  timeoutMs?: number;
  cache?: RequestCache;
};

export const dummyJsonClient = {
  endpoints: dummyJsonEndpoints,

  get<TResponse>(path: string, options: DummyJsonRequestOptions = {}) {
    return request<TResponse>({
      baseUrl: DUMMYJSON_BASE_URL,
      path,
      method: "GET",
      query: options.query,
      headers: options.headers,
      timeoutMs: options.timeoutMs,
      cache: options.cache,
    });
  },

  post<TResponse, TBody = unknown>(
    path: string,
    body: TBody,
    options: DummyJsonRequestOptions = {},
  ) {
    return request<TResponse>({
      baseUrl: DUMMYJSON_BASE_URL,
      path,
      method: "POST",
      body,
      query: options.query,
      headers: options.headers,
      timeoutMs: options.timeoutMs,
      cache: options.cache,
    });
  },

  put<TResponse, TBody = unknown>(
    path: string,
    body: TBody,
    options: DummyJsonRequestOptions = {},
  ) {
    return request<TResponse>({
      baseUrl: DUMMYJSON_BASE_URL,
      path,
      method: "PUT",
      body,
      query: options.query,
      headers: options.headers,
      timeoutMs: options.timeoutMs,
      cache: options.cache,
    });
  },

  patch<TResponse, TBody = unknown>(
    path: string,
    body: TBody,
    options: DummyJsonRequestOptions = {},
  ) {
    return request<TResponse>({
      baseUrl: DUMMYJSON_BASE_URL,
      path,
      method: "PATCH",
      body,
      query: options.query,
      headers: options.headers,
      timeoutMs: options.timeoutMs,
      cache: options.cache,
    });
  },

  delete<TResponse>(path: string, options: DummyJsonRequestOptions = {}) {
    return request<TResponse>({
      baseUrl: DUMMYJSON_BASE_URL,
      path,
      method: "DELETE",
      query: options.query,
      headers: options.headers,
      timeoutMs: options.timeoutMs,
      cache: options.cache,
    });
  },
};