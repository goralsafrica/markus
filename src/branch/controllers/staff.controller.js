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
      next([500, ["server  failed to respond :("], "request failure"]);
    }
  }

  static async updateStaff(req, res, next) {
    try {
      const staff = await Staff.findByIdAndUpdate(
        req.params.staffid,
        {
          department: req.body.department,
        },
        {
          useFindAndModify: false,
        }
      );
      const data = await Staff.findById(req.params.staffid).populate({
        path: "department",
        model: "Department",
      });
      if (!staff || !data) throw new Error("okay");
      res.json({
        data,
        errurs: null,
        message: "staff details in branch has been updated successfully",
      });
    } catch (err) {
      //console.log(err);
      next([500, "server  failed to respond :("]);
    }
  }
}

export default BranchStaffController;
