import express from "express";
import { PatientController } from "../controllers/";
const patientRouter = express.Router();

//gets the details of a particular hospital
// patientRouter.post("/", PatientController.create);
patientRouter.get("/", async (req, res) => {
  const { status, result } = await PatientController.findAll(req);
  res.status(status).json(result);
});

patientRouter.get("/search", async (req, res) => {});

patientRouter.get("/:patientid", async (req, res) => {
  const { status, result } = PatientController.findOne(req);
  res.status(status).json(result);
});

export default patientRouter;
