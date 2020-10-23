import { Router } from "express";
import { StaffController } from "../controllers/";
import {
  createStaffValidator,
  checkIfStaffExistsInHospital,
  updateStaffDetailsValidator,
} from "../../staff/middlewares";
const staffRouter = Router();

//gets the details of a particular hospital
staffRouter.post(
  "/",
  createStaffValidator,
  checkIfStaffExistsInHospital,
  async (req, res) => {
    const { status, result } = await StaffController.create(req);
    return res.status(status).json(result);
  }
);
staffRouter.get("/", async (req, res) => {
  const { status, result } = await StaffController.findAll(req);
  res.status(status).json(result);
});
staffRouter.get("/:staffid", async (req, res) => {
  const { status, result } = await StaffController.findOne(req);
  res.status(status).json(result);
});
staffRouter.put("/:staffid", updateStaffDetailsValidator, async (req, res) => {
  const { status, result } = await StaffController.update(req);
  res.status(status).json(result);
});
staffRouter.delete("/:staffid", async (req, res) => {
  const { status, result } = await StaffController.delete(req);
  res.status(status).json(result);
});
staffRouter.delete("/:branchid/:staffid", async (req, res) => {
  const { status, result } = await StaffController.remove(req);
  res.status(status).json(result);
});
export default staffRouter;
