import Staff from "../models/Staff";

class StaffController {
  static async create(req, res, next) {
    console.log(req.body);
    // Staff.create({
    //   name: req.body.name
    // })
  }
}

export default StaffController;
