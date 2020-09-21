import { Router } from "express";
// import moderatorRouter from "./moderator/moderator.router";
import hospitalRouter from "./hospital/routes";
// import branchRouter from "./branch/routes";
// import departmentRouter from "./department/routes";
// import staffRouter from "./staff/staffRouter";
// import patientRouter from "./patient/router";
// import * as authMiddleware from "./auth/auth.middleware";
// import verifyStaff from "./staff/middlewares/auth";
const rolesRouter = Router();

rolesRouter.get("/", (req, res) => {
  res.json({
    message: "welcome to the roles module",
  });
});
rolesRouter.use("/hospital", hospitalRouter);
// //apiRouter.use(authMiddleware.verifyToken, verifyStaff);
// apiRouter.use("/staff", staffRouter);
// apiRouter.use("/department", departmentRouter);
// apiRouter.use("/branch", branchRouter);
// apiRouter.use("/hospital", hospitalRouter);
// apiRouter.use("/moderator", moderatorRouter);

// apiRouter.use("/patient", patientRouter);
//staff

export default rolesRouter;
