import { Router } from "express";
import { DepartmentStaffController } from "../controllers/";
const staffRouter = Router();

staffRouter.get("/:id", DepartmentStaffController.getStaff);
// staffRouter.get(
//   "/:departmentid",
//   BranchDepartmentController.getDepartment
// );
staffRouter.put("/:id", DepartmentStaffController.updateStaff);
// //these routes can only be accessed if branch owner has been granted permission
// staffRouter.delete(
//   "/:departmentid",
//   BranchDepartmentController.removeDepartment
// );
export default staffRouter;
