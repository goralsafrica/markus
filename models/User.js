var mongoose = require("mongoose");

var UserSchema = mongoose.Schema(
  {
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
    role: {
      type: String,
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timeStamps: true,
  }
);

var User = mongoose.model("User", UserSchema);

module.exports = User;
