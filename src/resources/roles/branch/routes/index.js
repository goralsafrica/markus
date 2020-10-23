import { Router } from "express";
import mainRouter from "./main.router";
import { verifyHeadOfBranch } from "../middlewares";
import staffRouter from "./staffs.router";
import departmentRouter from "./departments.router";

const branchRouter = Router();
branchRouter.use(verifyHeadOfBranch);
branchRouter.use("/staff", staffRouter);
branchRouter.use("/department", departmentRouter);
branchRouter.use("/", mainRouter);

export default branchRouter;
