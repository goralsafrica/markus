import { Router } from "express";
import { BranchStaffController } from "../controllers/";
import { updateStaffDetailsValidator } from "../../staff/middlewares";
const staffRouter = Router();

staffRouter.get("/", async (req, res) => {
  const { result, status } = await BranchStaffController.getStaffs(req);
  return res.status(status).json(result);
});
//the following routes are only accessible if the branch head has priviledges
staffRouter.put("/:staffid", updateStaffDetailsValidator, async (req, res) => {
  const { status, result } = await BranchStaffController.updateStaff(req);
  return res.status(status).json(result);
});
export default staffRouter;
