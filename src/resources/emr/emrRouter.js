import { Router } from "express";
import { VitalSignsController, EMRController } from "./controllers";
import { MainController } from "../esession/controllers";
import { validateEMRForm } from "./middlewares";
import { verifyUser } from "../auth/middlewares";
const emrRouter = Router();

emrRouter.post("/", verifyUser, validateEMRForm, async (req, res) => {
  const { status, result } = await EMRController.create(
    req.body,
    req.credentials
  );
  res.status(status).json(result);
});

emrRouter.get("/session", verifyUser, async (req, res) => {
  const { status, result } = await EMRController.getSessions(req.credentials);
  res.status(status).json(result);
});

export default emrRouter;
