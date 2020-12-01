import { Router } from "express";
import { VitalSignsController, EMRController } from "./controllers";
import { MainController } from "../esession/controllers";
import {
  validateEMRForm,
  getSessionsValidator,
  updateTransctriptionValidator,
  checkRightsToUpdate,
} from "./middlewares";
import { verifyUser } from "../auth/middlewares";
const emrRouter = Router();

emrRouter.post("/", verifyUser, validateEMRForm, async (req, res) => {
  const { status, result } = await EMRController.create(
    req.body,
    req.credentials
  );
  res.status(status).json(result);
});

emrRouter.put(
  "/status",
  verifyUser,
  updateTransctriptionValidator,
  checkRightsToUpdate,
  async (req, res) => {
    const { status, result } = await EMRController.updateTranscription(
      req.body,
      res.locals
    );
    return res.status(status).json(result);
  }
);

emrRouter.get(
  "/session",
  verifyUser,
  getSessionsValidator,
  async (req, res) => {
    const { status, result } = await EMRController.getSessions(
      req.credentials,
      req.query
    );
    res.status(status).json(result);
  }
);

export default emrRouter;
