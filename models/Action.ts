import mongoose from "mongoose";

export const actionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "SEND_EMAIL",
        "UPDATE_LANDING_PAGE",
        "PREPARE_IMAGES",
        "SET_UP_EMAIL_TRIGGER",
        "CREATE_NEW_SUBJECT_LINE",
        "SEND_REMINDER_EMAIL",
      ],
      required: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { _id: false }
);
