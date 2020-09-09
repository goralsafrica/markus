import express from "express";
import mainRouter from "./main.router";
import branchRouter from "./branch.router";
import staffRouter from "./staff.router";
import * as authMiddleware from "../../auth/auth.middleware";
import * as adminAuthMiddleware from "../middlewares/auth";
const hospitalRouter = express.Router();

//gets the details of a particular hospital
hospitalRouter.use("/", mainRouter);
hospitalRouter.use(
  "/branch",
  authMiddleware.verifyToken,
  adminAuthMiddleware.verifyAdmin,
  branchRouter
);
// hospitalRouter.use("/staff", staffRouter);

export default hospitalRouter;
