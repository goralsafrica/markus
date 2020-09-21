import { compare } from "bcryptjs";
import Hospital from "../roles/hospital/models/Hospital";
import Patient from "../roles/patient/models/Patient";
import Staff from "../roles/staff/models/Staff";
import { deriveToken, serverError, badRequestError } from "../utilities";

class AuthController {
  static async login(user) {
    console.log(user);
    const { code: email, password, hospital } = user;
    try {
      const staff = await Staff.findOne({ email, hospital }).select(
        "+password"
      );
      if (!staff)
        return badRequestError(
          { request: "no record mathches the provided credentials" },
          "login failure"
        );
      const correctPassword = await compare(password, await staff.password);

      if (!(await correctPassword))
        return badRequestError(
          { request: "invalid login credentials" },
          "login failure"
        );

      const token = deriveToken(hospital, staff._id);

      //arrange data to be sent back
      return {
        status: 200,
        data: {
          firstName: staff.firstName,
          lastName: staff.lastName,
          email: staff.email,
          token,
        },
        errors: null,
        message: "login successful",
      };
    } catch (err) {
      console.error("here", err);
      return serverError(err, "failed to log user in");
    }
  }
}

export default AuthController;
