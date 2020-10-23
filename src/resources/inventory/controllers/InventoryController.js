import Inventory from "../models/Inventory";
import {
  badRequestError,
  serverError,
  successMessage,
} from "../../../utilities";

class InventoryController {
  static async create(req) {
    const newBranch = new Inventory({
      branch: req.body.branch,
    });
    try {
      if (!(await newBranch.save()))
        return serverError(
          {
            request: "server failed to respond",
          },
          "failed to create new hospital branch inventory"
        );
      return successMessage(
        newBranch,
        "hospital branch inventory has been created"
      );
    } catch (err) {
      console.log(err);
      return badRequestError(
        {
          branch: "invalid branch id",
        },
        "failed to create new branch inventory"
      );
    }
  }

  static async findOne(req) {
    try {
      const inventory = await Inventory.findOne({
        branch: req.params.branchid,
      });
      if (!inventory) throw new Error("no inventory found for branch");

      return successMessage(inventory, "branch inventory retrieved");
    } catch (err) {
      return badRequestError(
        {
          branch: err.message,
        },
        "failed to retrieve branch inventory"
      );
    }
  }

  static async update(req) {
    try {
      const update = await Inventory.findByIdAndUpdate(
        req.body.inventoryid,
        {
          store: req.body.store,
        },
        {
          new: true,
        }
      );
      if (update) {
        return successMessage(update, "branch inventory has been updated");
      }
    } catch (err) {
      return badRequestError(
        {
          request: err.message,
        },
        "failed to update hospital inventory"
      );
    }
  }
}

export default InventoryController;
