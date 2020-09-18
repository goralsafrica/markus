import { Router } from "express";
import StaffController from "./controllers/main";
const staffRouter = Router();

staffRouter.get("/", StaffController.getDetails);

staffRouter.post("/resign", StaffController.sendResignationLetter);
// staffRouter.get(
//   "/:departmentid",
//   BranchDepartmentController.getDepartment
// );

// //these routes can only be accessed if branch owner has been granted permission
// staffRouter.post("/", BranchDepartmentController.add);
// staffRouter.delete(
//   "/:departmentid",
//   BranchDepartmentController.removeDepartment
// );
export default staffRouter;
