import Staff from "../models/Staff";
import StaffCategory from "../models/StaffCategory";
class StaffController {
  static async getDetails(req, res, next) {
    try {
      const data = await Staff.findById(req.credentials.staff)
        .populate("branches")
        .populate("department")
        .populate("role")
        .populate({
          path: "role",
          populate: {
            path: "category",
            model: "StaffCategory",
          },
        })
        .populate("hospital")
        // .populate({
        //   path: 'administrative'
        // });
        .populate(
          "administrativeRole.name administrativeRole.branch administrativeRole.department"
        );
      res.json({
        data,
        errors: null,
        message: "staff details retrieved",
      });
    } catch (err) {
      console.error(err);
      return next([500, ["server failed to respond"], "failed request"]);
    }
  }

  static async sendResignationLetter(req, res, next) {
    console.log("done");
  }
}

export default StaffController;
