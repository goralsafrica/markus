import Department from "../../department/department.model";
class DepartmentController {
  static async create(req, res, next) {
    // const { address, city, state, country, credentials } = req.body;
    // try {
    //   const data = Department.create({
    //     address,
    //     city,
    //     state,
    //     country,
    //     hospital: credentials.hospital,
    //   });
    //   if (!data)
    //     next([400, ["invalid input data"], "failed to create hospital"]);
    //   res.send({
    //     data,
    //     errors: null,
    //     mesaage: "new branch created",
    //   });
    // } catch (err) {
    //   console.log(err);
    //   next([500, ["server  failed to respond :("], "failed to create branch"]);
    // }
  }
  static async createMultiple(req, res, next) {}
}

export default DepartmentController;
