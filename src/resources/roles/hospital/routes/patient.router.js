import express from "express";
import { PatientsController } from "../controllers/";
import { addPatientValidator } from "../../patient/middlewares/validate";
const patientRouter = express.Router();

//gets the details of a particular hospital
patientRouter.post("/", addPatientValidator, async (req, res) => {
  const { status, result } = await PatientsController.create(
    req.body,
    req.credentials
  );
  return res.status(status).json(result);
});

patientRouter.get("/", async (req, res) => {
  const { status, result } = await PatientsController.findAll(req);
  res.status(status).json(result);
});

patientRouter.get("/search", async (req, res) => {
  const { status, result } = await PatientsController.search(
    req.query,
    req.credentials
  );
  res.status(status).json(result);
});

patientRouter.get("/:patientid", async (req, res) => {
  const { status, result } = PatientsController.findOne(req);
  res.status(status).json(result);
});

export default patientRouter;
