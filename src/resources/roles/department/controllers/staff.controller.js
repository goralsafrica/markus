import Branch from "../../branch/models/Branch";
import Staff from "../../staff/models/Staff";
class DepartmentStaffController {
  static async getStaff(req, res, next) {
    let { branch, department } = req.staff.administrativeRole;
    try {
      const data = await Staff.find({
        branches: {
          $in: [branch._id],
        },
        department: department._id,
        _id: req.params.id,
      });
      res.json({
        data,
        errors: null,
        message: "department staff details retrieved",
      });
    } catch (err) {
      console.error(err);
      return next([500, ["server failed to respond"], "failed request"]);
    }
  }
  static async updateStaff(req, res, next) {
    let { branch, department } = req.staff.administrativeRole;
    try {
      let staff = await Staff.find({
        branches: {
          $in: [branch._id],
        },
        department: department._id,
        _id: req.params.id,
      });
      staff.department = req.body.department;
      staff = await staff.save();
      res.json({
        data: staff,
        errors: null,
        message: "staff department has been successfully updated",
      });
    } catch (err) {
      console.error(err);
      return next([500, ["server failed to respond"], "failed request"]);
    }
  }
}

export default DepartmentStaffController;
