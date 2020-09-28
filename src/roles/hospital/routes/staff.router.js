import express from "express";
import { StaffController } from "../controllers/";
import { createStaffValidator } from "../../staff/middlewares";
const staffRouter = express.Router();

//gets the details of a particular hospital
staffRouter.post(
  "/",
  createStaffValidator
  //Middlewares.staffChecker,
  //async (req, res) => {}
  //StaffController.create
);
// staffRouter.get("/", StaffController.findAll);
// staffRouter.get("/:id", StaffController.findOne);
// staffRouter.put("/:staffid", StaffController.update);
// staffRouter.delete("/:staffid", StaffController.delete); // remove from hospital
// staffRouter.delete("/:branchid/:staffid", StaffController.remove); // remove from hospital
// staffRouter.put("/", Controllers.StaffController.update);

export default staffRouter;
