import StaffLog from "../models/StaffLog";
import { badRequestError, successMessage } from "../../utilities";

class StaffLogController {
  static async create(req) {}

  static async getStaffLogs(req) {
    try {
      const logs = await StaffLog.find({
        hospital: req.credentials.hospital,
        doer: req.params.staffid,
      });
      return successMessage(logs, "staff audit trail has been retrieved");
    } catch (err) {
      return badRequestError(
        {
          request: err.message,
        },
        "failed to fetch staff audit trail"
      );
    }
  }
}

export default StaffLogController;
