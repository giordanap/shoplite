import { AppError } from "./app-error";

export class TimeoutError extends AppError {
  constructor(timeoutMs: number) {
    super({
      code: "TIMEOUT_ERROR",
      message: `Request timed out after ${timeoutMs}ms.`,
    });

    this.name = "TimeoutError";
  }
}