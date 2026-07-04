/** Catches unmatched routes and forwards a 404 into the error pipeline. */
export function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

/**
 * Centralized error handler. Every controller in Phase 3 (events,
 * registration, gallery, sponsors, contact, newsletter) throws or
 * calls next(error) and lands here, so responses stay consistent.
 */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode && err.statusCode !== 200 ? err.statusCode : 500;
  let message = err.message || "Internal server error";

  // Mongoose duplicate key (e.g. already registered / already subscribed).
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyPattern || {})[0] || "field";
    message = `A record with this ${field} already exists.`;
  }

  // Mongoose schema validation errors.
  if (err.name === "ValidationError") {
    statusCode = 422;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(" ");
  }

  console.error(`[error] ${req.method} ${req.originalUrl} -> ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
    details: err.details ?? undefined,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
}