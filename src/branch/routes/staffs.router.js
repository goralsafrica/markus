import { Router } from "express";
import { BranchStaffController } from "../controllers/";
const staffRouter = Router();
staffRouter.get("/", BranchStaffController.getStaffs);

export default staffRouter;
