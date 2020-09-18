import { Router } from "express";
import { DepartmentController } from "../controllers/";

const depatmentRouter = Router();
depatmentRouter.get("/", DepartmentController.getDetails);

export default depatmentRouter;
