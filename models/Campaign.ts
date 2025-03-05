import mongoose from "mongoose";
import { actionSchema } from "./Action";

const campaignSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "paused", "completed"],
      default: "active",
    },
    actions: [actionSchema],
  },
  { timestamps: true }
);

const CampaignModel =
  mongoose.models.Campaign || mongoose.model("Campaign", campaignSchema);

export default CampaignModel;
