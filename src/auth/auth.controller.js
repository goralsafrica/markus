import { compare, hashSync, hash } from "bcryptjs";
import Hospital from "../roles/hospital/models/Hospital";
import Staff from "../roles/staff/models/Staff";
import Patient from "../roles/patient/models/Patient";
import {
  deriveToken,
  serverError,
  badRequestError,
  successMessage,
  notFoundError,
  decrypt,
  encrypt,
} from "../utilities";

class AuthController {
  static async login(user) {
    const { email, password, hospital } = user;
    try {
      const staff = await Staff.findOne({
        email,
        hospital: {
          $in: [hospital],
        },
      }).select("+password");
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

  static async forgotPassword(req) {
    try {
      const user = await Staff.findOne({ email: req.body.email });
      if (!user) throw new Error("user not found");
      console.log(req.baseUrl);
      const temporaryURL = `${encrypt({ id: user._id })}`;
      return successMessage(
        {
          "reset link": temporaryURL,
        },
        "reset link has been sent to email"
      );
    } catch (err) {
      console.log(err);
      return notFoundError({
        request: err.message,
      });
    }
  }

  static async verifyResetPasswordToken(req) {
    try {
      const token = decrypt(req.params.token);
      const data = await Staff.findById(token.id).select(
        "firstName lastName email"
      );
      return successMessage(data, "authentication success");
    } catch (err) {
      return badRequestError({
        request: err.message,
      });
    }
  }

  static async resetPassword(req) {
    try {
      req.body.password = await hash(req.body.password, 10);
      const data = await Staff.findByIdAndUpdate(req.params.user, {
        password: req.body.password,
      }).select("+password");
      return successMessage(data, "authentication success");
    } catch (err) {
      return badRequestError({
        request: err.message,
      });
    }
  }
}

export default AuthController;
