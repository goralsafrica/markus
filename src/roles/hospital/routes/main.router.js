import express from "express";
import { HospitalController } from "../controllers/";
import {
  registerValidator,
  verifyNewHospital,
  generateCodes,
} from "../middlewares";
// import * as authMiddleware from "../../../auth/auth.middleware";
// import * as adminAuthMiddleware from "../middlewares/auth";
// import Middlewares from "../middlewares";
const mainRouter = express.Router();

//gets the details of a particular hospital
mainRouter.post(
  "/",
  registerValidator,
  verifyNewHospital,
  generateCodes,
  async (req, res) => {
    const details = req.body;
    const r = await HospitalController.create(details);
    res.status(r.status).json(r.result);
  }
);
// mainRouter.get("/", HospitalController.findOne);
// mainRouter.put("/", HospitalController.update);

export default mainRouter;
