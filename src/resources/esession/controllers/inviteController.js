import { model } from "mongoose";
const Staff = model("Staff"),
  ExpiredToken = model("ExpiredToken"),
  Hospital = model("Hospital");
import Notification from "../../notifications/in-app/models/NotificationModel";
import {
  encrypt,
  badRequestError,
  successMessage,
  decrypt,
} from "../../../utilities";
import sendMail from "../../notifications/email/mailer";
import StaffWorkspace from "../../roles/staff/models/StaffWorkspace";

export default class InviteController {
  static async sendInviteMail(req) {
    const { email } = req.body;
    const { hospital } = req.credentials;
    try {
      const staff = await Staff.findOne({
        email: req.body.email,
      });
      if (staff) {
        const existsInWorkspace = await StaffWorkspace.exists({
          staff: staff._id,
          hospital: req.credentials.hospital,
        });
        if (!existsInWorkspace)
          throw new Error("User already exists in the workspace");
      }
      // send notifications
      const newNotification = new Notification({
        sender: req.credentials.staff,
        senderRole: "Staff",
        description: "invite",
        hospital: req.credentials.hospital,
        invitee: {
          email: req.body.email,
          status: "pending",
        },
      });
      if (staff) {
        newNotification.recipients = [staff._id];
        newNotification.invitee.staff = staff._id;
      }
      await newNotification.save();
      // sendMail(
      //   "INVITATION MAIL",
      //   "noreply@goralsafrica.com",
      //   [req.body.email],
      //   { verificationCode: token },
      //   "verify-signup.hbs"
      // )
      //   .then(console.log)
      //   .catch((err) => {
      //     throw err;
      //   });

      //update audit trail
      const token = encrypt(
        {
          hospital,
          invitee: email,
        },
        1000 * 60 * 60 * 24
      );
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
      let { invitee, hospital } = decrypt(req.params.token);
      hospital = await Hospital.findById(hospital).select("name");
      return successMessage({
        invitee,
        hospital,
      });
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
        await ExpiredToken.create({ token: req.params.token });
        await staff.save();
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
