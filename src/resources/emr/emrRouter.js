import { Router } from "express";
import { VitalSignsController, EMRController } from "./controllers";
import { validateEMRForm } from "./middlewares";
const emrRouter = Router();

emrRouter.post("/", validateEMRForm, async (req, res) => {
  const { status, result } = await EMRController.create(req.body);
  res.status(status).json(result);
});

export default emrRouter;
