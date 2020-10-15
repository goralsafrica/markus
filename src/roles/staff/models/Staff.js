import { model, Schema } from "mongoose";

const AdministrativeRoleSchema = new Schema({
  name: {
    type: Schema.Types.ObjectId,
    ref: "Role",
  },
  branch: {
    type: Schema.Types.ObjectId,
    ref: "Branch",
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
  },
});

const SecuritySchema = new Schema({
  token: String,
  dueDate: Date,
  frequency: {
    type: Number,
    default: 45,
  },
});

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
  code: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  "two-factor-auth": {
    type: SecuritySchema,
    select: false,
  },
  hospital: [
    {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
    },
  ],
  phone: {
    type: String,
    required: true,
  },
  priviledged: {
    type: Number,
    default: 0,
  },
  administrativeRole: {
    type: AdministrativeRoleSchema,
    required: false,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  branches: [{ type: Schema.Types.ObjectId, ref: "Branch" }],
});

export default model("Staff", StaffSchema);
