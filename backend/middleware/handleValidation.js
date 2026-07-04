import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

/**
 * Runs after an express-validator chain. If any validator failed,
 * short-circuits with a 422 carrying all field errors; otherwise
 * passes through to the controller.
 */
export function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const details = errors.array().map((e) => ({ field: e.path, message: e.msg }));
  const error = new ApiError(422, "Validation failed.");
  error.details = details;
  next(error);
}