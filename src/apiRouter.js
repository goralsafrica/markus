import { Router } from "express";
import authRouter from "./auth/authRouter";
import rolesRouter from "./roles/rolesRouter";

const apiRouter = Router();

apiRouter.get("/", (req, res) => {
  res.json({
    message: "welcome to the api route",
  });
});
apiRouter.use("/auth", authRouter);
apiRouter.use("/roles", rolesRouter);

//error handlers
apiRouter.use((req, res, next) => {
  next({
    status: 404,
    errors: { request: "requested resource not found" },
    message: "invalid request",
  });
});

apiRouter.use(({ status, errors, message }, req, res, next) => {
  res.status(status).json({
    data: null,
    errors,
    message,
  });
});

export default apiRouter;
