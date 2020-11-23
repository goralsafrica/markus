import { Router } from "express";
import authRouter from "./resources/auth/authRouter";
import rolesRouter from "./resources/roles/rolesRouter";
import rosterRouter from "./resources/roster/routes/rosterRouter";
import pharmacyRouter from "./resources/pharmacy/pharmacyRouter";
import inventoryRouter from "./resources/inventory/inventoryRouter";
import auditTrailRouter from "./resources/auditTrail/routes";
import esessionRouter from "./resources/esession/routes";
import workFlowRouter from "./resources/workflow/routes";
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
apiRouter.use("workflow", workFlowRouter);

export default apiRouter;
