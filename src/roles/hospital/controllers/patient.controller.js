import mongoose from "mongoose";
import { serverError, successMessage } from "../../../utilities";
const Patient = mongoose.model("Patient");

class HospitalPatientController {
  static async create(req, res, next) {
    //   try {
    //   } catch (err) {}
    // }
    // static async findAll(req, res, next) {
    //   try {
    //     const data = await Patient.find({
    //       hospital: req.credentials.hospital,
    //     });
    //     res.send({
    //       data,
    //       errors: null,
    //       mesaage: "registered patients found",
    //     });
    //   } catch (err) {
    //     console.log(err);
    //     next([500, ["server  failed to respond :("], "failed to create branch"]);
    //   }
  }
  static async findAll(req) {
    try {
      const patients = await Patient.find({
        hospital: {
          $in: [req.credentials.hospital],
        },
      });
      return successMessage(patients, "hospital patient list retrieved");
    } catch (err) {
      console.error(err);
      return serverError(
        {
          request: err.message,
        },
        "failed to fetch list of patients"
      );
    }
  }
  static async findOne(req) {
    // try {
    //   const data = await Patient.findById(req.params.patientid);
    //   if (!data) return next(400, ["patient not found"], "bad request");
    //   data.records = await Record.find({ patient: req.params.patientid });
    //   res.json({
    //     data,
    //     errors: null,
    //     message: "patients records retrieved",
    //   });
    // } catch (err) {
    //   console.log(err);
    //   next([500, ["server  failed to respond :("], "failed to create branch"]);
    // }
  }
}

export default HospitalPatientController;
