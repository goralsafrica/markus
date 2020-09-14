import Branch from "../../branch/models/Branch";
import Staff from "../../staff/models/Staff";
import Hospital from "../../hospital/models/Hospital";
//import { hashSync } from "bcryptjs";
class BranchController {
  static async getDetails(req, res, next) {
    const { branch } = req.staff.administrativeRole;
    try {
      const data = await Branch.findById(branch._id);

      if (!data) next([400, ["invalid branch id"], "branch not found"]);
      res.send({
        data,
        errors: null,
        message: "branch details found",
      });
    } catch (err) {
      console.log(err);
      next([500, "server  failed to respond :("]);
    }
  }
}

export default BranchController;
