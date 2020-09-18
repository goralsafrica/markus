import express from "express";
import AuthController from "./auth.controller";
const authRouter = express.Router();

authRouter.post("/staff/login", AuthController.login);
export default authRouter;
