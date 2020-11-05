import { model, Schema } from "mongoose";

const inviteSchema = new Schema(
  {
    staff: {
      type: Schema.Types.ObjectId,
      ref: "Staff",
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
    },
    recipient: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "accepted", "declined"],
    },
  },
  {
    timestamps: true,
  }
);
export default model("Invite", inviteSchema);
