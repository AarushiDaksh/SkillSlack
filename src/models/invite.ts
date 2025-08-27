// src/models/Invite.ts
import { Schema, model, models, Types } from "mongoose";

export interface InviteAttrs {
  workspaceId: Types.ObjectId;
  code: string;
  token?: string | null;
  expiresAt?: Date | null;
  active?: boolean;
  createdBy?: string | null;
}

const InviteSchema = new Schema<InviteAttrs>(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true },
    code: { type: String, required: true },       // public join code
    token: { type: String, default: null },       // optional secret token
    expiresAt: { type: Date, default: null },
    active: { type: Boolean, default: true },
    createdBy: { type: String, default: null },   // Clerk user id
  },
  { timestamps: true }
);

// Unique constraints / indexes
InviteSchema.index({ code: 1 }, { unique: true });
InviteSchema.index({ token: 1 }, { unique: true, sparse: true });

const Invite = models.Invite || model<InviteAttrs>("Invite", InviteSchema);
export default Invite;
