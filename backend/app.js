import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
import routes from "./routes/index.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Deployed behind a reverse proxy (Render/Railway/Nginx) in production,
// so Express needs to trust the X-Forwarded-For header for req.ip and
// express-rate-limit to work correctly.
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") ?? "*",
    credentials: true,
  })
);
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "test") {
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
}

// Generous global limiter; individual write endpoints (registration,
// contact, newsletter) apply stricter limits in Phase 3.
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", globalLimiter);

app.get("/", (req, res) => {
  res.json({ message: "TechFest 2026 API — see /api/health" });
});

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;