import Hospital from "../../hospital/models/Hospital";

export async function getPatientCode(req, res, next) {
  const hospital = req.credentials.hospital;
  const previousCode =
    (await Hospital.findById(hospital).select("+lrp")).lrp || 0;
  req.body.code = previousCode + 1;
  await Hospital.findByIdAndUpdate(hospital, { lrp: req.body.code });

  return next();
}
