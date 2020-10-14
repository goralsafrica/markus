import { Router } from "express";
import { WorkspaceController } from "../controllers";
import { verifyStaffValidator } from "../middlewares";
import { verifyEsessionUser, verifyUser } from "../../auth/middlewares";
const workspaceRouter = Router();

workspaceRouter.get(
  "/",
  verifyEsessionUser,
  verifyStaffValidator,
  async (req, res) => {
    const { result, status } = await WorkspaceController.getWorkspaces(req);
    return res.status(status).json(result);
  }
);

workspaceRouter.post("/login", verifyUser, async (req, res) => {
  const { result, status } = await WorkspaceController.switchWorkspaces(req);
  return res.status(status).json(result);
});

export default workspaceRouter;
