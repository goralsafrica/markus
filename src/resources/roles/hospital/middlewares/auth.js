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
      return next({
        status: 403,
        errors: {
          request: "permission denied",
        },
        message: "unauthorized request",
      });
    next();
  } catch (err) {
    return next({
      status: 500,
      errors: {
        request: "failed to verify user in session",
      },
      message: "authentication failed",
    });
  }
}

export async function verifyNewHospital(req, res, next) {
  const exists = await Hospital.exists({
    $or: [
      { email: req.body.hospitalEmail.toLowerCase() },
      { phone: req.body.hospitalPhone },
      { name: req.body.hospitalName.toLowerCase() },
      { url: req.body.url.toLowerCase() },
    ],
  });
  if (!exists) return next();

  return next({
    status: 400,
    errors: {
      request: "Hospital credentials already belongs to another hospital",
    },
    message: "failed to create hospital",
  });
}
