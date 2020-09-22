import { Router } from "express";
import RosterController from "../controllers/RosterController";
import { verifyUser } from "../../auth/middlewares";
const rosterRouter = Router();

rosterRouter.use(verifyUser);

rosterRouter.get("/", async (req, res) => {
  const r = await RosterController.findOne(req.credentials);
  return res.status(r.status).json(r.result);
});

rosterRouter.post("/", async (req, res) => {
  const r = await RosterController.create(req);
  //console.log(r);
  return res.status(r.status).json(r.result);
});

export default rosterRouter;
