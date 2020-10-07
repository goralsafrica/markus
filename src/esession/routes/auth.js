import { Router } from "express";
import { AuthController } from "../controllers";
import { verifyStaffValdator } from "../middlewares";
const esessionAuthRouter = Router();

esessionAuthRouter.get("/verify", verifyStaffValdator, async (req, res) => {
  const { result, status } = await AuthController.verify(req);
  return res.status(status).json(result);
});
export default esessionAuthRouter;
