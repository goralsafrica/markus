import { Router } from "express";

const mainRouter = Router();

mainRouter.post("", async (req, res) => {
  const { result, status } = await AuthController.create(req);
});

mainRouter.get("", async (req, res) => {
  res.json({
    message: "welcome to the esession module",
  });
});

// initialize session
// update records for session

export default mainRouter;
