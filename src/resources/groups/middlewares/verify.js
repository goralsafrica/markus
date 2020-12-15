import Group from "../models/Group";

export async function verifyNewGroup(req, res, next) {
  try {
    const exists = await Group.exists({
      name: RegExp(req.body.name, "i"),
      hospital: req.credentials.hospital,
    });
    if (exists)
      throw new Error(
        "hopsital group '" + req.body.name + "' already exists in this hospital"
      );
    else return next();
  } catch (err) {
    next({
      status: 400,
      errors: {
        request: err.message,
      },
      message: "failed to create new group",
    });
  }
}
