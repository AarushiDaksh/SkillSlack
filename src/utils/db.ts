// utils/db.ts
import mongoose from "mongoose";

let isConnected = false;

export const connect = async () => {
  if (isConnected) return;

  const MONGO_URI = process.env.MONGODB_URI;

  if (!MONGO_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables.");
  }

  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "skillslack",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);

    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Error connecting to MongoDB");
  }
};
