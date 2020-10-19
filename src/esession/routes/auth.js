import { Router } from "express";
import { AuthController } from "../controllers";
import { verifyStaffValidator } from "../middlewares";
import { HospitalController } from "../../roles/hospital/controllers";
import {
  registerHospitalValidator,
  generateCodes,
  verifyNewHospital,
} from "../../roles/hospital/middlewares";
import { verifyTemporaryToken } from "../../auth/middlewares";
import { checkIfStaffExists } from "../../roles/staff/middlewares/registration";
const esessionAuthRouter = Router();

esessionAuthRouter.post("/verify", verifyStaffValidator, async (req, res) => {
  const { result, status } = await AuthController.verify(req);
  return res.status(status).json(result);
});
esessionAuthRouter.post("/login", verifyTemporaryToken, async (req, res) => {
  const { result, status } = await AuthController.login(req);
  return res.status(status).json(result);
});
esessionAuthRouter.post(
  "/register",
  registerHospitalValidator,
  verifyNewHospital,
  checkIfStaffExists,
  async (req, res) => {
    const { result, status } = await HospitalController.create(req.body);
    return res.status(status).json(result);
  }
);

esessionAuthRouter.post("/logout", async (req, res) => {
  const { result, status } = await AuthController.logout(req);
  return res.status(status).json(result);
});

export default esessionAuthRouter;
