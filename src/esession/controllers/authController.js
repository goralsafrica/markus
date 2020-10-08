import { model } from "mongoose";
import { compare } from "bcryptjs";
import {
  serverError,
  notFoundError,
  successMessage,
  badRequestError,
  deriveToken,
} from "../../utilities";
const Staff = model("Staff");

class EsessionAuthController {
  static async verify(req) {
    const { email, password } = req.query;
    try {
      const staff = await Staff.findOne({ email }).select("+password");
      if (!staff)
        return notFoundError({
          email: "no doctor's details matches the provided email address",
        });
      const correctPassword = await compare(password, staff.password);
      if (!correctPassword) {
        return badRequestError({
          request: "invalid credentials",
        });
      }
      return successMessage(
        {
          staff: "doctor exists",
          token: deriveToken("", staff._id),
        },
        "verification success"
      );
    } catch (err) {
      console.error(err);
      serverError(
        {
          request: err.message,
        },
        "failed to verify staff"
      );
    }
  }

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

  static async login(req) {
    try {
      const exists = await Staff.findOne({
        _id: req.credentials.staff,
        hospital: {
          $in: [req.body.hospital],
        },
      });
      if (staff) {
        return successMessage({
          token: deriveToken(req.body.hospital, req.credentials.staff),
        });
      }
      return badRequestError(
        {
          request: "invalid credentials",
        },
        "failed to authenticate staff"
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
}

export default EsessionAuthController;
