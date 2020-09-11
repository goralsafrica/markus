import Staff from "../../staff/models/Staff";
import { hashSync } from "bcryptjs";
class HospitalStaffController {
  static async create(req, res, next) {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      branches,
      role,
      credentials,
    } = req.body;
    try {
      const hash = hashSync(password, 10);
      const data = await Staff.create({
        firstName,
        lastName,
        email,
        password: hash,
        phone,
        branches,
        role,
        hospital: credentials.hospital,
      });
      if (!data) throw new Error("failed to update db");
      res.send({
        data,
        errors: null,
        message: "new staff creation success !",
      });
    } catch (err) {}
  }
}

export default HospitalStaffController;
