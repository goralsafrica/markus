import express from "express";
import Controllers from "../controllers/";
import Middlewares from "../middlewares";
const mainRouter = express.Router();

//gets the details of a particular hospital
mainRouter.post(
  "/",
  Middlewares.registerValidator,
  Middlewares.hospitalChecker,
  Controllers.HospitalController.create
);
mainRouter.get("/", Controllers.HospitalController.findOne);
mainRouter.put("/", Controllers.HospitalController.update);

export default mainRouter;
