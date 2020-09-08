import express from "express";
import Controllers from "../controllers/";
const mainRouter = express.Router();

//gets the details of a particular hospital
mainRouter.post("/", Controllers.BranchController.create);
mainRouter.get("/", Controllers.BranchController.findAll);
mainRouter.get("/:id", Controllers.BranchController.findOne);
mainRouter.put("/:id", Controllers.BranchController.update);

export default mainRouter;
