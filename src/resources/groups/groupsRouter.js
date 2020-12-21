import { Router } from "express";
import GroupsController from "./controllers/GroupsController";
import { verifyPermanentToken } from "../auth/middlewares";
import {
  createGroupValidator,
  verifyNewGroup,
  updateGroupValidator,
  getMessagesValidator,
} from "./middlewares";
import GroupMessagesController from "./controllers/GroupMessagesController";
const groupsRouter = Router();

//middleware for authenticating requests
groupsRouter.use(verifyPermanentToken);

//create a new group in a hospital
groupsRouter.post(
  "/",
  createGroupValidator,
  verifyNewGroup,
  async (req, res) => {
    const { status, result } = await GroupsController.create(
      req.body,
      req.credentials
    );
    return res.status(status).json(result);
  }
);

// get lists of groups
groupsRouter.get("/", async (req, res) => {
  const { status, result } = await GroupsController.findAll(
    req.credentials.hospital
  );
  return res.status(status).json(result);
});

// get group messages
groupsRouter.get("/message", getMessagesValidator, async (req, res) => {
  const { status, result } = await GroupMessagesController.getMessages(
    req.query,
    req.credentials
  );
});

// get group details
groupsRouter.get("/:groupid", async (req, res) => {
  const { status, result } = await GroupsController.findOne(req.params.groupid);
  return res.status(status).json(result);
});

// edit group details
groupsRouter.put("/:groupid", updateGroupValidator, async (req, res) => {
  const { status, result } = await GroupsController.updateGroup(
    req.params.groupid,
    req.body
  );
  return res.status(status).json(result);
});

//delete group()
groupsRouter.delete("/:groupid", async (req, res) => {
  const { status, result } = await GroupsController.delete(
    req.params.groupid,
    req.credentials.hospital
  );
  return res.status(status).json(result);
});

export default groupsRouter;
