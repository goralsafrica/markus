import { Router } from "express";
import authRouter from "./auth/authRouter";
import rolesRouter from "./roles/rolesRouter";
import rosterRouter from "./roster/routes/rosterRouter";
import pharmacyRouter from "./pharmacy/pharmacyRouter";
import inventoryRouter from "./inventory/inventoryRouter";
import auditTrailRouter from "./auditTrail/routes";
import esessionRouter from "./esession/routes";
const apiRouter = Router();

apiRouter.get("/", (req, res) => {
  res.json({
    message: "welcome to the api route",
  });
});
apiRouter.use("/auth", authRouter);
apiRouter.use("/roles", rolesRouter);
apiRouter.use("/roster", rosterRouter);
apiRouter.use("/pharmacy", pharmacyRouter);
apiRouter.use("/inventory", inventoryRouter);
apiRouter.use("/logs", auditTrailRouter);
apiRouter.use("/esession", esessionRouter);
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
