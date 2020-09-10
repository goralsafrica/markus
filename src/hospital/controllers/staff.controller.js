import Staff from "../../staff/models/Staff";

class HospitalStaffController {
  static async create(req, res, next) {
    console.log(req.body);
    // Staff.create({
    //   name: req.body.name
    // })
  }
}

export default HospitalStaffController;
