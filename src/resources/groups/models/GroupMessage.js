import { Schema, model } from "mongoose";

const groupMessageSchema = new Schema(
  {
    group: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    message: {
      type: String,
    },
    attachment: {
      type: String,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("GroupMessage", groupMessageSchema);
