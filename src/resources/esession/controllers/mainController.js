import Patient from "../../roles/patient/models/Patient";
import Session from "../models/Session";
import {
  badRequestError,
  successMessage,
  notFoundError,
} from "../../utilities";

class MainController {
  static async create(req) {
    const { hospital } = req.credentials;
    const body = { ...req.body };
    delete body.branch;
    try {
      const exists = await Patient.findOne({ ...body, hospital });
      if (exists) {
        req.body.patient = exists._id;
      } else {
        const newPatient = await Patient.create({ ...body, hospital });
        req.body.patient = newPatient._id;
      }
      const newSession = await Session.create({
        ...req.body,
        doctor: req.credentials.staff,
      });
      return successMessage(newSession, "session has been initialized ");
    } catch (err) {
      console.error(err);
      return badRequestError(
        {
          request: err.message,
        },
        "failed to initialize session"
      );
    }
  }

  static async update(req) {
    try {
      if (!(await Session.findById(req.params.sessionid)))
        throw new Error("Session not found");
      const data = await Session.findByIdAndUpdate(
        req.params.sessionid,
        req.body,
        {
          new: true,
        }
      );
      return successMessage(data, "esession details have been updated");
    } catch (err) {
      return notFoundError(
        {
          request: err.message,
        },
        "failed to update esession details"
      );
    }
  }
}
export default MainController;
