import { Router } from "express";
import {} from "../controllers";
const workflowRouter = Router();

workflowRouter.post("", async (req, res) => {
  const { result, status } = await AuthController.create(req);
});

workflowRouter.get("", async (req, res) => {
  res.json({
    message: "welcome to the esession module",
  });
});

export default workflowRouter;
