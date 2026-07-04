import { ApiError } from "../utils/ApiError.js";

/**
 * Lightweight admin gate: requires an `x-admin-key` header matching
 * ADMIN_API_KEY. This is intentionally simple (no user accounts/JWT) —
 * appropriate for a small organizing-committee admin surface, not a
 * multi-user auth system.
 */
export function requireAdmin(req, res, next) {
  const key = req.headers["x-admin-key"];

  if (!process.env.ADMIN_API_KEY) {
    return next(new ApiError(500, "ADMIN_API_KEY is not configured on the server."));
  }

  if (!key || key !== process.env.ADMIN_API_KEY) {
    return next(new ApiError(401, "Invalid or missing admin key."));
  }

  next();
}