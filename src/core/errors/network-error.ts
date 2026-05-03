import { AppError } from "./app-error";

export class NetworkError extends AppError {
  constructor(cause?: unknown) {
    super({
      code: "NETWORK_ERROR",
      message: "Network request failed.",
      cause,
    });

    this.name = "NetworkError";
  }
}