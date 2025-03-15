import mongoose from "mongoose";

export const actionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["SEND_EMAIL"],
      required: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { _id: false }
);
