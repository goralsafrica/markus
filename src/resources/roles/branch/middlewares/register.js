import validator from "validator";
import isEmpty from "is-empty";
import { sanitize } from "../../../utilities";

export function registerBranchValidator(req, res, next) {
  const errors = {};
  const data = {};

  data.branchName = !isEmpty(req.body.branchName) ? req.body.branchName : "";
  data.phone = !isEmpty(req.body.phone) ? req.body.phone : "";
  data.departments = !isEmpty(req.body.departments) ? req.body.departments : "";
  data.email = !isEmpty(req.body.email) ? req.body.email : "";
  data.address = !isEmpty(req.body.address) ? req.body.address : "";
  data.city = !isEmpty(req.body.city) ? req.body.city : "";
  data.state = !isEmpty(req.body.state) ? req.body.state : "";
  data.country = !isEmpty(req.body.country) ? req.body.country : "";

  if (isEmpty(data.branchName)) {
    errors.branchName = "branch name required";
  }
  if (isEmpty(data.phone) || !validator.isMobilePhone(data.phone)) {
    errors.phone = "invalid phone number";
  }
  if (isEmpty(data.email) || !validator.isEmail(data.email)) {
    errors.email = "invalid email address";
  }
  const location = {
    city: data.city,
    state: data.state,
    country: data.country,
  };
  for (const key in location) {
    if (!validator.isAlpha(location[key]))
      errors[key] = "invalid name of " + key;
  }

  if (data.departments.length) {
    data.departments.some((d) => !validator.isMongoId(d))
      ? (errors.departments = "invalid department id")
      : "";
  } else {
    data.departments = [];
  }

  if (!isEmpty(errors)) {
    return res.status(400).json({
      data: null,
      errors,
      message: "failed to create bew branch",
    });
  }
  const others = sanitize(validator, {
    city: data.city,
    address: data.address,
    state: data.state,
    phone: data.phone,
    email: data.email,
    branchName: data.branchName,
    country: data.country,
  });
  data.departments.forEach((element) => {
    validator.trim(element);
    validator.escape(element);
    return element;
  });
  req.body = data;
  next();
}
