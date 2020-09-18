import express from "express";
import AuthController from "./auth.controller";
import { loginValidator } from "./middlewares";
const authRouter = express.Router();

authRouter.post("/login", loginValidator, async (req, res) => {
  const details = req.body;
  //const result = await AuthController.login(details);
});
//authRouter.post("/logout",)
export default authRouter;
