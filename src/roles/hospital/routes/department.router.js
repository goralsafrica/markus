import express from "express";
import * as adminHospitalMiddleWare from "../middlewares/register";
import { DepartmentController } from "../controllers/";
const departmentRouter = express.Router();

//gets the details of a particular hospital
departmentRouter.post("/", DepartmentController.create);
departmentRouter.get("/", DepartmentController.findAll);
departmentRouter.get("/:id", DepartmentController.findOne);
departmentRouter.delete("/:departmentid", DepartmentController.delete);

export default departmentRouter;
