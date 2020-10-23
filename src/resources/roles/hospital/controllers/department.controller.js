import Hospital from "../models/Hospital";
import Staff from "../../staff/models/Staff";
import {
  badRequestError,
  successMessage,
  serverError,
} from "../../../../utilities";

class DepartmentController {
  static async create(req) {
    const { departments } = req.body;
    let data;
    try {
      const hospital = await Hospital.findById(req.credentials.hospital);
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
      return successMessage(
        data,
        "departments have been added/created in hospital"
      );
    } catch (err) {
      console.error(err);
      return badRequestError(
        {
          request: err.message,
        },
        "failed to add/create departments in hospital"
      );
    }
  }

  static async findAll(req) {
    try {
      const data = await Hospital.findById(req.credentials.hospital)
        .select("departments")
        .populate("departments");
      return successMessage(data, "hospital departments retrieved");
    } catch (err) {
      console.log(err);
      return badRequestError(
        {
          request: err.message,
        },
        "failed to retrieve list"
      );
    }
  }

  static async findOne(req) {
    const { hospital } = req.credentials;
    const { department } = req.params.departmentid;
    try {
      const hospitaldata = await Hospital.findById(hospital);
      const staff = await Staff.find({ hospital, department });
      return successMessage(
        {
          hospital: hospitaldata,
          staff,
        },
        "hospital department details retrieved"
      );
    } catch (err) {
      console.log(err);
      return serverError({
        request: err.message,
      });
    }
  }

  static async delete(req) {
    try {
      const hasStaffs = await Staff.exists({
        hospital: req.credentials.hospital,
        department: req.params.departmentid,
      });
      if (hasStaffs)
        return badRequestError({
          staff: "staff has been assigned to this department.",
        });
      const data = await Hospital.findById(req.credentials.hospital);
      data.departments = data.departments.filter(
        (dept) => dept != req.params.departmentid
      );
      if (await data.save())
        return successMessage(
          data,
          "department has been successfully removed from hospital"
        );
    } catch (err) {
      console.error(err);
      return badRequestError(
        {
          request: err.message,
        },
        "failed to remove department from hospital"
      );
    }
  }
}

export default DepartmentController;
