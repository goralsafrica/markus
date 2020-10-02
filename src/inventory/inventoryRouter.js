import { Router } from "express";
import { InventoryController } from "./controllers";
const inventoryRouter = Router();
inventoryRouter.post("/", async (req, res) => {
  const { status, result } = InventoryController.create(req);
  return res.status(status).json(result);
});

export default inventoryRouter;
