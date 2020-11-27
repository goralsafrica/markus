import { model, Schema } from "mongoose";

const PatientSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    residentAddress: {
      type: String,
    },
    workAddress: {
      type: String,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
    },
    nextOfKin: {
      type: String,
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    code: {
      type: Number,
      required: true,
    },
    importedEmrCode: String,
  },
  {
    timestamps: true,
  }
);

PatientSchema.pre("save", function (next) {
  this.firstName = this.firstName.toLowerCase();
  this.lastName = this.lastName.toLowerCase();
  if (this.email) {
    this.email = this.email.toLowerCase();
  }
  if (this.bloodGroup) {
    this.bloodGroup = this.bloodGroup.toUpperCase();
  }
  next();
});

export default model("Patient", PatientSchema);
