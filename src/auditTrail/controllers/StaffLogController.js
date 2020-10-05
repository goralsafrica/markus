import StaffLog from "../models/StaffLog";
import { badRequestError, successMessage } from "../../utilities";

class StaffLogController {
  static async create() {}

  static async getStaffLogs() {
    try {
      const logs = StaffLog.find({
        hospital: req.credentials.hospital,
        doer: req.params.staffid,
      });
    } catch (err) {
      badRequestError(
        {
          request: err.message,
        },
        "failed to fetch staff audit trail"
      );
    }
  }
}

export default StaffLogController;
