import Staff from "../../staff/models/Staff";

export async function verifyHeadOfBranch(req, res, next) {
  const { staff } = req;
  if (!staff.administrativeRole || !staff.administrativeRole.branch) {
    return next([
      401,
      ["You do not have permission to perform this operation"],
      "permission denied",
    ]);
  }
  next();
}
