import { serverError, successMessage } from "../../utilities";
import Log from "./Logs";

export default class LogsController {
  static async logActivity(
    hospital,
    doer,
    description,
    receiver = undefined,
    reference = undefined
  ) {
    const payload = { hospital, doer, receiver, description };
    receiver ? (payload.receiver = receiver) : "";
    reference ? (payload.reference = reference) : "";
    return Log.create(payload).catch(console.log);
  }

  static async getHosptalLog(credentials, query) {
    try {
      const logs = await Log.find({ hospital: credentials.hospital })
        .populate("doer")
        .populate("receiver");
      return successMessage(logs, "hospital audit trail retrieved");
    } catch (err) {
      return serverError(
        { request: err.message },
        "failed to retreve audit trail"
      );
    }
  }

  static async getStaffLog(credentials, staffid) {
    try {
      const logs = await Log.find({
        hospital: credentials.hospital,
        $or: [{ doer: staffid }, { receiver: staffid }],
      });
      return successMessage(logs, "staff audit trail retrieved");
    } catch (err) {
      return serverError(
        { request: err.message },
        "failed to retreve staff audit trail"
      );
    }
  }

  static async getLog(id) {
    try {
      const log = await Log.findById(id);
      return successMessage(log, "trail retrieved");
    } catch (err) {
      return successMessage(
        { request: err.message },
        "failed to retrieve trail"
      );
    }
  }
}
