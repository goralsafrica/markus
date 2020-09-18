import express from "express";
//import { adminHospitalMiddleWare }  from "../middlewares/register";
import { HospitalHealthInsuranceController } from "../controllers";
const insuranceRouter = express.Router();

//gets the details of a particular hospital
insuranceRouter.post("/", HospitalHealthInsuranceController.create);
insuranceRouter.get("/", HospitalHealthInsuranceController.findAll);
insuranceRouter.put("/:affiliateid", HospitalHealthInsuranceController.update);
insuranceRouter.delete(
  "/:affiliateid",
  HospitalHealthInsuranceController.delete
);

export default insuranceRouter;
