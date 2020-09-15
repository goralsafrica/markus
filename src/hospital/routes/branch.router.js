import express from "express";
import * as adminHospitalMiddleWare from "../middlewares/register";
import { BranchController } from "../controllers/";
const branchRouter = express.Router();

//gets the details of a particular hospital
branchRouter.post(
  "/",
  adminHospitalMiddleWare.registerBranchValidator,
  BranchController.create
);
branchRouter.get("/", BranchController.findAll);
branchRouter.get("/:id", BranchController.findOne);
branchRouter.put("/:id", BranchController.update);
//delete should only be possible if no staff is present again

export default branchRouter;
