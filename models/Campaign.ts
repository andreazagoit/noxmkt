import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    project: {
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
      enum: ["draft", "running", "completed"],
      default: "draft",
    },
  },
  { timestamps: true }
);

const CampaignModel =
  mongoose.models.Campaign || mongoose.model("Campaign", campaignSchema);

export default CampaignModel;
