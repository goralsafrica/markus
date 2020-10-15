import { model } from "mongoose";
const Staff = model("Staff"),
  Hospital = model("Hospital");
import {
  encrypt,
  serverError,
  badRequestError,
  successMessage,
  decrypt,
} from "../../utilities";

export default class InviteController {
  static async sendInviteMail(req) {
    try {
      if (
        await Staff.exists({
          email: req.body.email,
          hospital: {
            $in: [req.credentials.hospital],
          },
        })
      )
        throw new Error("Doctor already exists in this hospital");
      const token = encrypt(
        {
          hospital: req.credentials.hospital,
          invitee: req.body.email,
        },
        1000 * 60 * 60 * 24
      );
      //send mailer here
      return successMessage(
        {
          token,
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
}
