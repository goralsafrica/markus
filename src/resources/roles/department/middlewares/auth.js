export function verifyHOD(req, res, next) {
  if (req.staff.administrativeRole.name.name != "head of department")
    return next([
      401,
      ["you do not permission to access this resource"],
      "unauthorized request",
    ]);

  return next();
}
