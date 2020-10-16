import Branch from "../../branch/models/Branch";
import Staff from "../../staff/models/Staff";
import Department from "../models/Department";
class DepartmentController {
  static async getDetails(req, res, next) {
    let { branch, department } = req.staff.administrativeRole;
    try {
      const staffInDepartment = await Staff.find({
        branches: {
          $in: [branch._id],
        },
      });
      console.log(staffInDepartment);
      res.json({
        data: {
          branch,
          department,
          staffInDepartment,
        },
        errors: null,
        message: "department details retrieved",
      });
    } catch (err) {
      console.error(err);
      return next([500, ["server failed to respond"], "failed request"]);
    }
  }

  static async create(req, res, next) {
    // let { branch, department } = req.staff.administrativeRole;
    try {
      await console.log(require("mongoose").models);
    } catch (err) {
      console.error(err);
    }
  }
}

export default DepartmentController;
