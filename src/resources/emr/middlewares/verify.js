import { notAllowedError } from "../../../utilities";
import Session from "../../esession/models/Session";

export async function checkRightsToUpdate(req, res, next) {
  try {
    const doc = await Session.findOne({
      doctor: req.credentials.staff,
      "conversation._id": req.body.conversation,
    });
    if (!doc) throw new Error("you do not have write access to this resource");
    res.locals.session = doc;
    return next();
  } catch (err) {
    return notAllowedError(err.message);
  }
}
