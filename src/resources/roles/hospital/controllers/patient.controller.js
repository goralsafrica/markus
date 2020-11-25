import mongoose from "mongoose";
import {
  badRequestError,
  serverError,
  successMessage,
} from "../../../../utilities";
import Patient from "../../patient/models/Patient";
import Hospital from "../models/Hospital";

class HospitalPatientController {
  static async create(body, user) {
    try {
      const newPatient = new Patient({ ...body, hospital: user.hospital });
      if (body.importedEmrCode !== undefined) {
        newPatient.importedEmrCode = user.slug + "-" + body.importedEmrCode;
      }
      if (await newPatient.save())
        return successMessage(
          newPatient,
          "patient has been successfully created"
        );
    } catch (err) {
      console.log(err);
      return badRequestError({
        request:
          "patient credentials (email or phone number) already exist in this hospital",
      });
    }
  }
  static async search(query, staffCredentials) {
    const self = HospitalPatientController;
    try {
      if (!query.value)
        throw new Error(
          "invalid request ! enter patient hospital code or patient name"
        );
      const params = self.getQuery(query.value, staffCredentials.slug);
      const suggestions = await Patient.find(params);
      return successMessage(suggestions, "search results fouund");
    } catch (err) {
      return badRequestError(
        { request: err.message },
        "failed to perform search"
      );
    }
  }

  static getQuery(value, slug) {
    // query could be a full name or half name or generated code of imported code
    const options = [];
    function push(payload) {
      return options.push(payload);
    }
    const possibleValues = value.split(" ");
    if (possibleValues.length > 1) {
      push({ firstName: possibleValues[0] });
      push({ firstName: possibleValues[1] });
      push({ lastName: possibleValues[0] });
      push({ lastName: possibleValues[1] });
    } else {
      push({ firstName: possibleValues[0] });
      push({ lastName: possibleValues[0] });
      push({ code: possibleValues[0] });
      push({ importedEmrCode: slug + "-" + possibleValues[0] });
    }

    return { $or: options };
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
}

export default HospitalPatientController;
