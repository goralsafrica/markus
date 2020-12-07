import VitalReading from "../models/VitalReading";
import Session from "../../esession/models/Session";
import Patient from "../../roles/patient/models/Patient";
import EMR from "../models/EMR";
import {
  badRequestError,
  successMessage,
  serverError,
  getS3ObjectRelativePath,
} from "../../../utilities";
import { deleteObject } from "../../../providers/aws/helpers";

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
        hospital: staffDetails.hospital,
        doctor: staffDetails.staff,
        patient: sessionDetails.patient,
        originalConversation: sessionDetails.attachment,
      });

      // attach session entry to emr entry
      emr.session = session._id;

      // execute all promises
      [emr, session] = await Promise.all([emr.save(), session.save()]);

      // audit trail

      // send response
      return successMessage(
        { emr: emr._id, conversation: session.originalConversation._id },
        "new EMR entry has been successfully posted"
      );
    } catch (err) {
      console.log(err);
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

  // find all doctor's sessions
  static async getSessions(credentials, query) {
    let params = { doctor: credentials.staff, hospital: credentials.hospital };
    //params = {};
    if (query.status) params["originalConversation.status"] = query.status;
    try {
      const sessions = await Session.find(params)
        .select("associatedEMR originalConversation")
        .populate({
          path: "associatedEMR",
          select: "hospital",
          populate: {
            path: "hospital",
            model: "Hospital",
            select: "name email",
          },
        })
        .populate("patient");
      return successMessage(sessions, "doctor's session have been retrieved");
    } catch (err) {
      return serverError(
        {
          request: err.message,
        },
        "failed to retrieve session list"
      );
    }
  }

  static async updateTranscription(body, { session }) {
    try {
      session = await session.save();
      return successMessage(session, "transcription status update success");
    } catch (err) {
      console.log(err);
      return serverError(
        { request: err.message },
        "failed to update transcription status"
      );
    }
  }

  static async updateSession(payload) {
    try {
      let p = (msg) => Promise.resolve("msg");
      const session = await Session.findOne({
        "originalConversation._id": payload.conversation,
      });
      if (Boolean(session.lastEdit))
        p = deleteObject(getS3ObjectRelativePath(session.lastEdit));

      session.lastEdit = payload.lastEdit;
      p();

      await session.save();
      return successMessage(
        session,
        "session record has been successfully updated"
      );
    } catch (err) {
      console.log(err);
      return badRequestError({
        request: err.message,
      });
    }
  }
}

export default EMRController;
