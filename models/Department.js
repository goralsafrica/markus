var mongoose = require("mongoose");

var mongoose = require("mongoose");

var DepartmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timeStamps: true,
  }
);

var Department = mongoose.model("Department", DepartmentSchema);

module.exports = Department;
