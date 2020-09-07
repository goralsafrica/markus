import express from "express";
import HospitalController from "./hospital.controller";
const hospitalRouter = express.Router();

//gets the details of a particular hospital
hospitalRouter.get("/:id", HospitalController.show);

hospitalRouter.post("/", HospitalController.create);
export default hospitalRouter;
