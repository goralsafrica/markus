import possibleCategories from "../../../seeders/drugCategories.json";
function updateStoreValidator(req, res, next) {
  const errors = {};
  const data = {};
  let drugCategories;
  data.branch = req.body.branch;
  data.drugs = req.body.drugs instanceof Object ? req.body.drugs : {};
  drugCategories = Object.keys(data.drugs);
  if (drugCategories.length > 0) {
    //validate drug categories
    const nonCategorized = Object.keys(data.drugs).filter(
      (category) => !possibleCategories[category]
    );
    if (nonCategorized.length)
      return next({
        status: 400,
        errors: {
          categories: `category(ies) '${nonCategorized.join(
            "','"
          )}' are not valid drug categories`,
        },
      });
  } else {
  }
}

export { updateStoreValidator };
