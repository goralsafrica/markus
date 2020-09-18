import express from "express";
//import { adminHospitalMiddleWare }  from "../middlewares/register";
import { HospitalLabController } from "../controllers/";
const labRouter = express.Router();

//gets the details of a particular hospital
labRouter.post("/", HospitalLabController.create);
labRouter.get("/", HospitalLabController.findAll);
labRouter.put("/:labid", HospitalLabController.update);
labRouter.delete("/:labid", HospitalLabController.delete);

export default labRouter;
