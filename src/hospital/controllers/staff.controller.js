import Staff from "../../staff/models/Staff";
import validator from "validator";
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
      department,
      credentials,
      administrativeRole,
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
        department,
        role,
        administrativeRole,
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
        .populate("hospital", "+name -departments -branches -updatedAt")
        .populate("department", "name")
        .populate("role", "name")
        .populate("branches", "-departments");
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
    const { department, branches } = req.body;
    try {
      const staff = await Staff.findById(req.params.staffid);
      // staff.branches = branches;

      // if (!department || !validator.isMongoId(department))
      //   return next([400, ["department is required"], "failed to update"]);
      // staff.department = department;
      // const saved = await staff.save();
      // if (!saved) throw new Error("failed");
      // res.send({
      //   data: staff,
      //   errors: null,
      //   message: "staff details have been updated",
      // });
    } catch (err) {
      console.log(err);
      next([500, ["failed to update staff details"], "failed request"]);
    }
  }

  static async remove(req, res, next) {
    try {
      const staff = await Staff.findById(req.params.staffid);
      staff.branches = staff.branches.filter(
        (branch) => branch != req.params.branchid
      );
      staff.save();
      res.send({
        data: staff,
        errors: null,
        message: "staff has been successfully removed from branch",
      });
    } catch (err) {
      console.error(err);
      next([500, ["server failure"], "failed to remove staff from branch"]);
    }
  }

  static async delete(req, res, next) {
    try {
      const staff = await Staff.findByIdAndDelete(req.params.staffid);
      if (success)
        return res.send({
          data: success,
          errors: null,
          message: "staff has been successfully removed from hospital branch",
        });
    } catch (err) {
      console.error(err);
      next([500, ["server failure"], "failed to remove staff"]);
    }
  }
}

export default HospitalStaffController;
