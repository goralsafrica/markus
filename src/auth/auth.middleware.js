//IMPORT MOODULES
import Hospital from "../hospital/models/Hospital";
import Staff from "../staff/models/Staff";
import validator from "validator";
import isEmpty from "is-empty";
import * as utils from "../utilities";

/**
 *
 * @param req
 * @param res
 * @param next
 *
 * @desc validates user inputs. sends errors and stops current endpoint work if any.
 */
export async function loginValidator(req, res, next) {
  const errors = {};
  const data = req.body;

  data.email = !isEmpty(data.email) ? data.email : "";
  data.hospital = !isEmpty(data.hospital) ? data.hospital : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.email) || !validator.isEmail(data.email)) {
    errors.email = "Invalid login credentials";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Invaid login credentials";
  }

  if (validator.isEmpty(data.hospital)) {
    errors.password = "Invalid login credentials";
  }

  if (!isEmpty(errors))
    return res.status(400).json({
      data: null,
      errors: Object.values(errors),
      message: "bad request",
    });

  try {
    await Hospital.findById(data.hospital);
  } catch (err) {
    res.status(400).json({
      data: null,
      errors: ["hospital not found"],
      message: "bad request",
    });
  }
  next();
}

// export async function verifyStaff(req, res, next) {
//   try {
//     const exists = await Staff.findOne({ email: req.body.email });
//     if (!exists)
//       return next(400, ["invalid login credentials"], "authentication failed");
//     console.log(exists);
//   } catch (err) {
//     next(500, ["server failed to respond"], "authentication failed");
//   }
// }
export async function verifyToken(req, res, next) {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ").pop()
    : "0918ytfcvbnjuytrbnkuytrdcv";
  try {
    const data = await utils.verifyJWT(token);
    req.body.credentials = data;
    next();
  } catch (err) {
    return next([401, ["invalid credentials"], "unauthorized request"]);
  }
}
// exports.departmentValidator = function (req, res, next) {
//   const errors = {};
//   const data = req.body;

//   console.log(data);
//   data.name = !isEmpty(data.name) ? data.name : "";

//   if (validator.isEmpty(data.name)) {
//     errors.name = "name of department is required";
//   }

//   if (!isEmpty(errors)) return res.status(400).json(errors);
//   next();
// };
