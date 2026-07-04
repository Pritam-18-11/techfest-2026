import rateLimit from "express-rate-limit";

/**
 * Applied only to endpoints that write public-facing data without an
 * admin key (registrations, contact messages, newsletter signups).
 * Much tighter than the global API limiter in app.js.
 */
export const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many submissions from this device. Please try again later.",
  },
});