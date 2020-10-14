import { Router } from "express";
import authRouter from "./auth";
import workspaceRouter from "./workspace";
import mainRouter from "./main";
const esessionRouter = Router();

esessionRouter.use("/auth", authRouter);
esessionRouter.use("/workspace", workspaceRouter);
esessionRouter.use("/", mainRouter);
export default esessionRouter;
