import Hospital from "./models";
import { hashSync } from "bcryptjs";
class HospitalController {
  static async create(req, res, next) {
    const { name, email, phoneNumber, password } = req.body;
    try {
      const newHospital = new Hospital({ name, email, phoneNumber, password });
      const success = await newHospital.save();

      if (!success) return Promise.reject("error handling request");
      res.send({
        mesaage: "new hospital created",
      });
    } catch (err) {
      next([500, "server  failed to respond :("]);
    }
  }

  static async show(req, res, next) {
    try {
      const data = await Hospital.findById(req.params.id);

      if (!data) return Promise.reject("error handling request");
      res.send({
        data,
      });
    } catch (err) {
      next([500, "server  failed to respond :("]);
    }
  }
}

export default HospitalController;
