import Branch from "../../branch/models/Branch";
import Staff from "../../staff/models/Staff";
import Hospital from "../../hospital/models/Hospital";

class BranchStaffController {
  static async getStaffs(req, res, next) {
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

      if (!data) next([400, ["invalid branch id"], "staff members not found"]);
      res.send({
        data,
        errors: null,
        message: "branch staff members list retireved",
      });
    } catch (err) {
      console.log(err);
      next([500, "server  failed to respond :("]);
    }
  }
}

export default BranchStaffController;
