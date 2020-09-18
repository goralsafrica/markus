import express from "express";
import * as adminHospitalMiddleWare from "../middlewares/register";
import { PatientController } from "../controllers/";
const departmentRouter = express.Router();

//gets the details of a particular hospital
departmentRouter.post("/", PatientController.create);
departmentRouter.get("/", PatientController.findAll);
departmentRouter.get("/:id", PatientController.findOne);

export default departmentRouter;
