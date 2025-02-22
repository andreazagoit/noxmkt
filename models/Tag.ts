import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TagModel = mongoose.models.Tag || mongoose.model("Tag", tagSchema);

export default TagModel;
