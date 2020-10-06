import { Router } from "express";
import { MainController } from "../controllers/";
const mainRouter = Router();

mainRouter.get("/", async (req, res) => {
  const { result, status } = await MainController.getDetails(req);
  return res.status(status).json(result);
});
export default mainRouter;
