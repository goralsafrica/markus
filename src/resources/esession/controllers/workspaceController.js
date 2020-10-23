import { model, models } from "mongoose";
const Staff = model("Staff");
const ExpiredToken = model("ExpiredToken");
import {
  notFoundError,
  notAllowedError,
  extractToken,
  deriveToken,
  successMessage,
} from "../../../utilities";
export default class WorkspaceController {
  static async getWorkspaces(req) {
    try {
      const data = await Staff.findById(req.credentials.staff)
        .select("hospital")
        .populate("hospital");
      return successMessage(
        {
          data,
        },
        "workspaces retrieved"
      );
    } catch (err) {
      console.error(err);
      return notFoundError(
        {
          request: err.message,
        },
        "failed to fatch workspaces"
      );
    }
  }

  static async switchWorkspaces(req) {
    try {
      const exists = await Staff.exists({
        hospital: {
          $in: [req.body.hospital],
        },
      });
      if (exists) {
        await ExpiredToken.create({ token: extractToken(req) });
        return successMessage({
          token: deriveToken(req.body.hospital, req.credentials.staff),
        });
      }
      throw new Error("not allowed");
    } catch (err) {
      console.log(err);
      return notAllowedError(
        "you do not permission to enter this workspace",
        "authentication failed"
      );
    }
  }
}
