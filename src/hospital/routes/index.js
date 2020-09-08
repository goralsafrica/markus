import express from "express";
import mainRouter from "./main.router";
import branchRouter from "./branch.router";
const hospitalRouter = express.Router();

//gets the details of a particular hospital
hospitalRouter.use("/", mainRouter);
hospitalRouter.use("/branch", branchRouter);

export default hospitalRouter;
