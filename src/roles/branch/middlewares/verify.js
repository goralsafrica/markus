import Staff from "../../staff/models/Staff";
import Branch from "../models/Branch";
import empty from "is-empty";
async function verifyHeadOfBranch(req, res, next) {
  const { staff } = req;
  if (
    !staff.administrativeRole ||
    !staff.administrativeRole.branch ||
    staff.administrativeRole.name != "head of branch"
  ) {
    return next({
      status: 401,
      errors: {
        request: "You do not have permission to perform this operation",
      },
      message: "permission denied",
    });
  }
  next();
}

async function verifyBranchInHospital(req, res, next) {
  const errors = {};
  if (!req.body.branch) {
    errors.branch = "no branch id specified";
  } else {
    const existsInHospital = await Branch.exists({
      _id: req.body.branch,
      hospital: req.credentials.hospital,
    });
    if (existsInHospital) return next();
    errors.branch = "branch does not belong to hospital";
  }
  return next({
    status: 400,
    errors,
    message: "branch verification failed",
  });
}

export { verifyHeadOfBranch, verifyBranchInHospital };
