import express from "express";
import * as adminHospitalMiddleWare from "../middlewares/register";
import Controllers from "../controllers/";
const departmentRouter = express.Router();

//gets the details of a particular hospital
departmentRouter.post("/", Controllers.DepartmentController.create);
departmentRouter.get("/", Controllers.DepartmentController.findAll);
departmentRouter.get("/:id", Controllers.DepartmentController.findOne);
// mainRouter.put("/:id", Controllers.departmentController.update);

export default departmentRouter;
