import { Router } from "express";
import authRouter from "./resources/auth/authRouter";
import rolesRouter from "./resources/roles/rolesRouter";
import rosterRouter from "./resources/roster/routes/rosterRouter";
import pharmacyRouter from "./resources/pharmacy/pharmacyRouter";
import inventoryRouter from "./resources/inventory/inventoryRouter";
import auditTrailRouter from "./resources/auditTrail/routes";
import esessionRouter from "./resources/esession/routes";
import emrRouter from "./resources/emr/emrRouter";
import workFlowRouter from "./resources/workflow/routes";
import groupsRouter from "./resources/groups/groupsRouter";
const apiRouter = Router();

apiRouter.get("/", (req, res) => {
  res.json({
    message: "welcome to the api route",
  });
});

apiRouter.post("/fcm", (req, res) => {
  const notifier = require("./providers/firebase/helpers/fcm");
  notifier
    .sendPushNotification("Our Notification", "our text nau", req.body.token)
    .then((messageid) => {
      res.send({ message: "notification sent", messageid });
    });
});
apiRouter.use("/auth", authRouter);
apiRouter.use("/role", rolesRouter);
apiRouter.use("/roster", rosterRouter);
apiRouter.use("/pharmacy", pharmacyRouter);
apiRouter.use("/inventory", inventoryRouter);
apiRouter.use("/logs", auditTrailRouter);
apiRouter.use("/esession", esessionRouter);
apiRouter.use("/group", groupsRouter);
apiRouter.use("/emr", emrRouter);
apiRouter.use("workflow", workFlowRouter);

export default apiRouter;
