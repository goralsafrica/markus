import {
  badRequestError,
  serverError,
  successMessage,
} from "../../../../utilities";
import Staff from "../models/Staff";
class StaffController {
  static async getDetails(id) {
    try {
      const data = await Staff.findById(id);
      return successMessage(data, "staff details retrieved");
    } catch (err) {
      return serverError(
        {
          request: err.message,
        },
        "failed to retrieve staff details"
      );
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
