import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  name: String,
  username: String, // GitHub handle or custom
  email: String,
  image: String, // Store avatar URL
  skills: [String],
  achievements: [String],
  projects: [
    {
      name: String,
      description: String,
      link: String,
    },
  ],
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
