import { model, models } from "mongoose";
const Staff = model("Staff");
import { notFoundError, notAllowedError } from "../../utilities";
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
        hospitals: {
          $in: [req.body.hospital],
        },
      });
      if (exists) throw new Error("");
      deriveToken(req.body.hospital);
    } catch (err) {
      return notAllowedError(
        "you do not permission to enter this workspace",
        "authentication failed"
      );
    }
  }
}
