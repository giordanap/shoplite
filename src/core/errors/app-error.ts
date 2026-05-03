export type AppErrorCode =
  | "HTTP_ERROR"
  | "NETWORK_ERROR"
  | "TIMEOUT_ERROR"
  | "UNKNOWN_ERROR";

type AppErrorOptions = {
  code: AppErrorCode;
  message: string;
  cause?: unknown;
};

export class AppError extends Error {
  readonly code: AppErrorCode;
  readonly cause?: unknown;

  constructor({ code, message, cause }: AppErrorOptions) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.cause = cause;
  }
}