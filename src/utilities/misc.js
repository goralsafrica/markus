import phoneNumberFormats from "../seeders/phoneNumberFormats.json";
export function sanitize(validator, data) {
  for (const prop in data) {
    data[prop] = validator.trim(data[prop]);
    data[prop] = validator.escape(data[prop]);
  }
  return data;
}

export function getDays() {
  return [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
}

export function formatJoiError(err) {
  const errors = {};
  for (const msg of err.details) {
    errors[msg.path[0]] = msg.message.split('"').join("");
  }
  return errors;
}

export function formatNestedError(err) {
  const errors = {};
  for (const { path, message } of err.details) {
    if (path.length == 2) {
      const [parent, child] = path;
      if (!errors[parent]) errors[parent] = {};
      errors[parent][child] = message.split(".").join(" ").split('"').join("");
    } else {
      errors[path[0]] = message.split('"').join("");
    }
  }
  return errors;
}

export function validatePhoneNumber(payload, country = "nigeria") {
  payload = payload.toString();
  if (payload.length == phoneNumberFormats[country].length)
    return [phoneNumberFormats[country].code, ...payload].join("");

  return false;
}
