import Patient from "../models/Patient";
import Record from "../models/Record";
import Payment from "../models/Payment";
class MainPatientController {
  static async getDetails(req, res, next) {
    const { patient } = req.credentials;
    try {
      const data = await Patient.findById(patient);
      res.send({
        data,
        errors: null,
        message: "your details have been retrieved",
      });
    } catch (err) {
      next(
        500,
        ["server failed to respons"],
        "failed to retrieve your details"
      );
    }
  }

  static async getRecords(req, res, next) {
    const { patient } = req.credentials;
    try {
      const data = await Record.find({
        patient,
      });
      res.send({
        data,
        errors: null,
        message: "your records have been retrieved",
      });
    } catch (err) {
      next(
        500,
        ["server failed to respons"],
        "failed to retrieve your details"
      );
    }
  }

  static async getPaymentHisory(req, res, next) {
    const { patient } = req.credentials;
    try {
      const data = await Payment.find({
        patient,
      });
      res.send({
        data,
        errors: null,
        message: "your records have been retrieved",
      });
    } catch (err) {
      next(
        500,
        ["server failed to respons"],
        "failed to retrieve your details"
      );
    }
  }
}

export default MainPatientController;
