import PatientLog from "../models/PatientLog";
import { badRequestError, successMessage } from "../../utilities";

class PatientLogController {
  static async create(req) {}

  static async getPatientLogs(req) {
    try {
      const logs = await Patient.find({
        hospital: req.credentials.hospital,
        doer: req.params.patientid,
      });
      return successMessage(logs, "patient audit trail has been retrieved");
    } catch (err) {
      return badRequestError(
        {
          request: err.message,
        },
        "failed to fetch patient audit trail"
      );
    }
  }
}

export default PatientLogController;
