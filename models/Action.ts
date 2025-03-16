import mongoose from "mongoose";

export const actionSchema = new mongoose.Schema(
  {
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    type: {
      type: String,
      enum: ["SEND_EMAIL"],
      required: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

const ActionModel =
  mongoose.models.Action || mongoose.model("Action", actionSchema);

export default ActionModel;
