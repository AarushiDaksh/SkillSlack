import mongoose, { Schema, model, models } from "mongoose";

const WorkspaceMemberSchema = new Schema({
  userId: { type: String, required: true }, // Clerk User ID
  workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true },
  role: { type: String, default: "member" }, // optional role system
  joinedAt: { type: Date, default: Date.now },
});

export const WorkspaceMember =
  models.WorkspaceMember || model("WorkspaceMember", WorkspaceMemberSchema);
