import { Router } from "express";
import { PharmacyController, PrescriptionController } from "./controllers/";
import { verifyAdmin } from "../roles/hospital/middlewares";
import { verifyUser } from "../auth/middlewares";
import { verifyBranchInHospital } from "../roles/branch/middlewares";
const pharmacyRouter = Router();

pharmacyRouter.use(verifyUser, verifyAdmin);

pharmacyRouter.post("/", verifyBranchInHospital, async (req, res) => {
  const r = await PharmacyController.createStore(req);
});
pharmacyRouter.get("/", async (req, res) => {
  return res.send(req.credentials);
  // const {} = await PharmacyController.createStore;
});
pharmacyRouter.get("/prescription", async (req, res) => {
  const { status, result } = await PrescriptionController.getWaitingList(req);
  res.status(status).json(result);
});

pharmacyRouter.get("/prescription/:sessionid", async (req, res) => {
  const { status, result } = await PrescriptionController.getPrescription(req);
  res.status(status).json(result);
});

pharmacyRouter.put("/prescription/:sessionid", async (req, res) => {
  const { status, result } = await PrescriptionController.updateStatus(req);
  res.status(status).json(result);
});

pharmacyRouter;
export default pharmacyRouter;
