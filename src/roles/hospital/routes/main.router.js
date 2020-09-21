import express from "express";
import { HospitalController } from "../controllers/";
import {
  registerValidator,
  verifyNewHospital,
  generateCodes,
  verifyAdmin,
  updateHospitalValidator,
} from "../middlewares";
import { verifyUser } from "../../../auth/middlewares";
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
mainRouter.get("/", verifyUser, async (req, res) => {
  const details = req.credentials;
  const r = await HospitalController.findOne(details);
  res.status(r.status).json(r.result);
});
mainRouter.put(
  "/",
  verifyUser,
  updateHospitalValidator,
  //verifyAdmin,
  async (req, res) => {
    const r = await HospitalController.update(req);
    res.status(r.status).json(r.result);
  }
);

export default mainRouter;
