import express from "express";
import moderatorRouter from "./moderator/moderator.router";
import hospitalRouter from "./hospital/routes";
import authRouter from "./auth/auth.router";
const apiRouter = express.Router();

import seeder from "../seeders/roles.seeder";

apiRouter.get("/", (req, res) => {
  res.json({
    message: "welcome to the api route",
  });
});

apiRouter.post("/seed", seeder);

// apiRouter.use("/auth", authRouter);
apiRouter.use("/moderator", moderatorRouter);
apiRouter.use("/hospital", hospitalRouter);

/**
 * @desc error routes accepts 3 values:
 * status code ,
 * an array containing the error(s)
 * a summary of the error
 */
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
