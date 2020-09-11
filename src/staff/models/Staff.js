import { model, Schema } from "mongoose";

const StaffSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  hospital: {
    type: Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  priviledged: {
    type: Number,
    default: 0,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  branches: [{ type: Schema.Types.ObjectId, ref: "Branch" }],
});

export default model("Staff", StaffSchema);
