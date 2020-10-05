import { Router } from "express";
import staffLogRouter from "./staff";
import patientLogRouter from "./patient";
import { verifyAdmin } from "../../roles/hospital/middlewares";
import { verifyUser } from "../../auth/middlewares";

const logRouter = Router();
logRouter.use(verifyUser, verifyAdmin);
logRouter.use("/staff", staffLogRouter);
//logRouter.use("/patient", patientLogRouter);

export default logRouter;
