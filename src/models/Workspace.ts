import { Schema, model, models, type Model } from "mongoose";

export interface IWorkspace {
  name: string;
  ownerId: string;      // Clerk user id
  members: string[];    // Clerk user ids
}

const WorkspaceSchema = new Schema<IWorkspace>(
  {
    name: { type: String, required: true },
    ownerId: { type: String, required: true },
    members: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Export a properly typed Mongoose model
export const Workspace: Model<IWorkspace> =
  (models.Workspace as Model<IWorkspace>) ||
  model<IWorkspace>("Workspace", WorkspaceSchema);
