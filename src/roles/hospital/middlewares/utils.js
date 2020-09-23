import Hospital from "../models/Hospital";

export async function generateCodes(req, res, next) {
  const hospital = req.body.hospitalName.split(" ").join("");
  const code =
    hospital[0] + hospital[1] + hospital[2] + Math.floor(Math.random() * 101);
  const exists = await Hospital.exists({ code });
  if (exists) return generateCodes(req, res, next);
  req.body.hospitalCode = code.toUpperCase();
  next();
}
