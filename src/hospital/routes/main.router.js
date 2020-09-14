import express from "express";
import Controllers from "../controllers/";
import * as authMiddleware from "../../auth/auth.middleware";
import * as adminAuthMiddleware from "../middlewares/auth";
import Middlewares from "../middlewares";
const mainRouter = express.Router();

//gets the details of a particular hospital
mainRouter.post("/", Controllers.HospitalController.create);

mainRouter.use(authMiddleware.verifyToken, adminAuthMiddleware.verifyAdmin);
mainRouter.get("/", Controllers.HospitalController.findOne);

mainRouter.put("/", Controllers.HospitalController.update);

export default mainRouter;
