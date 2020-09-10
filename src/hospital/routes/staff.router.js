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
// staffRouter.get("/", Controllers.StaffController.findOne);
// staffRouter.put("/", Controllers.StaffController.update);

export default staffRouter;
