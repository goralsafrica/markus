import { badRequestError, successMessage } from "../../../../utilities";
import Staff from "../models/Staff";
class StaffController {
  static async getDetails(req, res, next) {
    try {
      const data = await Staff.findById(req.credentials.staff)
        .populate("branches")
        .populate("hospital");
      res.json({
        data,
        errors: null,
        message: "staff details retrieved",
      });
    } catch (err) {
      console.error(err);
      return next([500, ["server failed to respond"], "failed request"]);
    }
  }

  static async sendResignationLetter(req, res, next) {
    console.log("done");
  }

  static async updateDetails(data, staffid) {
    try {
      const update = await Staff.findByIdAndUpdate(staffid, data, {
        new: true,
      });
      return successMessage(update, "update success");
    } catch (err) {
      return badRequestError(
        {
          request: err.message,
        },
        "failed to update staff details"
      );
    }
  }
}

export default StaffController;
