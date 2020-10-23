import Pharmacy from "../models/Pharmacy";
import {
  successMessage,
  serverError,
  badRequestError,
} from "../../../utilities";

class PharmacyController {
  static async createStore(req) {
    const newPharmacy = new Pharmacy({
      branch: req.body.branch,
    });
    try {
      if (await newPharmacy.save()) {
        return successMessage(newPharmacy, "branch pharmacy store initialized");
      }
    } catch (err) {
      console.log(err);
      return serverError(
        {
          request: "server failed to respond",
        },
        "failed to fulfill request"
      );
    }
  }

  static async getStore(req) {
    try {
      const data = await Pharmacy.findOne({ branch: req.params.branchid });
      return successMessage(
        data,
        data
          ? "failed to retrieve branch pharmacy stock"
          : "you currently do not have any pharmacy store for this branch"
      );
    } catch (err) {
      console.log(message);
      return badRequestError(
        {
          branch: "invalid branch id",
        },
        "failed to retrieve branch pharmacy stock"
      );
    }
  }

  static async updateStore(req) {
    try {
      const data = await Pharmacy.findOneAndUpdate(
        { branch: req.params.branchid },
        req.body,
        {
          new: true,
        }
      );
      return successMessage(data, "branch pharmacy stock has been updated");
    } catch (err) {
      console.log(message);
      return serverError(
        {
          request: "server failed to respond",
        },
        "failed to update branch pharmacy stock"
      );
    }
  }
}

export default PharmacyController;
