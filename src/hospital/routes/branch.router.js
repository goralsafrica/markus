import express from "express";
import * as adminHospitalMiddleWare from "../middlewares/register";
import Controllers from "../controllers/";
const mainRouter = express.Router();

//gets the details of a particular hospital
mainRouter.post(
  "/",
  adminHospitalMiddleWare.registerBranchValidator,
  Controllers.BranchController.create
);
mainRouter.get("/", Controllers.BranchController.findAll);
mainRouter.get("/:id", Controllers.BranchController.findOne);
mainRouter.put("/:id", Controllers.BranchController.update);

export default mainRouter;
