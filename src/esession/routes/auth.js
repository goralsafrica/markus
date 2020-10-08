import { Router } from "express";
import { AuthController } from "../controllers";
import { verifyStaffValidator } from "../middlewares";
import { verifyUser } from "../../auth/middlewares";
const esessionAuthRouter = Router();

esessionAuthRouter.post("/verify", verifyStaffValidator, async (req, res) => {
  const { result, status } = await AuthController.verify(req);
  return res.status(status).json(result);
});
esessionAuthRouter.post("/login");
esessionAuthRouter.get(
  "/workspace",
  verifyUser,
  verifyStaffValidator,
  async (req, res) => {
    const { result, status } = await AuthController.getWorkspaces(req);
    return res.status(status).json(result);
  }
);
export default esessionAuthRouter;
