// src/models/Invite.ts
import { Schema, model, models, Types } from "mongoose";

export interface IInvite {
  code: string;
  workspaceId: Types.ObjectId;
  createdBy: string;
  isActive: boolean;
  expiresAt?: Date | null;
}

const InviteSchema = new Schema<IInvite>(
  {
    code: { type: String, required: true },
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true },
    createdBy: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    expiresAt: { type: Date, default: null },
  },
  { timestamps: true }
);

InviteSchema.index({ code: 1 }, { unique: true });

export const Invite = models.Invite || model<IInvite>("Invite", InviteSchema);
