import { model } from "mongoose";
const Staff = model("Staff"),
  ExpiredToken = model("ExpiredToken"),
  Hospital = model("Hospital");
import Notification from "../../notifications/in-app/models/NotificationModel";
import Invite from "../../auth/models/Invite";
import {
  badRequestError,
  successMessage,
  notFoundError,
} from "../../../utilities";
import sendMail from "../../notifications/email/mailer";
import StaffWorkspace from "../../roles/staff/models/StaffWorkspace";

export default class InviteController {
  static async sendInviteMail(req) {
    const { email, alreadyInvited } = req.body;
    const { hospital, staff } = req.credentials;
    try {
      const registeredUser = await Staff.findOne({
        email: req.body.email,
      });
      if (registeredUser) {
        const existsInWorkspace = await StaffWorkspace.exists({
          staff: registeredUser._id,
          hospital,
        });
        if (existsInWorkspace)
          throw new Error("User already exists in the workspace");
      }
      if (alreadyInvited)
        throw new Error("Invite has already been sent to this email");

      const invite = new Invite({
        recipient: email,
        hospital,
        sender: staff,
      });

      await invite.save();
      sendMail(
        "INVITATION MAIL",
        "noreply@goralsafrica.com",
        [req.body.email],
        { verificationCode: invite._id },
        "verify-signup.hbs"
      )
        .then(console.log)
        .catch((err) => {
          throw err;
        });
      //update audit trail
      return successMessage(
        {
          email,
        },
        "Invite link has been sent"
      );
    } catch (err) {
      return badRequestError(
        {
          request: err.message,
        },
        "failed to send invite mail"
      );
    }
  }

  static async verifyInviteToken(req) {
    try {
      const { token } = req.params,
        invite = await Invite.findById(token).populate("hospital", "name");
      if (!invite)
        return notFoundError(
          {
            request: "Invalid/expired Invite",
          },
          "failed to verify invite"
        );
      return successMessage(
        invite,
        "invitation details successfully retrieved"
      );
    } catch (err) {
      console.log(err);
      return badRequestError({
        request: err.message,
      });
    }
  }

  static async acceptInvite(req) {
    try {
      let { invitee, hospital } = decrypt(req.params.token);
      if (invitee !== req.body.email)
        throw new Error("email not assigned to token");
      let staff = await Staff.findOne({ email: invitee });
      if (staff) {
        console.log(staff);
        staff.hospital.push(hospital);
        await Promise.all([
          ExpiredToken.create({ token: req.params.token }),
          staff.save(),
        ]);
        return successMessage(data, "invite to workspace complete");
      } else {
        return {
          status: 307,
          result: {
            errors: null,
            data: {
              email: invitee,
            },
            message: "Welcome new user :)",
          },
        };
      }
    } catch (err) {
      console.log(err);
      return badRequestError({
        request: err.message,
      });
    }
  }
}
