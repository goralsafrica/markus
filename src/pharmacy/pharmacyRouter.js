import { Router } from "express";
import { PharmacyController, PrescriptionController } from "./controllers/";
import { verifyAdmin, verifyNewHospital } from "../roles/hospital/middlewares";
import { verifyUser } from "../auth/middlewares";
import {
  checkBranchPharmacy,
  updateStoreValidator,
  checkPharmacy,
} from "./middlewares";
import { verifyBranchInHospital } from "../roles/branch/middlewares";
const pharmacyRouter = Router();

pharmacyRouter.use(verifyUser, verifyAdmin);

pharmacyRouter.post(
  "/",
  verifyBranchInHospital,
  checkBranchPharmacy,
  async (req, res) => {
    //const r = await PharmacyController.createStore(req);
    const { status, result } = await PharmacyController.createStore(req);
    return res.status(status).json(result);
  }
);
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

pharmacyRouter.get("/:branchid", async (req, res) => {
  const { status, result } = await PharmacyController.getStore(req);
  return res.status(status).json(result);
});

pharmacyRouter.put(
  "/:branchid",
  checkPharmacy,
  updateStoreValidator,
  async (req, res) => {
    const { status, result } = await PharmacyController.updateStore(req);
    return res.status(status).json(result);
  }
);

pharmacyRouter;
export default pharmacyRouter;
