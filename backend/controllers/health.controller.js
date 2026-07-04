import mongoose from "mongoose";

const DB_STATES = ["disconnected", "connected", "connecting", "disconnecting"];

/** GET /api/health */
export function getHealth(req, res) {
  res.status(200).json({
    success: true,
    service: "techfest-2026-api",
    status: "operational",
    database: DB_STATES[mongoose.connection.readyState] ?? "unknown",
    timestamp: new Date().toISOString(),
  });
}
