import { Router } from "express";
import { createSessionValidator, verifyStaffValidator } from "../middlewares";
import { verifyUser } from "../../auth/middlewares";
import { validateNotificationQuery } from "../../notifications/in-app/middlewares";
import { EMRController } from "../../emr/controllers";
const mainRouter = Router();

/**
 * MAIN E SESSION ROUTES
 */

mainRouter.post("", verifyUser, createSessionValidator, async (req, res) => {
  const { result, status } = await EMRController.create(
    req.body,
    req.credentials
  );
  res.status(status).json(result);
});

/**
 * ----- NOTIFICATIONS -----
 */
mainRouter.get(
  "/notification",
  verifyUser,
  validateNotificationQuery,
  async (req, res) => {
    const { result, status } = await MainController.getNotifications(req);
    res.status(status).json(result);
  }
);

mainRouter.put("/:sessionid", verifyUser, async (req, res) => {
  const { result, status } = await MainController.update(req);
  res.status(status).json(result);
});

export default mainRouter;
