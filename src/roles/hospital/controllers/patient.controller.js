import Patient from "../../patient/models/Patient";
import Record from "../../patient/models/Record";
class HospitalPatientController {
  static async create(req, res, next) {
    try {
    } catch (err) {}
  }

  static async findAll(req, res, next) {
    try {
      const data = await Patient.find({
        hospital: req.credentials.hospital,
      });
      res.send({
        data,
        errors: null,
        mesaage: "registered patients found",
      });
    } catch (err) {
      console.log(err);
      next([500, ["server  failed to respond :("], "failed to create branch"]);
    }
  }
  static async findOne(req, res, next) {
    try {
      const data = await Patient.findById(req.params.patientid);
      if (!data) return next(400, ["patient not found"], "bad request");
      data.records = await Record.find({ patient: req.params.patientid });
      res.json({
        data,
        errors: null,
        message: "patients records retrieved",
      });
    } catch (err) {
      console.log(err);
      next([500, ["server  failed to respond :("], "failed to create branch"]);
    }
  }
}

export default HospitalPatientController;
