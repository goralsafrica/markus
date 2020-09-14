import Branch from "../../branch/models/Branch";
import Staff from "../../staff/models/Staff";
import Hospital from "../../hospital/models/Hospital";
import Department from "../../department/department.model";
class BranchDepartmentController {
  static async add(req, res, next) {
    const { branch } = req.staff.administrativeRole;
    try {
      const data = await Branch.findById(branch._id);
      if (!data) throw new Error("400");
      const index = data.departments.findIndex((d) => d == req.body.department);
      if (index == -1) data.departments.push(req.body.department);
      await data.save();
      res.json({
        data,
        errors: null,
        message: "department has been added",
      });
    } catch (err) {
      console.log(err);
      next([
        500,
        ["server  failed to respond :("],
        "failed to add new department",
      ]);
    }
  }

  static async getDepartments(req, res, next) {
    const { branch } = req.staff.administrativeRole;
    try {
      const data = await Branch.findById(branch._id)
        .select("departments")
        .populate("departments");

      if (!data) next([400, ["invalid branch id"], "departments not found"]);
      res.send({
        data,
        errors: null,
        message: "branch department list retireved",
      });
    } catch (err) {
      console.log(err);
      next([500, ["server  failed to respond :("], "failed to retrieve list"]);
    }
  }

  static async getDepartment(req, res, next) {
    const { branch } = req.staff.administrativeRole;
    try {
      const details = await Department.findById(req.params.departmentid).select(
        "name"
      );
      console.log(details);
      const staff = await Staff.find({
        branches: {
          $in: [branch._id],
        },
        department: req.params.departmentid,
      }).populate({
        path: "role",
        model: "Role",
        populate: {
          path: "category",
          model: "StaffCategory",
        },
      });

      const data = {
        details,
        staff,
      };
      if (!data) throw new Error("failed");
      res.send({
        data,
        errors: null,
        message: "branch department list retireved",
      });
    } catch (err) {
      console.log(err);
      next([
        500,
        ["server  failed to respond :("],
        "failed to retrieve details",
      ]);
    }
  }

  static async removeDepartment(req, res, next) {
    const { branch } = req.staff.administrativeRole;
    try {
      const data = await Branch.findById(branch._id);

      data.departments = data.departments.filter(
        (d) => d != req.params.departmentid
      );
      if (!(await data.save())) throw new Error("error o");
      res.send({
        data,
        errors: null,
        message: "department has been successfully removed from branch",
      });
    } catch (err) {
      console.log(err);
      next([
        500,
        ["server  failed to respond :("],
        "failed to remove department",
      ]);
    }
  }
}

export default BranchDepartmentController;
