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
  static async create(sessionDetails, staffDetails) {
    try {
      //throw new Error("omo nothing has been done oo");
      // create new emr entry
      let emr = new EMR({
        hospital: staffDetails.hospital,
        patient: sessionDetails.patient,
      });
      // create new session entry
      let session = new Session({
        associatedEMR: emr._id,
        doctor: staffDetails.staff,
        patient: sessionDetails.patient,
        conversations: sessionDetails.attachments,
      });
      // attach session entry to emr entry
      emr.session = session._id;

      // execute all promises
      [emr, session] = await Promise.all([emr.save(), session.save()]);

      // audit trail

      // send response
      return successMessage(
        { emr: emr._id },
        "new EMR entry has been successfully posted"
      );
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
