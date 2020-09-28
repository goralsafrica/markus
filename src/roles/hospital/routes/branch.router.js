import express from "express";
import { registerBranchValidator } from "../../branch/middlewares";
import { BranchController } from "../controllers/";
const branchRouter = express.Router();

//gets the details of a particular hospital
branchRouter.post("/", registerBranchValidator, async () => {});
branchRouter.get("/", BranchController.findAll);
branchRouter.get("/:id", BranchController.findOne);
branchRouter.put("/:id", BranchController.update);
//delete should only be possible if no staff is present again

export default branchRouter;
