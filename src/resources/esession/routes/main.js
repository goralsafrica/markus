import { Router } from "express";
import { createSessionValidator, verifyStaffValidator } from "../middlewares";
import { verifyUser } from "../../auth/middlewares";
import { validateNotificationQuery } from "../../notifications/in-app/middlewares";
import { MainController } from "../controllers";
const mainRouter = Router();

mainRouter.post("", verifyUser, createSessionValidator, async (req, res) => {
  const { result, status } = await MainController.create(req);
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
