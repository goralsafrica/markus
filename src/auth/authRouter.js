import express from "express";
import AuthController from "./auth.controller";
import { loginValidator } from "./middlewares";
const authRouter = express.Router();

authRouter.post("/login", loginValidator, async (req, res) => {
  const details = req.body;
  const { status, data, errors, message } = await AuthController.login(details);
  console.log(status);
  res.status(status).json({ data, errors, message });
});
//authRouter.post("/logout",)
export default authRouter;
