import { model, models } from "mongoose";
import { compare } from "bcryptjs";
import {
  serverError,
  notFoundError,
  successMessage,
  badRequestError,
  deriveToken,
} from "../../../utilities";
import StaffWorkspace from "../../roles/staff/models/StaffWorkspace";
const Staff = model("Staff");
const ExpiredToken = model("ExpiredToken");

class EsessionAuthController {
  static async verify(req) {
    const { email, password } = req.query;
    try {
      const staff = await Staff.findOne({ email })
        .select("+password +hospital")
        .populate("hospital", "name _id url");
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
      const hospitals = await StaffWorkspace.find({
        staff: staff._id,
      })
        .select("hospital")
        .populate("hospital", "name url");
      return successMessage(
        {
          hospitals,
          token: deriveToken("", staff._id, true),
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

  static async login(req) {
    try {
      const exists = await StaffWorkspace.findOne({
        _id: req.credentials.staff,
        hospital: {
          $in: [req.body.hospital],
        },
      });
      if (exists) {
        return successMessage(
          {
            token: deriveToken(req.body.hospital, req.credentials.staff),
          },
          "authentication success :)"
        );
      }
      return notFoundError(
        {
          hospital: "hospital not found",
        },
        "failed to authenticate staff"
      );
    } catch (err) {
      console.error(err);
      return notFoundError(
        {
          request: err.message,
        },
        "failed to authenticate"
      );
    }
  }

  static async logout(req) {
    try {
      await ExpiredToken.create({
        token: req.headers.authorization.split(" ").pop(),
      });
      return successMessage(
        {
          request: "Sorry to see you go :(",
        },
        "logout succesful"
      );
    } catch (err) {
      return serverError(
        {
          request: "failed to cancel session",
        },
        "logout not fulfilled"
      );
    }
  }
}

export default EsessionAuthController;
