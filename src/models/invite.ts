import mongoose, { Schema } from "mongoose";

const InviteSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspaces", required: true },
    invitedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String }, // optional if you're not using it now
  },
  { timestamps: true }
);

const Invite = mongoose.models.Invite || mongoose.model("Invite", InviteSchema);
export default Invite;
