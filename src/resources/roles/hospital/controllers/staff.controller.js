import Staff from "../../staff/models/Staff";
import {
  successMessage,
  serverError,
  notFoundError,
} from "../../../../utilities";
import { hashSync } from "bcryptjs";
import StaffWorkspace from "../../staff/models/StaffWorkspace";
class HospitalStaffController {
  static async create(req) {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      branches = [],
      role,
      code,
      department,
    } = req.body;
    try {
      const hash = hashSync(password, 10);
      const data = await Staff.create({
        firstName,
        lastName,
        email,
        code,
        password: hash,
        phone,
        branches,
        department,
        role,
        hospital: [req.credentials.hospital],
      });
      if (!data) throw new Error("failed to update db");
      return successMessage(data, "new staff created");
    } catch (err) {
      console.error(err);
      return serverError(
        {
          request: "server failed to respond :(",
        },
        "failed to create new staff"
      );
    }
  }

  static async findAll(req) {
    try {
      const data = await StaffWorkspace.find({
        hospital: req.credentials.hospital,
      }).populate("staff");
      return successMessage(data, "hospital staff list retrieved");
    } catch (err) {
      console.error(err);
      return serverError({ request: err.message }, "failed to fetch staff");
    }
  }

  static async findOne(req) {
    try {
      const data = await StaffWorkspace.findById(req.params.staffid).populate(
        "staff"
      );
      return successMessage(data, "staff details retrieved");
    } catch (err) {
      console.error(err);
      return serverError(
        {
          request: err.message,
        },
        "failed to retrieve staff details"
      );
    }
  }

  static async update(req) {
    try {
      const staff = await Staff.findByIdAndUpdate(
        req.params.staffid,
        req.body,
        { new: true }
      );
      return successMessage(staff, "staff details have been updated");
    } catch (err) {
      console.log(err);
      return serverError(
        {
          request: err.message,
        },
        "failed to update staff details"
      );
    }
  }

  static async remove(req, res, next) {
    try {
      const staff = await Staff.findById(req.params.staffid);
      staff.branches = staff.branches.filter(
        (branch) => branch != req.params.branchid
      );
      if (await staff.save());
      return successMessage(staff, "staff has been removed from branch");
    } catch (err) {
      console.error(err);
      return serverError(
        {
          request: err.message,
        },
        "failed to remove staff from branch"
      );
    }
  }

  static async delete(req) {
    try {
      const removed = await StaffWorkspace.findOneAndDelete({
        _id: req.params.staffid,
        hospital: req.credentials.hospital,
      });
      return successMessage(removed, "staff has been removed from hospital");
    } catch (err) {
      console.log(err.message);
      return notFoundError(
        {
          request: "staff not found",
        },
        "failed to remove staff from hospital"
      );
    }
  }
}

export default HospitalStaffController;
