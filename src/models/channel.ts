import mongoose, { Schema, model, models } from "mongoose";

const ChannelSchema = new Schema({
  name: String,
  workspace: { type: Schema.Types.ObjectId, ref: "Workspace" },
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  isVoice: { type: Boolean, default: false },
});

export const Channel = models.Channel || model("Channel", ChannelSchema);
