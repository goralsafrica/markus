import express from "express";
import moderatorRouter from "./moderator/moderator.router";
import hospitalRouter from "./hospital/routes";
import branchRouter from "./branch/routes";
import departmentRouter from "./department/routes";
import staffRouter from "./staff/staffRouter";
import patientRouter from "./patient/router";
import authRouter from "./auth/auth.router";
// import * as authMiddleware from "./auth/auth.middleware";
// import verifyStaff from "./staff/middlewares/auth";
const apiRouter = express.Router();

//import seeder from "../seeders/roles.seeder";

apiRouter.get("/", (req, res) => {
  res.json({
    message: "welcome to the api route",
  });
});
//apiRouter.post("/seed", seeder);
apiRouter.use("/auth", authRouter);
// //apiRouter.use(authMiddleware.verifyToken, verifyStaff);
// apiRouter.use("/staff", staffRouter);
// apiRouter.use("/department", departmentRouter);
// apiRouter.use("/branch", branchRouter);
// apiRouter.use("/hospital", hospitalRouter);
// apiRouter.use("/moderator", moderatorRouter);

// apiRouter.use("/patient", patientRouter);
//staff

//error handlers
apiRouter.use((req, res, next) => {
  next([404, ["requested resource not found"], "invalid request"]);
});

apiRouter.use(([status, errors, message], req, res, next) => {
  res.status(status).json({
    data: null,
    errors,
    message,
  });
});

export default apiRouter;
