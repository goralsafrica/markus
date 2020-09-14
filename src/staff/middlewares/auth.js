import Staff from "../models/Staff";
export default async function verifyStaff(req, res, next) {
  const { staff, hospital } = req.body.credentials;
  try {
    const existingStaff = await Staff.findById(staff, hospital)
      .select("firstName lastName email role administrativeRole")
      .populate("role")
      .populate("role.category")
      .populate("administrativeRole.name")
      .populate("administrativeRole.branch")
      .populate("administrativeRole.department");
    if (!existingStaff)
      return next([401, ["permission denied"], "unauthorized request"]);
    req.staff = existingStaff;
    next();
  } catch (err) {
    console.error(err);
  }
}
