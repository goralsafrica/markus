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
    errors[msg.message.split('"')[1]] = msg.message.split('"').join("");
  }
  return errors;
}
