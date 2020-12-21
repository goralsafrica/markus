import { Router } from "express";
import { verifyUser } from "../auth/middlewares";
import LogsController from "./LogsController";
const logRouter = Router();

logRouter.use(verifyUser);

// get all logs in hospital
logRouter.get("/", async (req, res) => {
  const { status, result } = await LogsController.getHosptalLog(
    req.credentials
  );
  return res.status(status).json(result);
});

// get staff logs
logRouter.get("/staff/:staffid", async (req, res) => {
  const { status, result } = await LogsController.getStaffLog(
    req.credentials,
    req.params.staffid
  );
  return res.status(status).json(result);
});

// get log details
logRouter.get("/:logid", async (req, res) => {
  const { status, result } = await LogsController.getLog(req.params.logid);
  return res.status(status).json(result);
});

export default logRouter;
