import { model, Schema } from "mongoose";

const SecuritySchema = new Schema({
  token: String,
  dueDate: Date,
  frequency: {
    type: Number,
    default: 30,
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
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  "two-factor-auth": {
    type: SecuritySchema,
    select: false,
    default: {},
  },
});

export default model("Staff", StaffSchema);
