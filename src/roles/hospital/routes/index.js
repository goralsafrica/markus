import express from "express";
import mainRouter from "./main.router";
// import branchRouter from "./branch.router";
// import departmentRouter from "./department.router";
import staffRouter from "./staff.router";
// import patientRouter from "./patient.router";
// import priceRouter from "./price.router";
// import healthinsuranceRouter from "./healthinsurance.router";
// import labRouter from "./lab.router";
import { verifyUser } from "../../../auth/middlewares";
import { verifyAdmin } from "../middlewares";
const hospitalRouter = express.Router();

//gets the details of a particular hospital
hospitalRouter.use(verifyUser);
hospitalRouter.use("/staff", staffRouter);
//hospitalRouter.use("/", mainRouter); (done)

// middleware to verify hospital admin :)
// hospitalRouter.use(verifyUser, verifyAdmin);
// hospitalRouter.use("/branch", branchRouter);
// hospitalRouter.use("/department", departmentRouter);
// hospitalRouter.use("/patient", patientRouter);
// hospitalRouter.use("/price", priceRouter);
// hospitalRouter.use("/healthinsurance", healthinsuranceRouter);
// hospitalRouter.use("/lab", labRouter);

export default hospitalRouter;
