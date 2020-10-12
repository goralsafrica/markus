import { Router } from "express";
import { createSessionValidator, verifyStaffValidator } from "../middlewares";
import { verifyUser } from "../../auth/middlewares";
import { MainController } from "../controllers";
const mainRouter = Router();

mainRouter.post("", verifyUser, createSessionValidator, async (req, res) => {
  const { result, status } = await MainController.create(req);
  res.status(status).json(result);
});

// mainRouter.get("", async (req, res) => {
//   res.json({
//     message: "welcome to the esession module",
//   });
// });

export default mainRouter;
