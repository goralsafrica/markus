import express from "express";
import AuthController from "./auth.controller";
import { loginValidator } from "./middlewares";
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
//authRouter.post("/logout",)
export default authRouter;
