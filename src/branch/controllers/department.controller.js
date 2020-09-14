import Branch from "../../branch/models/Branch";
import Staff from "../../staff/models/Staff";
import Hospital from "../../hospital/models/Hospital";

class BranchDepartmentController {
  static async getDepartments(req, res, next) {
    const { branch } = req.staff.administrativeRole;
    try {
      const data = await Branch.findById(branch._id)
        .select("departments")
        .populate("departments");

      if (!data) next([400, ["invalid branch id"], "departments not found"]);
      res.send({
        data,
        errors: null,
        message: "branch department list retireved",
      });
    } catch (err) {
      console.log(err);
      next([500, "server  failed to respond :("]);
    }
  }
}

export default BranchDepartmentController;
