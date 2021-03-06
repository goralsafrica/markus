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
  title: {
    type: String,
    required: true,
  },
  specialization: {
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
  verified: {
    type: Boolean,
    default: false,
  },
  deviceToken: {
    type: String,
    select: false,
  },
});

StaffSchema.pre("save", function (next) {
  this.firstName = this.firstName.toLowerCase();
  this.lastName = this.lastName.toLowerCase();
  this.email = this.email.toLowerCase();
  next();
});

export default model("Staff", StaffSchema);
