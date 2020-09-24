import { Router } from "express";
import RosterController from "../controllers/RosterController";
import { verifyUser } from "../../auth/middlewares";
const rosterRouter = Router();

rosterRouter.use(verifyUser);
// Gets all rosters in the hospital
rosterRouter.get("/", async (req, res) => {
  const r = await RosterController.findAll(req.credentials);
  return res.status(r.status).json(r.result);
});

// Gets current roster
rosterRouter.get("/current", async (req, res) => {
  console.log("here");
  const { status, result } = await RosterController.findCurrent(
    req.credentials
  );
  return res.status(status).json(result);
});

// Gets particular roster
rosterRouter.get("/:id", async (req, res) => {
  const { status, result } = await RosterController.findOne(req.params);
  return res.status(status).json(result);
});

// Initializes a roster
rosterRouter.post("/", async (req, res) => {
  const r = await RosterController.create(req);
  return res.status(r.status).json(r.result);
});

// Updates a roster
rosterRouter.put("/:id", async (req, res) => {
  const r = await RosterController.create(req);
  return res.status(r.status).json(r.result);
});

export default rosterRouter;
