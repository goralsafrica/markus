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
        status: "pending",
      });

      invite.save();
      sendMail(
        "INVITATION MAIL",
        "noreply@goralsafrica.com",
        [req.body.email],
        { token: invite._id, user_status: registeredUser ? "existing" : "new" },
        "workspace-invite.hbs"
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
      const { token } = req.query,
        invite = await Invite.findById(token)
          .populate("hospital", "name")
          .select("-recipient");
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
      let { email: recipient } = req.body,
        { token } = req.query;
      const invite = await Invite.findOne({
        _id: token,
        recipient,
        status: "pending",
      });
      if (!invite)
        throw new Error(
          "Verification Failed. invalid invitee/unauthorized token"
        );
      let staff = await Staff.findOne({ email: recipient });
      if (!staff)
        throw new Error(
          "Unregistered Email. You have to register before accepting invite"
        );
      await StaffWorkspace.create({
        staff: staff._id,
        hospital: invite.hospital,
      });
      await Invite.findByIdAndUpdate(token, { status: "accepted" });
      return successMessage(
        {
          email: recipient,
        },
        "Your have successfully been added to the workspace"
      );
    } catch (err) {
      console.log(err.message);
      return badRequestError({
        request: err.message,
      });
    }
  }
}
