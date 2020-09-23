"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _controllers = require("./controllers");

var patientRouter = (0, _express.Router)();
patientRouter.get("/", _controllers.MainPatientController.getDetails); //patient records

patientRouter.get("/records", _controllers.MainPatientController.getRecords);
patientRouter.get("/payments", _controllers.MainPatientController.getPaymentHisory); //patient appointments

patientRouter.post("/appointment", _controllers.PatientAppointmentController.create);
patientRouter.get("/appointment", _controllers.PatientAppointmentController.findAll);
patientRouter.put("/appointment/:appointmentid", _controllers.PatientAppointmentController.update);
patientRouter.put("/appointment/confirm/:appointmentid", _controllers.PatientAppointmentController.confirm);
var _default = patientRouter;
exports["default"] = _default;