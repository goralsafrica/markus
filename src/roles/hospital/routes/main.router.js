import express from "express";
import { HospitalController } from "../controllers/";
import * as authMiddleware from "../../auth/auth.middleware";
import * as adminAuthMiddleware from "../middlewares/auth";
import Middlewares from "../middlewares";
const mainRouter = express.Router();

//gets the details of a particular hospital
mainRouter.post("/", HospitalController.create);
mainRouter.get("/", HospitalController.findOne);
mainRouter.put("/", HospitalController.update);

export default mainRouter;
