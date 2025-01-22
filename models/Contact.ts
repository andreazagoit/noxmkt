import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    default: null,
  },
  tags: [
    {
      type: String,
    },
  ],
  enabled: {
    type: Boolean,
    default: true,
  },
});

const ContactModel =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default ContactModel;
