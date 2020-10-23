import { Router } from "express";
import {
  MainPatientController as Main,
  PatientAppointmentController as Appointment,
} from "./controllers";

const patientRouter = Router();
patientRouter.get("/", Main.getDetails);

//patient records
patientRouter.get("/records", Main.getRecords);
patientRouter.get("/payments", Main.getPaymentHisory);

//patient appointments
patientRouter.post("/appointment", Appointment.create);
patientRouter.get("/appointment", Appointment.findAll);
patientRouter.put("/appointment/:appointmentid", Appointment.update);
patientRouter.put("/appointment/confirm/:appointmentid", Appointment.confirm);
export default patientRouter;
