import mongoose from "mongoose";

/**
 * Connects to MongoDB using the URI in the environment. Exits the
 * process on failure so process managers (pm2, Docker healthchecks)
 * can restart cleanly rather than serving a half-broken API.
 */
export async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("[db] MONGO_URI is not set in the environment.");
    process.exit(1);
  }

  mongoose.set("strictQuery", true);

  try {
    const conn = await mongoose.connect(uri);
    console.log(`[db] MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[db] Connection error: ${error.message}`);
    process.exit(1);
  }

  mongoose.connection.on("disconnected", () => {
    console.warn("[db] MongoDB disconnected.");
  });
}
