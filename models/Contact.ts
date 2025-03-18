import { hashEmail } from "@/utils/crypto";
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    emailHash: {
      type: String,
      required: true,
      default: function () {
        return hashEmail(this.email.trim().toLowerCase());
      },
    },
    phone: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
    sex: {
      type: String,
      enum: ["male", "female", "other", "prefer_not_to_say"],
      default: "prefer_not_to_say",
    },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
    },
    language: {
      type: String,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const ContactModel =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default ContactModel;
