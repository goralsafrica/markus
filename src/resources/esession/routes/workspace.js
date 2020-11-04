import { Router } from "express";
import { WorkspaceController, InviteController } from "../controllers";
import { HospitalController } from "../../roles/hospital/controllers";
import {
  updateHospitalValidator,
  verifyAdmin,
} from "../../roles/hospital/middlewares";
import { createNewWorkspaceValidator } from "../middlewares";
import {
  verifyUser,
  sendInviteMailValidator,
  verifyInviteToken,
} from "../../auth/middlewares";
const workspaceRouter = Router();

/**
 *
 * ---- WORKSPACE MAIN ROUTES -----
 *
 **/
workspaceRouter.post(
  "/",
  verifyUser,
  createNewWorkspaceValidator,
  async (req, res) => {
    const r = await WorkspaceController.create(req);
    res.status(r.status).json(r.result);
  }
);

workspaceRouter.put(
  "/",
  verifyUser,
  verifyAdmin,
  updateHospitalValidator,
  async (req, res) => {
    const r = await HospitalController.update(req);
    res.status(r.status).json(r.result);
  }
);

/**
 *
 * ---- WORKSPACE SWITCH ROUTES -----
 *
 **/
workspaceRouter.post("/login", verifyUser, async (req, res) => {
  const { result, status } = await WorkspaceController.switchWorkspaces(req);
  return res.status(status).json(result);
});

/**
 *
 * ---- WORKSPACE INVITE ROUTES -----
 *
 **/
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
  "/invite/accept",
  verifyInviteToken,
  sendInviteMailValidator,
  async (req, res) => {
    const { status, result } = await InviteController.acceptInvite(req);
    res.status(status).json(result);
  }
);

export default workspaceRouter;
