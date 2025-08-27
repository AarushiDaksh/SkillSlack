import mongoose, { Schema, InferSchemaType, model, models } from "mongoose";

const InviteSchema = new Schema(
  {
    code: { type: String, required: true, unique: true, index: true },
    isActive: { type: Boolean, default: true },
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true },
    createdBy: { type: String, required: true }, // clerkId or user id
    expiresAt: { type: Date }
  },
  { timestamps: true }
);

export type InviteDoc = InferSchemaType<typeof InviteSchema>;
export const Invite = models.Invite || model("Invite", InviteSchema);
