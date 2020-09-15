import Appointment from "../models/Appointment";
class PatientAppointmentsController {
  static async create(req, res, next) {
    const { patient } = req.credentials;
    try {
      const data = await Appointment.create(req.body);
      res.send({
        data,
        errors: null,
        message: "your appointment has been scheduled",
      });
    } catch (err) {
      next(500, ["server failed to respond"], "failed to perform request");
    }
  }

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
      next(500, ["server failed to respond"], "failed to perform request");
    }
  }

  static async findAll(req, res, next) {
    const { patient } = req.credentials;
    try {
      const data = await Appointment.find({
        patient,
      });
      res.send({
        data,
        errors: null,
        message: "your scheduled appointmens have been retrieved",
      });
    } catch (err) {
      next(500, ["server failed to respond"], "failed to perform request");
    }
  }

  static async update(req, res, next) {
    const { patient } = req.credentials;
    try {
      const data = await Payment.find({
        patient,
      });
      res.send({
        data,
        errors: null,
        message: "your appointment has been rescheduled",
      });
    } catch (err) {
      next(500, ["server failed to respond"], "failed to perform request");
    }
  }
confirm(req, res, next) {
    const { patient } = req.credentials;
    try {
      const data = await Apartment.findByIdAndUpdate({
        patient
      },{
        finalized: 1
      });
      res.send({
        data,
        errors: null,
        message: "your appointment has been confirmed",
      });
    } catch (err) {
      next(500, ["server failed to respond"], "failed to perform request");
    }
  }
}

export default PatientAppointmentsController;
