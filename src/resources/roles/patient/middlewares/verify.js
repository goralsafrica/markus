import Patient from "../models/Patient";

export async function verifyNewPatient(req, res, next) {
  try {
    const query = getQuery(req.body, req.credentials.hospital);
    const exists = await Patient.exists(query);
    if (exists)
      return next({
        status: 400,
        errors: {
          request:
            "patient with the given credentials ( email or and phone ) already exists in this hospital",
          message: "registration failed",
        },
      });

    return next();
  } catch (err) {
    console.log(err);
  }
}

function getQuery(data, hospital) {
  const res = [];

  if (data.email) res.push({ email: data.email.toLowerCase() });

  if (data.phone) res.push({ phone: data.phone });

  return {
    hospital,
    $or: res,
  };
}
