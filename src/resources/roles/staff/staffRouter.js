import { Router } from "express";
import StaffController from "./controllers/main";
import { updateStaffValidator } from "./middlewares";
const staffRouter = Router();

//staffRouter.get("/", StaffController.getDetails);

staffRouter.put("/", updateStaffValidator, async (req, res) => {
  const { status, result } = await StaffController.updateDetails(
    req.body,
    req.credentials.staff
  );
  return res.status(status).json(result);
});

//staffRouter.post("/resign", StaffController.sendResignationLetter);
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
