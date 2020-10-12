import { model } from "mongoose";
import { badRequestError, successMessage } from "../../utilities";
import Session from "../models/Session";
const Patient = model("Patient");
//Session = model("Session");

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
}
export default MainController;
