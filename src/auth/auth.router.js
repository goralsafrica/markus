import express from "express";
import AuthController from "./auth.controller";
const authRouter = express.Router();

authRouter.post("/login", AuthController.login);
export default authRouter;
