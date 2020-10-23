import Staff from "../../staff/models/Staff";
import { successMessage, serverError } from "../../../../utilities";

class BranchStaffController {
  static async getStaffs(req) {
    const { branch } = req.staff.administrativeRole;
    try {
      const data = await Staff.find({
        branches: {
          $in: [branch._id],
        },
      })
        .populate("department")
        .populate({
          path: "role",
          model: "Role",
          populate: {
            path: "category",
            model: "StaffCategory",
          },
        });
      return successMessage(data, "staff list retrieved");
    } catch (err) {
      console.log(err);
      return serverError(
        {
          request: err.message,
        },
        "failed to retrieve staff list"
      );
    }
  }

  static async updateStaff(req, res, next) {
    try {
      const staff = await Staff.findByIdAndUpdate(req.params.staffid, req.body)
        .populate("department")
        .populate("role")
        .populate("administrativeRole");
      return successMessage(staff, "staff details have been updated");
    } catch (err) {
      return serverError(
        {
          request: err.message,
        },
        "failed to update staff details"
      );
    }
  }
}

export default BranchStaffController;
