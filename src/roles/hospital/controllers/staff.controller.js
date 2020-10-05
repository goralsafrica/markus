import Staff from "../../staff/models/Staff";
// import Department from "../../department/models/Department";
import Role from "../../staff/models/Role";
import { serverError, successMessage } from "../../../utilities";
import { hashSync } from "bcryptjs";
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
        hospital: req.credentials.hospital,
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
      const data = await Staff.find({
        hospital: req.credentials.hospital,
      })
        .select("-hospital")
        .populate("department")
        .populate("branches")
        .populate("role", "-category");
      return successMessage(data, "hospital staff list retrieved");
    } catch (err) {
      console.error(err);
      return serverError({ request: err.message }, "failed to fetch staff");
    }
  }

  static async findOne(req) {
    try {
      const data = await Staff.findById(req.params.staffid)
        .populate("hospital", "+name -departments -branches -updatedAt")
        .populate("department", "name")
        .populate("role", "name")
        .populate("branches", "-departments");
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
    const { department, branches, administrativeRole } = req.body;
    try {
      // const staff = await Staff.findById(req.params.staffid);
      // staff.branches = branches;
      // staff.administrativeRole = administrativeRole;
      // if (!(await staff.save())) throw new Error("failed");
      // if (!department || !validator.isMongoId(department))
      //   return next([400, ["department is required"], "failed to update"]);
      // staff.department = department;
      // const saved = await staff.save();
      // if (!saved) throw new Error("failed");
      return successMessage(staff, "staff role has been updated");
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
