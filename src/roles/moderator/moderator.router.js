import express from "express";
import ModeratorController from "./moderator.controller";
const moderatorRouter = express.Router();

// Gets all registered hospitals
moderatorRouter.get("/hospital", ModeratorController.index);
moderatorRouter.get("/hospital/:id", ModeratorController.show);

export default moderatorRouter;
