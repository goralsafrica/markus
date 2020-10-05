import { Router } from "express";
import { StaffLogController } from "../controllers";
const staffLogRouter = Router();

staffLogRouter.get("/");
staffLogRouter.get("/:staffid", async (req, res) => {
  const { status, result } = await StaffLogController.getStaffLogs(req);
  return res.status(status).json(result);
});

export default staffLogRouter;
