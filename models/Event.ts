import mongoose from "mongoose";
import { EVENTS_LIST } from "@/const/events";

export const eventSchema = new mongoose.Schema(
  {
    action: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Action",
      required: true,
    },
    contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },
    type: {
      type: String,
      enum: EVENTS_LIST,
      required: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

const EventModel =
  mongoose.models.Event || mongoose.model("Event", eventSchema);

export default EventModel;
