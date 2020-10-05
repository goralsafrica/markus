import { Router } from "express";
import { InventoryController } from "./controllers";
const inventoryRouter = Router();
inventoryRouter.post("/", async (req, res) => {
  const { status, result } = await InventoryController.create(req);
  return res.status(status).json(result);
});

inventoryRouter.get("/:branchid", async (req, res) => {
  const { status, result } = await InventoryController.findOne(req);
  return res.status(status).json(result);
});

inventoryRouter.put("/:branchid", async (req, res) => {
  const { status, result } = await InventoryController.update(req);
  return res.status(status).json(result);
});

export default inventoryRouter;
