import Staff from "../../staff/models/Staff";
import Role from "../../staff/models/Role";

export async function verifyAdmin(req, res, next) {
  console.log("im here o");
  const { staff, hospital } = req.body.credentials;
  try {
    const existingStaff = await Staff.findById(staff, hospital)
      .select("priviledged")
      .populate("role");
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
