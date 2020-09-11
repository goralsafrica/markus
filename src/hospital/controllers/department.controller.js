import Department from "../../department/department.model";
import Hospital from "../models/Hospital";
import Staff from "../../staff/models/Staff";
class DepartmentController {
  static async create(req, res, next) {
    const { departments } = req.body;
    let data;
    try {
      const hospital = await DepartmentController.getHospital(req, next);
      if (!hospital)
        return next(400, ["invalid hospital"], "failed to create department");
      if (hospital.departments == 0) {
        hospital.departments.push(...departments);
      } else {
        //assign all hospital department in an array
        let departmentsInDb = {};
        hospital.departments.forEach((d) => {
          if (departmentsInDb[d]) {
            departmentsInDb[d] += 1;
          } else {
            departmentsInDb[d] = 1;
          }
        });
        //find departments that aren't already there
        const unAssigned = departments.filter((d) => !departmentsInDb[d]);
        if (unAssigned.length > 0) hospital.departments.push(...unAssigned);
      }
      data = await hospital.save();
      res.send({
        data,
        errors: null,
        message: "departments have been created",
      });
    } catch (err) {
      console.error(err);
      return next([500, ["server failed to respond"], "Failed"]);
    }
  }

  static async findAll(req, res, next) {
    try {
      const data = await Hospital.findById(req.body.credentials.hospital)
        .select("departments")
        .populate("departments");
      if (!data) next([400, ["invalid input data"], "failed to fetch branch"]);
      res.send({
        data,
        errors: null,
        mesaage: "departments found",
      });
    } catch (err) {
      console.log(err);
      next([500, ["server  failed to respond :("], "failed to create branch"]);
    }
  }

  static async findOne(req, res, next) {
    const { hospital } = req.body.credentials;
    const { department } = req.body;
    try {
      const hospitaldata = await DepartmentController.getHospital(req, next);
      const staffs = await Staff.find({ hospital, department });
      if (!hospital || !staffs)
        return next([400, ["invalid credentials"], "failed"]);
      res.json({
        data: {
          hospital: hospitaldata,
          staffs,
        },
        errors: null,
        message: "success",
      });
    } catch (err) {
      console.log(err);
      next([500, ["server  failed to respond :("], "failed to create branch"]);
    }
  }

  static async getHospital(req, next) {
    try {
      return await Hospital.findById(req.body.credentials.hospital);
    } catch (err) {
      console.error(err);
      next([500, ["server failed to respond"], "failed"]);
      return;
    }
  }
}

export default DepartmentController;
