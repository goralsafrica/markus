import Pharmacy from "../models/Pharmacy";
import { successMessage, serverError } from "../../utilities";

class PharmacyController {
  static async createStore(req) {
    console.log(req.credentials);
  }
}

export default PharmacyController;
