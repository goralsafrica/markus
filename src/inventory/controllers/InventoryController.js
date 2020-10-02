import Inventory from "../models/Inventory";
import { badRequestError, serverError, successMessage } from "../../utilities";

class InventoryController {
  static async create(req) {
    const newBranch = new Inventory({
      branch: req.params.branchid,
    });
    console.log(newBranch);
    try {
    } catch (err) {
      badRequestError(
        {
          branch: "invalid branch id",
        },
        "failed to create new branch inventory"
      );
    }
  }
}

export default InventoryController;
