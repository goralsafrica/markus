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
import mailer from "../../notifications/email/mailer";
import loadTemplate from "../../notifications/email/loadTemplate";
const esessionAuthRouter = Router();

/**
 * --- LOGIN ROUTES --- *
 **/
esessionAuthRouter.post("/verify", verifyStaffValidator, async (req, res) => {
  const { result, status } = await AuthController.verify(req);
  return res.status(status).json(result);
});
esessionAuthRouter.get("/workspace", verifyTemporaryToken, async (req, res) => {
  const { result, status } = await AuthController.getWorkspaces(req);
  return res.status(status).json(result);
});
esessionAuthRouter.post("/login", verifyTemporaryToken, async (req, res) => {
  const { result, status } = await AuthController.login(req);
  return res.status(status).json(result);
});

/**
 * --- REGISTRATION AND VERIFICATION ROUTES --- *
 */
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
  "/register/verify",
  verifyTemporaryToken,
  twoFAValidator,
  async (req, res) => {
    const { result, status } = await MainAuthController.verifyCode(req);
    return res.status(status).json(result);
  }
);

esessionAuthRouter.get(
  "/register/verify",
  verifyTemporaryToken,
  async (req, res) => {
    const { result, status } = await MainAuthController.resendVerificationCode(
      req
    );
    return res.status(status).json(result);
  }
);

/**
 * --- FORGOT PASSWORD ROUTES --- *
 */
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

/**
 * --- TWO FACTOR AUTH AND LOGOUT ROUTES --- *
 */
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

/**
 * --- TEST MAIL TEMPLATES ROUTES --- *
 */
esessionAuthRouter.get("/mail", async (req, res) => {
  mailer(
    "Holla",
    "noreply@goralsafrica.com",
    ["emekaemmanuel045@gmail.com"],
    {
      fullName: "Chukwurah Emmanuel",
      code: 123232,
    },
    "workspace-invite.hbs"
  )
    .then(console.log)
    .catch((err) => console.log(err));
  res.send("done");
});
esessionAuthRouter.get("/template", async (req, res) => {
  loadTemplate("workspace-invite.hbs", {
    fullName: "Chukwurah Emmanuel",
    code: 123232,
  })
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});

export default esessionAuthRouter;
