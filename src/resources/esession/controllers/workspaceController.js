import { model, models } from "mongoose";
const Staff = model("Staff");
const ExpiredToken = model("ExpiredToken");
import {
  notFoundError,
  notAllowedError,
  extractToken,
  deriveToken,
  successMessage,
  badRequestError,
} from "../../../utilities";
import Hospital from "../../roles/hospital/models/Hospital";
import Branch from "../../roles/branch/models/Branch";
import StaffWorkspace from "../../roles/staff/models/StaffWorkspace";
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

  static async create(req) {
    //create hospital, branch and assign cmd to hospital
    try {
      const newHospital = new Hospital({
        ...req.body,
      });
      const newBranch = new Branch({
        branchName: "head branch",
        hospital: newHospital._id,
        ...req.body,
      });
      const newStaffworkspace = new StaffWorkspace({
        staff: req.credentials.staff,
        hospital: newHospital._id,
        role: {
          name: "chief medical director",
          category: "doctor",
        },
        branches: [newBranch._id],
        administrativeRole: {
          name: "chief medical director",
        },
      });
      const created = await Promise.all([
        newHospital.save(),
        newBranch.save(),
        newStaffworkspace.save(),
      ]);
      //if (!created) throw new Error("");
      return successMessage(newHospital, "new workspace has been created");
    } catch (err) {
      console.log("Friendly Error !", err);
      return badRequestError(
        { request: "credentials have already been used" },
        "failed to create new workspace"
      );
    }
  }
}
