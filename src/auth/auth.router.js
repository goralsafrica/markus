import express from "express";
import AuthController from "./auth.controller";
import * as StaffMiddleware from "../staff/middlewares/registration";
const authRouter = express.Router();

// Gets all registered hospitals
// authRouter.post(
//   "/staff/login",
//   StaffMiddleware.staffChecker,
//   AuthController.login
// );
//authRouter.get("/hospital/:id", ModeratorController.show);

export default authRouter;
