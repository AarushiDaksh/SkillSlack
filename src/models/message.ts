import mongoose, { Schema, model, models } from "mongoose";

const MessageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  channel: { type: Schema.Types.ObjectId, ref: "Channel" },
  content: String,
  createdAt: { type: Date, default: Date.now },
});

export const Message = models.Message || model("Message", MessageSchema);
