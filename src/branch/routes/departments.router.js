import { Router } from "express";
import { BranchDepartmentController } from "../controllers/";
const departmentRouter = Router();

departmentRouter.get("/", BranchDepartmentController.getDepartments);
departmentRouter.get(
  "/:departmentid",
  BranchDepartmentController.getDepartment
);

//these routes can only be accessed if branch owner has been granted permission
departmentRouter.post("/", BranchDepartmentController.add);
departmentRouter.delete(
  "/:departmentid",
  BranchDepartmentController.removeDepartment
);
export default departmentRouter;
