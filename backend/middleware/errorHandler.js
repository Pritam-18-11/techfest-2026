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
  const statusCode = err.statusCode && err.statusCode !== 200 ? err.statusCode : 500;

  console.error(`[error] ${req.method} ${req.originalUrl} -> ${err.message}`);

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
}
