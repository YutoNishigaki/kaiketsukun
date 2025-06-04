import { CustomError } from "./abstracts/CustomError";

export class NotFoundError extends CustomError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}
