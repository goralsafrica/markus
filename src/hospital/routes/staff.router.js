import express from "express";
import StaffController from "../controllers/staff.controller";
import * as Middlewares from "../../staff/middlewares/registration";
const staffRouter = express.Router();

//gets the details of a particular hospital
staffRouter.post(
  "/",
  // Middlewares.inputValidator,
  //Middlewares.staffChecker,
  StaffController.create
);
staffRouter.get("/", StaffController.findAll);
staffRouter.get("/:id", StaffController.findOne);
staffRouter.put("/:staffid", StaffController.update);
staffRouter.delete("/:staffid", StaffController.delete); // remove from hospital
staffRouter.delete("/:branchid/:staffid", StaffController.remove); // remove from hospital
// staffRouter.put("/", Controllers.StaffController.update);

export default staffRouter;
