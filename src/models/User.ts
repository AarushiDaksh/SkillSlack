import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: String,
  name: String,
  // add more fields if needed
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", userSchema);
