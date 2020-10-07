import { model } from "mongoose";
import { compare } from "bcryptjs";
import {
  serverError,
  notFoundError,
  successMessage,
  badRequestError,
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
}

export default EsessionAuthController;
