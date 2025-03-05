import mongoose from "mongoose";
import { actionSchema } from "./Action";

const automationSchema = new mongoose.Schema(
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
    trigger: {
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

const AutomationModel =
  mongoose.models.Automation || mongoose.model("Automation", automationSchema);

export default AutomationModel;
