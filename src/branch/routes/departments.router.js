import { Router } from "express";
import { BranchDepartmentController } from "../controllers/";
const departmentRouter = Router();

departmentRouter.get("/", BranchDepartmentController.getDepartments);

export default departmentRouter;
