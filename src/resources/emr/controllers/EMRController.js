import VitalReading from "../models/VitalReading";
import Session from "../../esession/models/Session";
import Patient from "../../roles/patient/models/Patient";
import EMR from "../models/EMR";
import {
  badRequestError,
  successMessage,
  serverError,
} from "../../../utilities";

class EMRController {
  // create a new EMR entry
  static create(patientDetails, staffDetails) {
    try {
      const patientExists = Patient.find({
        $or: [{ email: patientDetails.email }, { phone }],
      });
    } catch (err) {
      return serverError(
        {
          request: err.message,
        },
        "failed to initialize new emr entry"
      );
    }
  }

  // find all EMR entries for a patient
  static findPatientRecords(patientid) {}
}

export default EMRController;
