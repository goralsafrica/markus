import { Router } from "express";
import { DepartmentController } from "../controllers/";

const depatmentRouter = Router();
depatmentRouter.get("/", DepartmentController.getDetails);
depatmentRouter.post("/", DepartmentController.create);
export default depatmentRouter;
