import mongoose from "mongoose";
const MessageSchema = new mongoose.Schema(
  {
    messageId: {
      type: String,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    username: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    replyMethod: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", MessageSchema);
