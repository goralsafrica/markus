import express from "express";
import mainRouter from "./main.router";
import branchRouter from "./branch.router";
import departmentRouter from "./department.router";
import staffRouter from "./staff.router";
import * as authMiddleware from "../../auth/auth.middleware";
import * as adminAuthMiddleware from "../middlewares/auth";
const hospitalRouter = express.Router();

//gets the details of a particular hospital
hospitalRouter.use("/", mainRouter);

// middleware to verify hospital admin :)
hospitalRouter.use(authMiddleware.verifyToken, adminAuthMiddleware.verifyAdmin);

hospitalRouter.use("/branch", branchRouter);
hospitalRouter.use("/department", departmentRouter);
hospitalRouter.use("/staff", staffRouter);
// hospitalRouter.use("/staff", staffRouter);

export default hospitalRouter;
