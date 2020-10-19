import { Router } from "express";
import { AuthController } from "../controllers";
import { verifyStaffValidator } from "../middlewares";
import { verifyTemporaryToken } from "../../auth/middlewares";
const esessionAuthRouter = Router();

esessionAuthRouter.post("/verify", verifyStaffValidator, async (req, res) => {
  const { result, status } = await AuthController.verify(req);
  return res.status(status).json(result);
});
esessionAuthRouter.post("/login", verifyTemporaryToken, async (req, res) => {
  const { result, status } = await AuthController.login(req);
  return res.status(status).json(result);
});
//esessionAuthRouter.post("/register")
esessionAuthRouter.post("/logout", async (req, res) => {
  const { result, status } = await AuthController.logout(req);
  return res.status(status).json(result);
});

export default esessionAuthRouter;
