import StaffWorkspace from "../../staff/models/StaffWorkspace";
import Hospital from "../models/Hospital";

export async function verifyAdmin(req, res, next) {
  const { staff, hospital } = req.credentials;
  try {
    const staffExists = await StaffWorkspace.exists({
      staff,
      hospital,
      "administrativeRole.name": "chief medical director",
    });
    if (!staffExists) throw new Error("unauthorized user");
    return next();
  } catch (err) {
    return next({
      status: 400,
      errors: {
        request: err.message,
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
  console.log(exists);
  return next({
    status: 400,
    errors: {
      request: "Hospital credentials already belongs to another hospital",
    },
    message: "failed to create hospital",
  });
}
