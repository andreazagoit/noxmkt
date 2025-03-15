"use server";
import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  host: {
    type: String,
    required: true,
  },
  port: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  secure: {
    type: Boolean,
    default: true,
  },
  default: {
    type: Boolean,
    default: false,
  },
});

const ProfileModel =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);

export default ProfileModel;
