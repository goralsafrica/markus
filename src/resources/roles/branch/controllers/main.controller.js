import { model } from "mongoose";
import { successMessage, serverError } from "../../../../utilities";
const Branch = model("Branch");
const Staff = model("Staff");

class BranchController {
  static async getDetails(req) {
    const { branch } = req.staff.administrativeRole;
    try {
      const data = await Branch.findById(branch._id).populate("departments");
      const staff = await Staff.find({
        branches: {
          $in: [branch._id],
        },
      });
      data.staff = staff;
      return successMessage(data, "branch details retrieved");
    } catch (err) {
      console.log(err);
      return serverError(
        {
          request: err.message,
        },
        "failed to get branch details"
      );
    }
  }
}

export default BranchController;
