// utils/db.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB ?? "skillslack";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Reuse a single connection/promise across HMR & route calls
declare global {
  // eslint-disable-next-line no-var
  var __mongooseConn: MongooseCache | undefined;
}
const cached: MongooseCache = global.__mongooseConn ?? { conn: null, promise: null };
global.__mongooseConn = cached;

// Recommended for Next.js + Mongoose 7+
mongoose.set("bufferCommands", false);

export async function connect(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    if (!MONGODB_URI) throw new Error("MONGODB_URI is not defined in environment variables.");

    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: DB_NAME,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
      })
      .then((m) => {
        console.log("MongoDB connected");
        return m;
      })
      .catch((err) => {
        cached.promise = null; // allow retry on next call
        console.error("MongoDB connection error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export function isDbConnected() {
  return mongoose.connection.readyState === 1; // 1 = connected
}

export default connect;
