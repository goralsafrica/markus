import { Router } from "express";
import { AuthController } from "../controllers";
import { verifyStaffValidator } from "../middlewares";
import { verifyEsessionUser } from "../../auth/middlewares";
const esessionAuthRouter = Router();

esessionAuthRouter.post("/verify", verifyStaffValidator, async (req, res) => {
  const { result, status } = await AuthController.verify(req);
  return res.status(status).json(result);
});
esessionAuthRouter.post("/login", verifyEsessionUser, async (req, res) => {
  const { result, status } = await AuthController.login(req);
  return res.status(status).json(result);
});
esessionAuthRouter.get(
  "/workspace",
  verifyEsessionUser,
  verifyStaffValidator,
  async (req, res) => {
    const { result, status } = await AuthController.getWorkspaces(req);
    return res.status(status).json(result);
  }
);
export default esessionAuthRouter;
