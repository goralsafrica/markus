import { Router } from "express";
// import moderatorRouter from "./moderator/moderator.router";
import hospitalRouter from "./hospital/routes";
import branchRouter from "./branch/routes";
import departmentRouter from "./department/routes";
import staffRouter from "./staff/staffRouter";
// import patientRouter from "./patient/router";
import { verifyUser } from "../auth/middlewares";
import { verifyStaff } from "./staff/middlewares";
const rolesRouter = Router();
rolesRouter.get("/", (req, res) => {
  res.json({
    message: "welcome to the roles module",
  });
});

rolesRouter.use(verifyUser, verifyStaff);
rolesRouter.use("/branch", branchRouter);
rolesRouter.use("/hospital", hospitalRouter);
//rolesRouter.use("/staff", staffRouter);
//rolesRouter.use("/department", departmentRouter);
// apiRouter.use("/hospital", hospitalRouter);
// apiRouter.use("/moderator", moderatorRouter);

// apiRouter.use("/patient", patientRouter);
//staff

export default rolesRouter;
