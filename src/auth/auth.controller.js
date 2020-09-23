import { compare } from "bcryptjs";
import Hospital from "../roles/hospital/models/Hospital";
import Patient from "../roles/patient/models/Patient";
import Staff from "../roles/staff/models/Staff";
import {
  deriveToken,
  serverError,
  badRequestError,
  successMessage,
} from "../utilities";

class AuthController {
  static async login(user) {
    const { email, password, hospital } = user;
    try {
      const staff = await Staff.findOne({ email, hospital }).select(
        "+password"
      );
      console.log(staff);
      if (!staff)
        return Promise.resolve(
          badRequestError(
            { request: "no record mathches the provided credentials" },
            "login failure"
          )
        );
      const correctPassword = await compare(password, await staff.password);

      if (!(await correctPassword))
        return Promise.resolve(
          badRequestError(
            { request: "invalid login credentials" },
            "login failure"
          )
        );

      const token = deriveToken(hospital, staff._id);

      //arrange data to be sent back
      return Promise.resolve({
        status: 200,
        result: {
          data: {
            firstName: staff.firstName,
            lastName: staff.lastName,
            email: staff.email,
            token,
          },
          errors: null,
          message: "login successful",
        },
      });
    } catch (err) {
      console.error("here", err);
      return serverError(err, "failed to log user in");
    }
  }

  static async verifyWorkspace(url) {
    try {
      const hospital = await Hospital.findOne({ url });
      if (!hospital)
        return badRequestError(
          { url: "url not found" },
          "failed to login to workspace"
        );
      return successMessage(
        { hospital: hospital._id },
        "workspace validation passed"
      );
    } catch (err) {
      console.error(err);
      return serverError(
        {
          request: "server failed to respond",
        },
        "failed to login to workspace"
      );
    }
  }
}

export default AuthController;
