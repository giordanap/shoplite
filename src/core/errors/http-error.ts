import { AppError } from "./app-error";

type HttpErrorOptions = {
  statusCode: number;
  statusText: string;
  url: string;
  responseBody?: unknown;
};

export class HttpError extends AppError {
  readonly statusCode: number;
  readonly statusText: string;
  readonly url: string;
  readonly responseBody?: unknown;

  constructor({ statusCode, statusText, url, responseBody }: HttpErrorOptions) {
    super({
      code: "HTTP_ERROR",
      message: `Request failed with ${statusCode} ${statusText}`,
    });

    this.name = "HttpError";
    this.statusCode = statusCode;
    this.statusText = statusText;
    this.url = url;
    this.responseBody = responseBody;
  }
}