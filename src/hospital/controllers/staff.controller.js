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
    } catch (err) {
      console.error(err);
      next([500, [err], "failed to create staff"]);
    }
  }

  static async findAll(req, res, next) {
    try {
      const data = await Staff.find({
        hospital: req.body.credentials.hospital,
        priviledged: 0,
      })
        .select("-hospital")
        .populate("department")
        .populate("branches")
        .populate("role", "-category");
      res.send({
        data,
        errors: null,
        message: "staff fetched",
      });
    } catch (err) {
      console.error(err);
      next([500, ["failed to fetch"], "failed request"]);
    }
  }

  static async findOne(req, res, next) {
    try {
      const data = await Staff.findById(req.params.id)
        .populate("hospital", "name")
        .populate("department")
        .populate("role")
        .populate("branches");
      res.send({
        data,
        errors: null,
        message: "staff fetched",
      });
    } catch (err) {
      console.error(err);
      next([500, ["failed to fetch"], "failed request"]);
    }
  }

  static async update(req, res, next) {
    try {
    } catch (err) {
      console.log(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const success = await Staff.findByIdAndDelete(req.params.staffid);
      if (success)
        return res.send({
          data: success,
          errors: null,
          message: "staff has been successfully removed from hospital",
        });
    } catch (err) {
      console.error(err);
      next([500, ["server failure"], "failed to remove staff"]);
    }
  }
}

export default HospitalStaffController;
