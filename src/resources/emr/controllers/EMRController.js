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
  // create a new EMR entry [session,patient,vitalSigns,recommendation]
  static create(patientDetails, staffDetails) {
    try {
      throw new Error("omo nothing has been done oo");
      // create new patient if none exists
      // else attach if to users
      // create new emr entry
      // create new session entry
      // attach session entry to emr entry
      // execute all promises
      // send response
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
