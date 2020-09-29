import { Router } from "express";
import PharmacyController from "./controllers/PharmacyController";
const pharmacyRouter = Router();

pharmacyRouter.post("/");
pharmacyRouter.get("/prescription", async (req, res) => {
  const { status, result } = await PharmacyController.getWaitingList(req);
  res.status(status).json(result);
});

pharmacyRouter.get("/prescription/:sessionid", async (req, res) => {
  const { status, result } = await PharmacyController.getPrescription(req);
  res.status(status).json(result);
});

pharmacyRouter.put("/prescription/:sessionid", async (req, res) => {
  const { status, result } = await PharmacyController.updateStatus(req);
  res.status(status).json(result);
});

pharmacyRouter;
export default pharmacyRouter;
