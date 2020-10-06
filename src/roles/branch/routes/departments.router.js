import { Router } from "express";
import { BranchDepartmentController } from "../controllers/";
const departmentRouter = Router();

departmentRouter.get("/", async (req, res) => {
  const { result, status } = await BranchDepartmentController.getDepartments(
    req
  );
  return res.status(status).json(result);
});
departmentRouter.get("/:departmentid", async (req, res) => {
  const { result, status } = await BranchDepartmentController.getDepartment(
    req
  );
  return res.status(status).json(result);
});

//these routes can only be accessed if branch owner has been granted permission
departmentRouter.post("/", BranchDepartmentController.add);
departmentRouter.delete(
  "/:departmentid",
  BranchDepartmentController.removeDepartment
);
export default departmentRouter;
