import { Router } from "express";
const patientLogRouter = Router();

patientLogRouter.get("/");
patientLogRouter.get("/:patientid");

export default patientLogRouter;
