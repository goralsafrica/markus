import { Router } from "express";
import mainRouter from "./main.router";
import { verifyHOD } from "../middlewares";
import staffRouter from "./staff.router";

const departmentRouter = Router();
//departmentRouter.use(verifyHOD);
departmentRouter.use("/staff", staffRouter);
departmentRouter.use("/", mainRouter);

export default departmentRouter;
