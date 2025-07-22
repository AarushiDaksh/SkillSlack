import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  // other fields...
}, { timestamps: true });

export const Workspaces = mongoose.models.Workspaces || mongoose.model("Workspaces", workspaceSchema);
