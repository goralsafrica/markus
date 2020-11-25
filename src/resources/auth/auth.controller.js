import { compare, hashSync, hash } from "bcryptjs";
import Hospital from "../roles/hospital/models/Hospital";
import Staff from "../roles/staff/models/Staff";
import TemporaryData from "./models/TemporaryData";
import Patient from "../roles/patient/models/Patient";
import {
  deriveToken,
  serverError,
  badRequestError,
  successMessage,
  notFoundError,
  decrypt,
  randomNumber,
  encrypt,
} from "../../utilities";
import StaffWorkspace from "../roles/staff/models/StaffWorkspace";
import ExpiredToken from "./models/ExpiredToken";
import { sendMail } from "../notifications";

class AuthController {
  static async verifyWorkspace(url) {
    try {
      if (!url || url == "") throw new Error("invalid url");
      const hospital = await Hospital.exists({ url });
      if (!hospital)
        return successMessage(
          { url: "url is available" },
          "workspace validation passed"
        );
      return badRequestError(
        { url: "url taken" },
        "workspace validation failed"
      );
    } catch (err) {
      return badRequestError(
        { url: err.message },
        "workspace validation failed"
      );
    }
  }

  static async forgotPassword(req) {
    try {
      const user = await Staff.findOne({ email: req.body.email });
      if (!user) {
        throw new Error("user not found");
      } else {
        const temporaryURL = `${encrypt({ id: user._id })}`;
        return successMessage(
          {
            "reset link": temporaryURL,
          },
          "reset link has been sent to email"
        );
      }
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
      console.log(err.message);
      return badRequestError({
        request: err.message,
      });
    }
  }

  static async twoFactorAuth(req) {
    try {
      const staff = await Staff.findById(req.credentials.staff);
      staff["two-factor-auth"] = req.body;
      staff["two-factor-auth"].dueDate = new Date(
        Date.now() + 86400000 * req.body.frequency
      );
      await staff.save();
      return successMessage(
        staff["two-factor-auth"],
        "two factor authentication enabled/updated"
      );
    } catch (err) {
      console.log(err.message);
      return badRequestError({
        request: err.message,
      });
    }
  }

  static async verifyCode(req) {
    const { staff, hospital, token, slug } = req.credentials;
    try {
      const data = await TemporaryData.findOne({
        staff,
        verificationCode: req.body.token,
        type: "verification_code",
      });
      if (!data || data.verificationCode != req.body.token) {
        throw new Error("Invalid/expired code");
      } else {
        // revoke previous token, verify user, generate token
        await Staff.findByIdAndUpdate(staff, {
          verified: true,
        });
        ExpiredToken.create({ token });
        return successMessage(
          { token: deriveToken(hospital, staff, slug) },
          "Verification success"
        );
      }
    } catch (err) {
      console.log(err.message);
      return badRequestError(
        {
          request: err.message,
        },
        "verification failed"
      );
    }
  }

  static async resendVerificationCode(req) {
    const { staff, hospital, token } = req.credentials;
    let payload = {};
    try {
      const data = await TemporaryData.findOne({
        staff,
        type: "verification_code",
      });
      const staffDetails = await Staff.findById(staff);

      if (staffDetails.verified)
        throw new Error("you have already been verified");

      payload.fullName = staffDetails.firstName + " " + staffDetails.lastName;
      payload.title = staffDetails.title;

      if (data) {
        payload.verificationCode = data.verificationCode;
      } else {
        payload.verificationCode = randomNumber(6);
        await TemporaryData.create({
          staff,
          type: "verification_code",
          verificationCode: payload.verificationCode,
          createdAt: new Date(),
        });
      }

      sendMail(
        "Account Verification Code",
        "noreply@goralsafrica.com",
        [staffDetails.email],
        payload,
        "verify-signup.hbs"
      )
        .then(console.log)
        .catch(console.log);

      return successMessage(
        {
          request:
            "verification code has been resent to Email: " + staffDetails.email,
        },
        "verification code sent "
      );
    } catch (err) {
      console.log(err.message);
      return badRequestError(
        {
          request: err.message,
        },
        "failed to resend mail"
      );
    }
  }
}

export default AuthController;
