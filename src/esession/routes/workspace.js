import { Router } from "express";
import { WorkspaceController, InviteController } from "../controllers";
import { verifyStaffValidator } from "../middlewares";
import {
  verifyEsessionUser,
  verifyUser,
  sendInviteMailValidator,
} from "../../auth/middlewares";
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

workspaceRouter.post(
  "/invite",
  verifyUser,
  sendInviteMailValidator,
  async (req, res) => {
    const { result, status } = await InviteController.sendInviteMail(req);
    return res.status(status).json(result);
  }
);

workspaceRouter.get("/invite/accept/:token", async (req, res) => {
  const { status, result } = await InviteController.verifyInviteToken(req);
  res.status(status).json(result);
});

export default workspaceRouter;
