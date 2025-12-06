import mongoose from "mongoose";

const mailSchema = mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    to: [
      {
        email: { type: String, required: true },
        isRead: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
      },
    ],
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    contentHTML: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Mail = mongoose.model("Mail", mailSchema);

export default Mail;
