import { compare } from "bcryptjs";
import Staff from "../roles/staff/models/Staff";
import * as utils from "../utilities";

class AuthController {
  static async login(req, res, next) {
    const { email, password, hospital } = req.body;
    try {
      const staff = await Staff.findOne({ email, hospital }).select(
        "+password"
      );
      if (!staff) return next([400, ["invalid credentials"], "login failure"]);
      const correctPassword = await compare(password, await staff.password);

      if (!(await correctPassword))
        return next([400, ["invalid credentials"], "login failure"]);
      const token = utils.deriveToken(hospital, staff._id);

      //arrange data to be sent back
      res.send({
        data: {
          firstName: staff.firstName,
          lastName: staff.lastName,
          email: staff.email,
          token,
        },
        errors: null,
        message: "login successfuly",
      });
    } catch (err) {
      console.error(err);
      next();
    }
  }
}

export default AuthController;
