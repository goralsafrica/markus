import { model, models } from "mongoose";
import { compare } from "bcryptjs";
import {
  serverError,
  notFoundError,
  successMessage,
  badRequestError,
  deriveToken,
  extractToken,
} from "../../../utilities";
import StaffWorkspace from "../../roles/staff/models/StaffWorkspace";
const Staff = model("Staff");
const ExpiredToken = model("ExpiredToken");

class EsessionAuthController {
  static async verify(req) {
    const { email, password } = req.query;
    try {
      //get staff details
      const staff = await Staff.findOne({ email })
        .select("+password +hospital")
        .populate("hospital", "name _id url");
      if (!staff)
        return notFoundError({
          email: "no doctor's details matches the provided email address",
        });
      // verify password
      const correctPassword = await compare(password, staff.password);
      if (!correctPassword) {
        return badRequestError({
          request: "invalid credentials",
        });
      }
      // get all staff workspaces
      let hospitals = await StaffWorkspace.find({
        staff: staff._id,
      })
        .select("hospital")
        .populate("hospital", "name url");
      hospitals = hospitals.map((workspace) => workspace.hospital);

      const s = staff.toJSON();
      delete s.password;
      const token = deriveToken("none required", staff._id, true);
      return successMessage(
        {
          staff: s,
          hospitals,
          token,
        },
        "verification success"
      );
    } catch (err) {
      return serverError(
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
        staff: req.credentials.staff,
        hospital: req.body.hospital,
      });
      if (exists) {
        await ExpiredToken.create({ token: extractToken(req) });
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
