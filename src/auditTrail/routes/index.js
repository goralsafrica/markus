import { Router } from "express";
import staffLogRouter from "./staff";
import patientLogRouter from "./patient";
import { verifyAdmin } from "../../roles/hospital/middlewares";
import { verifyUser } from "../../auth/middlewares";

const logRouter = Router();
//logRouter.use(verifyUser, verifyAdmin);
logRouter.use(verifyUser);
logRouter.get("/", (req, res) => {
  res.json({
    message: "welcome to the audit trail route",
  });
});
logRouter.use("/staff", staffLogRouter);
//logRouter.use("/patient", patientLogRouter);

export default logRouter;
