import express from "express";
//import * as adminHospitalMiddleWare from "../middlewares/register";
import { checkDepartment } from "../../department/middlewares";
import { DepartmentController } from "../controllers/";
const departmentRouter = express.Router();

//gets the details of a particular hospital
departmentRouter.post("/", checkDepartment, async (req, res) => {
  const { status, result } = await DepartmentController.create(req);
  res.status(status).json(result);
});
departmentRouter.get("/", async (req, res) => {
  const { status, result } = await DepartmentController.findAll(req);
  res.status(status).json(result);
});
departmentRouter.get("/:departmentid", async (req, res) => {
  const { status, result } = await DepartmentController.findOne(req);
  res.status(status).json(result);
});

departmentRouter.delete("/:departmentid", async (req, res) => {
  const { status, result } = await DepartmentController.delete(req);
  res.status(status).json(result);
});

export default departmentRouter;
