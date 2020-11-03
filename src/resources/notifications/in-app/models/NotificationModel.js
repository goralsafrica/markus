import { model, Schema } from "mongoose";
import descriptions from "./descriptions";
const inviteeSchema = new Schema({
  email: String,
  staff: {
    type: String,
    ref: "Role",
  },
  status: {
    type: String,
    enum: ["accepted", "rejected", "pending"],
  },
});

const notifcationSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      refPath: "senderRole",
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
    invitee: inviteeSchema,
  },
  {
    timestamps: true,
  }
);

notifcationSchema.pre("save", function (next) {
  this.description = descriptions[this.description];
  next();
});

notifcationSchema.post("save", (doc) => {
  console.log(doc);
});

export default model("Notification", notifcationSchema);
