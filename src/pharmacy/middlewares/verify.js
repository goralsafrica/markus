import Pharmacy from "../models/Pharmacy";
async function checkBranchPharmacy(req, res, next) {
  try {
    const hasStore = await Pharmacy.exists({ branch: req.body.branch });
    if (hasStore)
      return next({
        status: 403,
        errors: {
          branch: "branch already has a pharmacy",
        },
        message: "failed to create branch pharmacy",
      });
    return next();
  } catch (err) {
    return next({
      status: 403,
      errors: {
        branch: "branch already has a pharmacy",
      },
      message: "failed to create branch pharmacy",
    });
  }
}

async function checkPharmacy(req, res, next) {
  try {
    const exists = await Pharmacy.exists({ branch: req.params.branchid });
    if (!exists)
      return next({
        status: 404,
        errors: {
          branch: "invalid branch id",
        },
        message: "failed to update branch pharmacy",
      });
    return next();
  } catch (err) {
    return next({
      status: 404,
      errors: {
        branch: "invalid branch id",
      },
      message: "failed to update branch pharmacy",
    });
  }
}
export { checkBranchPharmacy, checkPharmacy };
