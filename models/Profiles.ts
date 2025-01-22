import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
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
});

const ProfileModel =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);

export default ProfileModel;
