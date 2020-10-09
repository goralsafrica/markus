import { Router } from "express";

const mainRouter = Router();

mainRouter.post("", async (req, res) => {
  // const { result, status } = await AuthController.verify(req);
  // return res.status(status).json(result);
});

mainRouter.get("", async (req, res) => {
  // const { result, status } = await AuthController.verify(req);
  // return res.status(status).json(result);
});

// initialize session
// update records for session

export default mainRouter;
