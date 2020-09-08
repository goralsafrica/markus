import express from "express";
import Controllers from "../controllers/";
const mainRouter = express.Router();

//gets the details of a particular hospital
mainRouter.post("/", Controllers.HospitalController.create);
mainRouter.get("/", Controllers.HospitalController.findOne);
mainRouter.put("/", Controllers.HospitalController.update);

export default mainRouter;
