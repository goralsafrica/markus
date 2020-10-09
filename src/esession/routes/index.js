import { Router } from "express";
import esessionAuthRouter from "./auth";
import mainRouter from "./main";
const esessionRouter = Router();

esessionRouter.use("/auth", esessionAuthRouter);
esessionRouter.use("/", mainRouter);
export default esessionRouter;
