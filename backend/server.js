import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`[server] TechFest 2026 API running on port ${PORT} (${process.env.NODE_ENV || "development"})`);
  });

  function shutdown(signal) {
    console.log(`[server] ${signal} received, shutting down gracefully...`);
    server.close(() => {
      console.log("[server] Closed remaining connections.");
      process.exit(0);
    });
    // Force-exit if it hangs.
    setTimeout(() => process.exit(1), 10_000).unref();
  }

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

start().catch((error) => {
  console.error("[server] Fatal startup error:", error);
  process.exit(1);
});
