import { Router } from "express";
import { AuthController } from "../controllers";
import MainAuthController from "../../auth/auth.controller";
import { verifyStaffValidator } from "../middlewares";
import { HospitalController } from "../../roles/hospital/controllers";
import {
  registerHospitalValidator,
  verifyNewHospital,
} from "../../roles/hospital/middlewares";
import {
  verifyTemporaryToken,
  resetPasswordValidator,
  twoFAValidator,
  verifyUser,
  forgotPasswordValidator,
} from "../../auth/middlewares";
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
esessionAuthRouter.post(
  "/forgot-password",
  forgotPasswordValidator,
  async (req, res) => {
    const { status, result } = await MainAuthController.forgotPassword(req);
    res.status(status).json(result);
  }
);
esessionAuthRouter.get("/reset-password/:token", async (req, res) => {
  const { status, result } = await MainAuthController.verifyResetPasswordToken(
    req
  );
  res.status(status).json(result);
});
esessionAuthRouter.post(
  "/reset-password/:user",
  resetPasswordValidator,
  async (req, res) => {
    const { status, result } = await MainAuthController.resetPassword(req);
    res.status(status).json(result);
  }
);
esessionAuthRouter.put(
  "/two-factor-auth",
  verifyUser,
  twoFAValidator,
  async (req, res) => {
    const { status, result } = await MainAuthController.twoFactorAuth(req);
    res.status(status).json(result);
  }
);
esessionAuthRouter.post("/logout", async (req, res) => {
  const { result, status } = await AuthController.logout(req);
  return res.status(status).json(result);
});

export default esessionAuthRouter;
