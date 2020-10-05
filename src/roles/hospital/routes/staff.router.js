import { Router } from "express";
import { StaffController } from "../controllers/";
import {
  createStaffValidator,
  checkIfStaffExists,
  generateStaffCode,
} from "../../staff/middlewares";
const staffRouter = Router();

//gets the details of a particular hospital
staffRouter.post(
  "/",
  createStaffValidator,
  checkIfStaffExists,
  generateStaffCode,
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

staffRouter.put("/:staffid", async (req, res) => {
  const { status, result } = await StaffController.update(req);
  res.status(status).json(result);
});
// staffRouter.put("/:staffid", StaffController.update);
// staffRouter.delete("/:staffid", StaffController.delete); // remove from hospital
// staffRouter.delete("/:branchid/:staffid", StaffController.remove); // remove from hospital
// staffRouter.put("/", Controllers.StaffController.update);

export default staffRouter;
