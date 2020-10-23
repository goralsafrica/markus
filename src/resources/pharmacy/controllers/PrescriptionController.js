import Pharmacy from "../models/Pharmacy";
import Prescription from "../../esession/models/Prescription";
import { successMessage, serverError } from "../../../utilities";

class PrescriptionController {
  static async getWaitingList() {
    try {
      //fetch list of sesssion open and in visit pharmacy level
      const data = await Pharmacy.find();
      return successMessage(data, "drug collection waiting list retrieved");
    } catch (err) {
      console.error(err);
      return serverError(
        {
          request: "unable to fulfill request",
        },
        "failed to retrieve drug collection waiting list"
      );
    }
  }

  static async getPrescription(req) {
    try {
      //fetch prescription of a sesssion open
      const data = await Prescription.findOne({
        session: req.params.sessionid,
      });
      return successMessage(data, "patient session prescription retrieved");
    } catch (err) {
      console.error(err);
      return serverError(
        {
          request: "unable to fulfill request",
        },
        "failed to retrieve drug collection waiting list"
      );
    }
  }

  static async updateStatus(req) {
    try {
      //fetch prescription of a sesssion open
      const data = await Prescription.findByIdAndUpdate(
        req.params.prescriptionid,
        { collected: 1 }
      );
      return successMessage(data, "patient session prescription retrieved");
    } catch (err) {
      console.error(err);
      return serverError(
        {
          request: "unable to fulfill request",
        },
        "failed to retrieve drug collection waiting list"
      );
    }
  }
}

export default PrescriptionController;
