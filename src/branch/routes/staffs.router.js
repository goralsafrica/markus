import { Router } from "express";
import { BranchStaffController } from "../controllers/";
const staffRouter = Router();
staffRouter.get("/", BranchStaffController.getStaffs);

//the following routes are only accessible if the branch head has priviledges
staffRouter.put("/:staffid", BranchStaffController.updateStaff);
export default staffRouter;
