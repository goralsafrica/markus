import mongoose from "mongoose";
import {
  badRequestError,
  serverError,
  successMessage,
} from "../../../../utilities";
import Patient from "../../patient/models/Patient";
import Hospital from "../models/Hospital";

class HospitalPatientController {
  static async create(req, res, next) {}
  static async search(query, staffCredentials) {
    const self = HospitalPatientController;
    try {
      if (!query.value)
        throw new Error(
          "invalid request ! enter patient hospital code or patient name"
        );
      const { slug } = await Hospital.findById(
        staffCredentials.hospital
      ).select("slug");
      const query = self.getQuery(query, slug);
    } catch (err) {
      return badRequestError(
        { request: err.message },
        "failed to perform search"
      );
    }
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
    try {
      const data = await Patient.findById(req.params.patientid);
      // data.records = await Record.find({ patient: req.params.patientid });
      // res.json({
      //   data,
      //   errors: null,
      //   message: "patients records retrieved",
      // });
    } catch (err) {
      console.log(err);
      next([500, ["server  failed to respond :("], "failed to create branch"]);
    }
  }

  static getQuery(query, slug) {
    // query could be a full name or half name or generated code of imported code
    const result = {};
    con;
  }
}

export default HospitalPatientController;
