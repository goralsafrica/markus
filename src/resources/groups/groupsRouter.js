import { Router } from "express";

const groupsRouter = Router();

//creare a new group in a hospital
groupsRouter.post("/");

// get lists of groups
groupsRouter.get("/");

// get group details
groupsRouter.get("/groupid");

// edit group details
groupsRouter.put("/groupid");

//delete group()
groupsRouter.delete("/groupid");

export default groupsRouter;
