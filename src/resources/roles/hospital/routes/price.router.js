import express from "express";
//import { adminHospitalMiddleWare }  from "../middlewares/register";
import { HospitalPriceController } from "../controllers/";
const priceRouter = express.Router();

//gets the details of a particular hospital
priceRouter.post("/", HospitalPriceController.create);
priceRouter.get("/", HospitalPriceController.findAll);
priceRouter.put("/:priceid", HospitalPriceController.update);
priceRouter.delete("/:priceid", HospitalPriceController.delete);

export default priceRouter;
