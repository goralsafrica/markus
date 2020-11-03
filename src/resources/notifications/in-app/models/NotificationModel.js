import { model, Schema } from "mongoose";
const notifcationSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      refPath: "subjectRole",
    },
    senderRole: {
      type: String,
      enum: ["Staff", "Patient"],
    },
    description: {
      type: String,
      required: true,
    },
    hospital: {
      type: String,
      required: true,
    },
    recipients: [{ type: Schema.Types.ObjectId, ref: "Staff" }],
  },
  {
    timestamps: true,
  }
);

///notifcationSchema.post("save", (doc) => {});

export default model("Notification", notifcationSchema);
