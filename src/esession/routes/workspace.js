import { Router } from "express";
import { WorkspaceController, InviteController } from "../controllers";
import { verifyStaffValidator } from "../middlewares";
import {
  verifyTemporaryToken,
  verifyUser,
  sendInviteMailValidator,
  verifyInviteToken,
} from "../../auth/middlewares";
const workspaceRouter = Router();

workspaceRouter.get(
  "/",
  verifyTemporaryToken,
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

workspaceRouter.get(
  "/invite/accept/:token",
  verifyInviteToken,
  async (req, res) => {
    const { status, result } = await InviteController.verifyInviteToken(req);
    res.status(status).json(result);
  }
);

workspaceRouter.post(
  "/invite/accept/:token",
  verifyInviteToken,
  sendInviteMailValidator,
  async (req, res) => {
    const { status, result } = await InviteController.acceptInvite(req);
    res.status(status).json(result);
  }
);

export default workspaceRouter;
