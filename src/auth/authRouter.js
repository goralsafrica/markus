import express from "express";
import AuthController from "./auth.controller";
import {
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  verifyUser,
  twoFAValidator,
} from "./middlewares";

const authRouter = express.Router();

authRouter.post("/workspace", async (req, res) => {
  const { url } = req.body;
  const { status, result } = await AuthController.verifyWorkspace(url);
  res.status(status).json(result);
});
authRouter.post("/login", loginValidator, async (req, res) => {
  const details = req.body;
  const r = await AuthController.login(details);
  res.status(r.status).json(r.result);
});

authRouter.post(
  "/forgot-password",
  forgotPasswordValidator,
  async (req, res) => {
    const { status, result } = await AuthController.forgotPassword(req);
    res.status(status).json(result);
  }
);

authRouter.get("/reset-password/:token", async (req, res) => {
  const { status, result } = await AuthController.verifyResetPasswordToken(req);
  res.status(status).json(result);
});

authRouter.post(
  "/reset-password/:user",
  resetPasswordValidator,
  async (req, res) => {
    const { status, result } = await AuthController.resetPassword(req);
    res.status(status).json(result);
  }
);

authRouter.put(
  "/two-factor-auth",
  verifyUser,
  twoFAValidator,
  async (req, res) => {
    const { status, result } = await AuthController.twoFactorAuth(req);
    res.status(status).json(result);
  }
);
export default authRouter;
