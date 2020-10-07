import { Router } from "express";
import esessionAuthRouter from "./auth";
const esessionRouter = Router();

esessionRouter.use("/auth", esessionAuthRouter);

export default esessionRouter;
