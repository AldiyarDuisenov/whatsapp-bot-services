import mongoose from "mongoose";
const BotSchema = new mongoose.Schema(
  {
    botNumber: {
      type: String,
    },
    managers: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Bot", BotSchema);
