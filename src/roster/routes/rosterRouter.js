import { Router } from "express";
import RosterController from "../controllers/RosterController";
const rosterRouter = Router();

rosterRouter.get("/", async (req, res) => {
  const r = await RosterController.findOne(req.credentials);
  return res.status(r.status).json(r.result);
});

export default rosterRouter;
