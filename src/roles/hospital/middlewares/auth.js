import Staff from "../../staff/models/Staff";
import Hospital from "../models/Hospital";
export async function verifyAdmin(req, res, next) {
  const { staff, hospital } = req.credentials;
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

export async function verifyNewHospital(req, res, next) {
  const exists = await Hospital.exists({
    $or: [{ email: req.body.hospitalEmail }, { phone: req.body.hospitalPhone }],
  });
  if (!exists) return next();

  return next({
    status: 400,
    errors: {
      request: "phone number / hospital already belongs to another hospital",
    },
    message: "failed to create hospital",
  });
}
