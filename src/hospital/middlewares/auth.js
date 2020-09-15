import Staff from "../../staff/models/Staff";

export async function verifyAdmin(req, res, next) {
  const { staff, hospital } = req.body.credentials;
  try {
    const existingStaff = await Staff.findById(staff, hospital)
      .select("priviledged")
      .populate("role");
    console.log(existingStaff);
    if (
      !existingStaff ||
      existingStaff.role.name != "admin" ||
      existingStaff.priviledged !== 1
    )
      return next([401, ["permission denied"], "unauthorized request"]);
    next();
  } catch (err) {
    console.error(err);
  }
}
