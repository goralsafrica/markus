import express from "express";
import * as adminHospitalMiddleWare from "../middlewares/register";
import Controllers from "../controllers/";
const branchRouter = express.Router();

//gets the details of a particular hospital
branchRouter.post(
  "/",
  adminHospitalMiddleWare.registerBranchValidator,
  Controllers.BranchController.create
);
branchRouter.get("/", Controllers.BranchController.findAll);
branchRouter.get("/:id", Controllers.BranchController.findOne);
branchRouter.put("/:id", Controllers.BranchController.update);
//delete should only be possible if no staff is present again

export default branchRouter;
