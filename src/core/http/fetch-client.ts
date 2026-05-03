import { HttpError, NetworkError, TimeoutError } from "@/core/errors";

import { buildQueryString } from "./query-string";
import type { FetchClientConfig, FetchClientRequest } from "./http.types";

const DEFAULT_TIMEOUT_MS = 8000;

async function parseResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type");

  if (response.status === 204) {
    return null;
  }

  if (contentType?.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

function buildUrl(baseUrl: string, path: string, query?: FetchClientRequest["query"]) {
  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${normalizedBaseUrl}${normalizedPath}${buildQueryString(query)}`;
}

export function createFetchClient(config: FetchClientConfig = {}) {
  const defaultTimeoutMs = config.defaultTimeoutMs ?? DEFAULT_TIMEOUT_MS;

  return async function fetchClient<TResponse>({
    baseUrl,
    path,
    method = "GET",
    query,
    body,
    headers,
    timeoutMs = defaultTimeoutMs,
    cache = "no-store",
  }: FetchClientRequest): Promise<TResponse> {
    const url = buildUrl(baseUrl, path, query);
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        method,
        cache,
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          ...(body ? { "Content-Type": "application/json" } : {}),
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const responseBody = await parseResponseBody(response);

      if (!response.ok) {
        throw new HttpError({
          statusCode: response.status,
          statusText: response.statusText,
          url,
          responseBody,
        });
      }

      return responseBody as TResponse;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }

      if (controller.signal.aborted) {
        throw new TimeoutError(timeoutMs);
      }

      throw new NetworkError(error);
    } finally {
      window.clearTimeout(timeoutId);
    }
  };
}